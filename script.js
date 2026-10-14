/* ==========================================================================
   A2Z - 메인 스크립트 (안정성 강화)
   ========================================================================== */

const COLOR_FOOD = '#FFEA00';
const COLOR_PLAY = '#1C94F5';
const COLOR_FASHION = '#F65AC2';
const COLOR_BLACK = '#1C1C20';
const COLOR_WHITE = '#FEFEFE';

const TREND_DATA = {
  FOOD: {
    title: '먹거리',
    color: COLOR_FOOD,
    desc: '맛있는 음식으로 세대 간의 취향을 넘나드는 즐거운 먹거리 트렌드',
    items: [
      {
        id: 'tomato_maratang',
        title: '토마토 마라탕',
        emoji: '🍅',
        desc: '얼큰하고 알싸한 마라탕 베이스에 상큼하고 부드러운 토마토를 더해 매운맛을 달콤하게 완화한 트렌드 요리입니다. 매운 것을 잘 못 드시는 온 가족이 함께 부담 없이 즐길 수 있는 맛입니다.',
        type: 'eat',
        foodName: '토마토 마라탕'
      },
      {
        id: 'pizza_seolgi',
        title: '피자 설기',
        emoji: '🍕',
        desc: '전통 백설기의 쫀득하고 담백한 식감 위에 고소한 치즈와 짭조름한 피자 토핑을 올려 현대적으로 재해석한 떡 요리입니다. 예스러운 떡의 친숙함과 피자의 색다른 맛을 함께 느낄 수 있습니다.',
        type: 'eat',
        foodName: '피자 설기'
      },
      {
        id: 'ramen_dry',
        title: '라면 말려먹기',
        emoji: '🍜',
        desc: '조금 짜고 진하게 끓인 국물 라면에서 면발만 접시에 건져내어 잠시 식혀두는 유행입니다. 면이 조금 건조해지면서 한층 뻑뻑하고 꼬들꼬들해진 특유의 감칠맛 식감을 직접 느껴보세요.',
        type: 'eat',
        foodName: '꼬들한 말린 라면'
      }
    ]
  },
  PLAY: {
    title: '놀거리',
    color: COLOR_PLAY,
    desc: '함께 웃고 체험하며 감성을 공유하는 세대 공감 놀거리 트렌드',
    items: [
      {
        id: 'squishy',
        title: '말랑이',
        emoji: '🐾',
        desc: '손으로 꾹꾹 누르면 부드럽게 모양이 변했다가 되돌아오는 촉감 토이입니다. 손끝에 전해지는 푹신한 자극이 일상의 스트레스를 해소해 주어 마음을 편안하게 만들어 줍니다.',
        type: 'squishy'
      },
      {
        id: 'chiikawa_clicker',
        title: '먼작귀 클리커',
        emoji: '🐥',
        desc: '귀엽고 소중한 캐릭터를 화면에서 마음껏 터치하며 하트를 모으는 클리커 게임입니다. 단순하고 직관적인 조작으로 누구나 부담 없이 즐기며 소소한 재미를 느낄 수 있습니다.',
        type: 'clicker'
      },
      {
        id: 'mejirushi',
        title: '메지루시',
        emoji: '☂️',
        desc: '자신의 우산 손잡이나 가방에 아크릴 참과 링을 달아 내 물건임을 쉽게 표시하는 참 트렌드입니다. 나만의 개성을 담아 소중한 소지품을 정성스럽게 연출해 보세요.',
        type: 'mejirushi'
      }
    ]
  },
  FASHION: {
    title: '패션',
    color: COLOR_FASHION,
    desc: '옛 멋과 요즘 감성이 오묘하게 어우러지는 세대 통합 패션 트렌드',
    items: [
      {
        id: 'dongmyo',
        title: '동묘 쇼핑',
        emoji: '🛍️',
        desc: '레트로한 분위기와 세월의 흔적이 담긴 보물을 탐색할 수 있는 동묘 거리 쇼핑입니다. 아날로그 감성의 빈티지 의류와 소품을 찾아보며 나만의 멋을 완성해 보세요.',
        type: 'dongmyo'
      },
      {
        id: 'jade_style',
        title: '옥 스타일링',
        emoji: '💍',
        desc: '단아한 분위기의 은은한 옥(Jade) 장신구를 모던한 자켓이나 캐주얼한 옷차림에 세련되게 매치하는 스타일입니다. 클래식함이 가장 감각적인 포인트를 연출해 줍니다.',
        type: 'jade'
      },
      {
        id: 'jelly_shoes',
        title: '젤리슈즈 꾸미기',
        emoji: '👡',
        desc: '말랑한 젤리 슈즈의 구멍에 아기자기한 파츠를 꽂아 나만의 신발을 완성하는 DIY 패션입니다. 알록달록한 재미와 개성을 살려 가볍게 연출해 보세요.',
        type: 'jelly'
      },
      {
        id: 'pen_decor',
        title: '볼펜 꾸미기',
        emoji: '🖊️',
        desc: '매일 사용하는 볼펜 상단에 구슬과 캐릭터 참을 조합하여 개성 있는 문구를 만드는 유행입니다. 일상 속 소소한 아이템에 특별함을 더해줍니다.',
        type: 'pen'
      }
    ]
  }
};

let currentCategory = null;

document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  setupEventListeners();
  showMainScreen();
});

function setupEventListeners() {
  document.getElementById('logo-btn').addEventListener('click', showMainScreen);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catKey = e.target.getAttribute('data-category');
      showCategoryScreen(catKey);
    });
  });

  document.getElementById('back-to-cat-btn').addEventListener('click', () => {
    if (currentCategory) {
      showCategoryScreen(currentCategory);
    } else {
      showMainScreen();
    }
  });
}

function showMainScreen() {
  switchScreen(document.getElementById('main-screen'));
  document.getElementById('nav-tabs').classList.add('hidden');
  currentCategory = null;
}

function showCategoryScreen(catKey) {
  currentCategory = catKey;
  const data = TREND_DATA[catKey];
  
  switchScreen(document.getElementById('category-screen'));
  document.getElementById('nav-tabs').classList.remove('hidden');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === catKey);
  });

  const titleEl = document.getElementById('category-title');
  titleEl.textContent = data.title;
  titleEl.style.color = data.color === COLOR_FOOD ? '#D4B800' : data.color;
  document.getElementById('category-desc').textContent = data.desc;

  const gridEl = document.getElementById('trend-cards-grid');
  gridEl.innerHTML = '';

  data.items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'trend-card';
    card.innerHTML = `
      <div class="card-thumb-wrapper">
        <span class="card-thumb-graphic">${item.emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-category-tag" style="background:${data.color}; color:${catKey==='FOOD'?COLOR_BLACK:COLOR_WHITE}">${data.title}</span>
        <h3 class="card-title">${item.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => showDetailScreen(catKey, item));
    gridEl.appendChild(card);
  });
}

function showDetailScreen(catKey, item) {
  switchScreen(document.getElementById('detail-screen'));

  const catData = TREND_DATA[catKey];
  const badgeEl = document.getElementById('detail-badge');
  badgeEl.textContent = catData.title;
  badgeEl.style.backgroundColor = catData.color;
  badgeEl.style.color = catKey === 'FOOD' ? COLOR_BLACK : COLOR_WHITE;

  document.getElementById('detail-title').textContent = item.title;
  document.getElementById('detail-description').innerHTML = `
    <p>${item.desc}</p>
    <p>A2Z는 이 트렌드를 통해 서로 다른 일상의 감성이 하나로 연결되기를 기대합니다. 아래에서 직접 만지고 체험해 보세요!</p>
  `;

  buildInteractionStage(item);
}

function switchScreen(targetScreen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  targetScreen.classList.add('active');
  window.scrollTo(0, 0);
}

// --------------------------------------------------------------------------
// Three.js 3D 공간 연출
// --------------------------------------------------------------------------
let scene, camera, renderer, objects = [];

function initThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xE1E5EA);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 11);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(5, 12, 7);
  scene.add(dirLight);

  const gridHelper = new THREE.GridHelper(30, 20, 0x1C1C20, 0xB0B8C4);
  gridHelper.position.y = -2;
  scene.add(gridHelper);

  // 먹거리 (Cylinder)
  const foodGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.2, 32);
  const foodMat = new THREE.MeshStandardMaterial({ color: 0xFFEA00, roughness: 0.3 });
  const foodObj = new THREE.Mesh(foodGeo, foodMat);
  foodObj.position.set(-3.6, 0.2, 0);
  foodObj.userData = { category: 'FOOD' };
  scene.add(foodObj);
  objects.push(foodObj);

  // 놀거리 (Icosahedron)
  const playGeo = new THREE.IcosahedronGeometry(1.4, 2);
  const playMat = new THREE.MeshStandardMaterial({ color: 0x1C94F5, roughness: 0.2 });
  const playObj = new THREE.Mesh(playGeo, playMat);
  playObj.position.set(0, 0.2, 0);
  playObj.userData = { category: 'PLAY' };
  scene.add(playObj);
  objects.push(playObj);

  // 패션 (Octahedron)
  const fashionGeo = new THREE.OctahedronGeometry(1.5, 0);
  const fashionMat = new THREE.MeshStandardMaterial({ color: 0xF65AC2, roughness: 0.2 });
  const fashionObj = new THREE.Mesh(fashionGeo, fashionMat);
  fashionObj.position.set(3.6, 0.2, 0);
  fashionObj.userData = { category: 'FASHION' };
  scene.add(fashionObj);
  objects.push(fashionObj);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('click', (e) => {
    const mainScreen = document.getElementById('main-screen');
    if (!mainScreen.classList.contains('active')) return;

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      showCategoryScreen(intersects[0].object.userData.category);
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0015;
    objects.forEach((obj, idx) => {
      obj.rotation.y += 0.01;
      obj.position.y = Math.sin(time + idx * 2) * 0.2 + 0.2;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// --------------------------------------------------------------------------
// 인터랙션 구현부
// --------------------------------------------------------------------------
function buildInteractionStage(item) {
  const stage = document.getElementById('interactive-container');
  stage.innerHTML = '';

  switch (item.type) {
    case 'eat': renderEating(stage, item.foodName, item.emoji); break;
    case 'squishy': renderSquishy(stage); break;
    case 'clicker': renderClicker(stage); break;
    case 'mejirushi': renderMejirushi(stage); break;
    case 'dongmyo': renderDongmyo(stage); break;
    case 'jade': renderJade(stage); break;
    case 'jelly': renderJelly(stage); break;
    case 'pen': renderPen(stage); break;
  }
}

function renderEating(container, foodName, emoji) {
  let bites = 0;
  const maxBites = 5;

  container.innerHTML = `
    <div class="eating-container">
      <div class="food-plate" id="plate-btn">
        <span id="food-emoji" style="transition: transform 0.2s">${emoji}</span>
      </div>
      <p style="font-weight:700; font-size:16px; margin-bottom:12px;" id="eat-status">클릭하여 ${foodName} 한 입 먹기!</p>
      <button class="action-btn" id="refill-btn">새로 가져오기 🔄</button>
    </div>
  `;

  const plate = container.querySelector('#plate-btn');
  const foodEmoji = container.querySelector('#food-emoji');
  const status = container.querySelector('#eat-status');

  plate.addEventListener('click', (e) => {
    if (bites < maxBites) {
      bites++;
      foodEmoji.style.transform = `scale(${1 - bites * 0.18})`;
      
      const effect = document.createElement('span');
      effect.className = 'bite-effect';
      effect.textContent = '얌얌! 😋';
      effect.style.left = `${e.offsetX}px`;
      effect.style.top = `${e.offsetY}px`;
      plate.appendChild(effect);
      setTimeout(() => effect.remove(), 600);

      if (bites === maxBites) {
        status.textContent = `맛있게 다 먹었습니다! 🍽️`;
        foodEmoji.style.opacity = '0.1';
      } else {
        status.textContent = `${foodName} ${bites}입 먹는 중... (남은 양: ${maxBites - bites}입)`;
      }
    }
  });

  container.querySelector('#refill-btn').addEventListener('click', () => {
    bites = 0;
    foodEmoji.style.transform = 'scale(1)';
    foodEmoji.style.opacity = '1';
    status.textContent = `클릭하여 ${foodName} 한 입 먹기!`;
  });
}

function renderSquishy(container) {
  const squishies = [
    { name: '냥발', emoji: '🐾', bg: '#FFD6E0' },
    { name: '복숭아', emoji: '🍑', bg: '#FFECEF' },
    { name: '곰돌이', emoji: '🧸', bg: '#E2ECE9' }
  ];

  container.innerHTML = `
    <div class="squishy-wrapper">
      <div class="squishy-selector">
        ${squishies.map((s, i) => `<button class="squishy-type-btn ${i===0?'active':''}" data-idx="${i}">${s.name}</button>`).join('')}
      </div>
      <div class="squishy-main-obj" id="squishy-obj" style="background:${squishies[0].bg}">
        <span>${squishies[0].emoji}</span>
      </div>
      <p style="font-weight:700">말랑이를 꾹 눌렀다 떼어보세요!</p>
    </div>
  `;

  const obj = container.querySelector('#squishy-obj');
  const btns = container.querySelectorAll('.squishy-type-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const item = squishies[e.target.dataset.idx];
      obj.style.background = item.bg;
      obj.querySelector('span').textContent = item.emoji;
    });
  });

  obj.addEventListener('mousedown', () => { obj.style.transform = 'scale(0.7) rotate(-5deg)'; });
  obj.addEventListener('mouseup', () => { obj.style.transform = 'scale(1) rotate(0deg)'; });
}

function renderClicker(container) {
  let score = 0;
  container.innerHTML = `
    <div class="clicker-box">
      <div class="clicker-score" id="score-text">0 HEARTS</div>
      <div class="clicker-target" id="click-target">🐥</div>
      <p style="font-weight:700; margin-top:12px;">연속 클릭하여 하트를 모아보세요!</p>
    </div>
  `;

  const scoreText = container.querySelector('#score-text');
  const target = container.querySelector('#click-target');

  target.addEventListener('click', (e) => {
    score += 10;
    scoreText.textContent = `${score} HEARTS`;
    
    const h = document.createElement('span');
    h.className = 'bite-effect';
    h.textContent = '💖 +10';
    h.style.left = `${e.offsetX}px`;
    h.style.top = `${e.offsetY}px`;
    target.appendChild(h);
    setTimeout(() => h.remove(), 500);
  });
}

function renderMejirushi(container) {
  container.innerHTML = `
    <div style="width:100%">
      <div class="mejirushi-workspace" id="mejirushi-stage">
        <div class="item-base-umbrella">☂️</div>
        <div class="draggable-charm" style="left:30%; top:40%;">🎀</div>
        <div class="draggable-charm" style="left:60%; top:30%;">⭐</div>
        <div class="draggable-charm" style="left:45%; top:60%;">🧸</div>
      </div>
      <p style="text-align:center; font-weight:700; margin-top:12px;">참을 드래그하여 우산 원하는 위치로 이동시켜 보세요!</p>
    </div>
  `;

  const stage = container.querySelector('#mejirushi-stage');
  const charms = container.querySelectorAll('.draggable-charm');

  charms.forEach(charm => {
    let active = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

    charm.addEventListener('mousedown', (e) => {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      if (e.target === charm) active = true;
    });

    stage.addEventListener('mousemove', (e) => {
      if (active) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        charm.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
    });

    window.addEventListener('mouseup', () => { active = false; });
  });
}

function renderDongmyo(container) {
  const cart = [];
  const items = [
    { name: '청자켓', price: 15000, icon: '🧥' },
    { name: '레트로 셔츠', price: 12000, icon: '👔' },
    { name: '빈티지 라디오', price: 25000, icon: '📻' },
    { name: '카세트 테이프', price: 5000, icon: '📼' }
  ];

  container.innerHTML = `
    <div class="dongmyo-wrapper">
      <div class="shop-items-grid" id="dongmyo-grid"></div>
      <div class="receipt-paper">
        <h4 style="text-align:center; border-bottom:1px dashed #000; padding-bottom:8px;">[ 동묘 영수증 ]</h4>
        <div id="receipt-list" style="margin:12px 0;">장바구니가 비어 있습니다.</div>
        <div style="border-top:1px dashed #000; padding-top:8px; font-weight:bold;" id="receipt-total">합계: 0원</div>
      </div>
    </div>
  `;

  const grid = container.querySelector('#dongmyo-grid');
  const list = container.querySelector('#receipt-list');
  const total = container.querySelector('#receipt-total');

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'shop-item-card';
    card.innerHTML = `<div style="font-size:32px">${item.icon}</div><b>${item.name}</b><div>${item.price.toLocaleString()}원</div>`;
    card.addEventListener('click', () => {
      cart.push(item);
      list.innerHTML = cart.map(i => `<div>${i.name} - ${i.price.toLocaleString()}원</div>`).join('');
      total.textContent = `합계: ${cart.reduce((sum, i) => sum + i.price, 0).toLocaleString()}원`;
    });
    grid.appendChild(card);
  });
}

function renderJade(container) {
  container.innerHTML = `
    <div class="jade-coordi-wrapper">
      <div class="mannequin-display">
        <div id="outfit-layer" style="font-size:70px;">🧥</div>
        <div id="jade-layer" style="font-size:40px; position:absolute; top:20px;">💍</div>
      </div>
      <div class="coordi-controls">
        <h4>의류 선택</h4>
        <button class="action-btn" id="btn-jacket">블레이저 자켓</button>
        <button class="action-btn" id="btn-tshirt">캐주얼 티셔츠</button>
        <h4 style="margin-top:12px;">옥 포인트</h4>
        <button class="action-btn" style="background:var(--color-fashion)" id="btn-ring">옥 반지</button>
        <button class="action-btn" style="background:var(--color-fashion)" id="btn-necklace">옥 목걸이</button>
      </div>
    </div>
  `;

  container.querySelector('#btn-jacket').addEventListener('click', () => container.querySelector('#outfit-layer').textContent = '🧥');
  container.querySelector('#btn-tshirt').addEventListener('click', () => container.querySelector('#outfit-layer').textContent = '👕');
  container.querySelector('#btn-ring').addEventListener('click', () => container.querySelector('#jade-layer').textContent = '💍');
  container.querySelector('#btn-necklace').addEventListener('click', () => container.querySelector('#jade-layer').textContent = '📿');
}

function renderJelly(container) {
  container.innerHTML = `
    <div class="decor-workspace">
      <div class="decor-canvas">
        <span>👡</span>
        <div id="jelly-box" style="position:absolute; display:flex; gap:6px;"></div>
      </div>
      <div class="charm-palette">
        <button class="charm-btn">🌸</button>
        <button class="charm-btn">⭐</button>
        <button class="charm-btn">🍒</button>
      </div>
      <p style="font-weight:700">파츠를 선택해 젤리 슈즈에 달아보세요!</p>
    </div>
  `;

  const box = container.querySelector('#jelly-box');
  container.querySelectorAll('.charm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = document.createElement('span');
      span.textContent = btn.textContent;
      box.appendChild(span);
    });
  });
}

function renderPen(container) {
  container.innerHTML = `
    <div class="decor-workspace">
      <div class="decor-canvas">
        <span>🖊️</span>
        <div id="pen-box" style="position:absolute; top:20px; display:flex; flex-direction:column; gap:4px;"></div>
      </div>
      <div class="charm-palette">
        <button class="charm-btn">🔮</button>
        <button class="charm-btn">🎀</button>
        <button class="charm-btn">🐣</button>
      </div>
      <p style="font-weight:700">볼펜 상단에 장식 참을 추가해 보세요!</p>
    </div>
  `;

  const box = container.querySelector('#pen-box');
  container.querySelectorAll('.charm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = document.createElement('span');
      span.textContent = btn.textContent;
      box.appendChild(span);
    });
  });
}
