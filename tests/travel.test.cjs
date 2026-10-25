'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { SCALE, ports, routes, distanceKm, statusAt } = require('../travel.js');
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

test('ships sail between named water-side berths, not arbitrary ocean endpoints', () => {
  assert.equal(ports.length, 3);
  assert.deepEqual(ships.map(route => [route.startPort.id, route.endPort.id]), [['pritz', 'bayam'], ['bayam', 'bansy']]);
  assert.deepEqual(ports.map(port => [port.id, Math.round(port.x * 74), Math.round(port.y * 38)]), [
    ['pritz', 4068, 1158], ['bayam', 4318, 1498], ['bansy', 4118, 1355]
  ]);
  for (const route of ships) {
    close(distanceKm(route.points[0], [route.startPort.x, route.startPort.y]), 0);
    close(distanceKm(route.points.at(-1), [route.endPort.x, route.endPort.y]), 0);
  }
});

test('smooth curves remain inside the inspected coastal corridor with gentle tangents', () => {
  for (const route of ships) {
    assert.match(route.svgPath, / Q /);
    assert(route.points.length > route.waypoints.length * 5);
    const waypoints = route.waypoints.map(pixels);
    for (const point of route.points.map(pixels)) {
      const distance = Math.min(...waypoints.slice(1).map((end, i) => distanceToSegment(point, waypoints[i], end)));
      assert(distance <= 16 + 1e-8, `curve leaves its 16px coastal navigation corridor: ${distance}`);
    }
    const angles = route.points.slice(1).map((point, i) => {
      const [ax, ay] = pixels(route.points[i]), [bx, by] = pixels(point);
      return Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
    });
    for (let i = 1; i < angles.length; i++) {
      const turn = Math.abs(((angles[i] - angles[i - 1] + 540) % 360) - 180);
      assert(turn < 3, `abrupt turn between sampled curve segments: ${turn}°`);
    }
  }
});

test('arc-length route durations follow the grid scale and steam cruising speeds', () => {
  assert.equal(routes.length, 3);
  assert.deepEqual(routes.map(route => route.speedKnots), [12, 8, null]);
  close(routes[0].speedKmh, 22.224);
  close(routes[1].speedKmh, 14.816);
  close(routes[2].speedKmh, 40);
  for (const route of routes) {
    const sum = route.points.slice(1).reduce((total, p, i) => total + distanceKm(route.points[i], p), 0);
    close(route.totalKm, sum);
    close(route.durationMinutes / 60 * route.speedKmh, sum);
    close(route.cycleMinutes, 2 * (route.durationMinutes + route.dockMinutes));
  }
});

test('one sailing hour advances ships at their cruising speed along the curve', () => {
  for (const route of ships) {
    const before = statusAt(route, route.dockMinutes);
    const after = statusAt(route, route.dockMinutes + 60);
    assert.equal(before.phase, 'sailing');
    assert.equal(after.phase, 'sailing');
    close(route.totalKm - after.remainingKm, route.speedKmh);
    assert(distanceKm(pointAt(before), pointAt(after)) <= route.speedKmh + 1e-8);
    // A step across any bend must not exceed the physical travel speed.
    for (let minute = .25; minute < route.durationMinutes; minute += .25) {
      const a = statusAt(route, route.dockMinutes + minute - .25);
      const b = statusAt(route, route.dockMinutes + minute);
      assert(distanceKm(pointAt(a), pointAt(b)) <= route.speedKmh / 60 * .25 + 1e-8);
    }
  }
});

test('ships wait in each port, then sail back with a reversed destination', () => {
  for (const route of ships) {
    const start = statusAt(route, 0), waiting = statusAt(route, route.dockMinutes - .01);
    assert.equal(start.phase, 'docked');
    assert.equal(start.currentPort.id, route.startPort.id);
    assert.equal(start.destination.id, route.endPort.id);
    close(start.remainingMinutes, route.dockMinutes + route.durationMinutes);
    close(distanceKm(pointAt(start), pointAt(waiting)), 0);
    close(waiting.nextDepartureMinutes, .01);
    const arrivalTime = route.dockMinutes + route.durationMinutes;
    const arrived = statusAt(route, arrivalTime);
    assert.equal(arrived.phase, 'docked');
    assert.equal(arrived.currentPort.id, route.endPort.id);
    assert.equal(arrived.origin.id, route.endPort.id);
    assert.equal(arrived.destination.id, route.startPort.id);
    assert.equal(arrived.direction, 'return');
    close(arrived.nextDepartureMinutes, route.dockMinutes);
    close(distanceKm(pointAt(arrived), [route.endPort.x, route.endPort.y]), 0);
    const stillDocked = statusAt(route, arrivalTime + route.dockMinutes / 2);
    close(distanceKm(pointAt(arrived), pointAt(stillDocked)), 0);
    const returning = statusAt(route, arrivalTime + route.dockMinutes + route.durationMinutes / 2);
    const outbound = statusAt(route, route.dockMinutes + route.durationMinutes / 2);
    assert.equal(returning.phase, 'sailing');
    assert.equal(returning.currentPort, null);
    close(distanceKm(pointAt(returning), pointAt(outbound)), 0);
    close((returning.headingDegrees - outbound.headingDegrees + 360) % 360, 180);
  }
});

test('large time jumps and full cycles preserve voyages, port calls and ETA', () => {
  for (const route of ships) {
    const elapsed = route.dockMinutes + route.durationMinutes * .37;
    const initial = statusAt(route, elapsed);
    const jumped = statusAt(route, route.cycleMinutes * 100 + elapsed);
    close(distanceKm(pointAt(initial), pointAt(jumped)), 0);
    close(initial.remainingMinutes, jumped.remainingMinutes);
    assert.equal(initial.phase, jumped.phase);
    assert.equal(initial.direction, jumped.direction);
    assert.equal(jumped.leg, 200);
    const cycleStart = statusAt(route, route.cycleMinutes);
    assert.equal(cycleStart.phase, 'docked');
    assert.equal(cycleStart.currentPort.id, route.startPort.id);
    close(distanceKm(pointAt(cycleStart), pointAt(statusAt(route, 0))), 0);
  }
});

test('train behavior remains immediate cruising and return without ship docking', () => {
  const train = routes.find(route => route.kind === 'train');
  assert.equal(train.dockMinutes, 0);
  assert.equal(statusAt(train, 0).phase, 'sailing');
  const midpoint = statusAt(train, train.segmentsKm[0] / train.speedKmh * 60 / 2);
  close(midpoint.x, (train.points[0][0] + train.points[1][0]) / 2);
  close(midpoint.y, (train.points[0][1] + train.points[1][1]) / 2);
  const reverse = statusAt(train, train.durationMinutes);
  assert.equal(reverse.direction, 'return');
  close(reverse.x, train.points.at(-1)[0]);
  close(reverse.y, train.points.at(-1)[1]);
});

test('invalid elapsed times safely wait at departure; invalid coordinates fail', () => {
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
