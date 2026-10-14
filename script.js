/* ==========================================================================
   A2Z (에이투지) - 메인 스크립트
   ========================================================================== */

// 색상 상수 정의
const COLOR_FOOD = '#FFEA00';
const COLOR_PLAY = '#1C94F5';
const COLOR_FASHION = '#F65AC2';
const COLOR_BLACK = '#1C1C20';
const COLOR_WHITE = '#FEFEFE';
const COLOR_GRAY = '#E1E5EA';

// 트렌드 데이터베이스
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
        desc: '얼큰하고 알싸한 마라탕 베이스에 상큼하고 부드러운 토마토를 더해 매운맛을 달콤하게 완화한 트렌드 요리입니다. 매운 것을 잘 못 드시는 자녀나 부모님도 맛있게 즐길 수 있어 전 세대의 식탁에서 사랑받고 있습니다.',
        type: 'eat',
        foodName: '토마토 마라탕'
      },
      {
        id: 'pizza_seolgi',
        title: '피자 설기',
        emoji: '🍕',
        desc: '전통 백설기의 쫀득하고 담백한 식감 위에 고소한 치즈와 짭조름한 피자 토핑을 올려 현대적으로 재해석한 떡 요리입니다. 어르신들에게는 익숙한 떡의 친숙함을, 젊은 층에게는 피자의 색다른 맛을 동시에 선사합니다.',
        type: 'eat',
        foodName: '피자 설기'
      },
      {
        id: 'ramen_dry',
        title: '라면 말려먹기',
        emoji: '🍜',
        desc: '조금 짜고 진하게 끓인 국물 라면에서 면발만 접시에 건져내어 잠시 식혀두는 유행입니다. 면이 살짝 건조해지면서 한층 뻑뻑하고 꼬들꼬들해진 특유의 감칠맛 식감을 다 함께 경험해 보세요.',
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
        desc: '손으로 꾹꾹 누르면 부드럽게 모양이 변했다가 되돌아오는 촉감 토이입니다. 손끝에 전해지는 푹신한 자극이 일상의 스트레스를 해소해주어 청소년부터 어른들까지 마음을 편안하게 해주는 힐링 아이템입니다.',
        type: 'squishy'
      },
      {
        id: 'chiikawa_clicker',
        title: '먼작귀 클리커',
        emoji: '🐥',
        desc: '귀엽고 작아서 소중한 캐릭터를 화면에서 마음껏 터치하며 하트를 모으는 클리커 게임입니다. 단순한 조작으로 누구나 쉽게 즐길 수 있으며, 보는 것만으로도 미소를 자아냅니다.',
        type: 'clicker'
      },
      {
        id: 'mejirushi',
        title: '메지루시',
        emoji: '☂️',
        desc: '자신의 우산 손잡이나 가방에 톡톡 튀는 아크릴 참과 링을 달아 내 물건임을 쉽게 표시하는 표식 참 트렌드입니다. 나만의 개성을 정성스럽게 표현하고 소중한 소지품을 지켜보세요.',
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
        desc: '레트로한 분위기와 세월의 흔적이 담긴 보물을 찾을 수 있는 동묘 거리 쇼핑입니다. 부모님 세대의 추억이 담긴 빈티지 의류를 자녀 세대가 재해석하여 나만의 독특한 스타일을 만들어갑니다.',
        type: 'dongmyo'
      },
      {
        id: 'jade_style',
        title: '옥 스타일링',
        emoji: '💍',
        desc: '어르신들의 단아한 장신구로 여겨지던 은은한 옥(Jade)을 현대적인 모던 자켓이나 캐주얼한 옷차림에 세련되게 매치하는 스타일입니다. 예스러움이 가장 트렌디한 포인트를 완성해 줍니다.',
        type: 'jade'
      },
      {
        id: 'jelly_shoes',
        title: '젤리슈즈 꾸미기',
        emoji: '👡',
        desc: '말랑말랑한 젤리 슈즈의 구멍에 아기자기한 파츠와 스티커를 꽂아 나만의 신발을 만드는 DIY 패션입니다. 알록달록한 개성을 살려 여유로운 스타일을 완성해 보세요.',
        type: 'jelly'
      },
      {
        id: 'pen_decor',
        title: '볼펜 꾸미기',
        emoji: '🖊️',
        desc: '매일 사용하는 볼펜 상단에 구슬, 클립, 캐릭터 참을 조합하여 개성 있는 나만의 문구를 만드는 유행입니다. 소소한 일상 속 소품에 나만의 멋을 더해줍니다.',
        type: 'pen'
      }
    ]
  }
};

// 현재 애플리케이션 상태
let currentCategory = null;
let currentTrend = null;

// DOM 요소 참조
const navTabs = document.getElementById('nav-tabs');
const logoBtn = document.getElementById('logo-btn');
const mainScreen = document.getElementById('main-screen');
const categoryScreen = document.getElementById('category-screen');
const detailScreen = document.getElementById('detail-screen');

// --------------------------------------------------------------------------
// 초기화 및 화면 전환 로직
// --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  setupEventListeners();
  showMainScreen(); // 초기 진입은 메인 화면
});

function setupEventListeners() {
  // 로고 클릭 시 메인으로 이동
  logoBtn.addEventListener('click', showMainScreen);

  // 헤더 탭 클릭 이벤트
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catKey = e.target.getAttribute('data-category');
      showCategoryScreen(catKey);
    });
  });

  // 뒤로가기 버튼
  document.getElementById('back-to-cat-btn').addEventListener('click', () => {
    if (currentCategory) {
      showCategoryScreen(currentCategory);
    } else {
      showMainScreen();
    }
  });
}

// 1. 메인 화면 보이기 (오른쪽 상단 탭 숨김 처리 완료)
function showMainScreen() {
  switchScreen(mainScreen);
  navTabs.classList.add('hidden'); // 3. 메인화면에서는 탭 비활성화
  currentCategory = null;
}

// 2. 카테고리 상세 화면 보이기
function showCategoryScreen(catKey) {
  currentCategory = catKey;
  const data = TREND_DATA[catKey];
  
  switchScreen(categoryScreen);
  navTabs.classList.remove('hidden'); // 카테고리 진입 시 탭 노출

  // 탭 active 업데이트
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === catKey);
  });

  // 헤더 텍스트 설정
  const titleEl = document.getElementById('category-title');
  const descEl = document.getElementById('category-desc');
  titleEl.textContent = data.title;
  titleEl.style.color = data.color === COLOR_FOOD ? '#D4B800' : data.color;
  descEl.textContent = data.desc;

  // 카드 그리드 생성 (2. 호버 시 형태 변경 없이 유연한 상승 및 그림자 효과)
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

// 4. 세로 화면 구성의 트렌드 상세 화면 보이기
function showDetailScreen(catKey, item) {
  currentTrend = item;
  switchScreen(detailScreen);

  const catData = TREND_DATA[catKey];
  const badgeEl = document.getElementById('detail-badge');
  badgeEl.textContent = catData.title;
  badgeEl.style.backgroundColor = catData.color;
  badgeEl.style.color = catKey === 'FOOD' ? COLOR_BLACK : COLOR_WHITE;

  document.getElementById('detail-title').textContent = item.title;
  
  // 길어진 상세 설명 세팅 (모든 세대가 완벽히 공감할 수 있는 따뜻한 어조)
  document.getElementById('detail-description').innerHTML = `
    <p>${item.desc}</p>
    <p>A2Z는 이 트렌드를 통해 서로 다른 세대가 하나의 신선한 주제로 소통하며 한 걸음 더 가까워지기를 기대합니다. 아래의 인터랙션을 통해 유행을 즐겨보세요!</p>
  `;

  // 7. 각 트렌드별 고품질 인터랙션 빌드
  buildInteractionStage(item);
}

function switchScreen(targetScreen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  targetScreen.classList.add('active');
  window.scrollTo(0, 0);
}

// --------------------------------------------------------------------------
// 1. Three.js 3D 메인 공간 구축 (오브젝트 크기 확대 및 6. 흰색 탈피 배경 연출)
// --------------------------------------------------------------------------
let scene, camera, renderer, objects = [];

function initThreeJS() {
  const container = document.getElementById('canvas-container');
  
  scene = new THREE.Scene();
  // 연한 파스텔 그레이톤의 세련된 공간 배경
  scene.background = new THREE.Color(0xE1E5EA);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 11);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // 조명 설정
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 12, 7);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // 세련된 공간 그리드 바닥 연출
  const gridHelper = new THREE.GridHelper(30, 20, 0x1C1C20, 0xB0B8C4);
  gridHelper.position.y = -2;
  scene.add(gridHelper);

  // 1. 메인 화면 3D 오브젝트 크기를 확실히 키움 (기존 대비 1.5배 이상)
  // 먹거리 3D 오브젝트 (원통형 버거/도넛 형상)
  const foodGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.2, 32);
  const foodMat = new THREE.MeshStandardMaterial({ color: 0xFFEA00, roughness: 0.3, metalness: 0.1 });
  const foodObj = new THREE.Mesh(foodGeo, foodMat);
  foodObj.position.set(-3.6, 0.2, 0);
  foodObj.userData = { category: 'FOOD' };
  scene.add(foodObj);
  objects.push(foodObj);

  // 놀거리 3D 오브젝트 (구형 게임 콘솔/주사위 형상)
  const playGeo = new THREE.IcosahedronGeometry(1.4, 2);
  const playMat = new THREE.MeshStandardMaterial({ color: 0x1C94F5, roughness: 0.2, metalness: 0.2 });
  const playObj = new THREE.Mesh(playGeo, playMat);
  playObj.position.set(0, 0.2, 0);
  playObj.userData = { category: 'PLAY' };
  scene.add(playObj);
  objects.push(playObj);

  // 패션 3D 오브젝트 (다이아몬드/옷걸이 형태)
  const fashionGeo = new THREE.OctahedronGeometry(1.5, 0);
  const fashionMat = new THREE.MeshStandardMaterial({ color: 0xF65AC2, roughness: 0.2, metalness: 0.3 });
  const fashionObj = new THREE.Mesh(fashionGeo, fashionMat);
  fashionObj.position.set(3.6, 0.2, 0);
  fashionObj.userData = { category: 'FASHION' };
  scene.add(fashionObj);
  objects.push(fashionObj);

  // 레이캐스터를 이용한 3D 클릭 연동
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (e) => {
    if (!mainScreen.classList.contains('active')) return;
    
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      const selectedCategory = intersects[0].object.userData.category;
      showCategoryScreen(selectedCategory);
    }
  });

  // 애니메이션 루프
  function animate() {
    requestAnimationFrame(animate);
    
    // 오브젝트의 부드러운 회전 및 위아래 바운싱
    const time = Date.now() * 0.0015;
    objects.forEach((obj, idx) => {
      obj.rotation.y += 0.01;
      obj.rotation.x += 0.005;
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
// 7. 디테일 업그레이드된 인터랙션 구현부
// --------------------------------------------------------------------------
function buildInteractionStage(item) {
  const stage = document.getElementById('interactive-container');
  stage.innerHTML = '';

  switch (item.type) {
    case 'eat':
      renderEatingInteraction(stage, item.foodName, item.emoji);
      break;
    case 'squishy':
      renderSquishyInteraction(stage);
      break;
    case 'clicker':
      renderClickerInteraction(stage);
      break;
    case 'mejirushi':
      renderMejirushiInteraction(stage);
      break;
    case 'dongmyo':
      renderDongmyoInteraction(stage);
      break;
    case 'jade':
      renderJadeInteraction(stage);
      break;
    case 'jelly':
      renderJellyInteraction(stage);
      break;
    case 'pen':
      renderPenInteraction(stage);
      break;
    default:
      stage.innerHTML = `<p>체험 준비 중입니다.</p>`;
  }
}

// [먹기 인터랙션] 마라탕, 피자설기, 라면 말려먹기 (한 입씩 베어먹기)
function renderEatingInteraction(container, foodName, emoji) {
  let bites = 0;
  const maxBites = 5;

  const wrapper = document.createElement('div');
  wrapper.className = 'eating-container';
  wrapper.innerHTML = `
    <div class="food-plate" id="food-plate-target">
      <span id="food-emoji" style="transition: transform 0.2s">${emoji}</span>
    </div>
    <p style="font-weight:700; font-size:16px; margin-bottom:12px;" id="eat-status-text">
      클릭하여 ${foodName} 한 입 먹기!
    </p>
    <button class="action-btn" id="refill-btn">새로 가져오기 🔄</button>
  `;
  container.appendChild(wrapper);

  const plate = wrapper.querySelector('#food-plate-target');
  const foodEmoji = wrapper.querySelector('#food-emoji');
  const statusText = wrapper.querySelector('#eat-status-text');

  plate.addEventListener('click', (e) => {
    if (bites < maxBites) {
      bites++;
      const scale = 1 - bites * 0.18;
      foodEmoji.style.transform = `scale(${scale})`;
      
      // 베어먹은 이펙트
      const effect = document.createElement('span');
      effect.className = 'bite-effect';
      effect.textContent = '얌얌! 😋';
      effect.style.left = `${e.offsetX}px`;
      effect.style.top = `${e.offsetY}px`;
      plate.appendChild(effect);
      setTimeout(() => effect.remove(), 600);

      if (bites === maxBites) {
        statusText.textContent = `맛있게 다 먹었습니다! 싹 비워진 접시 🍽️`;
        foodEmoji.style.opacity = '0.1';
      } else {
        statusText.textContent = `${foodName} ${bites}입 먹는 중... (남은 양: ${maxBites - bites}입)`;
      }
    }
  });

  wrapper.querySelector('#refill-btn').addEventListener('click', () => {
    bites = 0;
    foodEmoji.style.transform = 'scale(1)';
    foodEmoji.style.opacity = '1';
    statusText.textContent = `클릭하여 ${foodName} 한 입 먹기!`;
  });
}

// [말랑이 인터랙션] 여러 종류별 누르기
function renderSquishyInteraction(container) {
  const squishies = [
    { name: '냥발 말랑이', emoji: '🐾', bg: '#FFD6E0' },
    { name: '복숭아 말랑이', emoji: '🍑', bg: '#FFECEF' },
    { name: '곰돌이 말랑이', emoji: '🧸', bg: '#E2ECE9' },
    { name: '별 말랑이', emoji: '⭐', bg: '#FFF3B0' }
  ];
  let selected = squishies[0];

  const wrapper = document.createElement('div');
  wrapper.className = 'squishy-wrapper';
  wrapper.innerHTML = `
    <div class="squishy-selector">
      ${squishies.map((s, i) => `<button class="squishy-type-btn ${i===0?'active':''}" data-idx="${i}">${s.name}</button>`).join('')}
    </div>
    <div class="squishy-main-obj" id="squishy-target" style="background:${selected.bg}">
      <span>${selected.emoji}</span>
    </div>
    <p style="font-weight:700; color:var(--color-gray-dark)">말랑이를 꾹 눌렀다 떼어보세요!</p>
  `;
  container.appendChild(wrapper);

  const target = wrapper.querySelector('#squishy-target');
  const btns = wrapper.querySelectorAll('.squishy-type-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      selected = squishies[e.target.dataset.idx];
      target.style.background = selected.bg;
      target.querySelector('span').textContent = selected.emoji;
    });
  });

  target.addEventListener('mousedown', () => {
    target.style.transform = 'scale(0.7) rotate(-5deg)';
    target.style.borderRadius = '60px';
  });

  window.addEventListener('mouseup', () => {
    target.style.transform = 'scale(1) rotate(0deg)';
    target.style.borderRadius = '40px';
  });
}

// [먼작귀 클리커 인터랙션]
function renderClickerInteraction(container) {
  let score = 0;
  const wrapper = document.createElement('div');
  wrapper.className = 'clicker-box';
  wrapper.innerHTML = `
    <div class="clicker-score" id="score-val">0 HEARTS</div>
    <div class="clicker-target" id="chiikawa-btn">🐥</div>
    <p style="font-weight:700; margin-top:12px;">캐릭터를 연속 클릭하여 하트를 모아보세요!</p>
  `;
  container.appendChild(wrapper);

  const scoreEl = wrapper.querySelector('#score-val');
  const btn = wrapper.querySelector('#chiikawa-btn');

  btn.addEventListener('click', (e) => {
    score += 10;
    scoreEl.textContent = `${score} HEARTS`;

    const heart = document.createElement('span');
    heart.className = 'bite-effect';
    heart.textContent = '💖 +10';
    heart.style.left = `${e.offsetX}px`;
    heart.style.top = `${e.offsetY}px`;
    btn.appendChild(heart);
    setTimeout(() => heart.remove(), 500);
  });
}

// [메지루시 인터랙션] 참 위치 드래그 이동
function renderMejirushiInteraction(container) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="mejirushi-workspace">
      <div class="item-base-umbrella">☂️</div>
      <div class="draggable-charm" style="left:30%; top:40%;">🎀</div>
      <div class="draggable-charm" style="left:60%; top:30%;">⭐</div>
      <div class="draggable-charm" style="left:45%; top:60%;">🧸</div>
    </div>
    <p style="text-align:center; font-weight:700; margin-top:12px;">우산 손잡이에 메지루시 참을 드래그하여 위치를 자유롭게 맞춰보세요!</p>
  `;
  container.appendChild(wrapper);

  const charms = wrapper.querySelectorAll('.draggable-charm');
  charms.forEach(charm => {
    let isDragging = false;
    let offsetX, offsetY;

    charm.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - charm.getBoundingClientRect().left;
      offsetY = e.clientY - charm.getBoundingClientRect().top;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = wrapper.querySelector('.mejirushi-workspace').getBoundingClientRect();
      let x = e.clientX - rect.left - offsetX;
      let y = e.clientY - rect.top - offsetY;
      charm.style.left = `${x}px`;
      charm.style.top = `${y}px`;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
  });
}

// [동묘 쇼핑 인터랙션] 여러 가게 둘러보기 및 영수증 결과
function renderDongmyoInteraction(container) {
  const cart = [];
  const stores = [
    {
      name: '동묘 구제 옷가게 🧥',
      items: [
        { name: '청자켓', price: 15000, icon: '🧥' },
        { name: '레트로 셔츠', price: 12000, icon: '👔' }
      ]
    },
    {
      name: '동묘 레트로 소품샵 📻',
      items: [
        { name: '빈티지 라디오', price: 25000, icon: '📻' },
        { name: '카세트 테이프', price: 5000, icon: '📼' }
      ]
    }
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'dongmyo-wrapper';
  wrapper.innerHTML = `
    <div class="shop-items-grid" id="dongmyo-items"></div>
    <div class="receipt-paper">
      <h4 style="text-align:center; border-bottom:1px dashed #000; padding-bottom:8px;">[ 동묘 쇼핑 영수증 ]</h4>
      <div id="receipt-list" style="margin:12px 0;">구매한 상품이 없습니다.</div>
      <div style="border-top:1px dashed #000; padding-top:8px; font-weight:bold;" id="receipt-total">합계: 0원</div>
    </div>
  `;
  container.appendChild(wrapper);

  const itemsGrid = wrapper.querySelector('#dongmyo-items');
  const receiptList = wrapper.querySelector('#receipt-list');
  const receiptTotal = wrapper.querySelector('#receipt-total');

  stores.forEach(store => {
    store.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.innerHTML = `<div style="font-size:32px">${item.icon}</div><b>${item.name}</b><div>${item.price.toLocaleString()}원</div>`;
      card.addEventListener('click', () => {
        cart.push(item);
        updateReceipt();
      });
      itemsGrid.appendChild(card);
    });
  });

  function updateReceipt() {
    if (cart.length === 0) return;
    receiptList.innerHTML = cart.map(i => `<div>${i.name} - ${i.price.toLocaleString()}원</div>`).join('');
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    receiptTotal.textContent = `합계: ${total.toLocaleString()}원`;
  }
}

// [옥 스타일링 인터랙션] Modern 의류 + 옥 악세사리
function renderJadeInteraction(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'jade-coordi-wrapper';
  wrapper.innerHTML = `
    <div class="mannequin-display">
      <div id="outfit-layer" style="font-size:70px;">🧥</div>
      <div id="jade-layer" style="font-size:40px; position:absolute; top:20px;">💍</div>
    </div>
    <div class="coordi-controls">
      <h4>모던 의류 선택</h4>
      <button class="action-btn" onclick="document.getElementById('outfit-layer').textContent='🧥'">블레이저 자켓</button>
      <button class="action-btn" onclick="document.getElementById('outfit-layer').textContent='👕'">캐주얼 티셔츠</button>
      <h4 style="margin-top:12px;">옥 장신구 포인트</h4>
      <button class="action-btn" style="background:var(--color-fashion)" onclick="document.getElementById('jade-layer').textContent='💍'">옥 반지</button>
      <button class="action-btn" style="background:var(--color-fashion)" onclick="document.getElementById('jade-layer').textContent='📿'">옥 목걸이</button>
    </div>
  `;
  container.appendChild(wrapper);
}

// [젤리슈즈 꾸미기 인터랙션]
function renderJellyInteraction(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'decor-workspace';
  wrapper.innerHTML = `
    <div class="decor-canvas">
      <span>👡</span>
      <div id="jelly-charms" style="position:absolute; display:flex; gap:6px;"></div>
    </div>
    <div class="charm-palette">
      <button class="charm-btn">🌸</button>
      <button class="charm-btn">⭐</button>
      <button class="charm-btn">🍒</button>
      <button class="charm-btn">💎</button>
    </div>
    <p style="font-weight:700">파츠를 터치해 젤리 슈즈에 꾸며보세요!</p>
  `;
  container.appendChild(wrapper);

  const charmsBox = wrapper.querySelector('#jelly-charms');
  wrapper.querySelectorAll('.charm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = document.createElement('span');
      c.style.fontSize = '28px';
      c.textContent = btn.textContent;
      charmsBox.appendChild(c);
    });
  });
}

// [볼펜 꾸미기 인터랙션]
function renderPenInteraction(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'decor-workspace';
  wrapper.innerHTML = `
    <div class="decor-canvas">
      <span>🖊️</span>
      <div id="pen-charms" style="position:absolute; top:30px; display:flex; flex-direction:column; gap:4px;"></div>
    </div>
    <div class="charm-palette">
      <button class="charm-btn">🔮</button>
      <button class="charm-btn">🎀</button>
      <button class="charm-btn">🐣</button>
    </div>
    <p style="font-weight:700">장식용 클립과 비즈를 볼펜 상단에 조합해보세요!</p>
  `;
  container.appendChild(wrapper);

  const charmsBox = wrapper.querySelector('#pen-charms');
  wrapper.querySelectorAll('.charm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = document.createElement('span');
      c.style.fontSize = '22px';
      c.textContent = btn.textContent;
      charmsBox.appendChild(c);
    });
  });
}
