'use strict';
const places = [
  {id:'backlund',name:'Бэклунд',type:'city',region:'Королевство Лоэн',x:52.7,y:30.2,description:'Столица королевства Лоэн, известная как Столица столиц. За её фабриками, туманными улицами и аристократическими кварталами скрывается мир Потусторонних.'},
  {id:'tingen',name:'Тинген',type:'city',region:'Королевство Лоэн',x:51.7,y:26.5,description:'Университетский город королевства Лоэн. Здесь начинается история Клейна Моретти и его знакомство с Ночными ястребами.'},
  {id:'trier',name:'Трир',type:'city',region:'Республика Интис',x:44.8,y:26.8,description:'Столица республики Интис — город искусства, моды и интриг, тесно связанный с наследием императора Розелля.'},
  {id:'north',name:'Северный континент',type:'region',region:'Земли королевств',x:43,y:18,description:'Земли Лоэна, Интиса, Фейсака и Фенепоттера. Центр промышленности, церквей и политических противоречий Пятой эпохи.'},
  {id:'south',name:'Южный континент',type:'region',region:'За морем Берсерка',x:57,y:59,description:'Континент древних традиций и наследия империи Балам, отделённый от севера опасными морскими путями.'},
  {id:'forsaken',name:'Забытая земля богов',type:'region',region:'За морем Руин',x:81,y:33,description:'Таинственные земли, погружённые во тьму после древней катастрофы. Здесь находится Город Серебра.'}
];
const $ = selector => document.querySelector(selector);
const viewport = $('#viewport'), world = $('#world');
const STORAGE_KEY = 'lotm-living-atlas-v1';
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const finite = value => typeof value === 'number' && Number.isFinite(value);
const id = () => typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const state = {minutes:540,running:true,speed:1,ships:true,trains:true,players:[],events:[],journal:[]};
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved && saved.version === 1) {
    if (finite(saved.minutes) && saved.minutes >= 0) state.minutes = saved.minutes;
    if ([1,5,15].includes(saved.speed)) state.speed = saved.speed;
    for (const key of ['running','ships','trains']) if (typeof saved[key] === 'boolean') state[key] = saved[key];
    const validPoint = p => p && typeof p.id === 'string' && typeof p.name === 'string' && p.name.trim() && finite(p.x) && finite(p.y) && p.x >= 0 && p.x <= 100 && p.y >= 0 && p.y <= 100;
    state.players = (Array.isArray(saved.players) ? saved.players : []).filter(p => validPoint(p) && /^#[a-f\d]{6}$/i.test(p.color)).slice(0,30).map(p => ({id:p.id,name:p.name.slice(0,40),color:p.color,x:p.x,y:p.y}));
    state.events = (Array.isArray(saved.events) ? saved.events : []).filter(e => validPoint(e) && finite(e.radius) && ['light','medium','heavy'].includes(e.intensity) && (e.endsAt === null || finite(e.endsAt) && e.endsAt > state.minutes)).slice(0,30).map(e => ({id:e.id,name:e.name.slice(0,60),x:e.x,y:e.y,radius:clamp(e.radius,3,20),intensity:e.intensity,endsAt:e.endsAt}));
    state.journal = (Array.isArray(saved.journal) ? saved.journal : []).filter(e => e && typeof e.text === 'string' && finite(e.minutes)).slice(0,12).map(e => ({text:e.text.slice(0,180),minutes:e.minutes}));
  }
} catch { storageAvailable = false; }
let filter='all', selectedPlace=null, selectedPlayer=null, scale=1, dx=0, dy=0, mode=null, mapDrag=null, toastTimer;
function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function button(text, className, action, label) {
  const el = node('button',className,text);
  el.type = 'button'; el.onclick = action;
  if (label) el.setAttribute('aria-label',label);
  return el;
}
function save() {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,...state})); storageAvailable = true; }
  catch { storageAvailable = false; }
  $('#save-status').textContent = storageAvailable ? 'Сохранено в этом браузере' : 'Хранилище недоступно — изменения до перезагрузки';
}
function toast(text) {
  $('#toast').textContent=text; $('#toast').classList.add('visible');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4000);
}
function timeText(minutes) {
  const minute=Math.floor(minutes % 1440);
  return `${String(Math.floor(minute/60)).padStart(2,'0')}:${String(minute%60).padStart(2,'0')}`;
}
function addLog(text) {
  state.journal.unshift({text,minutes:state.minutes}); state.journal=state.journal.slice(0,12); renderJournal();
}
function renderJournal() {
  $('#journal').replaceChildren(...state.journal.map(entry=>{
    const li=node('li');li.append(node('span','journal-time',`Д${Math.floor(entry.minutes/1440)+1} · ${timeText(entry.minutes)}`),node('span','',entry.text));return li;
  }));
  if (!state.journal.length) $('#journal').append(node('li','empty-state','Здесь появится история путешествия.'));
}
function setTab(tab) {
  document.querySelectorAll('[data-tab]').forEach(b=>{const active=b.dataset.tab===tab;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.tab-panel').forEach(p=>p.hidden=p.id!==`tab-${tab}`);
}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
function setMode(next) {
  mode=next; $('#placement-banner').hidden=!mode; viewport.classList.toggle('placing',Boolean(mode));
  if (!mode) return;
  closeDetail();
  $('#placement-text').textContent=mode.type==='add-player' ? `Кликните по карте: ${mode.name}` : mode.type==='move-player' ? `Новое место: ${mode.name}` : `Выберите центр дождя: ${mode.name}`;
  toast('Выберите место на карте. Esc — отмена.');
  if (window.innerWidth <= 800) viewport.scrollIntoView({block:'center',behavior:'smooth'});
}
$('#cancel-placement').onclick=()=>setMode(null);
function closeDetail() { $('#detail').hidden=true;selectedPlace=null;renderPlaces(); }
function renderPlaces() {
  const query=$('#search').value.trim().toLocaleLowerCase('ru');
  const visible=places.filter(p=>(filter==='all'||p.type===filter)&&(p.name+' '+p.region).toLocaleLowerCase('ru').includes(query));
  $('#count').textContent=String(visible.length).padStart(2,'0');$('#places').replaceChildren();$('#markers').replaceChildren();
  for(const p of visible){
    const row=button('',`place${selectedPlace===p.id?' selected':''}`,()=>selectPlace(p));
    const text=node('span');text.append(node('strong','',p.name),node('small','',p.region));row.append(node('span','icon',p.type==='city'?'♜':'◇'),text,node('span','arrow','↗'));$('#places').append(row);
    const marker=button('',`marker${selectedPlace===p.id?' selected':''}`,()=>{if(!mode)selectPlace(p);},p.name);
    marker.style.left=p.x+'%';marker.style.top=p.y+'%';marker.append(document.createTextNode(p.type==='city'?'·':'◇'),node('span','',p.name));
    marker.onpointerdown=e=>{if(!mode)e.stopPropagation();};$('#markers').append(marker);
  }
  if(!visible.length)$('#places').append(node('p','empty-state','Места не найдены. Попробуйте другой запрос.'));
}
function selectPlace(p) {
  selectedPlace=p.id;const panel=$('#detail');panel.hidden=false;panel.replaceChildren();
  panel.append(button('×','close-detail',closeDetail,'Закрыть карточку'),node('small','',`${p.type==='city'?'ГОРОД':'РЕГИОН'} / ${p.region}`),node('h3','',p.name),node('p','',p.description));renderPlaces();
}
function locate(x,y) {
  scale=Math.max(scale,1.6);const width=world.offsetWidth,height=world.offsetHeight;
  dx=(.5-x/100)*width*scale;dy=(.5-y/100)*height*scale;transform();
}
function selectPlayer(player, focus=false) {
  selectedPlayer=player.id;renderPlayers();if(focus)locate(player.x,player.y);
}
function renderPlayers() {
  $('#player-count').textContent=state.players.length;
  $('#players-list').replaceChildren();$('#players-layer').replaceChildren();
  if(!state.players.length)$('#players-list').append(node('div','empty-state','Пока никого. Добавьте первого игрока и выберите, где начнётся его история.'));
  for(const player of state.players){
    const card=node('div',`entity-card${selectedPlayer===player.id?' selected':''}`);card.style.setProperty('--player-color',player.color);
    const head=node('div','entity-head');const name=button(player.name,'entity-name',()=>selectPlayer(player,true),`Показать игрока ${player.name}`);head.append(node('span','entity-avatar',Array.from(player.name)[0].toUpperCase()),name);
    const actions=node('div','entity-actions');actions.append(button('↗ Переместить','move-button',()=>{selectPlayer(player);setMode({type:'move-player',id:player.id,name:player.name});}),button('Удалить','danger',()=>{
      state.players=state.players.filter(p=>p.id!==player.id);if(mode?.id===player.id)setMode(null);if(selectedPlayer===player.id)selectedPlayer=null;addLog(`${player.name}: отметка удалена`);renderPlayers();save();
    },`Удалить игрока ${player.name}`));card.append(head,node('div','entity-meta',`Позиция на карте · ${player.x.toFixed(1)} / ${player.y.toFixed(1)}`),actions);$('#players-list').append(card);
    const marker=button('','player-marker'+(selectedPlayer===player.id?' selected':''),()=>{if(!mode)selectPlayer(player);},`Игрок ${player.name}. Перетащите или используйте стрелки`);
    marker.style.setProperty('--player-color',player.color);marker.style.left=player.x+'%';marker.style.top=player.y+'%';marker.dataset.playerId=player.id;marker.append(node('span','player-dot',Array.from(player.name)[0].toUpperCase()),node('span','player-label',player.name));
    let drag=null;
    marker.onpointerdown=e=>{
      if(mode)return;e.stopPropagation();if(e.button!==0)return;
      drag={startX:e.clientX,startY:e.clientY,x:player.x,y:player.y,moved:false};marker.setPointerCapture(e.pointerId);marker.classList.add('dragging');
    };
    marker.onpointermove=e=>{
      if(!drag)return;
      if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>4)drag.moved=true;
      if(!drag.moved)return;
      const rect=world.getBoundingClientRect();player.x=clamp(drag.x+(e.clientX-drag.startX)/rect.width*100,1,99);player.y=clamp(drag.y+(e.clientY-drag.startY)/rect.height*100,1,99);
      marker.style.left=player.x+'%';marker.style.top=player.y+'%';
    };
    marker.onpointerup=e=>{
      if(!drag)return;e.stopPropagation();const moved=drag.moved;drag=null;
      if(moved){addLog(`${player.name}: новое место на карте`);save();toast(`${player.name}: положение сохранено`);}selectPlayer(player);
    };
    marker.onpointercancel=()=>{if(drag){player.x=drag.x;player.y=drag.y;drag=null;renderPlayers();}};
    marker.onkeydown=e=>{
      const direction={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!direction)return;e.preventDefault();
      player.x=clamp(player.x+direction[0]*(e.shiftKey?2:.5),1,99);player.y=clamp(player.y+direction[1]*(e.shiftKey?2:.5),1,99);selectedPlayer=player.id;renderPlayers();save();
      Array.from(document.querySelectorAll('[data-player-id]')).find(el=>el.dataset.playerId===player.id)?.focus();
    };
    $('#players-layer').append(marker);
  }
}
const intensityLabels={light:'Морось',medium:'Дождь',heavy:'Ливень'};
function remaining(event) {return event.endsAt===null?'Без ограничения':`Ещё ${Math.max(1,Math.ceil(event.endsAt-state.minutes))} игровых мин.`;}
function renderEvents() {
  $('#event-count').textContent=state.events.length;$('#events-list').replaceChildren();
  if(!state.events.length)$('#events-list').append(node('div','empty-state','Небо ясное. Создайте дождь в любой точке мира.'));
  for(const event of state.events){
    const card=node('div','entity-card weather-card');const head=node('div','entity-head');head.append(node('span','entity-avatar','☂'),button(event.name,'entity-name',()=>locate(event.x,event.y),`Показать событие ${event.name}`));
    const meta=node('div','entity-meta',`${intensityLabels[event.intensity]} · ${remaining(event)}`);meta.dataset.remaining=event.id;
    const actions=node('div','entity-actions');actions.append(button('↗ Переместить','move-button',()=>setMode({type:'move-event',id:event.id,name:event.name})),button('Завершить','danger',()=>endEvent(event.id),`Завершить событие ${event.name}`));card.append(head,meta,actions);$('#events-list').append(card);
  }
}
function endEvent(eventId,expired=false) {
  const event=state.events.find(e=>e.id===eventId);if(!event)return;
  state.events=state.events.filter(e=>e.id!==eventId);if(mode?.id===eventId)setMode(null);
  addLog(`${event.name}: ${expired?'дождь закончился':'событие завершено'}`);renderEvents();updateWorld();save();toast(`${event.name}: дождь закончился`);
}
$('#player-form').onsubmit=e=>{
  e.preventDefault();const name=$('#player-name').value.trim();if(!name){$('#player-name').focus();return;}
  if(state.players.length>=30){toast('На карте уже 30 игроков. Удалите ненужную отметку.');return;}
  setMode({type:'add-player',name,color:$('#player-color').value});
};
$('#event-form').onsubmit=e=>{
  e.preventDefault();const name=$('#event-name').value.trim();if(!name){$('#event-name').focus();return;}
  if(state.events.length>=30){toast('На карте уже 30 событий. Завершите одно из них.');return;}
  setMode({type:'add-event',name,radius:Number($('#rain-radius').value),intensity:$('#rain-intensity').value,duration:Number($('#rain-duration').value)});
};
$('#rain-radius').oninput=()=>$('#radius-value').textContent=$('#rain-radius').value+'%';
function placeAt(clientX,clientY) {
  const rect=world.getBoundingClientRect(),x=(clientX-rect.left)/rect.width*100,y=(clientY-rect.top)/rect.height*100;
  if(x<1||x>99||y<1||y>99){toast('Выберите точку внутри изображения карты.');return;}
  const current=mode;setMode(null);
  if(current.type==='add-player'){
    const player={id:id(),name:current.name,color:current.color,x,y};state.players.push(player);selectedPlayer=player.id;$('#player-name').value='';addLog(`${player.name}: начало путешествия`);renderPlayers();toast(`${player.name} добавлен на карту`);
  }else if(current.type==='move-player'){
    const player=state.players.find(p=>p.id===current.id);if(player){player.x=x;player.y=y;selectedPlayer=player.id;addLog(`${player.name}: новое место на карте`);renderPlayers();toast(`${player.name}: положение сохранено`);}
  }else if(current.type==='move-event'){
    const event=state.events.find(e=>e.id===current.id);if(event){event.x=x;event.y=y;addLog(`${event.name}: зона дождя перемещена`);renderEvents();toast('Зона дождя перемещена');}
  }else{
    const event={id:id(),name:current.name,x,y,radius:current.radius,intensity:current.intensity,endsAt:current.duration?state.minutes+current.duration*60:null};state.events.push(event);addLog(`${event.name}: начался ${intensityLabels[event.intensity].toLowerCase()}`);renderEvents();toast('На карте начался дождь');
  }
  updateWorld();save();
}
function transform() {world.style.transform=`translate(${dx}px, calc(-50% + ${dy}px)) scale(${scale})`;$('#zoom-level').textContent=Math.round(scale*100)+'%';}
function zoom(factor) {scale=clamp(scale*factor,.75,5);transform();}
$('#plus').onclick=()=>zoom(1.25);$('#minus').onclick=()=>zoom(.8);
$('#reset').onclick=()=>{scale=1;dx=dy=0;closeDetail();transform();};
viewport.addEventListener('wheel',e=>{if(e.target.closest('#detail, #placement-banner'))return;e.preventDefault();zoom(e.deltaY<0?1.1:1/1.1);},{passive:false});
viewport.onpointerdown=e=>{
  if(e.button!==0)return;
  if(e.target.closest('#detail, .zoom, #placement-banner'))return;
  if(!mode && e.target.closest('button'))return;
  mapDrag={x:e.clientX,y:e.clientY,dx,dy,moved:false};viewport.setPointerCapture(e.pointerId);
};
viewport.onpointermove=e=>{
  if(!mapDrag)return;
  if(Math.hypot(e.clientX-mapDrag.x,e.clientY-mapDrag.y)>5)mapDrag.moved=true;
  if(mapDrag.moved){dx=mapDrag.dx+e.clientX-mapDrag.x;dy=mapDrag.dy+e.clientY-mapDrag.y;transform();}
};
viewport.onpointerup=e=>{if(!mapDrag)return;const click=!mapDrag.moved;mapDrag=null;if(click && mode)placeAt(e.clientX,e.clientY);};viewport.onpointercancel=()=>mapDrag=null;
$('#search').oninput=renderPlaces;
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderPlaces();});
document.addEventListener('keydown',e=>{
  if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();setTab('places');$('#search').focus();}
  if(e.key==='Escape'){setMode(null);closeDetail();}
});
const simulation=window.createWorldSimulation({routesLayer:$('#routes-layer'),transportLayer:$('#transport-layer'),weatherLayer:$('#weather-layer')});
let lastMinute=-1;
function updateWorld(force=false) {
  simulation.update({minutes:state.minutes,ships:state.ships,trains:state.trains,events:state.events});
  const minute=Math.floor(state.minutes);if(minute===lastMinute&&!force)return;lastMinute=minute;
  const hour=(state.minutes%1440)/60;
  const phase=hour>=7&&hour<18?'day':hour>=18&&hour<20?'dusk':hour>=5&&hour<7?'dawn':'night';
  const label={day:'День',night:'Ночь',dawn:'Рассвет',dusk:'Сумерки'}[phase];
  document.body.dataset.phase=phase;document.body.dataset.paused=String(!state.running);
  const darkness=hour>=7&&hour<18?0:hour>=18&&hour<20?(hour-18)/2*.6:hour>=5&&hour<7?(7-hour)/2*.6:.6;
  $('#night-overlay').style.opacity=darkness;
  $('#phase-icon').textContent=phase==='night'?'☾':'☀';$('#phase-label').textContent=`${label} · ${state.running?'мир в движении':'время на паузе'}`;
  $('#map-phase').textContent={day:'ДНЕВНОЙ СВЕТ',night:'ПОД АЛОЙ ЛУНОЙ',dawn:'ПЕРВЫЙ СВЕТ',dusk:'СУМЕРКИ'}[phase];
  $('#world-time').textContent=timeText(state.minutes);$('#world-day').textContent=`День ${Math.floor(state.minutes/1440)+1}`;
  $('#day').setAttribute('aria-pressed',String(phase==='day'||phase==='dawn'));$('#night').setAttribute('aria-pressed',String(phase==='night'||phase==='dusk'));
  $('#pause').textContent=state.running?'Ⅱ':'▶';$('#pause').setAttribute('aria-label',state.running?'Приостановить время':'Продолжить время');$('#pause').title=state.running?'Приостановить время':'Продолжить время';
  $('#clock-hint').textContent=`1 секунда = ${4*state.speed} игровых минут${state.running?'':' · пауза'}`;
  $('#speed').value=state.speed;$('#ships').checked=state.ships;$('#trains').checked=state.trains;
  for(const event of [...state.events]){
    if(event.endsAt!==null&&event.endsAt<=state.minutes){endEvent(event.id,true);continue;}
    const el=Array.from(document.querySelectorAll('[data-remaining]')).find(n=>n.dataset.remaining===event.id);if(el)el.textContent=`${intensityLabels[event.intensity]} · ${remaining(event)}`;
  }
}
function jumpTime(hour) {
  const currentHour = (state.minutes % 1440) / 60;
  if ((hour === 9 && currentHour >= 7 && currentHour < 18) || (hour === 22 && (currentHour >= 20 || currentHour < 5))) return;
  const target=Math.floor(state.minutes/1440)*1440+hour*60;
  // Jumps always move forward so event durations and the day counter stay coherent.
  state.minutes=target<state.minutes?target+1440:target;
  addLog(hour===9?'Наступил день':'Наступила ночь');updateWorld(true);save();
}
$('#day').onclick=()=>jumpTime(9);$('#night').onclick=()=>jumpTime(22);
$('#pause').onclick=()=>{state.running=!state.running;updateWorld(true);save();};
$('#speed').onchange=()=>{state.speed=Number($('#speed').value);updateWorld(true);save();};
for(const kind of ['ships','trains'])$('#'+kind).onchange=()=>{state[kind]=$('#'+kind).checked;updateWorld(true);save();};
let lastTick=performance.now(),lastSave=lastTick;
function tick(now) {
  const elapsed=Math.min((now-lastTick)/1000,1);lastTick=now;
  if(state.running)state.minutes+=elapsed*4*state.speed;
  updateWorld();
  if(now-lastSave>5000){save();lastSave=now;}
  requestAnimationFrame(tick);
}
document.addEventListener('visibilitychange',()=>{lastTick=performance.now();if(document.hidden)save();});
window.addEventListener('pagehide',save);
renderPlaces();renderPlayers();renderEvents();renderJournal();transform();updateWorld(true);save();requestAnimationFrame(tick);
