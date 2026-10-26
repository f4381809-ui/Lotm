/* Flat game-map distances: a grid cell has an area of 1500 km². */
(function (root, factory) {
  'use strict';
  const commonJS = typeof module === 'object' && module.exports;
  const network = commonJS ? require('./island-network.js') : root.LotMIslandNetwork;
  const atlas = commonJS ? require('./transport-atlas.js') : root.LotMTransportAtlas;
  const api = factory(network, atlas);
  if (commonJS) module.exports = api;
  else root.LotMTravel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (network, atlas) {
  'use strict';
  if (!network || !Array.isArray(network.ports) || !Array.isArray(network.circuits)) {
    throw new Error('Load island-network.js before travel.js');
  }
  if (!atlas || !Array.isArray(atlas.sources) || !Array.isArray(atlas.stations) ||
      !Array.isArray(atlas.railServices) || !Array.isArray(atlas.seaServices) || !Array.isArray(atlas.extraPorts)) {
    throw new Error('Load transport-atlas.js before travel.js');
  }
  const SCALE = Object.freeze({
    cellAreaKm2: 1500,
    cellSideKm: Math.sqrt(1500),
    cellPixels: 200,
    imageWidth: 7400,
    imageHeight: 3800
  });
  const KM_PER_NAUTICAL_MILE = 1.852;
  const sources = Object.freeze(atlas.sources.map(source => Object.freeze({ ...source })));
  const sourceById = new Map(sources.map(source => [source.id, source]));
  if (sourceById.size !== sources.length) throw new Error('Transport source ids must be unique');
  const gameplayEvidence = Object.freeze({ status: 'gameplay', sourceIds: Object.freeze([]), geometry: 'schematic', claim: 'Морская линия и расписание созданы для игры по карте мира книги.' });
  function evidenceFor(definition) {
    const evidence = definition.evidence || gameplayEvidence;
    const sourceIds = Object.freeze([...(evidence.sourceIds || [])]);
    for (const id of sourceIds) if (!sourceById.has(id)) throw new Error(`Unknown transport source ${id}`);
    if (['documented', 'contextual'].includes(evidence.status) && !sourceIds.length) {
      throw new Error(`Documented transport ${definition.id} requires its source references`);
    }
    return Object.freeze({ ...evidence, sourceIds });
  }
  function locationCopy(location, defaultKind) {
    if (!location || typeof location.id !== 'string' || !location.id || typeof location.name !== 'string' ||
        !Number.isFinite(location.x) || !Number.isFinite(location.y) ||
        location.x < 0 || location.x > 100 || location.y < 0 || location.y > 100) {
      throw new TypeError('Mapped transport locations need an id, name and finite map percentages');
    }
    return Object.freeze({ ...location, kind: location.kind || defaultKind });
  }
  const stations = Object.freeze(atlas.stations.map(station => locationCopy(station, 'rail-station')));
  const stationById = new Map(stations.map(station => [station.id, station]));
  if (stationById.size !== stations.length) throw new Error('Rail station ids must be unique');
  const toPixels = point => [point[0] / 100 * SCALE.imageWidth, point[1] / 100 * SCALE.imageHeight];
  const toPercent = point => [point[0] / SCALE.imageWidth * 100, point[1] / SCALE.imageHeight * 100];
  const pixelLength = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const svgPoint = point => `${(point[0] / SCALE.imageWidth * 1000).toFixed(6)} ${(point[1] / SCALE.imageHeight * 514).toFixed(6)}`;

  function distanceKm(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) ||
        ![a[0], a[1], b[0], b[1]].every(Number.isFinite)) {
      throw new TypeError('Map points must contain finite x/y percentages');
    }
    return pixelLength(toPixels(a), toPixels(b)) / SCALE.cellPixels * SCALE.cellSideKm;
  }

  // Round only inside each waypoint's local triangle. Unlike an unconstrained spline,
  // the curve cannot swing outside the carefully chosen coastal navigation corridor.
  function roundedGeometry(waypoints) {
    const pixels = waypoints.map(toPixels);
    const sampled = [pixels[0]];
    let svgPath = `M ${svgPoint(pixels[0])}`;
    const append = point => {
      if (pixelLength(sampled.at(-1), point) > 1e-9) sampled.push(point);
    };
    for (let i = 1; i < pixels.length - 1; i++) {
      const previous = pixels[i - 1], corner = pixels[i], next = pixels[i + 1];
      const incoming = pixelLength(previous, corner), outgoing = pixelLength(corner, next);
      const cut = Math.min(16, incoming * .15, outgoing * .15);
      if (cut < 1e-9) continue;
      const entry = mix(corner, previous, cut / incoming);
      const exit = mix(corner, next, cut / outgoing);
      svgPath += ` L ${svgPoint(entry)} Q ${svgPoint(corner)} ${svgPoint(exit)}`;
      append(entry);
      // At most .75 source pixels per sample around a bend; movement follows the
      // same curve by measured arc length, rather than speeding up at control points.
      const inX = corner[0] - entry[0], inY = corner[1] - entry[1];
      const outX = exit[0] - corner[0], outY = exit[1] - corner[1];
      const cosine = Math.max(-1, Math.min(1, (inX * outX + inY * outY) / (cut * cut)));
      const turn = Math.acos(cosine);
      if (Math.PI - turn < 1e-6) throw new RangeError('A coastal waypoint cannot reverse course in place');
      // Also bound heading increments on sharper bends, even when their safe
      // clearance radius is small. This keeps the tangent visibly continuous.
      const turnSteps = Math.ceil(2 * Math.tan(turn / 2) / (Math.PI / 90));
      const steps = Math.max(12, Math.ceil(cut * 2 / .75), turnSteps);
      for (let step = 1; step <= steps; step++) {
        const t = step / steps;
        append(mix(mix(entry, corner, t), mix(corner, exit, t), t));
      }
    }
    svgPath += ` L ${svgPoint(pixels.at(-1))}`;
    append(pixels.at(-1));
    return { points: sampled.map(toPercent), svgPath };
  }

  function buildRoute(definition) {
    const waypoints = definition.points.map(point => Object.freeze([...point]));
    const geometry = definition.kind === 'ship' ? roundedGeometry(waypoints) : {
      points: waypoints,
      svgPath: waypoints.map((point, index) => `${index ? 'L' : 'M'} ${svgPoint(toPixels(point))}`).join(' ')
    };
    const points = geometry.points.map(point => Object.freeze([...point]));
    const segmentsKm = points.slice(1).map((point, i) => distanceKm(points[i], point));
    const cumulativeKm = [0];
    for (const segment of segmentsKm) cumulativeKm.push(cumulativeKm.at(-1) + segment);
    const totalKm = cumulativeKm.at(-1);
    const speedKnots = definition.kind === 'ship' ? definition.speedKnots : null;
    const speedKmh = speedKnots === null ? definition.speedKmh : speedKnots * KM_PER_NAUTICAL_MILE;
    const dockMinutes = definition.dockMinutes ?? (definition.kind === 'train' ? 5 : 0);
    if (!Number.isFinite(dockMinutes) || dockMinutes < 0) throw new RangeError('Transport dwell time must be nonnegative');
    if (points.length < 2 || !(speedKmh > 0) || !Number.isFinite(speedKmh) || !(totalKm > 0)) {
      throw new RangeError('A route needs positive length and cruising speed');
    }
    const durationMinutes = totalKm / speedKmh * 60;
    return Object.freeze({
      id: definition.id,
      kind: definition.kind,
      name: definition.name,
      evidence: evidenceFor(definition),
      serviceKind: definition.serviceKind || (definition.kind === 'train' ? 'rail-service' : 'gameplay'),
      from: definition.from || definition.startPort?.id || null,
      to: definition.to || definition.endPort?.id || null,
      viaNames: Object.freeze([...(definition.viaNames || [])]),
      speedKnots,
      speedKmh,
      totalKm,
      durationMinutes,
      dockMinutes,
      cycleMinutes: 2 * (durationMinutes + dockMinutes),
      startPort: definition.startPort || null,
      endPort: definition.endPort || null,
      waypoints: Object.freeze(waypoints),
      points: Object.freeze(points),
      svgPath: geometry.svgPath,
      segmentsKm: Object.freeze(segmentsKm),
      cumulativeKm: Object.freeze(cumulativeKm)
    });
  }

  // Extra source-backed ports may extend the gameplay network, but must never
  // silently relocate an existing map harbor with the same identity.
  const portById = new Map();
  for (const port of [...network.ports, ...atlas.extraPorts]) {
    const copy = locationCopy(port, 'harbor');
    const previous = portById.get(copy.id);
    if (previous && distanceKm([previous.x, previous.y], [copy.x, copy.y]) > .0001) {
      throw new Error(`Conflicting coordinates for transport port ${copy.id}`);
    }
    portById.set(copy.id, previous ? Object.freeze({ ...previous, ...copy }) : copy);
  }
  const ports = Object.freeze([...portById.values()]);

  function buildCircuit(definition) {
    const stopIds = definition.stopIds;
    if (!Array.isArray(stopIds) || stopIds.length < 2 || definition.legs.length !== stopIds.length) {
      throw new Error(`Circuit ${definition.id} must have a leg for every stop, including its return`);
    }
    const itinerary = stopIds.map(stopId => {
      const port = portById.get(stopId);
      if (!port) throw new Error(`Unknown island stop ${stopId}`);
      return port;
    });
    const legs = definition.legs.map((leg, index) => {
      const startPort = itinerary[index], endPort = itinerary[(index + 1) % itinerary.length];
      if (leg.from !== startPort.id || leg.to !== endPort.id) {
        throw new Error(`Circuit ${definition.id} has an out-of-order leg ${leg.from} → ${leg.to}`);
      }
      const dockMinutes = leg.dockMinutes ?? definition.dockMinutes;
      if (!Number.isFinite(dockMinutes) || dockMinutes < 0) throw new Error('Port dwell time must be nonnegative');
      if (!Array.isArray(leg.points) || leg.points.length < 2 ||
          distanceKm(leg.points[0], [startPort.x, startPort.y]) > .0001 ||
          distanceKm(leg.points.at(-1), [endPort.x, endPort.y]) > .0001) {
        throw new Error(`Circuit ${definition.id} must dock exactly at ${startPort.id} and ${endPort.id}`);
      }
      const points = leg.points.map(point => [...point]);
      points[0] = [startPort.x, startPort.y];
      points[points.length - 1] = [endPort.x, endPort.y];
      const route = buildRoute({
        ...definition,
        id: `${definition.id}:${index}`,
        kind: 'ship',
        startPort,
        endPort,
        dockMinutes,
        points
      });
      return Object.freeze({ ...route, from: startPort.id, to: endPort.id, spanMinutes: dockMinutes + route.durationMinutes });
    });
    const cumulativeMinutes = [0];
    for (const leg of legs) cumulativeMinutes.push(cumulativeMinutes.at(-1) + leg.spanMinutes);
    const points = legs.flatMap((leg, index) => index ? leg.points.slice(1) : leg.points);
    const segmentsKm = points.slice(1).map((point, i) => distanceKm(points[i], point));
    const cumulativeKm = [0];
    for (const segment of segmentsKm) cumulativeKm.push(cumulativeKm.at(-1) + segment);
    const totalKm = legs.reduce((sum, leg) => sum + leg.totalKm, 0);
    const durationMinutes = legs.reduce((sum, leg) => sum + leg.durationMinutes, 0);
    return Object.freeze({
      id: definition.id,
      kind: 'ship',
      type: definition.type || 'regular',
      name: definition.name,
      evidence: evidenceFor(definition),
      serviceKind: definition.serviceKind || 'gameplay',
      speedKnots: definition.speedKnots,
      speedKmh: definition.speedKnots * KM_PER_NAUTICAL_MILE,
      totalKm,
      circuitKm: totalKm,
      durationMinutes,
      dockMinutes: definition.dockMinutes,
      cycleMinutes: cumulativeMinutes.at(-1),
      circuitMinutes: cumulativeMinutes.at(-1),
      startPort: itinerary[0],
      endPort: itinerary[0],
      itinerary: Object.freeze(itinerary),
      stopIds: Object.freeze([...stopIds]),
      stopNames: Object.freeze(itinerary.map(port => port.name)),
      stopCount: itinerary.length,
      legs: Object.freeze(legs),
      cumulativeMinutes: Object.freeze(cumulativeMinutes),
      waypoints: Object.freeze(legs.flatMap((leg, index) => index ? leg.waypoints.slice(1) : leg.waypoints)),
      points: Object.freeze(points),
      svgPath: legs.map(leg => leg.svgPath).join(' '),
      segmentsKm: Object.freeze(segmentsKm),
      cumulativeKm: Object.freeze(cumulativeKm)
    });
  }

  function buildRailService(definition) {
    const startPort = stationById.get(definition.from), endPort = stationById.get(definition.to);
    if (!startPort || !endPort || startPort.id === endPort.id) {
      throw new Error(`Rail service ${definition.id} requires two distinct mapped stations`);
    }
    if (!Array.isArray(definition.points) || definition.points.length < 2 ||
        distanceKm(definition.points[0], [startPort.x, startPort.y]) > .0001 ||
        distanceKm(definition.points.at(-1), [endPort.x, endPort.y]) > .0001) {
      throw new Error(`Rail service ${definition.id} must start and finish at its mapped stations`);
    }
    const points = definition.points.map(point => [...point]);
    points[0] = [startPort.x, startPort.y];
    points[points.length - 1] = [endPort.x, endPort.y];
    return buildRoute({ ...definition, kind: 'train', startPort, endPort, points });
  }

  const routes = Object.freeze([
    ...network.circuits.map(definition => buildCircuit({ ...definition, evidence: gameplayEvidence, serviceKind: 'gameplay' })),
    ...atlas.seaServices.map(buildCircuit),
    ...atlas.railServices.map(buildRailService)
  ]);
  if (new Set(routes.map(route => route.id)).size !== routes.length) throw new Error('Transport route ids must be unique');

  function positionAlong(route, progress, returning) {
    const distance = route.totalKm * Math.max(0, Math.min(1, progress));
    let low = 0, high = route.segmentsKm.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (route.cumulativeKm[middle + 1] < distance) low = middle + 1;
      else high = middle;
    }
    const index = low, length = route.segmentsKm[index];
    const fraction = length ? Math.max(0, Math.min(1, (distance - route.cumulativeKm[index]) / length)) : 0;
    const a = route.points[index], b = route.points[index + 1];
    const point = mix(a, b, fraction);
    const ap = toPixels(a), bp = toPixels(b);
    const headingDegrees = Math.atan2(bp[1] - ap[1], bp[0] - ap[0]) * 180 / Math.PI + (returning ? 180 : 0);
    return { x: point[0], y: point[1], headingDegrees: (headingDegrees + 360) % 360 };
  }

  function statusAt(route, elapsedMinutes) {
    const time = Number.isFinite(elapsedMinutes) ? Math.max(0, elapsedMinutes) : 0;
    if (route.kind === 'ship' && route.legs) return circuitStatusAt(route, time);
    const legMinutes = route.durationMinutes + route.dockMinutes;
    const epsilon = Math.max(1e-9, Number.EPSILON * time * 4);
    let leg = Math.floor(time / legMinutes);
    let withinLeg = time - leg * legMinutes;
    if (legMinutes - withinLeg <= epsilon) { leg++; withinLeg = 0; }
    else if (withinLeg <= epsilon) withinLeg = 0;
    const direction = leg % 2 ? 'return' : 'outbound';
    const origin = direction === 'outbound' ? route.startPort : route.endPort;
    const destination = direction === 'outbound' ? route.endPort : route.startPort;
    const phase = withinLeg + epsilon < route.dockMinutes ? 'docked' : 'sailing';
    const nextDepartureMinutes = phase === 'docked' ? route.dockMinutes - withinLeg : 0;
    const progress = phase === 'docked' ? 0 : Math.max(0, Math.min(1, (withinLeg - route.dockMinutes) / route.durationMinutes));
    const position = positionAlong(route, direction === 'return' ? 1 - progress : progress, direction === 'return');
    return {
      id: route.id,
      kind: route.kind,
      name: route.name,
      evidence: route.evidence,
      serviceKind: route.serviceKind,
      viaNames: route.viaNames,
      speedKnots: route.speedKnots,
      speedKmh: route.speedKmh,
      totalKm: route.totalKm,
      durationMinutes: route.durationMinutes,
      dockMinutes: route.dockMinutes,
      cycleMinutes: route.cycleMinutes,
      ...position,
      progress,
      direction,
      phase,
      origin,
      destination,
      currentPort: phase === 'docked' ? origin : null,
      nextDepartureMinutes,
      remainingKm: route.totalKm * (1 - progress),
      remainingMinutes: route.durationMinutes * (1 - progress) + nextDepartureMinutes,
      leg
    };
  }

  function circuitStatusAt(route, time) {
    const epsilon = Math.max(1e-9, Number.EPSILON * time * 4);
    let cycle = Math.floor(time / route.cycleMinutes);
    let withinCycle = time - cycle * route.cycleMinutes;
    // Keep exact port-call boundaries stable after many floating-point cycles.
    if (route.cycleMinutes - withinCycle <= epsilon) { cycle++; withinCycle = 0; }
    else if (withinCycle <= epsilon) withinCycle = 0;
    let low = 0, high = route.legs.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (withinCycle + epsilon >= route.cumulativeMinutes[middle + 1]) low = middle + 1;
      else high = middle;
    }
    const stopIndex = low, currentLeg = route.legs[stopIndex];
    const withinLeg = Math.max(0, withinCycle - route.cumulativeMinutes[stopIndex]);
    const phase = withinLeg + epsilon < currentLeg.dockMinutes ? 'docked' : 'sailing';
    const nextDepartureMinutes = phase === 'docked' ? currentLeg.dockMinutes - withinLeg : 0;
    const progress = phase === 'docked' ? 0 : Math.max(0, Math.min(1, (withinLeg - currentLeg.dockMinutes) / currentLeg.durationMinutes));
    return {
      id: route.id,
      kind: route.kind,
      name: route.name,
      routeName: route.name,
      type: route.type,
      evidence: route.evidence,
      serviceKind: route.serviceKind,
      speedKnots: route.speedKnots,
      speedKmh: route.speedKmh,
      totalKm: currentLeg.totalKm,
      durationMinutes: currentLeg.durationMinutes,
      dockMinutes: currentLeg.dockMinutes,
      cycleMinutes: route.cycleMinutes,
      circuitKm: route.totalKm,
      circuitMinutes: route.cycleMinutes,
      circuitMovingMinutes: route.durationMinutes,
      circuitProgress: withinCycle / route.cycleMinutes,
      cycle,
      ...positionAlong(currentLeg, progress, false),
      progress,
      direction: 'circuit',
      phase,
      origin: currentLeg.startPort,
      destination: currentLeg.endPort,
      currentPort: phase === 'docked' ? currentLeg.startPort : null,
      nextDepartureMinutes,
      remainingKm: currentLeg.totalKm * (1 - progress),
      remainingMinutes: currentLeg.durationMinutes * (1 - progress) + nextDepartureMinutes,
      leg: cycle * route.legs.length + stopIndex,
      stopIndex,
      stopCount: route.legs.length,
      stopNames: route.stopNames,
      stopIds: route.stopIds,
      itinerary: route.itinerary
    };
  }

  return Object.freeze({ SCALE, KM_PER_NAUTICAL_MILE, ports, stations, sources, routes, distanceKm, statusAt });
});
