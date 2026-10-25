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

  function distanceKm(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) ||
        ![a[0], a[1], b[0], b[1]].every(Number.isFinite)) {
      throw new TypeError('Map points must contain finite x/y percentages');
    }
    const dxCells = (b[0] - a[0]) / 100 * SCALE.imageWidth / SCALE.cellPixels;
    const dyCells = (b[1] - a[1]) / 100 * SCALE.imageHeight / SCALE.cellPixels;
    return Math.hypot(dxCells, dyCells) * SCALE.cellSideKm;
  }

  function buildRoute(definition) {
    const points = definition.points.map(point => Object.freeze([...point]));
    const segmentsKm = points.slice(1).map((point, i) => distanceKm(points[i], point));
    const totalKm = segmentsKm.reduce((sum, distance) => sum + distance, 0);
    const speedKnots = definition.kind === 'ship' ? definition.speedKnots : null;
    const speedKmh = speedKnots === null ? definition.speedKmh : speedKnots * KM_PER_NAUTICAL_MILE;
    if (points.length < 2 || !(speedKmh > 0) || !Number.isFinite(speedKmh) || !(totalKm > 0)) {
      throw new RangeError('A route needs positive length and cruising speed');
    }
    return Object.freeze({
      id: definition.id,
      kind: definition.kind,
      name: definition.name,
      speedKnots,
      speedKmh,
      totalKm,
      durationMinutes: totalKm / speedKmh * 60,
      points: Object.freeze(points),
      segmentsKm: Object.freeze(segmentsKm)
    });
  }

  const routes = Object.freeze([
    buildRoute({ id: 'sea-east', kind: 'ship', name: 'Почтовый пароход', speedKnots: 12,
      points: [[54, 36.5], [57.5, 39], [62, 37], [66, 42], [61, 46], [58, 47]] }),
    buildRoute({ id: 'sea-west', kind: 'ship', name: 'Грузовой пароход', speedKnots: 8,
      points: [[49, 42], [43, 38], [38, 45], [43, 51], [51, 48], [54, 48]] }),
    buildRoute({ id: 'rail-loen', kind: 'train', name: 'Паровоз Лоэна', speedKmh: 40,
      points: [[51.7, 26.5], [52.1, 27.5], [52.4, 28.3], [52.7, 30.2]] })
  ]);

  function positionAlong(route, progress) {
    let distance = route.totalKm * progress;
    for (let i = 0; i < route.segmentsKm.length; i++) {
      const length = route.segmentsKm[i];
      if (distance <= length || i === route.segmentsKm.length - 1) {
        const fraction = length ? Math.max(0, Math.min(1, distance / length)) : 0;
        return {
          x: route.points[i][0] + (route.points[i + 1][0] - route.points[i][0]) * fraction,
          y: route.points[i][1] + (route.points[i + 1][1] - route.points[i][1]) * fraction
        };
      }
      distance -= length;
    }
    return { x: route.points[0][0], y: route.points[0][1] };
  }

  function statusAt(route, elapsedMinutes) {
    const time = Number.isFinite(elapsedMinutes) ? Math.max(0, elapsedMinutes) : 0;
    const leg = Math.floor(time / route.durationMinutes);
    const progress = (time % route.durationMinutes) / route.durationMinutes;
    const direction = leg % 2 ? 'return' : 'outbound';
    const position = positionAlong(route, direction === 'return' ? 1 - progress : progress);
    return {
      id: route.id,
      kind: route.kind,
      name: route.name,
      speedKnots: route.speedKnots,
      speedKmh: route.speedKmh,
      totalKm: route.totalKm,
      durationMinutes: route.durationMinutes,
      ...position,
      progress,
      direction,
      remainingKm: route.totalKm * (1 - progress),
      remainingMinutes: route.durationMinutes * (1 - progress),
      leg
    };
  }

  return Object.freeze({ SCALE, KM_PER_NAUTICAL_MILE, routes, distanceKm, statusAt });
});
