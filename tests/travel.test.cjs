'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { SCALE, ports, stations, sources, routes, distanceKm, statusAt } = require('../travel.js');
const atlas = require('../transport-atlas.js');
const islandNetwork = require('../island-network.js');
const close = (actual, expected, tolerance = 1e-8) => assert(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
const ships = routes.filter(route => route.kind === 'ship');
const pointAt = status => [status.x, status.y];
const pixels = point => [point[0] / 100 * 7400, point[1] / 100 * 3800];

function distanceToSegment(point, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - a[0] - t * dx, point[1] - a[1] - t * dy);
}

test('1500 km² cells have equal 38.73 km sides in both map directions', () => {
  close(SCALE.cellSideKm ** 2, 1500);
  const dx = 200 / 7400 * 100, dy = 200 / 3800 * 100;
  close(distanceKm([20, 20], [20 + dx, 20]), Math.sqrt(1500));
  close(distanceKm([20, 20], [20, 20 + dy]), Math.sqrt(1500));
  close(distanceKm([20, 20], [20 + dx, 20 + dy]), Math.sqrt(3000));
});

test('closed ship circuits visit every declared map harbor and anchorage', () => {
  assert(ships.length >= 2);
  assert.equal(new Set(ports.map(port => port.id)).size, ports.length);
  const visited = new Set(ships.flatMap(route => route.stopIds));
  assert.deepEqual([...visited].sort(), ports.map(port => port.id).sort());
  for (const port of ports) {
    assert(port.name && port.island, `stop ${port.id} needs its named map location`);
    assert(['harbor', 'anchorage'].includes(port.kind), `stop ${port.id} must distinguish a harbor from an anchorage`);
  }
  for (const route of ships) {
    assert.equal(route.legs.length, route.stopIds.length);
    assert.equal(route.itinerary.length, route.stopIds.length);
    assert.equal(statusAt(route, 0).type, route.type);
    close(distanceKm(route.points[0], route.points.at(-1)), 0);
    route.legs.forEach((leg, index) => {
      assert.equal(leg.startPort.id, route.stopIds[index]);
      assert.equal(leg.endPort.id, route.stopIds[(index + 1) % route.stopIds.length]);
      close(distanceKm(leg.points[0], [leg.startPort.x, leg.startPort.y]), 0);
      close(distanceKm(leg.points.at(-1), [leg.endPort.x, leg.endPort.y]), 0);
    });
  }
});

test('rounded legs stay in their inspected coastal corridor without sudden course changes', () => {
  let curves = 0;
  for (const route of ships) for (const leg of route.legs) {
    if (leg.waypoints.length > 2) {
      assert.match(leg.svgPath, / Q /);
      curves++;
    }
    const waypoints = leg.waypoints.map(pixels);
    for (const point of leg.points.map(pixels)) {
      const distance = Math.min(...waypoints.slice(1).map((end, i) => distanceToSegment(point, waypoints[i], end)));
      assert(distance <= 16 + 1e-8, `${route.id} leaves its 16px coastal corridor: ${distance}`);
    }
    const angles = leg.points.slice(1).map((point, i) => {
      const [ax, ay] = pixels(leg.points[i]), [bx, by] = pixels(point);
      return Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
    });
    for (let i = 1; i < angles.length; i++) {
      const turn = Math.abs(((angles[i] - angles[i - 1] + 540) % 360) - 180);
      assert(turn < 3, `${route.id}/${leg.from}→${leg.to} has an abrupt sampled turn: ${turn}°`);
    }
  }
  assert(curves > 0);
});

test('circuit time sums physical leg distances, steam speeds and all port calls', () => {
  for (const route of ships) {
    assert(route.speedKnots > 0 && route.speedKnots <= 16, `${route.id} exceeds the modeled steam-vessel speed limit`);
    if (route.serviceKind === 'gameplay') assert([8, 12].includes(route.speedKnots));
    close(route.speedKmh, route.speedKnots * 1.852);
    const distance = route.legs.reduce((sum, leg) => sum + leg.totalKm, 0);
    const sailingTime = distance / route.speedKmh * 60;
    const dockingTime = route.legs.reduce((sum, leg) => sum + leg.dockMinutes, 0);
    close(route.totalKm, distance);
    close(route.durationMinutes, sailingTime);
    close(route.cycleMinutes, sailingTime + dockingTime);
    close(route.circuitMinutes, route.cycleMinutes);
    for (const leg of route.legs) {
      const measured = leg.points.slice(1).reduce((sum, p, i) => sum + distanceKm(leg.points[i], p), 0);
      close(leg.totalKm, measured);
      close(leg.durationMinutes, measured / route.speedKmh * 60);
    }
  }
});

test('each leg cruises at physical speed and never accelerates around a bend', () => {
  for (const route of ships) route.legs.forEach((leg, index) => {
    const departure = route.cumulativeMinutes[index] + leg.dockMinutes;
    const sampleMinutes = Math.min(60, leg.durationMinutes * .75);
    const before = statusAt(route, departure);
    const after = statusAt(route, departure + sampleMinutes);
    assert.equal(before.phase, 'sailing');
    assert.equal(after.phase, 'sailing');
    close(leg.totalKm - after.remainingKm, route.speedKmh * sampleMinutes / 60);
    assert(distanceKm(pointAt(before), pointAt(after)) <= route.speedKmh * sampleMinutes / 60 + 1e-8);
    const step = leg.durationMinutes / 100;
    for (let i = 1; i < 100; i++) {
      const a = statusAt(route, departure + (i - 1) * step);
      const b = statusAt(route, departure + i * step);
      assert(distanceKm(pointAt(a), pointAt(b)) <= route.speedKmh / 60 * step + 1e-8);
    }
  });
});

test('every island call docks, waits, then heads to the next distinct itinerary stop', () => {
  for (const route of ships) route.legs.forEach((leg, index) => {
    assert(leg.dockMinutes > 0);
    const arrivalTime = route.cumulativeMinutes[index];
    const arrival = statusAt(route, arrivalTime);
    const waiting = statusAt(route, arrivalTime + leg.dockMinutes / 2);
    assert.equal(arrival.phase, 'docked');
    assert.equal(arrival.currentPort.id, leg.startPort.id);
    assert.equal(arrival.origin.id, leg.startPort.id);
    assert.equal(arrival.destination.id, leg.endPort.id);
    assert.notEqual(arrival.origin.id, arrival.destination.id);
    assert.equal(arrival.stopIndex, index);
    assert.equal(arrival.stopCount, route.legs.length);
    close(arrival.remainingMinutes, leg.dockMinutes + leg.durationMinutes);
    close(waiting.nextDepartureMinutes, leg.dockMinutes / 2);
    close(distanceKm(pointAt(arrival), pointAt(waiting)), 0);
    close(distanceKm(pointAt(arrival), [leg.startPort.x, leg.startPort.y]), 0);
    const sailing = statusAt(route, arrivalTime + leg.dockMinutes + leg.durationMinutes / 2);
    assert.equal(sailing.phase, 'sailing');
    assert.equal(sailing.currentPort, null);
    assert.equal(sailing.destination.id, leg.endPort.id);
    const nextIndex = (index + 1) % route.legs.length;
    const nextArrival = statusAt(route, route.cumulativeMinutes[index + 1]);
    assert.equal(nextArrival.phase, 'docked');
    assert.equal(nextArrival.currentPort.id, route.legs[nextIndex].startPort.id);
    close(distanceKm(pointAt(nextArrival), [leg.endPort.x, leg.endPort.y]), 0);
  });
});

test('full circuits and large time jumps preserve location, stop, direction and ETA', () => {
  for (const route of ships) {
    for (let index = 0; index < route.legs.length; index++) {
      const leg = route.legs[index];
      const elapsed = route.cumulativeMinutes[index] + leg.dockMinutes + leg.durationMinutes * .37;
      const initial = statusAt(route, elapsed);
      const jumped = statusAt(route, route.cycleMinutes * 100 + elapsed);
      close(distanceKm(pointAt(initial), pointAt(jumped)), 0, 1e-7);
      close(initial.remainingMinutes, jumped.remainingMinutes, 1e-7);
      close(jumped.circuitProgress, initial.circuitProgress);
      assert.equal(initial.phase, jumped.phase);
      assert.equal(initial.direction, 'circuit');
      assert.equal(jumped.stopIndex, index);
      assert.equal(jumped.leg, 100 * route.legs.length + index);
      assert.equal(jumped.origin.id, initial.origin.id);
      assert.equal(jumped.destination.id, initial.destination.id);
      close(jumped.circuitKm, route.totalKm);
      close(jumped.totalKm, leg.totalKm);
    }
    const start = statusAt(route, route.cycleMinutes);
    assert.equal(start.phase, 'docked');
    assert.equal(start.stopIndex, 0);
    assert.equal(start.currentPort.id, route.stopIds[0]);
    close(distanceKm(pointAt(start), pointAt(statusAt(route, 0))), 0);
    close(start.circuitProgress, 0);
    for (let index = 0; index < route.legs.length; index++) {
      const boundary = statusAt(route, route.cycleMinutes * 100 + route.cumulativeMinutes[index]);
      assert.equal(boundary.phase, 'docked');
      assert.equal(boundary.currentPort.id, route.stopIds[index]);
      assert.equal(boundary.leg, 100 * route.legs.length + index);
    }
  }
});

test('source-backed rail services dock at their actual mapped city anchors and return', () => {
  const trains = routes.filter(route => route.kind === 'train');
  const byStation = new Map(stations.map(station => [station.id, station]));
  assert(trains.length > 0, 'the atlas should include researched rail services');
  assert.deepEqual(trains.map(route => route.id), atlas.railServices.map(route => route.id));
  for (const train of trains) {
    const definition = atlas.railServices.find(route => route.id === train.id);
    assert(train.speedKmh > 0 && train.speedKmh <= 40);
    assert.equal(train.dockMinutes, definition.dockMinutes ?? 5);
    assert(train.dockMinutes > 0);
    assert.equal(train.startPort, byStation.get(definition.from));
    assert.equal(train.endPort, byStation.get(definition.to));
    close(distanceKm(train.points[0], [train.startPort.x, train.startPort.y]), 0);
    close(distanceKm(train.points.at(-1), [train.endPort.x, train.endPort.y]), 0);
    const initial = statusAt(train, 0), waiting = statusAt(train, train.dockMinutes / 2);
    assert.equal(initial.phase, 'docked');
    assert.equal(initial.currentPort.id, definition.from);
    assert.equal(initial.destination.id, definition.to);
    close(distanceKm(pointAt(initial), pointAt(waiting)), 0);
    close(waiting.nextDepartureMinutes, train.dockMinutes / 2);
    const halfway = train.segmentsKm[0] / train.speedKmh * 60 / 2;
    const midpoint = statusAt(train, train.dockMinutes + halfway);
    assert.equal(midpoint.phase, 'sailing');
    close(midpoint.x, (train.points[0][0] + train.points[1][0]) / 2);
    close(midpoint.y, (train.points[0][1] + train.points[1][1]) / 2);
    const arrival = statusAt(train, train.dockMinutes + train.durationMinutes);
    assert.equal(arrival.phase, 'docked');
    assert.equal(arrival.direction, 'return');
    assert.equal(arrival.currentPort.id, definition.to);
    assert.equal(arrival.destination.id, definition.from);
    close(arrival.x, train.points.at(-1)[0]);
    close(arrival.y, train.points.at(-1)[1]);
    const returning = statusAt(train, 2 * train.dockMinutes + train.durationMinutes + halfway);
    assert.equal(returning.phase, 'sailing');
    for (const multiplier of [1, 100]) {
      const cycle = statusAt(train, train.cycleMinutes * multiplier);
      assert.equal(cycle.phase, 'docked');
      assert.equal(cycle.currentPort.id, definition.from);
      close(distanceKm(pointAt(cycle), pointAt(initial)), 0);
    }
  }
});

test('invalid elapsed times wait at initial departure; invalid coordinates fail', () => {
  for (const value of [NaN, Infinity, -Infinity, -10, undefined, '60']) {
    const status = statusAt(ships[0], value);
    close(status.x, ships[0].points[0][0]);
    close(status.y, ships[0].points[0][1]);
    assert.equal(status.phase, 'docked');
    assert.equal(status.leg, 0);
  }
  assert.throws(() => distanceKm([NaN, 0], [0, 0]), TypeError);
  assert.throws(() => distanceKm(null, [0, 0]), TypeError);
});


test('every documented or contextual service retains resolvable open-source evidence', () => {
  const sourceById = new Map(sources.map(source => [source.id, source]));
  assert.equal(sourceById.size, sources.length);
  for (const source of sources) {
    assert(source.title, `source ${source.id} needs a readable title`);
    assert.match(source.url, /^https:\/\//, `source ${source.id} needs a public HTTPS reference`);
  }
  const researched = routes.filter(route => route.evidence.status !== 'gameplay');
  assert(researched.length > 0);
  for (const route of researched) {
    assert(['documented', 'contextual'].includes(route.evidence.status), `${route.id} has no explicit evidence level`);
    assert(route.evidence.sourceIds.length > 0);
    for (const sourceId of route.evidence.sourceIds) assert(sourceById.has(sourceId), `${route.id} references an unknown source ${sourceId}`);
    for (const time of [0, route.cycleMinutes * .31, route.cycleMinutes * 100]) {
      const status = statusAt(route, time);
      assert.equal(status.evidence, route.evidence);
      assert.equal(status.serviceKind, route.serviceKind);
    }
  }
});

test('gameplay island circuits stay available without being promoted to documented schedules', () => {
  const gameplay = routes.filter(route => route.serviceKind === 'gameplay');
  assert.deepEqual(gameplay.map(route => route.id), islandNetwork.circuits.map(route => route.id));
  const visited = new Set(gameplay.flatMap(route => route.stopIds));
  for (const port of islandNetwork.ports) assert(visited.has(port.id));
  for (const route of gameplay) {
    assert.equal(route.evidence.status, 'gameplay');
    assert.deepEqual(route.evidence.sourceIds, []);
    assert.equal(statusAt(route, route.cycleMinutes / 2).evidence.status, 'gameplay');
  }
});

test('canonical journey-duration metadata is preserved without changing game-scale physics', () => {
  for (const definition of [...atlas.railServices, ...atlas.seaServices]) {
    const route = routes.find(route => route.id === definition.id);
    assert(route, `service ${definition.id} must be modeled`);
    assert.deepEqual(route.evidence.canonicalDuration, definition.evidence.canonicalDuration);
    close(route.durationMinutes, route.totalKm / route.speedKmh * 60);
    const status = statusAt(route, 0);
    assert.deepEqual(status.evidence.canonicalDuration, definition.evidence.canonicalDuration);
    assert.equal(status.origin.id, route.startPort.id);
  }
});
