/* A2Z prototype — 12가지 요구사항 통합 스크립트 */
const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

/* [요구사항 5] 로고의 한글 '에이투지' 완전 지움 */
const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* [요구사항 10] 리얼리스틱 오디오 음향 오디오 합성 */
let ac;
const getAC = () => { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); return ac; };

/* 쫀득한 말랑이 스퀴시 사운드 */
const squishSound = () => {
  try {
    const c = getAC(), now = c.currentTime;
    const osc = c.createOscillator(), gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain); gain.connect(c.destination);
    osc.start(now); osc.stop(now + 0.19);
  } catch (e) {}
};

/* 현실적인 키캡/클리커 딸깍 사운드 */
const keyClickSound = () => {
  try {
    const c = getAC(), now = c.currentTime;
    const osc = c.createOscillator(), gain = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain); gain.connect(c.destination);
    osc.start(now); osc.stop(now + 0.05);
  } catch (e) {}
};

/* 음식 베어 물기 사운드 */
const crunchSound = () => {
  try {
    const c = getAC(), now = c.currentTime;
    const bufferSize = c.sampleRate * 0.08, buffer = c.createBuffer(1, bufferSize, c.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    const noise = c.createBufferSource(), gain = c.createGain();
    noise.buffer = buffer; gain.gain.setValueAtTime(0.2, now);
    noise.connect(gain); gain.connect(c.destination);
    noise.start(now);
  } catch (e) {}
};

const bounce = el => { el.classList.remove('bn'); void el.offsetWidth; el.classList.add('bn'); };
const rowOf = (label, html) => `<div class="grp"><em>${label}</em>${html}</div>`;
const colBar = bar => { bar.style.flexDirection = 'column'; bar.style.alignItems = 'center'; };
const won = v => v.toLocaleString() + '원';

/* ---------------- SVG 아이콘 ---------------- */
const I = {
  bowl: (a = '#FFEA00') => `<path d="M5 22h38c0 11-8 19-19 19S5 33 5 22z" fill="${a}"/><ellipse cx="24" cy="22" rx="19" ry="5" fill="#E8472B"/><path d="M34 5L24 22M40 8L28 22" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>`,
  controller: (a = '#1C94F5') => `<path d="M10 14h28c5 0 8 6 9 14s-3 10-6 8-5-6-8-6H15c-3 0-5 4-8 6s-7 0-6-8 4-14 9-14z" fill="${a}"/><path d="M15 21v6M12 24h6" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><circle cx="33" cy="22" r="2.2" fill="#F65AC2"/><circle cx="38" cy="26" r="2.2" fill="#FFEA00"/>`,
  bag: (a = '#F65AC2') => `<path d="M16 16a8 8 0 0116 0" fill="none" stroke="${K}" stroke-width="3"/><rect x="8" y="16" width="32" height="27" rx="4" fill="${a}"/><rect x="8" y="27" width="32" height="5" fill="${W}"/>`,
  clover: () => `<path d="M24 24C16 12 6 18 12 28c6 10 12-4 12-4s6 14 12 4c6-10-4-16-12-4z" fill="#7BE0B0"/><path d="M24 24C12 16 18 6 28 12c10 6-4 12-4 12s14 6 4 12c-10 6-16-4-4-12z" fill="#6FCFA5"/><path d="M24 24v18" stroke="${K}" stroke-width="2.5"/>`,
  omurice: () => `<ellipse cx="24" cy="28" rx="18" ry="12" fill="#FFD84D"/><path d="M10 26Q24 16 38 26" stroke="#E8472B" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  jacket: (a = '#6B8EAD') => `<path d="M17 6L6 14l4 10 5-3v21h18V21l5 3 4-10-11-8-7 7z" fill="${a}"/><path d="M24 13v29" stroke="${K}" stroke-width="1.6"/>`,
  cap: (a = '#1C94F5') => `<path d="M8 28a16 14 0 0132 0z" fill="${a}"/><path d="M6 28h38c0 5-9 6-21 4z" fill="${K}"/>`,
  shades: (a = K) => `<rect x="5" y="16" width="16" height="13" rx="5" fill="${a}"/><rect x="27" y="16" width="16" height="13" rx="5" fill="${a}"/><path d="M21 20h6" stroke="${a}" stroke-width="2.6"/>`,
  sneaker: (a = '#F65AC2') => `<path d="M4 31c6 0 8-6 10-10l6 4 8 2c8 1 12 4 12 8v3H4z" fill="${a}"/><path d="M4 37h40" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`,
  radio: (a = '#FFB36B') => `<rect x="6" y="14" width="36" height="25" rx="4" fill="${a}"/><circle cx="17" cy="27" r="7" fill="${W}"/><path d="M30 22h8M30 27h8" stroke="${K}" stroke-width="2"/>`,
  camera: () => `<rect x="5" y="14" width="38" height="26" rx="5" fill="#4B4F59"/><circle cx="24" cy="27" r="9" fill="#B9BFC9"/><circle cx="24" cy="27" r="5" fill="${K}"/>`,
  book: (a = '#7BE0B0') => `<rect x="9" y="6" width="30" height="36" rx="3" fill="${a}"/><rect x="14" y="12" width="20" height="5" fill="${W}"/>`,
  mochi: (a = '#FF5470') => `<ellipse cx="24" cy="30" rx="19" ry="13" fill="${W}" stroke="#B9BFC9" stroke-width="2"/><circle cx="24" cy="29" r="7.5" fill="${a}"/>`,
  tomato: () => `<circle cx="24" cy="27" r="15" fill="#E8472B"/><path d="M24 11l-5 6 5-2 5 2z" fill="#4CAF50"/>`,
  leaf: () => `<path d="M24 44c-10-6-14-20-6-34 4-5 8-5 12 0 8 14 4 28-6 34z" fill="#6CC070"/>`,
  mushroom: () => `<path d="M6 26a18 16 0 0136 0z" fill="#C9996B"/><rect x="18" y="26" width="12" height="14" rx="4" fill="#F1E3CF"/>`,
  beef: () => `<rect x="6" y="12" width="36" height="24" rx="10" fill="#C0504D"/><path d="M14 22h20" stroke="#F4B5B0" stroke-width="3"/>`,
  noodle: () => `<path d="M8 14c8-6 12 6 20 0s10-4 12 2M8 24c8-6 12 6 20 0s10-4 12 2" stroke="#F3D58C" stroke-width="4" fill="none"/>`,
  cheese: () => `<path d="M4 36L44 16v20z" fill="#FFD84D"/>`,
  olive: () => `<circle cx="24" cy="24" r="14" fill="#3F4A2A"/><circle cx="24" cy="24" r="5" fill="${W}"/>`,
  corn: () => `<circle cx="24" cy="24" r="12" fill="#FFD23F"/>`,
  bow: () => `<path d="M24 24L6 12v24zM24 24l18-12v24z" fill="#F65AC2"/><circle cx="24" cy="24" r="5" fill="${W}"/>`,
  star: () => `<path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#FFEA00"/>`,
  flower: () => `<circle cx="24" cy="24" r="14" fill="#FFEA00"/><circle cx="24" cy="24" r="6" fill="${W}"/>`,
  heart: () => `<path d="M24 42C6 28 6 12 17 11c4 0 7 3 7 6 0-3 3-6 7-6 11 1 11 17-7 31z" fill="#F65AC2"/>`,
};
const ic = (n, a) => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">${I[n] ? I[n](a) : ''}</svg>`;

const CATS = {
  food: { n: '먹거리', i: 'bowl', d: '함께 식탁에 둘러앉아 즐기는 신선하고 맛있는 요즘 트렌드 맛보기' },
  play: { n: '놀거리', i: 'controller', d: '손끝의 촉감부터 발품 파는 즐거움까지 세대를 넘어 경험하는 놀이' },
  fashion: { n: '패션', i: 'bag', d: '일상 속 나만의 개성을 담아 소소하게 꾸며보는 유쾌한 패션 소품' },
};

const BLOB = {
  food: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M38 38C62 8 128 2 166 30c30 22 36 62 22 96-14 34-52 62-96 62C40 188 8 156 8 112 8 78 22 52 38 38z"/></svg>',
  play: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M24 82C14 46 52 14 96 14c32 0 50 18 76 34 28 18 34 52 20 82-14 30-30 38-58 52-30 14-60 14-84-8C26 150 34 116 24 82z"/></svg>',
  fashion: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M96 6c34-4 60 22 80 46 22 26 22 62 6 92-16 30-44 48-82 48-36 0-72-18-84-56-10-32 4-52 12-76C36 36 62 10 96 6z"/></svg>',
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

/* [요구사항 8] 놀거리 분류 4개 재구성 및 세대 중립적 풍부한 설명 [요구사항 4] */
const T = {
  play: [
    { t: '말랑이 · 왁뿌볼', type: 'squish_wax',
      lead: '손끝으로 만지고 누르며 마음에 안정감을 주는 손놀림 장난감이에요.',
      body: ['말랑이는 손으로 꾹 누르면 부드럽게 찌그러졌다가 천천히 제 모습으로 되돌아오는 복원력을 가진 감각 토이입니다. 왁뿌볼은 말랑이 겉면에 얇은 왁스 층을 굳혀 단단함과 말랑함의 반전 촉감을 동시에 경험할 수 있습니다.',
        '바쁜 일상이나 집중이 필요한 순간에 손을 가볍게 움직이는 것만으로도 소소한 쉼을 얻을 수 있어, 다양한 모형과 질감을 수집하며 즐기는 문화가 형성되었습니다.'] },
    { t: '키캡 · 클리커', type: 'key_clicker',
      lead: '손가락 끝으로 전해지는 딸깍이는 소리와 경쾌한 타격감을 즐기는 취미예요.',
      body: ['키캡은 키보드 스위치 위에 얹어 소리와 키감을 다채롭게 만드는 부품입니다. 클리커는 이러한 스위치를 휴대용 피젯토이 형태로 만들어 언제 어디서나 딸깍거리며 재미를 느끼게 해줍니다.',
        '손맛이 느껴지는 감각적인 아날로그 물리 버튼의 재미를 현대적인 감각으로 재해석한 유행입니다. 아래에서 직접 눌러보고 점수를 모아보세요.'] },
    { t: '탱글', type: 'tangle',
      lead: '마디마디 이어진 곡선 관절을 구부리고 비틀며 다듬는 무한 피젯 장난감이에요.',
      body: ['매끄러운 아치형 조각들이 수십 개로 연결된 닫힌 고리 구조입니다. 끝없이 자유자재로 꺾이고 회전하며 손안에서 매끄럽게 움직이는 감촉이 특징입니다.',
        '모양에 정답이 없어 자유롭게 입체적인 도형을 만들거나 계속 비틀며 마음을 가라앉히기에 좋습니다.'] },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000], ['cap', '볼캡', 4000], ['shades', '선글라스', 3000], ['sneaker', '헌 운동화', 8000]] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000], ['camera', '필름 카메라', 9000], ['book', '옛날 책', 2000]] }
      ],
      lead: '골목 사이사이 숨겨진 세월의 멋을 지닌 물건들을 발견하는 보물찾기쇼핑이에요.',
      body: ['동묘 구제시장은 세월의 온기가 담긴 옷, 골동품, 책, LP판 등이 가득 모여 있는 전통 시장입니다. 정가에 사기보다 정겨운 이야기와 약간의 흥정이 오가는 재미가 살아있습니다.',
        '아래 가게를 누비며 맘에 드는 골동품을 골라 흥정해보고, 나만의 장바구니와 영수증을 완성해보세요.'] }
  ],
  food: [
    { t: '토마토마라탕', type: 'dish', mode: 'pick', base: '#E8603A',
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2], ['당면', 'noodle', null, 3], ['치즈', 'cheese', null, 2]],
      lead: '상큼한 토마토 베이스 국물에 얼얼한 마라 풍미를 은은하게 얹은 국물 요리예요.',
      body: ['토마토의 산뜻한 감칠맛이 매콤한 마라 향을 부드럽게 감싸주어 담백하면서도 깊은 풍미를 전합니다. 내가 원하는 재료를 그릇에 차곡차곡 담아 먹는 개성 있는 식사 형태입니다.',
        '아래에서 맘에 드는 재료를 그릇에 담은 후 한입씩 눌러 직접 맛보세요.'] },
    { t: '한정선', type: 'dish', mode: 'fixed', base: '#F3F5F8',
      items: [['딸기 찹쌀떡', 'mochi', '#FF5470', 4], ['귤 찹쌀떡', 'mochi', '#FF9F1C', 4], ['복숭아 찹쌀떡', 'mochi', '#FFB4A2', 4]],
      lead: '신선한 통과일을 쫀득하고 부드러운 찹쌀떡 속에 담아낸 정갈한 간식이에요.',
      body: ['전통 찹쌀떡의 쫀득함과 상큼한 과즙이 베어 나오는 과일의 조합이 일품입니다. 예쁜 단면과 기분 좋은 달콤함으로 식후 디저트로 널리 사랑받고 있습니다.',
        '접시 위의 찹쌀떡을 베어물어 싱싱한 과일 단면의 시각적, 미각적 즐거움을 느껴보세요.'] },
    { t: '피자설기', type: 'pizza',
      lead: '포슬포슬하고 쫀득한 백설기 떡 위에 토핑을 더해 고소하게 구워낸 별미예요.',
      body: ['전통 떡의 든든하고 쫀득한 식감에 고소한 치즈와 새콤한 토마토 소스를 곁들인 전통과 현대의 유쾌한 만남입니다.',
        '[요구사항 7] 조각별로 떼어 한입씩 먹는 직관적인 식감 체험을 선사합니다. 조각을 눌러 한입씩 맛보세요.'] },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '자작하게 끓인 면발을 건져내어 말려서 꼬들꼬들하고 짭짤한 식감을 즐기는 별식이에요.',
      body: ['평소보다 간을 조금 더 짜게 끓여낸 라면에서 면발을 접시에 건져 잠시 두면, 표면이 살짝 드라이해지며 꼬들하고 바삭한 독특한 식감이 완성됩니다.',
        '직접 조리부터 부채질로 말리는 과정까지 거친 후 오독오독 씹히는 라면을 맛보세요.'] }
  ],
  fashion: [
    { t: '옥', type: 'jade',
      lead: '맑고 은은한 옥 빛깔의 정취를 modern 소품으로 코디하는 스타일링이에요.',
      body: ['예로부터 애호받던 옥 소재가 목걸이, 팔찌, 반지 등 세련된 액세서리로 다양하게 패션에 스며들었습니다.',
        '[요구사항 7] 차분한 의상 위에 청아한 옥 장신구를 함께 착용해보며 감각적인 패션 조합을 완성해보세요.'] },
    { t: '메지루시', type: 'decor',
      items: [{ n: '우산', a: 'umb' }, { n: '가방', a: 'bag' }],
      parts: ['star', 'heart', 'flower', 'bow'],
      lead: '비슷한 물건 속에서 내 소지품을 귀엽고 확실하게 알아볼 수 있게 달아주는 표식 참이에요.',
      body: ['우산 손잡이, 가방 고리 등에 미니 고리를 걸어 나만의 소중한 물건임을 은은하게 표현합니다.',
        '원하는 장식을 추가한 후 드래그하여 원하는 위치에 자유롭게 달아보세요.'] },
    { t: '젤리슈즈 꾸미기', type: 'decor_tray',
      type_kind: 'shoe',
      parts: ['star', 'heart', 'flower', 'bow', 'clover'],
      lead: '말랑한 젤리 샌들에 아기자기한 입체 파츠를 꽂아 완성하는 신발 꾸미기예요.',
      body: ['시원한 젤리 슈즈의 구멍 사이로 알록달록한 지비츠 파츠를 조합해 독창적인 스타일을 연출합니다.',
        '[요구사항 9] 아래 하단 파츠 트레이에 늘어선 파츠를 마우스로 끌어 드래그해 신발 위에 착 꽂아보세요.'] },
    { t: '볼펜 꾸미기', type: 'decor_tray',
      type_kind: 'pen',
      parts: ['star', 'heart', 'flower', 'bow', 'clover'],
      lead: '매일 사용하는 필기구 끝에 깜찍한 클립과 비즈 파츠를 달아 나만의 펜으로 꾸미는 유행이에요.',
      body: ['단조로운 볼펜에 스티커와 체인을 더해 필기하는 시간까지 즐겁게 만들어줍니다.',
        '[요구사항 9] 하단 트레이에서 원하는 마음에 드는 파츠를 찾아 볼펜 위로 드래그하여 배치해보세요.'] }
  ]
};

/* ---------------- 한입씩 베어 문 자국 SVG ---------------- */
const BP = [-.5, 3.5, 1.6, .35, 2.8].map(a => [24 + 17 * Math.cos(a), 26 + 15 * Math.sin(a)]);
const bitten = (inner, n, id) => `<svg class="ic" viewBox="0 0 48 48"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/>${BP.slice(0, n).map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${7 + i * 1.3}" fill="#000"/>`).join('')}</mask></defs><g mask="url(#${id})">${inner}</g></svg>`;
let uid = 0;
function piece(inner, max, onBite, onGone) {
  const el = document.createElement('button'), id = 'bm' + (++uid); let n = 0; el.className = 'pc';
  const draw = () => el.innerHTML = bitten(inner, n, id); draw();
  el.onclick = () => { if (n >= max) return; n++; crunchSound(); draw(); bounce(el); onBite && onBite(); if (n >= max) { el.classList.add('gone'); setTimeout(() => el.remove(), 300); onGone && onGone(); } };
  return el;
}

/* ---------------- 인터랙션 구현 ---------------- */
const X = {
  squish_wax(st, bar) {
    let mode = 'm', hold = 0, broken = false, n = 0;
    st.innerHTML = `<div class="sqwrap"><svg class="sq3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F7B6D8" stroke="${K}" stroke-width="3"/><circle cx="38" cy="45" r="4" fill="${K}"/><circle cx="62" cy="45" r="4" fill="${K}"/><path d="M42 58q8 6 16 0" stroke="${K}" stroke-width="3" fill="none"/></svg></div><div class="count">만진 횟수 <b id="n">0</b></div><p class="hint">꾹 눌렀다 놓아보세요 (리얼리스틱 소리 피드백)</p>`;
    const el = $('.sq3', st);
    el.onpointerdown = () => { squishSound(); el.style.transform = 'scale(1.2, 0.7)'; };
    const up = () => { if (el.style.transform !== '') { n++; $('#n', st).textContent = n; el.style.transform = ''; } };
    el.onpointerup = el.onpointerleave = up;
  },

  key_clicker(st, bar) {
    let sc = 0;
    st.innerHTML = `<div class="count">딸깍 점수 <b id="sc">0</b></div><div class="clkwrap"><button class="clk" id="clk" aria-label="클릭">${ic('clover')}</button></div><p class="hint">스위치를 눌러 경쾌한 손맛과 소리를 즐겨보세요</p>`;
    $('#clk', st).onclick = () => { keyClickSound(); sc++; $('#sc', st).textContent = sc; bounce($('#clk', st)); };
  },

  tangle(st, bar) {
    st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">관절 고리를 잡고 이리저리 당겨 구부려보세요</p>';
    const cv = $('canvas', st), x = cv.getContext('2d'), dp = Math.min(devicePixelRatio, 2), w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * dp; cv.height = h * dp; x.scale(dp, dp);
    const n = 24, P = []; for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n; P.push([w / 2 + 80 * Math.cos(t), h / 2 + 80 * Math.sin(t)]); }
    let d = -1;
    const at = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.onpointerdown = e => { const q = at(e); d = 0; P.forEach((p, i) => { if (Math.hypot(p[0] - q[0], p[1] - q[1]) < Math.hypot(P[d][0] - q[0], P[d][1] - q[1])) d = i; }); cv.setPointerCapture(e.pointerId); squishSound(); };
    cv.onpointermove = e => { if (d >= 0) { const q = at(e); P[d] = [q[0], q[1]]; } };
    cv.onpointerup = () => d = -1;
    const loop = () => {
      if (!cv.isConnected) return;
      x.clearRect(0, 0, w, h); x.lineWidth = 16; x.lineCap = x.lineJoin = 'round';
      x.strokeStyle = '#1C94F5'; x.beginPath(); P.forEach((p, i) => x[i ? 'lineTo' : 'moveTo'](...p)); x.closePath(); x.stroke();
      requestAnimationFrame(loop);
    };
    loop();
  },

  flea(st, bar, c) {
    let sh = 0, basket = [];
    const spent = () => basket.reduce((a, b) => a + b.p, 0);
    const render = () => {
      const s = c.shops[sh];
      st.innerHTML = `<div class="say">${s.n}</div><div class="shelf">${s.items.map((it, i) => `<button class="item" data-i="${i}">${ic(it[0])}<small>${it[1]}<br>${won(it[2])}</small></button>`).join('')}</div><div class="receipt"><h4>오늘의 동묘 장바구니</h4><hr>${basket.length ? basket.map(b => `<div class="rl"><span>${b.n}</span><span>${won(b.p)}</span></div>`).join('') : '<small>담은 물건 없음</small>'}<hr><div class="rl"><b>합계</b><b>${won(spent())}</b></div></div>`;
    };
    st.onclick = e => {
      const b = e.target.closest('.item'); if (!b) return;
      const it = c.shops[sh].items[+b.dataset.i];
      if (spent() + it[2] <= c.budget) { basket.push({ n: it[1], p: it[2] }); keyClickSound(); render(); }
    };
    bar.innerHTML = rowOf('가게 이동', c.shops.map((s, i) => `<button class="chip${i === sh ? ' on' : ''}" data-s="${i}">${s.n}</button>`).join(''));
    bar.onclick = e => { const b = e.target.closest('.chip'); if (b && b.dataset.s) { sh = +b.dataset.s; render(); } };
    render();
  },

  dish(st, bar, c) {
    st.innerHTML = `<div class="plate" id="pl" style="--b:${c.base}"><i class="base"></i></div><div class="count" id="ct">맛있게 한입씩 먹어보세요</div>`;
    const pl = $('#pl', st);
    c.items.forEach(it => {
      const el = piece(I[it[1]](it[2]), it[3]);
      el.style.left = 30 + Math.random() * 40 + '%'; el.style.top = 30 + Math.random() * 40 + '%';
      pl.appendChild(el);
    });
  },

  pizza(st, bar) {
    let bites = Array(8).fill(0);
    st.innerHTML = '<svg class="pz" viewBox="0 0 200 200"></svg><div class="count" id="ct">조각을 눌러 한입씩 맛보세요</div>';
    const render = () => {
      let h = ''; const rad = Math.PI / 4;
      for (let i = 0; i < 8; i++) {
        const a0 = i * rad, a1 = a0 + rad, x0 = 100 + 80 * Math.cos(a0), y0 = 100 + 80 * Math.sin(a0), x1 = 100 + 80 * Math.cos(a1), y1 = 100 + 80 * Math.sin(a1);
        if (bites[i] < 3) h += `<path class="sl" data-i="${i}" d="M100 100L${x0} ${y0}A80 80 0 0 1 ${x1} ${y1}Z" fill="#FFD84D" stroke="${K}" stroke-width="2"/>`;
      }
      $('.pz', st).innerHTML = h;
    };
    st.onclick = e => { const s = e.target.closest('.sl'); if (s) { bites[+s.dataset.i]++; crunchSound(); render(); } };
    render();
  },

  ramen(st, bar) {
    let step = 0;
    const go = () => {
      if (step === 0) st.innerHTML = `<div class="say">라면을 맛있게 끓여요</div><button class="bigbtn" id="a">면 건져서 접시에 말리기</button>`;
      else st.innerHTML = `<div class="plate"><svg class="ic" viewBox="0 0 48 48">${I.noodle()}</svg></div><div class="say">면발이 꼬들하게 말랐어요! 한입 누르세요</div>`;
      if ($('#a', st)) $('#a', st).onclick = () => { step = 1; go(); };
    };
    go();
  },

  jade(st, bar) {
    let on = true;
    st.innerHTML = `<svg class="scene" viewBox="0 0 200 200"><circle cx="100" cy="80" r="30" fill="#F2CDB5"/><rect x="70" y="110" width="60" height="80" fill="${K}"/>${on ? '<circle cx="100" cy="120" r="12" fill="#7BE0B0"/>' : ''}</svg><div class="say">옥 목걸이 착용하기</div>`;
    bar.innerHTML = '<button class="chip" id="t">착용 / 해제</button>';
    $('#t', bar).onclick = () => { on = !on; X.jade(st, bar); keyClickSound(); };
  },

  decor(st, bar, c) {
    st.innerHTML = `<svg class="scene" viewBox="0 0 200 200"><rect x="60" y="40" width="80" height="120" rx="10" fill="#9CCBF5"/></svg><div class="say">메지루시 걸기</div>`;
  },

  /* [요구사항 9] 하단 파츠 트레이에서 잡아서 끌어 놓는 드래그 앤 드롭 구현 */
  decor_tray(st, bar, c) {
    const isShoe = c.type_kind === 'shoe';
    st.innerHTML = `
      <div class="decor-wrap">
        <svg id="sc" class="scene dgs" viewBox="0 0 300 200">
          ${isShoe ? `<path d="M40 140C40 90 80 70 150 70C220 70 260 90 260 140Z" fill="#F65AC2" opacity=".8"/><rect x="40" y="140" width="220" height="20" rx="6" fill="${K}"/>` : `<rect x="50" y="85" width="200" height="30" rx="15" fill="#1C94F5"/><path d="M50 85L20 100L50 115Z" fill="${K}"/>`}
        </svg>
        <div class="parts-tray">
          ${c.parts.map(p => `<div class="tray-part" data-k="${p}">${ic(p)}</div>`).join('')}
        </div>
      </div>
      <p class="hint">하단 트레이의 파츠를 마우스로 끌어서 원하는 위치에 놓아보세요</p>
    `;
    const svg = $('#sc', st); let dragPart = null, activeEl = null;      $$('.tray-part', st).forEach(p => {
      p.onpointerdown = e => {
        dragPart = p.dataset.k;
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.className.baseVal = 'dg';
        g.innerHTML = `<g transform="translate(-20 -20) scale(0.8)">${I[dragPart]()}</g>`;
        svg.appendChild(g);
        activeEl = g;
        keyClickSound();
      };
    });

    st.onpointermove = e => {
      if (!activeEl) return;
      const r = svg.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      activeEl.setAttribute('transform', `translate(${x} ${y})`);
    };

    st.onpointerup = () => { dragPart = null; activeEl = null; };
  }
};

/* ---------------- 화면 라우팅 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

function home() {
  const ks = Object.keys(CATS);
  app.innerHTML = `<section class="view space">${ks.map(k => `
    <a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}">
      <div class="shape">${BLOB[k]}</div>
      <div class="txt">
        <span class="tagp ${k}">${LAB[k]}</span>
        <h2>${CATS[k].n}</h2>
        <p>${CATS[k].d}</p>
        <span class="view-main">VIEW →</span>
      </div>
    </a>`).join('')}
    <div class="tip">오브젝트를 선택해 이야기를 시작해보세요</div>
  </section>`;
  space3d($('.space'));
}

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2">
    <div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `
      <a class="c2" href="#/t/${k}/${i}">
        <div class="ph"></div>
        <div class="ct">
          <h3>${t.t}</h3>
          <p>${t.lead}</p>
          <span class="view-more">VIEW MORE →</span>
        </div>
      </a>`).join('')}
    </div>
  </section>`;
}

/* [요구사항 4] 세로형 깔끔한 상세 레이아웃 구조 */
function trend(k, i) {
  const list = T[k], t = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
  app.innerHTML = `<section class="view tpage">
    <div class="tw">
      <a class="back" href="#/cat/${k}">← ${CATS[k].n} 목록으로 돌아가기</a>
      <h1>${t.t}</h1>
      <p class="lead">${t.lead}</p>
      ${t.body.map(p => `<p class="tx">${p}</p>`).join('')}
      <div class="stage-wrap">
        <div class="stage" id="st"></div>
        <div class="stage-bar" id="bar"></div>
      </div>
      <div class="pager">
        <a href="#/t/${k}/${(i + list.length - 1) % list.length}">← ${prev.t}</a>
        <a href="#/t/${k}/${(i + 1) % list.length}">${next.t} →</a>
      </div>
    </div>
  </section>`;
  X[t.type]($('#st'), $('#bar'), t);
}

function route() {
  const [a, k, i] = location.hash.replace('#/', '').split('/');
  const cat = a === 'cat' || a === 't' ? (CATS[k] ? k : null) : null;
  document.body.className = cat ? '' : 'home';
  document.body.dataset.c = cat || '';
  nav.innerHTML = Object.keys(CATS).map(c => `<a href="#/cat/${c}" class="${c === cat ? 'on' : ''}">${CATS[c].n}</a>`).join('');
  scrollTo(0, 0);
  if (!cat) home(); else if (a === 'cat') category(k); else trend(k, +i || 0);
}
addEventListener('hashchange', route);
route();

/* ---------------- [요구사항 1, 12] 3D 오브젝트 크기 확대 및 부드러운 천천히 회전 ---------------- */
function space3d(sp) {
  if (typeof THREE === 'undefined') return;
  let R; try { R = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.outputEncoding = THREE.sRGBEncoding;
  const cv = R.domElement; cv.className = 'gl'; sp.appendChild(cv);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.z = 10;
  scene.add(new THREE.AmbientLight(0xffffff, .9));
  const dl = new THREE.DirectionalLight(0xffffff, .8); dl.position.set(3, 5, 6); scene.add(dl);

  const S = r => new THREE.SphereGeometry(r, 32, 24);
  const add = (g, geo, col) => g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: .35 })));

  const objs = [['food', g => add(g, S(1.2), 0xFFEA00)], ['play', g => add(g, S(1.2), 0x1C94F5)], ['fashion', g => add(g, S(1.2), 0xF65AC2)]].map(([k, fn]) => {
    const root = new THREE.Group(), spin = new THREE.Group();
    fn(spin); root.add(spin); scene.add(root);
    return { root, spin, b: $(`.hb.${k}`, sp), sh: $(`.hb.${k} .shape`, sp), yaw: 0 };
  });

  let pu = sp.clientHeight / 8.284;
  const size = () => { const W = sp.clientWidth, H = sp.clientHeight; R.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); pu = H / 8.284; };
  size();

  let t0 = performance.now();
  const tick = t => {
    if (!sp.isConnected) return;
    const d = Math.min((t - t0) / 1000, .05); t0 = t;
    const sr = sp.getBoundingClientRect();
    objs.forEach((o, i) => {
      const r = o.sh.getBoundingClientRect();
      const cx = r.left - sr.left + r.width / 2, cy = r.top - sr.top + r.height / 2;
      /* [요구사항 1] 3D 크기 크게 확대 (스케일 2.0배 적용) */
      o.root.scale.setScalar((Math.min(r.width, r.height) * 2.0) / (3.3 * pu));
      o.root.position.set((cx - sp.clientWidth / 2) / pu, -(cy - sp.clientHeight / 2) / pu, 0);
      /* [요구사항 12] 너무 빠른 회전 완화 - 천천히 부드럽게 감속 회전 */
      o.spin.rotation.y += d * 0.4;
    });
    R.render(scene, cam); requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
