/* Map simulation uses illustrative campaign routes, not canonical rail or sea charts. */
(function () {
  'use strict';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const routeDefinitions = [
    { id: 'sea-east', kind: 'ship', name: 'Почтовый пароход', period: 420, offset: 0,
      points: [[54, 36.5], [57.5, 39], [62, 37], [66, 42], [61, 46], [58, 47]] },
    { id: 'sea-west', kind: 'ship', name: 'Торговое судно', period: 540, offset: 180,
      points: [[49, 35], [43, 38], [38, 45], [43, 51], [51, 48], [54, 48]] },
    { id: 'rail-loen', kind: 'train', name: 'Экспресс Лоэна', period: 180, offset: 35,
      points: [[51.7, 26.5], [52.1, 27.5], [52.4, 28.3], [52.7, 30.2]] }
  ];
  const icons = {
    ship: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14l9 3 9-3-3 6H6zM7 13V8h10v5M10 8V4h4v4M2 22c2-2 3 1 5 0s3-1 5 0 3 1 5 0 3-1 5 0"/></svg>',
    train: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3" width="12" height="15" rx="3"/><path d="M7 10h10M12 4v6M8 18l-3 4m11-4 3 4M7 21h10"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>'
  };
  function injectStyles() {
    if (document.getElementById('world-simulation-style')) return;
    const style = document.createElement('style');
    style.id = 'world-simulation-style';
    style.textContent = `
      .simulation-route{fill:none;vector-effect:non-scaling-stroke;stroke-width:1.4;opacity:.65}
      .simulation-route.ship{stroke:#90bdc8;stroke-dasharray:5 6}
      .simulation-route.train{stroke:#e5ba79;stroke-dasharray:2 3;stroke-width:2}
      .transport-marker{position:absolute;transform:translate(-50%,-50%);width:25px;height:25px;display:grid;place-items:center;border-radius:50%;border:1px solid #a8c6c5;background:#112627e8;color:#d4f0e9;box-shadow:0 2px 8px #0008;pointer-events:none;z-index:2}
      .transport-marker.train{width:22px;height:22px;background:#352a18e8;border-color:#d7b47c;color:#f2d7a8}
      .transport-marker svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round}
      .transport-marker[hidden],.simulation-route[hidden]{display:none}
      .weather-zone{position:absolute;transform:translate(-50%,-50%);border-radius:50%;overflow:hidden;background:radial-gradient(ellipse,#56768d35 0%,#62889820 45%,transparent 71%);pointer-events:none;z-index:1}
      .weather-zone::before{content:'';position:absolute;inset:8%;border:1px dashed #a9cee94d;border-radius:50%}
      .weather-zone .rain-streak{position:absolute;width:1px;height:12%;background:linear-gradient(transparent,#c3e2ffad);animation:map-rain-fall .8s linear infinite;transform:rotate(18deg);opacity:.8}
      .weather-zone .weather-caption{position:absolute;left:50%;top:18%;transform:translateX(-50%);white-space:nowrap;padding:2px 5px;background:#14232ed9;color:#c5e0ee;border-radius:3px;font-size:8px;letter-spacing:.03em;border:1px solid #769bb044}
      @keyframes map-rain-fall{from{translate:9px -12px;opacity:0}15%{opacity:.8}to{translate:-9px 65px;opacity:0}}
      @media(prefers-reduced-motion:reduce){.weather-zone .rain-streak{animation:none;opacity:.45}}
    `;
    document.head.append(style);
  }
  function createRoute(definition) {
    const path = document.createElementNS(SVG_NS, 'polyline');
    path.setAttribute('points', definition.points.map(([x, y]) => `${x * 10},${y * 5.14}`).join(' '));
    path.setAttribute('class', `simulation-route ${definition.kind}`);
    const title = document.createElementNS(SVG_NS, 'title');
    title.textContent = `${definition.name} — условный маршрут кампании`;
    path.append(title);
    return path;
  }
  function sample(points, progress) {
    const lengths = points.slice(1).map((p, i) => Math.hypot((p[0] - points[i][0]) * 10, (p[1] - points[i][1]) * 5.14));
    let distance = progress * lengths.reduce((sum, length) => sum + length, 0);
    for (let i = 0; i < lengths.length; i++) {
      if (distance <= lengths[i] || i === lengths.length - 1) {
        const fraction = lengths[i] ? distance / lengths[i] : 0;
        return { x: points[i][0] + (points[i + 1][0] - points[i][0]) * fraction,
          y: points[i][1] + (points[i + 1][1] - points[i][1]) * fraction };
      }
      distance -= lengths[i];
    }
    return { x: points[0][0], y: points[0][1] };
  }
  window.createWorldSimulation = function ({ routesLayer, transportLayer, weatherLayer, onArrival }) {
    injectStyles();
    const transport = routeDefinitions.map(definition => {
      const path = createRoute(definition);
      routesLayer.append(path);
      const marker = document.createElement('div');
      marker.className = `transport-marker ${definition.kind}`;
      marker.setAttribute('role', 'img');
      marker.setAttribute('aria-label', `${definition.name} — условный маршрут кампании`);
      marker.title = `${definition.name} · Условный маршрут кампании`;
      marker.innerHTML = icons[definition.kind];
      transportLayer.append(marker);
      return { definition, marker, path, lastLeg: null };
    });
    const zones = new Map();
    let lastWeatherSignature = '';
    function updateWeather(events) {
      const signature = JSON.stringify(events);
      if (signature === lastWeatherSignature) return;
      lastWeatherSignature = signature;
      const active = new Set(events.map(event => String(event.id)));
      for (const [id, zone] of zones) {
        if (!active.has(id)) { zone.remove(); zones.delete(id); }
      }
      events.forEach(event => {
        const id = String(event.id);
        let zone = zones.get(id);
        const intensity = ['light', 'heavy'].includes(event.intensity) ? event.intensity : 'medium';
        if (!zone) {
          zone = document.createElement('div');
          zone.className = 'weather-zone';
          zone.dataset.eventId = id;
          for (let i = 0; i < 54; i++) {
            const streak = document.createElement('i');
            streak.className = 'rain-streak';
            streak.style.left = `${8 + ((i * 31) % 84)}%`;
            streak.style.top = `${12 + ((i * 19) % 63)}%`;
            streak.style.animationDelay = `${-(i * .127) % 1.3}s`;
            streak.style.animationDuration = `${.6 + (i % 5) * .09}s`;
            zone.append(streak);
          }
          const caption = document.createElement('span');
          caption.className = 'weather-caption';
          zone.append(caption);
          weatherLayer.append(zone);
          zones.set(id, zone);
        }
        const radius = Math.max(1, Number(event.radius) || 8);
        zone.style.left = `${event.x}%`;
        zone.style.top = `${event.y}%`;
        zone.style.width = `${radius * 2}%`;
        zone.style.height = `${radius * 2 * 1000 / 514}%`;
        zone.dataset.intensity = intensity;
        zone.style.opacity = intensity === 'light' ? '.65' : '1';
        zone.style.background = intensity === 'heavy'
          ? 'radial-gradient(ellipse,#37576f70 0%,#4d728b48 45%,transparent 71%)'
          : intensity === 'light'
            ? 'radial-gradient(ellipse,#7a9baa25 0%,#7a9baa12 45%,transparent 71%)'
            : 'radial-gradient(ellipse,#56768d35 0%,#62889820 45%,transparent 71%)';
        const streakCount = intensity === 'heavy' ? 54 : intensity === 'light' ? 16 : 34;
        const baseDuration = intensity === 'heavy' ? .35 : intensity === 'light' ? 1.15 : .6;
        zone.querySelectorAll('.rain-streak').forEach((streak, i) => {
          streak.style.display = i < streakCount ? '' : 'none';
          streak.style.animationDuration = `${baseDuration + (i % 5) * .09}s`;
          streak.style.height = intensity === 'heavy' ? '17%' : intensity === 'light' ? '8%' : '12%';
        });
        zone.title = event.name || 'Дождь';
        zone.querySelector('.weather-caption').textContent = `☂ ${event.name || 'Дождь'}`;
      });
    }
    return {
      update({ minutes = 0, ships = true, trains = true, events = [] } = {}) {
        const time = Number.isFinite(minutes) ? minutes : 0;
        transport.forEach(item => {
          const { definition, marker, path } = item;
          const enabled = definition.kind === 'ship' ? ships : trains;
          marker.hidden = !enabled;
          path.toggleAttribute('hidden', !enabled);
          if (!enabled) return;
          const elapsed = time + definition.offset;
          const leg = Math.floor(elapsed / definition.period);
          const part = ((elapsed % definition.period) + definition.period) % definition.period / definition.period;
          const progress = ((leg % 2) + 2) % 2 ? 1 - part : part;
          const position = sample(definition.points, progress);
          marker.style.left = `${position.x}%`;
          marker.style.top = `${position.y}%`;
          marker.dataset.route = definition.id;
          if (item.lastLeg !== null && item.lastLeg !== leg && Math.abs(leg - item.lastLeg) === 1 && typeof onArrival === 'function') {
            onArrival({ id: definition.id, name: definition.name, kind: definition.kind });
          }
          item.lastLeg = leg;
        });
        updateWeather(Array.isArray(events) ? events : []);
      },
      destroy() {
        transport.forEach(item => { item.marker.remove(); item.path.remove(); });
        zones.forEach(zone => zone.remove());
        zones.clear();
      }
    };
  };
})();
