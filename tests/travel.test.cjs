'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const travel = require('../travel.js');
const { SCALE, routes, distanceKm, statusAt } = travel;
const close = (actual, expected, tolerance = 1e-8) => assert(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);

test('1500 km² cells have equal 38.73 km sides in both map directions', () => {
  close(SCALE.cellSideKm ** 2, 1500);
  const dx = 200 / 7400 * 100;
  const dy = 200 / 3800 * 100;
  close(distanceKm([20, 20], [20 + dx, 20]), Math.sqrt(1500));
  close(distanceKm([20, 20], [20, 20 + dy]), Math.sqrt(1500));
  close(distanceKm([20, 20], [20 + dx, 20 + dy]), Math.sqrt(3000));
  close(distanceKm([20 + dx, 20 + dy], [20, 20]), Math.sqrt(3000));
});

test('route durations follow measured grid distance and steam cruising speeds', () => {
  assert.equal(routes.length, 3);
  assert.deepEqual(routes.map(route => route.speedKnots), [12, 8, null]);
  close(routes[0].speedKmh, 22.224);
  close(routes[1].speedKmh, 14.816);
  close(routes[2].speedKmh, 40);
  for (const route of routes) {
    const sum = route.points.slice(1).reduce((total, p, i) => total + distanceKm(route.points[i], p), 0);
    close(route.totalKm, sum);
    close(route.durationMinutes / 60 * route.speedKmh, sum);
  }
});

test('one game hour advances ships by at most their cruising distance', () => {
  for (const route of routes.filter(route => route.kind === 'ship')) {
    const before = statusAt(route, 0);
    const after = statusAt(route, 60);
    close(route.totalKm - after.remainingKm, route.speedKmh);
    assert(distanceKm([before.x, before.y], [after.x, after.y]) <= route.speedKmh + 1e-8);
    assert.equal(after.direction, 'outbound');
  }
});

test('interpolation reaches a segment midpoint at the exact physical travel time', () => {
  for (const route of routes) {
    const time = route.segmentsKm[0] / route.speedKmh * 60 / 2;
    const position = statusAt(route, time);
    close(position.x, (route.points[0][0] + route.points[1][0]) / 2);
    close(position.y, (route.points[0][1] + route.points[1][1]) / 2);
  }
});

test('turnarounds and arbitrary forward jumps retain distance and direction', () => {
  for (const route of routes) {
    const end = statusAt(route, route.durationMinutes);
    const start = statusAt(route, route.durationMinutes * 2);
    close(end.x, route.points.at(-1)[0]);
    close(end.y, route.points.at(-1)[1]);
    assert.equal(end.direction, 'return');
    close(end.remainingKm, route.totalKm);
    close(start.x, route.points[0][0]);
    close(start.y, route.points[0][1]);
    assert.equal(start.direction, 'outbound');
    const jump = statusAt(route, route.durationMinutes * 12.5);
    const midpoint = statusAt(route, route.durationMinutes * .5);
    assert.equal(jump.leg, 12);
    close(jump.x, midpoint.x);
    close(jump.y, midpoint.y);
    close(jump.remainingMinutes, route.durationMinutes / 2);
  }
});

test('invalid and negative elapsed times safely use departure; bad coordinates fail', () => {
  for (const value of [NaN, Infinity, -Infinity, -10, undefined, '60']) {
    const status = statusAt(routes[0], value);
    close(status.x, routes[0].points[0][0]);
    close(status.y, routes[0].points[0][1]);
    assert.equal(status.leg, 0);
  }
  assert.throws(() => distanceKm([NaN, 0], [0, 0]), TypeError);
  assert.throws(() => distanceKm(null, [0, 0]), TypeError);
});
