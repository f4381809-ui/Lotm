/* Flat game-map distances: a grid cell has an area of 1500 km². */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LotMTravel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const SCALE = Object.freeze({
    cellAreaKm2: 1500,
    cellSideKm: Math.sqrt(1500),
    cellPixels: 200,
    imageWidth: 7400,
    imageHeight: 3800
  });
  const KM_PER_NAUTICAL_MILE = 1.852;
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
      const steps = Math.max(12, Math.ceil(cut * 2 / .75));
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
    const dockMinutes = definition.kind === 'ship' ? definition.dockMinutes : 0;
    if (points.length < 2 || !(speedKmh > 0) || !Number.isFinite(speedKmh) || !(totalKm > 0)) {
      throw new RangeError('A route needs positive length and cruising speed');
    }
    const durationMinutes = totalKm / speedKmh * 60;
    return Object.freeze({
      id: definition.id,
      kind: definition.kind,
      name: definition.name,
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

  // Berths are on the seaward side of the map's printed harbor symbols.
  // Coastal waypoints were checked against the HD shoreline before corner rounding.
  const ports = Object.freeze([
    Object.freeze({ id: 'pritz', name: 'Порт Приц', x: 4068 / 7400 * 100, y: 1158 / 3800 * 100 }),
    Object.freeze({ id: 'bayam', name: 'Байам', x: 4318 / 7400 * 100, y: 1498 / 3800 * 100 }),
    Object.freeze({ id: 'bansy', name: 'Порт Банси', x: 4118 / 7400 * 100, y: 1355 / 3800 * 100 })
  ]);
  const routes = Object.freeze([
    buildRoute({ id: 'sea-east', kind: 'ship', name: 'Почтовый пароход', speedKnots: 12, dockMinutes: 60,
      startPort: ports[0], endPort: ports[1],
      points: [[4068 / 7400 * 100, 1158 / 3800 * 100], [4090 / 7400 * 100, 1185 / 3800 * 100], [4130 / 7400 * 100, 1240 / 3800 * 100], [4175 / 7400 * 100, 1300 / 3800 * 100], [4210 / 7400 * 100, 1370 / 3800 * 100], [4260 / 7400 * 100, 1435 / 3800 * 100], [4295 / 7400 * 100, 1468 / 3800 * 100], [4318 / 7400 * 100, 1498 / 3800 * 100]] }),
    buildRoute({ id: 'sea-west', kind: 'ship', name: 'Грузовой пароход', speedKnots: 8, dockMinutes: 120,
      startPort: ports[1], endPort: ports[2],
      points: [[4318 / 7400 * 100, 1498 / 3800 * 100], [4288 / 7400 * 100, 1477 / 3800 * 100], [4245 / 7400 * 100, 1448 / 3800 * 100], [4200 / 7400 * 100, 1402 / 3800 * 100], [4157 / 7400 * 100, 1363 / 3800 * 100], [4118 / 7400 * 100, 1355 / 3800 * 100]] }),
    buildRoute({ id: 'rail-loen', kind: 'train', name: 'Паровоз Лоэна', speedKmh: 40,
      points: [[51.7, 26.5], [52.1, 27.5], [52.4, 28.3], [52.7, 30.2]] })
  ]);

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
    const legMinutes = route.durationMinutes + route.dockMinutes;
    const leg = Math.floor(time / legMinutes);
    const withinLeg = time % legMinutes;
    const direction = leg % 2 ? 'return' : 'outbound';
    const origin = direction === 'outbound' ? route.startPort : route.endPort;
    const destination = direction === 'outbound' ? route.endPort : route.startPort;
    const phase = withinLeg < route.dockMinutes ? 'docked' : 'sailing';
    const nextDepartureMinutes = phase === 'docked' ? route.dockMinutes - withinLeg : 0;
    const progress = phase === 'docked' ? 0 : (withinLeg - route.dockMinutes) / route.durationMinutes;
    const position = positionAlong(route, direction === 'return' ? 1 - progress : progress, direction === 'return');
    return {
      id: route.id,
      kind: route.kind,
      name: route.name,
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

  return Object.freeze({ SCALE, KM_PER_NAUTICAL_MILE, ports, routes, distanceKm, statusAt });
});
