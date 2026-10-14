/* A2Z 스크립트 */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* 10 & 13. 리얼 촉감 및 키캡 오디오 합성 알고리즘 */
let ac;
const ensureAudioContext = () => {
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
  } catch(e){}
};

const playSquishSound = (type = 'normal') => {
  ensureAudioContext();
  if (!ac) return;
  try {
    const now = ac.currentTime;
    const dur = type === 'crunch' ? 0.12 : 0.08;
    const bufferSize = ac.sampleRate * dur;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const pow = type === 'crunch' ? 1.2 : 2.5;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, pow);
    }
    const noise = ac.createBufferSource(); noise.buffer = buffer;
    const filter = ac.createBiquadFilter(); filter.type = type === 'crunch' ? 'bandpass' : 'lowpass';
    filter.frequency.setValueAtTime(type === 'crunch' ? 1800 : 500, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + dur);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
    noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
    noise.start(now);
  } catch(e){}
};

const playKeycapSound = () => {
  ensureAudioContext();
  if (!ac) return;
  try {
    const now = ac.currentTime;
    const osc = ac.createOscillator(); const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.03);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(now); osc.stop(now + 0.038);
  } catch(e){}
};

const crunch = () => playSquishSound('crunch');

/* 베어무는 자국 SVG 마스크 생성기 */
const BP = [-.5, 3.5, 1.6, .35, 2.8].map(a => [24 + 17 * Math.cos(a), 26 + 15 * Math.sin(a)]);
let uid = 0;
const bitten = (inner, n, id) => `<svg class="ic" viewBox="0 0 48 48"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/>${BP.slice(0, n).map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${8 + i * 1.5}" fill="#000"/>`).join('')}</mask></defs><g mask="url(#${id})">${inner}</g></svg>`;

function piece(inner, max, onBite, onGone) {
  const el = document.createElement('button'), id = 'bm' + (++uid); let n = 0; el.className = 'pc';
  const draw = () => el.innerHTML = bitten(inner, n, id); draw();
  el.onclick = () => { if (n >= max) return; n++; crunch(); draw(); onBite && onBite(); if (n >= max) { el.style.opacity = '0'; setTimeout(() => el.remove(), 250); onGone && onGone(); } };
  return el;
}

/* ---------------- SVG 아이콘 ---------------- */
const I = {
  bowl: (a = '#FFEA00') => `<path d="M5 22h38c0 11-8 19-19 19S5 33 5 22z" fill="${a}" stroke="${K}" stroke-width="2"/><ellipse cx="24" cy="22" rx="19" ry="5" fill="#E8472B" stroke="${K}" stroke-width="2"/><path d="M34 5L24 22M40 8L28 22" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>`,
  controller: (a = '#1C94F5') => `<path d="M10 14h28c5 0 8 6 9 14s-3 10-6 8-5-6-8-6H15c-3 0-5 4-8 6s-7 0-6-8 4-14 9-14z" fill="${a}" stroke="${K}" stroke-width="2"/><path d="M15 21v6M12 24h6" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><circle cx="33" cy="22" r="2.2" fill="#F65AC2"/><circle cx="38" cy="26" r="2.2" fill="#FFEA00"/>`,
  bag: (a = '#F65AC2') => `<path d="M16 16a8 8 0 0116 0" fill="none" stroke="${K}" stroke-width="3"/><rect x="8" y="16" width="32" height="27" rx="4" fill="${a}" stroke="${K}" stroke-width="2"/><rect x="8" y="27" width="32" height="5" fill="${W}"/>`,
  
  /* 10. 유행하는 말랑이 모양 (비누, 감자, 치즈, 고양이 발) - 얼굴 제외 */
  soap: (a = '#9CCBF5') => `<rect x="8" y="14" width="32" height="22" rx="10" fill="${a}" stroke="${K}" stroke-width="2.5"/><path d="M14 20h20" stroke="#fff" stroke-width="3" opacity="0.6" stroke-linecap="round"/>`,
  potato: (a = '#D8B58A') => `<path d="M10 24C8 14 18 8 28 10C38 12 42 22 38 32C34 40 18 42 10 34Z" fill="${a}" stroke="${K}" stroke-width="2.5"/><circle cx="18" cy="20" r="1.5" fill="${K}" opacity="0.4"/><circle cx="30" cy="28" r="1.5" fill="${K}" opacity="0.4"/>`,
  cheese: (a = '#FFD84D') => `<path d="M8 36L40 16V36Z" fill="${a}" stroke="${K}" stroke-width="2.5"/><circle cx="26" cy="30" r="3" fill="#E6B800"/><circle cx="16" cy="32" r="2" fill="#E6B800"/>`,
  paw: (a = '#F65AC2') => `<path d="M12 28C12 20 36 20 36 28C36 36 12 36 12 28Z" fill="${a}" stroke="${K}" stroke-width="2"/><circle cx="12" cy="16" r="4" fill="${a}" stroke="${K}" stroke-width="1.5"/><circle cx="20" cy="12" r="4" fill="${a}" stroke="${K}" stroke-width="1.5"/><circle cx="28" cy="12" r="4" fill="${a}" stroke="${K}" stroke-width="1.5"/><circle cx="36" cy="16" r="4" fill="${a}" stroke="${K}" stroke-width="1.5"/>`,

  /* 6. 한정선 단면 수제 과일 찹쌀떡 단면 그래픽 */
  mochi_strawberry: () => `<ellipse cx="24" cy="24" rx="18" ry="18" fill="#FFF" stroke="${K}" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="#E8472B"/><circle cx="24" cy="24" r="10" fill="#FF5470"/><circle cx="24" cy="24" r="3" fill="#FFE16B"/>`,
  mochi_mandarin: () => `<ellipse cx="24" cy="24" rx="18" ry="18" fill="#FFF" stroke="${K}" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="#FF9F1C"/><circle cx="24" cy="24" r="4" fill="#FFF" opacity="0.8"/>`,
  mochi_muscat: () => `<ellipse cx="24" cy="24" rx="18" ry="18" fill="#FFF" stroke="${K}" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="#9BD65A"/><circle cx="20" cy="20" r="3" fill="#FFF" opacity="0.6"/>`,
  mochi_peach: () => `<ellipse cx="24" cy="24" rx="18" ry="18" fill="#FFF" stroke="${K}" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="#FFB4A2"/><path d="M24 10Q18 24 24 38" stroke="#F65AC2" stroke-width="2" fill="none"/>`,

  jacket: (a = '#6B8EAD') => `<path d="M17 6L6 14l4 10 5-3v21h18V21l5 3 4-10-11-8-7 7z" fill="${a}" stroke="${K}" stroke-width="2"/>`,
  sneaker: (a = '#F65AC2') => `<path d="M4 31c6 0 8-6 10-10l6 4 8 2c8 1 12 4 12 8v3H4z" fill="${a}" stroke="${K}" stroke-width="2"/>`,
  radio: (a = '#FFB36B') => `<rect x="6" y="14" width="36" height="25" rx="4" fill="${a}" stroke="${K}" stroke-width="2"/><circle cx="17" cy="27" r="7" fill="${W}" stroke="${K}" stroke-width="2"/>`,
  cap: (a = '#1C94F5') => `<path d="M8 28a16 14 0 0132 0z" fill="${a}" stroke="${K}" stroke-width="2"/><path d="M6 28h38c0 5-9 6-21 4z" fill="${K}"/>`,
  book: (a = '#7BE0B0') => `<rect x="9" y="6" width="30" height="36" rx="3" fill="${a}" stroke="${K}" stroke-width="2"/>`,
  shades: (a = K) => `<rect x="5" y="16" width="16" height="13" rx="5" fill="${a}"/><rect x="27" y="16" width="16" height="13" rx="5" fill="${a}"/><path d="M21 20h6" stroke="${a}" stroke-width="2.6"/>`,
  camera: () => `<rect x="5" y="14" width="38" height="26" rx="5" fill="#4B4F59" stroke="${K}" stroke-width="2"/><circle cx="24" cy="27" r="9" fill="#B9BFC9" stroke="${K}" stroke-width="2"/>`,
  record: () => `<circle cx="24" cy="24" r="19" fill="${K}"/><circle cx="24" cy="24" r="7" fill="#F65AC2"/>`,
  bow: () => `<path d="M24 24L6 12v24zM24 24l18-12v24z" fill="#F65AC2" stroke="${K}" stroke-width="1.5"/><circle cx="24" cy="24" r="5" fill="${W}" stroke="${K}" stroke-width="1.5"/>`,
  star: () => `<path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#FFEA00" stroke="${K}" stroke-width="1.5"/>`,
  flower: () => `<g fill="${W}" stroke="${K}" stroke-width="1.5"><circle cx="24" cy="10" r="7"/><circle cx="36" cy="19" r="7"/><circle cx="31" cy="33" r="7"/><circle cx="17" cy="33" r="7"/><circle cx="12" cy="19" r="7"/></g><circle cx="24" cy="24" r="5" fill="#FFEA00" stroke="${K}" stroke-width="1.5"/>`,
  heart: () => `<path d="M24 42C6 28 6 12 17 11c4 0 7 3 7 6 0-3 3-6 7-6 11 1 11 17-7 31z" fill="#F65AC2" stroke="${K}" stroke-width="1.5"/>`,
  gem: () => `<polygon points="24,6 38,18 24,42 10,18" fill="#1C94F5" stroke="${K}" stroke-width="2"/>`,
  tomato: () => `<circle cx="24" cy="27" r="13" fill="#E8472B" stroke="${K}" stroke-width="2"/><path d="M24 14l-4 5 4-2 4 2z" fill="#4CAF50"/>`,
  leaf: () => `<path d="M24 42c-8-5-11-16-5-27 3-4 6-4 10 0 6 11 3 22-5 27z" fill="#6CC070" stroke="${K}" stroke-width="2"/>`,
  mushroom: () => `<path d="M8 26a16 14 0 0132 0z" fill="#C9996B" stroke="${K}" stroke-width="2"/><rect x="18" y="26" width="12" height="12" rx="3" fill="#F1E3CF" stroke="${K}" stroke-width="2"/>`,
  beef: () => `<rect x="8" y="14" width="32" height="20" rx="8" fill="#C0504D" stroke="${K}" stroke-width="2"/>`
};
const ic = (n, a, b) => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">${I[n] ? I[n](a, b) : ''}</svg>`;

const CATS = {
  food: { n: '먹거리', i: 'bowl', d: '줄 서서 먹는 특별한 별미와 달콤한 수제 디저트 이야기' },
  play: { n: '놀거리', i: 'controller', d: '손끝으로 만지고 누르고 비틀며 즐기는 오감 만족 피젯 토이' },
  fashion: { n: '패션', i: 'bag', d: '클래식한 분위기와 내 취향대로 완성하는 전신 스타일링' },
};

const BLOB = {
  food: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M38 38C62 8 128 2 166 30c30 22 36 62 22 96-14 34-52 62-96 62C40 188 8 156 8 112 8 78 22 52 38 38z"/></svg>',
  play: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M24 82C14 46 52 14 96 14c32 0 50 18 76 34 28 18 34 52 20 82-14 30-30 38-58 52-30 14-60 14-84-8C26 150 34 116 24 82z"/></svg>',
  fashion: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M96 6c34-4 60 22 80 46 22 26 22 62 6 92-16 30-44 48-82 48-36 0-72-18-84-56-10-32 4-52 12-76C36 36 62 10 96 6z"/></svg>',
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

/* ---------------- 트렌드 데이터 ---------------- */
const T = {
  /* 9. 놀거리 분류 : 말랑이·왁뿌볼 / 키캡·클리커 / 탱글 / 동묘쇼핑 */
  play: [
    { t: '말랑이 · 왁뿌볼', type: 'squish_wax',
      lead: '유행하는 모양의 말랑이와 와작 깨지는 왁뿌볼의 반전 촉감 토이예요.',
      body: ['비누, 감자, 치즈, 냥발 모양의 말랑이를 일반, 크런치, 샤베트 질감으로 즐길 수 있습니다.',
        '단단한 왁스를 꽉 눌러 깨트리고 속의 말랑함을 느껴보세요.'] },
    { t: '키캡 · 피젯 카운터', type: 'keycap_clicker',
      lead: '딸깍거리는 키캡과 누르는 맛이 일품인 피젯 카운터 토이예요.',
      body: ['선명하게 눌리는 키캡의 시각적 쾌감과 딸깍거리는 피젯 스위치 카운터를 직접 눌러보세요.'] },
    { t: '탱글', type: 'tangle',
      lead: '파스텔톤 곡선 마디가 이어진 부드러운 웨이브 피젯 토이예요.',
      body: ['손가락 사이로 구부리고 비틀며 부드럽게 감기는 탱글 조각을 움직여보세요.'] },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000, '#6B8EAD'], ['cap', '볼캡', 4000, '#1C94F5'], ['shades', '선글라스', 3000, K], ['sneaker', '헌 운동화', 8000, '#F65AC2']] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000, '#FFB36B'], ['camera', '필름 카메라', 9000], ['clock', '탁상시계', 5000], ['vase', '화병', 6000]] },
        { n: '책방 · 음반 가게', c: '#1C94F5', items: [['book', '옛날 책', 2000, '#7BE0B0'], ['record', 'LP 음반', 4000], ['blob', '말랑이 인형', 3000, '#F7B6D8'], ['bag', '천가방', 5000, '#FFB36B']] },
      ],
      lead: '레트로 분위기의 시장을 누비며 보물을 찾는 장터 쇼핑 경험이에요.',
      body: ['원하는 물건을 고르고 흥정한 뒤 영수증으로 쇼핑 결과를 확인해보세요.'] },
  ],
  food: [
    { t: '토마토 마라탕', type: 'dish', mode: 'pick', base: '#E8603A',
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2]],
      lead: '상큼한 토마토 국물에 얼얼한 마라를 더해 누구나 즐기는 퓨전 국물 요리예요.',
      body: ['그릇에 담긴 재료를 눌러 한입씩 맛있게 베어 먹고 국물도 한 모금 마셔보세요.'] },
    { t: '한정선 수제 찹쌀떡', type: 'dish', mode: 'fixed',
      items: [['딸기 찹쌀떡', 'mochi_strawberry', 3], ['귤 찹쌀떡', 'mochi_mandarin', 3], ['샤인머스캣 찹쌀떡', 'mochi_muscat', 3], ['복숭아 찹쌀떡', 'mochi_peach', 3]],
      lead: '제철 과일 단면이 살아있는 수제 과일 찹쌀떡 디저트예요.',
      body: ['긴 타원형 도자기 접시에 담긴 찹쌀떡을 베어물어 싱싱한 과일 단면과 쫀득함을 경험하세요.'] },
    { t: '피자 설기', type: 'pizza',
      lead: '담백한 사각 백설기 떡 위에 치즈와 피자 토핑을 올려 구운 퓨전 떡이에요.',
      body: ['사각 떡 보드 위의 피자 설기 조각을 누르면 실제 베어문 자국이 남으며 꼬들하게 베어 먹을 수 있습니다.'] },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '짜게 끓여 면을 건진 뒤 꼬들하게 말려 먹는 별미 라면 방법이에요.',
      body: ['직접 라면을 끓이고 부채질로 면을 말린 뒤 한입씩 꼬들한 식감으로 베어 먹어보세요.'] },
  ],
  fashion: [
    { t: '옥 스타일링', type: 'jade',
      lead: '단아한 옥을 현대적인 전신 스타일링 소품으로 감각 있게 매치하는 패션이에요.',
      body: ['다양한 스타일의 의상과 기품 있는 옥 액세서리를 코디하여 전신 스타일을 완성하세요.'] },
    { t: '메지루시', type: 'decor_mejirusi',
      items: [{ n: '우산', a: 'umb' }, { n: '가방', a: 'bag' }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00'],
      parts: ['star', 'heart', 'flower', 'bow'],
      lead: '우산과 가방에 귀여운 메지루시 참을 달아 내 물건임을 표시하는 링 스타일링이에요.',
      body: ['체인 링 참을 우산이나 가방 원하는 위치로 끌어다 걸어보세요.'] },
    { t: '젤리슈즈 꾸미기', type: 'jelly_shoes',
      colors: ['#E8EBF0', '#F7A8D8', '#9CCBF5', '#FFE16B'],
      parts: ['star', 'heart', 'flower', 'bow', 'gem'],
      lead: '그물 메쉬 젤리슈즈에 마음에 드는 지비츠 파츠를 찾아 드래그하여 꾸미는 유행이에요.',
      body: ['하단 트레이에서 파츠를 선택해 메쉬 젤리 슈즈의 홈에 장착해보세요.'] },
    { t: '볼펜 꾸미기', type: 'decor_pen',
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#1C1C20', '#7BE0B0'],
      parts: ['star', 'heart', 'flower', 'bow', 'gem'],
      lead: '하트 레일 볼펜 상단에 매력적인 파츠를 직접 끌어다 꾸미는 문구 꾸미기예요.',
      body: ['하단 트레이의 다양한 파츠를 드래그하여 볼펜 상단 비즈 프레임에 달아보세요.'] },
  ],
};

/* ---------------- 아트 SVG 디자이너 ---------------- */
const ART = {
  /* 16. 연결성 올바른 우산 일러스트 */
  umb: c => `
    <g transform="translate(40,20)">
      <!-- 꼭지 -->
      <path d="M 140 30 L 140 45" stroke="${K}" stroke-width="5" stroke-linecap="round"/>
      <!-- 캐노피 우산 천 -->
      <path d="M 30 160 Q 140 30 250 160 Q 200 145 160 160 Q 140 145 120 160 Q 80 145 30 160 Z" fill="${c}" stroke="${K}" stroke-width="3"/>
      <path d="M 140 45 Q 90 110 75 158 M 140 45 Q 140 110 140 160 M 140 45 Q 190 110 205 158" stroke="${K}" stroke-width="2" fill="none"/>
      <!-- 샤프트 우산대 및 손잡이 -->
      <path d="M 140 160 L 140 250 Q 140 275 115 275" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/>
    </g>`,
  bag: c => `<g transform="translate(50,30)"><path d="M 80 100 Q 120 40 160 100" stroke="${K}" stroke-width="8" fill="none"/><rect x="50" y="95" width="140" height="150" rx="16" fill="${c}" stroke="${K}" stroke-width="3"/></g>`,
  
  /* 17. 리얼한 그물 메쉬 젤리슈즈 일러스트 */
  shoe: c => `
    <g transform="translate(30, 25)">
      <ellipse cx="180" cy="150" rx="125" ry="85" fill="${c}" fill-opacity="0.35" stroke="${K}" stroke-width="3"/>
      <ellipse cx="180" cy="150" rx="100" ry="65" fill="none" stroke="${K}" stroke-width="2" stroke-dasharray="5 4"/>
      <!-- 스트랩 & 버클 -->
      <path d="M 110 95 Q 180 130 250 105" stroke="${c}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M 110 95 Q 180 130 250 105" stroke="${K}" stroke-width="2" fill="none"/>
      <rect x="220" y="95" width="16" height="16" rx="4" fill="#fff" stroke="${K}" stroke-width="2"/>
      <!-- 격자 그물 패턴 -->
      <path d="M 90 110 L 110 210 M 130 80 L 150 225 M 170 70 L 190 230 M 210 70 L 230 225 M 250 90 L 265 200" stroke="${K}" stroke-width="1.8" opacity="0.65"/>
      <path d="M 80 130 C 150 115, 220 115, 275 135 M 85 160 C 150 145, 220 145, 270 165 M 95 185 C 150 175, 210 175, 255 185" stroke="${K}" stroke-width="1.8" opacity="0.65"/>
    </g>`,
    
  /* 14. 하트 비즈 레일 볼펜 일러스트 */
  pen: c => `
    <g transform="translate(130, 15)">
      <!-- 하트 비즈 프레임 -->
      <path d="M 50 80 C 10 20, -30 70, 50 130 C 130 70, 90 20, 50 80 Z" fill="none" stroke="${K}" stroke-width="6"/>
      <path d="M 50 80 C 10 20, -30 70, 50 130 C 130 70, 90 20, 50 80 Z" fill="none" stroke="#F65AC2" stroke-width="3"/>
      <circle cx="20" cy="50" r="5" fill="#fff" stroke="${K}"/><circle cx="80" cy="50" r="5" fill="#fff" stroke="${K}"/>
      <circle cx="10" cy="75" r="5" fill="#F65AC2" stroke="${K}"/><circle cx="90" cy="75" r="5" fill="#F65AC2" stroke="${K}"/>
      <!-- 축 및 펜촉 -->
      <rect x="42" y="130" width="16" height="160" rx="8" fill="${c}" stroke="${K}" stroke-width="2.5"/>
      <polygon points="42,290 58,290 50,320" fill="#B9BFC9" stroke="${K}" stroke-width="2"/>
    </g>`
};

/* ---------------- 인터랙션 모듈 ---------------- */
const X = {
  /* 10. 말랑이 & 왁뿌볼 (얼굴 제거, 유행 모양 비누/감자/치즈/냥발, 리얼 소리 및 질감) */
  squish_wax(st, bar) {
    let mode = 'm', shp = 'soap', mat = 0, n = 0, hold = 0, broken = false, col = '#9CCBF5', iv;
    const SH = [['비누', 'soap'], ['감자', 'potato'], ['치즈', 'cheese'], ['냥발', 'paw']];
    const MT = [['일반', 180, 9, 'normal'], ['크런치', 280, 6, 'crunch'], ['샤베트', 30, 12, 'sherbet']];
    
    const draw = () => {
      bar.innerHTML = `<div class="grp"><em>종류</em><button class="chip${mode === 'm' ? ' on' : ''}" data-m="m">말랑이</button><button class="chip${mode === 'w' ? ' on' : ''}" data-m="w">왁뿌볼</button></div>` +
        (mode === 'm' ? `<div class="grp"><em>질감</em>${MT.map((m, i) => `<button class="chip${i === mat ? ' on' : ''}" data-t="${i}">${m[0]}</button>`).join('')}</div>` : '');
      if (mode === 'm') renderSquish(); else renderWax();
    };

    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.m) mode = b.dataset.m; if (b.dataset.t) mat = +b.dataset.t; draw(); };

    function renderSquish() {
      const sv = (n, cls) => `<svg class="${cls}" viewBox="0 0 48 48">${I[n]()}</svg>`;
      st.innerHTML = `<div class="sqwrap"><div class="sq3">${sv(shp, 'sq3-svg')}</div></div><div class="thumbs">${SH.map(s => `<button class="thb${s[1] === shp ? ' on' : ''}" data-s="${s[1]}">${sv(s[1], 'th')}</button>`).join('')}</div><div class="count">만진 횟수 <b id="n">${n}</b></div><p class="hint">꾹 눌렀다 놓아보세요 · 선택한 질감에 맞게 반응해요</p>`;
      
      const el = $('.sq3', st); let sx = 1, sy = 1, vx = 0, vy = 0, tx = 1, ty = 1;
      const [, k, cd, soundType] = MT[mat];
      const loop = () => {
        if (!el.isConnected) return;
        const dt = 1 / 60; vx += (-k * (sx - tx) - cd * vx) * dt; vy += (-k * (sy - ty) - cd * vy) * dt;
        sx += vx * dt; sy += vy * dt; el.style.transform = `scale(${sx},${sy})`;
        requestAnimationFrame(loop);
      };
      loop();
      const up = () => { if (ty !== 1) { n++; $('#n', st).textContent = n; } tx = ty = 1; };
      el.onpointerdown = () => { tx = 1.3; ty = .6; playSquishSound(soundType); };
      el.onpointerup = up; el.onpointerleave = up;
      $$('.thb', st).forEach(b => b.onclick = () => { shp = b.dataset.s; renderSquish(); });
    }

    function renderWax() {
      st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.8"><path class="k1" d="M52 6 L45 28 L55 40 L48 58"/><path class="k2" d="M30 20 L38 38 L24 52 L30 74"/><path class="k3" d="M80 24 L70 34 L84 52 L76 70"/></svg></div></div></div><div class="count" id="pr">꾹 누르면 와작 깨져요</div><p class="hint">14. 왁스가 깨진 후에도 계속 눌러서 놀거나 새 왁뿌볼을 꺼낼 수 있어요</p>`;
      const wx = $('#wx', st), pr = $('#pr', st), wrap = wx.parentElement;
      const shatter = () => { $('.shell', wx).remove(); for (let i = 0; i < 14; i++) { const a = Math.random() * 6.28, d = 90 + Math.random() * 90; wrap.insertAdjacentHTML('beforeend', `<i class="shard" style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg;--c:${col}"></i>`); } setTimeout(() => $$('.shard', wrap).forEach(x => x.remove()), 1000); };
      const stop = () => clearInterval(iv);
      wx.onpointerdown = () => {
        wx.classList.add('sq'); playSquishSound('normal');
        iv = setInterval(() => {
          if (broken) { playSquishSound('normal'); return; }
          hold++;
          if (hold === 4) { wx.classList.add('l1'); crunch(); pr.textContent = '사삭… 금이 갔어요'; }
          if (hold === 8) { wx.classList.add('l2'); crunch(); pr.textContent = '조금만 더!'; }
          if (hold === 12) { broken = true; shatter(); crunch(); pr.textContent = '와작! 깨진 속도 말랑말랑해요'; }
        }, 130);
      };
      wx.onpointerup = stop; wx.onpointerleave = stop;
    }
    draw();
  },

  /* 11 & 12. 키캡 & 피젯 카운터 클릭커 */
  keycap_clicker(st, bar) {
    let mode = 'k', sc = 0;
    const L = ['A', '2', 'Z', 'C', 'L', 'I', 'C', 'K'];

    const draw = () => {
      bar.innerHTML = `<div class="grp"><em>종류</em><button class="chip${mode === 'k' ? ' on' : ''}" data-m="k">키캡</button><button class="chip${mode === 'c' ? ' on' : ''}" data-m="c">피젯 카운터</button></div>`;
      if (mode === 'k') renderKeys(); else renderFidgetCounter();
    };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (b && b.dataset.m) { mode = b.dataset.m; draw(); } };

    function renderKeys() {
      let typed = '';
      st.innerHTML = `<div class="say" id="ty">키를 눌러 글자를 쳐보세요</div><div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><p class="hint">11. 노란색 입체 키캡으로 시각적 명암 반응과 딸깍 소리가 선명해요</p>`;
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { playKeycapSound(); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); typed = (typed + L[i]).slice(-14);$('#ty', st).textContent = typed; });
    }

    function renderFidgetCounter() {
      st.innerHTML = `
        <div class="fidget-clicker">
          <div class="counter-display" id="cd">000000</div>
          <button class="click-btn" id="cb">CLICK!</button>
        </div>
        <p class="hint">12. 리얼 피젯 스위치 물리 카운터 토이예요</p>`;
      $('#cb', st).onclick = () => {
        sc++; playKeycapSound();
        $('#cd', st).textContent = String(sc).padStart(6, '0');
      };
    }
    draw();
  },

  /* 13. 리얼 파스텔 탱글 (사진 14 참고) */
  tangle(st, bar) {
    st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">13. 파스텔톤 곡선 마디를 잡고 부드럽게 비틀고 꺾어보세요</p>';
    const cv = $('canvas', st), x = cv.getContext('2d'), dp = Math.min(devicePixelRatio, 2), w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * dp; cv.height = h * dp; x.scale(dp, dp);
    const n = 28, P = [];
    for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n; P.push([w / 2 + w * .32 * Math.cos(t), h / 2 + h * .25 * Math.sin(t * 2)]); }
    let d = -1;
    const at = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.onpointerdown = e => { const q = at(e); let m = 60; P.forEach((p, i) => { const k = Math.hypot(p[0] - q[0], p[1] - q[1]); if (k < m) { m = k; d = i; } }); cv.setPointerCapture(e.pointerId); playSquishSound('normal'); };
    cv.onpointermove = e => { if (d < 0) return; const q = at(e); P[d] = [q[0], q[1]]; };
    cv.onpointerup = () => d = -1;
    
    const step = () => {
      if (!cv.isConnected) return;
      x.clearRect(0, 0, w, h); x.lineCap = x.lineJoin = 'round';
      const colors = ['#F7A8D8', '#9CCBF5', '#B79CFF', '#7BE0B0'];
      for (let i = 0; i < n; i++) {
        x.strokeStyle = colors[i % 4]; x.lineWidth = w * 0.05;
        x.beginPath(); x.moveTo(...P[i]); x.lineTo(...P[(i + 1) % n]); x.stroke();
      }
      requestAnimationFrame(step);
    };
    step();
    bar.innerHTML = '<span class="hint">파스텔 피젯 탱글 루프</span>';
  },

  /* 동묘 쇼핑 */
  flea(st, bar, c) {
    let sh = 0, sel = null, basket = [], rc = false;
    const spent = () => basket.reduce((a, b) => a + b.p, 0);
    const render = () => {
      if (rc) {
        st.innerHTML = `<div class="receipt"><h4>동묘 구제시장</h4><small>오늘의 쇼핑 영수증</small><hr>${basket.length ? basket.map(b => `<div class="rl"><span>${b.n}</span><span>${won(b.p)}</span></div>`).join('') : '<div class="rl"><span>산 물건 없음</span><span>-</span></div>'}<hr><div class="rl"><b>합계</b><b>${won(spent())}</b></div><div class="rl"><span>남은 돈</span><span>${won(c.budget - spent())}</span></div><hr><small>*** 또 오세요 ***</small></div><button class="bigbtn" data-a="back">다시 쇼핑하기</button>`;
        return;
      }
      const s = c.shops[sh];
      const deal = sel ? `<b>${s.items[sel.i][1]}</b> ${won(sel.p)} <button class="chip" data-a="buy">${basket.some(b => b.n === s.items[sel.i][1]) ? '환불' : '사기'}</button><button class="chip" data-a="hag" ${sel.tried ? 'disabled' : ''}>깎아달라고 하기</button><div class="hint">${sel.m || ''}</div>` : '<span class="hint">물건을 눌러 가격을 확인하고 흥정해보세요</span>';
      st.innerHTML = `<div class="stallname">${s.n}</div><div class="shelf">${s.items.map((it, i) => `<button class="item${basket.some(b => b.n === it[1]) ? ' in' : ''}${sel && sel.i === i ? ' pick' : ''}" data-i="${i}">${ic(it[0], it[3])}<small>${it[1]}<br>${won(it[2])}</small></button>`).join('')}</div><div class="deal">${deal}</div><div class="count">장바구니 ${basket.length}개 · 남은 돈 ${won(c.budget - spent())}</div>`;
    };
    const bars = () => { bar.innerHTML = rc ? '' : `<div class="grp"><em>가게 이동</em>${c.shops.map((s, i) => `<button class="chip${i === sh ? ' on' : ''}" data-s="${i}">${s.n}</button>`).join('')}</div>` + `<div class="grp"><button class="chip" data-a="rc">영수증 보기</button><button class="chip" data-a="clr">비우기</button></div>`; };
    const act = e => {
      const b = e.target.closest('button'); if (!b) return; const d = b.dataset, s = c.shops[sh];
      if (d.s !== undefined) { sh = +d.s; sel = null; }
      if (d.i !== undefined && b.classList.contains('item')) { const it = s.items[+d.i]; const had = basket.find(x => x.n === it[1]); sel = { i: +d.i, p: had ? had.p : it[2], tried: !!had }; }
      if (d.a === 'hag' && sel && !sel.tried) { sel.tried = true; sel.p = Math.round(s.items[sel.i][2] * 0.85); sel.m = '“이 가격에 가져가세요!” 깎았어요'; }
      if (d.a === 'buy' && sel) { const it = s.items[sel.i], at = basket.findIndex(x => x.n === it[1]); if (at > -1) basket.splice(at, 1); else if (spent() + sel.p <= c.budget) { basket.push({ n: it[1], p: sel.p }); sel = null; } }
      if (d.a === 'rc') rc = true; if (d.a === 'back') rc = false; if (d.a === 'clr') { basket = []; sel = null; }
      bars(); render();
    };
    st.onclick = act; bar.onclick = act; bars(); render();
  },

  /* 5. 토마토 마라탕 & 6. 한정선 수제 과일 찹쌀떡 인터랙션 */
  dish(st, bar, c) {
    if (c.mode === 'fixed') {
      /* 6. 긴 타원형 접시 + 단면 과일 찹쌀떡 베어물기 인터랙션 */
      st.innerHTML = `<div class="plate-oval" id="pl"></div><div class="count">한정선 수제 과일 찹쌀떡</div><p class="hint">6. 과일 찹쌀떡을 누르면 실제 베어문 자국이 생기며 맛있게 베어 먹혀요</p>`;
      const pl = $('#pl', st);
      c.items.forEach(it => {
        const el = piece(I[it[1]](), it[2], () => {}, () => {});
        el.title = it[0]; pl.appendChild(el);
      });
      bar.innerHTML = '<button class="chip" id="rs">새 접시 가져오기</button>';
      $('#rs', bar).onclick = () => X.dish(st, bar, c);
    } else {
      /* 5. 토마토 마라탕 정상 작동 구현 */
      let live = new Map();
      st.innerHTML = `<div class="bowl-container"><div class="plate-maratang"><div class="soup-level" id="sp"></div></div></div><div class="count" id="ct">담은 재료 0개</div><p class="hint">5. 아래 재료를 눌러 마라탕 그릇에 담고 한입씩 먹어보세요</p>`;
      const sp = $('.plate-maratang', st);
      const upd = () => { $('#ct', st).textContent = `담은 재료 ${live.size}개`; };
      bar.innerHTML = `<div class="grp"><em>재료</em>${c.items.map(it => `<button class="chip" data-k="${it[0]}">${it[0]}</button>`).join('')}</div>`;
      bar.onclick = e => {
        const b = e.target.closest('.chip'); if (!b || !b.dataset.k) return;
        const it = c.items.find(x => x[0] === b.dataset.k);
        if (live.has(it[0])) { live.get(it[0]).remove(); live.delete(it[0]); b.classList.remove('on'); }
        else {
          const el = piece(I[it[1]](), it[3], () => {}, () => { live.delete(it[0]); upd(); });
          el.style.position = 'absolute'; el.style.left = (30 + Math.random() * 40) + '%'; el.style.top = (30 + Math.random() * 40) + '%';
          sp.appendChild(el); live.set(it[0], el); b.classList.add('on'); playSquishSound('normal');
        }
        upd();
      };
    }
  },

  /* 7. 피자설기 : 사각 떡 피자 보드 & 베어물기 인터랙션 */
  pizza(st, bar) {
    st.innerHTML = `<div class="pizza-board" id="pb"></div><div class="count">사각 피자설기</div><p class="hint">7. 사각 떡 조각을 베어 먹어보세요</p>`;
    const pb = $('#pb', st);
    for (let i = 0; i < 4; i++) {
      const pieceHtml = `<svg class="ic" viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="6" fill="#FDFBF7" stroke="${K}" stroke-width="2"/><rect x="8" y="8" width="32" height="32" rx="4" fill="#FFD84D"/><circle cx="20" cy="20" r="5" fill="#E8472B"/><circle cx="30" cy="30" r="5" fill="#E8472B"/><circle cx="30" cy="18" r="3" fill="#3F4A2A"/></svg>`;
      const el = piece(pieceHtml, 3, () => {}, () => {});
      pb.appendChild(el);
    }
    bar.innerHTML = '<button class="chip" id="rs">새 피자설기 가져오기 🍕</button>';
    $('#rs', bar).onclick = () => X.pizza(st, bar);
  },

  /* 8. 라면 말려먹기 */
  ramen(st, bar) {
    let step = 0, dry = 0;
    const render = () => {
      if (step === 0) {
        st.innerHTML = `<svg class="rm" viewBox="0 0 300 200"><ellipse cx="150" cy="130" rx="120" ry="55" fill="#FEFEFE" stroke="${K}" stroke-width="2.5"/><path d="M60 125Q150 90 240 125" stroke="#FFD23F" stroke-width="10" stroke-linecap="round"/></svg><button class="bigbtn" id="boil">라면 끓여서 면 건지기</button><p class="hint">8. 클릭하여 진행해보세요</p>`;
        $('#boil', st).onclick = () => { step = 1; render(); };
      } else {
        st.innerHTML = `<div id="nd"></div><div class="count">말린 정도: <b id="dr">0%</b></div><button class="bigbtn" id="fan">부채질해서 말리기</button><p class="hint">면을 눌러 먹어보세요</p>`;
        const nd = $('#nd', st);
        const ramenPiece = piece(`<svg class="ic" viewBox="0 0 48 48"><ellipse cx="24" cy="28" rx="20" ry="10" fill="#FEFEFE" stroke="${K}" stroke-width="2"/><path d="M10 26Q24 20 38 26" stroke="#FFD23F" stroke-width="5" stroke-linecap="round"/></svg>`, 4, () => {}, () => {});
        nd.appendChild(ramenPiece);
        $('#fan', st).onclick = () => { dry = Math.min(100, dry + 25); $('#dr', st).textContent = dry + '%'; crunch(); };
      }
    };
    bar.innerHTML = '<button class="chip" id="rs">다시 끓이기</button>';
    $('#rs', bar).onclick = () => { step = 0; dry = 0; render(); };
    render();
  },

  /* 10 & 15. 옥 코디 전신 스타일링 */
  jade(st, bar) {
    const TN = [['백옥', '#F2FBF6', '#CDEBDB'], ['비취옥', '#C9F5E1', '#5FCFA0'], ['녹옥', '#8FDCB0', '#2FA06A']];
    const OF = [['블랙 니트', '#1C1C20'], ['화이트 셔츠', '#FEFEFE'], ['핑크 원피스', '#F9B8E0'], ['트렌치 코트', '#D8B58A'], ['현대 한복', '#9CCBF5']];
    let ti = 1, of = 0;
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 240 360"></svg><div class="say" id="say"></div>';
    const draw = () => {
      const t = TN[ti], o = OF[of][1];
      $('#sc', st).innerHTML = `
        <defs><radialGradient id="jg"><stop offset="0%" stop-color="${t[1]}"/><stop offset="100%" stop-color="${t[2]}"/></radialGradient></defs>
        <!-- 단정한 포니테일 머리와 자연스러운 전신 마네킹 -->
        <path d="M 110 25 C 90 10, 150 10, 130 25 C 150 45, 90 45, 110 25 Z" fill="#2A2B31"/>
        <circle cx="120" cy="45" r="16" fill="#F2CDB5"/>
        <rect x="115" y="60" width="10" height="12" fill="#F2CDB5"/>
        <path d="M 85 72 L 155 72 L 165 190 L 75 190 Z" fill="${o}" stroke="${K}" stroke-width="2.5"/>
        <rect x="95" y="190" width="20" height="120" fill="${o === '#F9B8E0' ? '#F2CDB5' : '#1C1C20'}" stroke="${K}" stroke-width="1.8"/>
        <rect x="125" y="190" width="20" height="120" fill="${o === '#F9B8E0' ? '#F2CDB5' : '#1C1C20'}" stroke="${K}" stroke-width="1.8"/>
        <ellipse cx="105" cy="315" rx="12" ry="6" fill="${K}"/>
        <ellipse cx="135" cy="315" rx="12" ry="6" fill="${K}"/>
        <path d="M 108 72 Q 120 100 132 72" fill="none" stroke="url(#jg)" stroke-width="4.5" stroke-linecap="round"/>
        <circle cx="76" cy="150" r="7" fill="none" stroke="url(#jg)" stroke-width="4"/>
      `;
      $('#say', st).textContent = `${OF[of][0]} × ${t[0]}`;
    };
    const rows = () => {
      bar.innerHTML = `<div class="grp"><em>의상</em>${OF.map((o, i) => `<button class="chip${i === of ? ' on' : ''}" data-o="${i}">${o[0]}</button>`).join('')}</div>` +
        `<div class="grp"><em>옥빛</em>${TN.map((t, i) => `<button class="chip${i === ti ? ' on' : ''}" data-t="${i}">${t[0]}</button>`).join('')}</div>`;
    };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.o) of = +b.dataset.o; if (b.dataset.t) ti = +b.dataset.t; rows(); draw(); };
    rows(); draw();
  },

  /* 16. 메지루시 드래그 스타일링 */
  decor_mejirusi(st, bar, c) {
    let it = 0, col = 0, ch = [];
    st.innerHTML = `<svg id="sc" class="scene dgs" viewBox="0 0 360 300"></svg>
      <div class="parts-tray">${c.parts.map(p => `<div class="tray-item" data-k="${p}">${ic(p)}</div>`).join('')}</div>
      <p class="hint">16. 아래 메지루시 참을 드래그하여 우산/가방 소품에 직접 달아보세요</p>`;
    const svg = $('#sc', st);
    const draw = () => {
      svg.innerHTML = ART[c.items[it].a](c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><circle cx="0" cy="-12" r="8" fill="none" stroke="#7CC6FB" stroke-width="2"/><g transform="translate(-16 -16) scale(0.7)">${I[p.k]()}</g></g>`).join('');
    };
    bar.innerHTML = `<div class="grp"><em>소품</em>${c.items.map((x, i) => `<button class="chip${i === it ? ' on' : ''}" data-it="${i}">${x.n}</button>`).join('')}</div>`;
    bar.onclick = e => { const b = e.target.closest('.chip'); if (b && b.dataset.it) { it = +b.dataset.it; draw(); } };

    let drag = null;
    st.onpointerdown = e => {
      const tr = e.target.closest('.tray-item');
      if (tr) { const p = { id: Date.now(), k: tr.dataset.k, x: 180, y: 150 }; ch.push(p); draw(); playSquishSound('normal'); }
      const g = e.target.closest('.dg'); if (g) drag = ch.find(x => x.id == g.dataset.id);
    };
    st.onpointermove = e => {
      if (!drag) return; const r = svg.getBoundingClientRect();
      drag.x = Math.max(30, Math.min(330, e.clientX - r.left)); drag.y = Math.max(30, Math.min(270, e.clientY - r.top)); draw();
    };
    st.onpointerup = () => drag = null;
    draw();
  },

  /* 17. 젤리슈즈 지비츠 드래그 꾸미기 */
  jelly_shoes(st, bar, c) {
    let col = 0, ch = [];
    st.innerHTML = `<svg id="sc" class="scene dgs" viewBox="0 0 360 300"></svg>
      <div class="parts-tray">${c.parts.map(p => `<div class="tray-item" data-k="${p}">${ic(p)}</div>`).join('')}</div>
      <p class="hint">17. 파츠를 잡아서 젤리 슈즈 그물 위에 끌어다 얹어보세요</p>`;
    
    const svg = $('#sc', st);
    const draw = () => {
      svg.innerHTML = ART.shoe(c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><g transform="translate(-16 -16) scale(0.75)">${I[p.k]()}</g></g>`).join('');
    };

    bar.innerHTML = `<div class="grp"><em>색상</em>${c.colors.map((x, i) => `<button class="sw${i === col ? ' on' : ''}" data-c="${i}" style="background:${x}"></button>`).join('')}</div>`;
    bar.onclick = e => { const b = e.target.closest('.sw'); if (b) { col = +b.dataset.c; draw(); } };

    let drag = null;
    st.onpointerdown = e => {
      const tr = e.target.closest('.tray-item');
      if (tr) { const p = { id: Date.now(), k: tr.dataset.k, x: 180, y: 150 }; ch.push(p); draw(); playSquishSound('normal'); }
      const g = e.target.closest('.dg'); if (g) drag = ch.find(x => x.id == g.dataset.id);
    };
    st.onpointermove = e => {
      if (!drag) return; const r = svg.getBoundingClientRect();
      drag.x = Math.max(30, Math.min(330, e.clientX - r.left)); drag.y = Math.max(30, Math.min(270, e.clientY - r.top)); draw();
    };
    st.onpointerup = () => drag = null;
    draw();
  },

  /* 14. 하트 비즈 레일 볼펜 꾸미기 */
  decor_pen(st, bar, c) {
    let col = 0, ch = [];
    st.innerHTML = `<svg id="sc" class="scene dgs" viewBox="0 0 360 340"></svg>
      <div class="parts-tray">${c.parts.map(p => `<div class="tray-item" data-k="${p}">${ic(p)}</div>`).join('')}</div>
      <p class="hint">14. 파츠를 드래그하여 볼펜 상단 하트 프레임에 달아보세요</p>`;
    
    const svg = $('#sc', st);
    const draw = () => {
      svg.innerHTML = ART.pen(c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><g transform="translate(-16 -16) scale(0.75)">${I[p.k]()}</g></g>`).join('');
    };

    bar.innerHTML = `<div class="grp"><em>펜 색상</em>${c.colors.map((x, i) => `<button class="sw${i === col ? ' on' : ''}" data-c="${i}" style="background:${x}"></button>`).join('')}</div>`;
    bar.onclick = e => { const b = e.target.closest('.sw'); if (b) { col = +b.dataset.c; draw(); } };

    let drag = null;
    st.onpointerdown = e => {
      const tr = e.target.closest('.tray-item');
      if (tr) { const p = { id: Date.now(), k: tr.dataset.k, x: 180, y: 80 }; ch.push(p); draw(); playKeycapSound(); }
      const g = e.target.closest('.dg'); if (g) drag = ch.find(x => x.id == g.dataset.id);
    };
    st.onpointermove = e => {
      if (!drag) return; const r = svg.getBoundingClientRect();
      drag.x = Math.max(30, Math.min(330, e.clientX - r.left)); drag.y = Math.max(30, Math.min(310, e.clientY - r.top)); draw();
    };
    st.onpointerup = () => drag = null;
    draw();
  }
};

/* ---------------- 화면 라우터 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

/* 1 & 4. 메인 화면 : 손가락 애니메이션 복원, 가독성 높은 카드형 3D 배치 */
function home() {
  const ks = Object.keys(CATS);
  app.innerHTML = `
    <section class="view space">
      <div class="home-container">
        ${ks.map(k => `
          <a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}">
            <div class="txt">
              <span class="tagp ${k}">${LAB[k]}</span>
              <h2>${CATS[k].n}</h2>
              <p>${CATS[k].d}</p>
            </div>
            <div class="shape-wrap">
              <div class="shape">${BLOB[k]}</div>
            </div>
            <span class="view-more">VIEW →</span>
          </a>
        `).join('')}
      </div>
      <div class="ripple"></div>
      <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.8" stroke-linejoin="round"/></svg>
      <div class="tip">오브젝트를 클릭해보세요</div>
    </section>`;
  const sp = $('.space');
  space3d(sp);
  tutorial(sp);
}

/* 1. 마우스 클릭 튜토리얼 손가락 애니메이션 작동 */
async function tutorial(sp) {
  const cur = $('.cursor', sp), rp =$('.ripple', sp), tip = $('.tip', sp), cards =$$('.hb', sp);
  if (!cur || !cards.length) return;
  let stop = false, i = 0;
  cards.forEach(c => c.addEventListener('pointerenter', () => { stop = true; cur.remove(); rp.remove(); tip.classList.add('off'); }));
  await sleep(800);
  while (!stop && sp.isConnected && cur.isConnected) {
    const card = cards[i++ % 3], r = card.getBoundingClientRect(), s = sp.getBoundingClientRect();
    const x = r.left - s.left + r.width * 0.5, y = r.top - s.top + r.height * 0.6;
    try {
      await cur.animate([{ transform: `translate(${s.width * .5}px,${s.height * .9}px)`, opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(${x}px,${y}px)`, opacity: 1 }], { duration: 1400, easing: 'ease-in-out', fill: 'forwards' }).finished;
      if (stop) break;
      rp.style.left = x + 'px'; rp.style.top = y + 'px';
      rp.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(2.2)', opacity: 0 }], 600);
      await sleep(1000); if (stop) break;
    } catch (e) { break; }
  }
}

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2"><div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `<a class="c2" href="#/t/${k}/${i}"><div class="ph"></div><div class="ct"><h3>${t.t}</h3><p>${t.lead}</p><span class="view-more">VIEW MORE →</span></div></a>`).join('')}</div></section>`;
}

function trend(k, i) {
  const list = T[k], t = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
  app.innerHTML = `<section class="view tpage"><div class="tw"><a class="back" href="#/cat/${k}">← ${CATS[k].n} 목록</a>
    <h1>${t.t}</h1><p class="lead">${t.lead}</p>${t.body.map(p => `<p class="tx">${p}</p>`).join('')}
    <div class="stage-wrap"><div class="stage" id="st"></div><div class="stage-bar" id="bar"></div></div>
    <div class="pager"><a href="#/t/${k}/${(i + list.length - 1) % list.length}">← ${prev.t}</a><a href="#/t/${k}/${(i + 1) % list.length}">${next.t} →</a></div></div></section>`;
  X[t.type]($('#st'), $('#bar'), t);
}

function route() {
  const [a, k, i] = location.hash.replace('#/', '').split('/');
  const cat = a === 'cat' || a === 't' ? (CATS[k] ? k : null) : null;
  document.body.className = cat ? '' : 'home'; document.body.dataset.c = cat || '';
  nav.innerHTML = Object.keys(CATS).map(c => `<a href="#/cat/${c}" class="${c === cat ? 'on' : ''}">${CATS[c].n}</a>`).join('');
  scrollTo(0, 0);
  if (!cat) home(); else if (a === 'cat') category(k); else trend(k, +i || 0);
}
addEventListener('hashchange', route);
route();

/* 2 & 3. 3D 모델링 크기 및 렌더링 품질 완전 보정 */
function space3d(sp) {
  if (typeof THREE === 'undefined') return;
  let R; try { R = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.outputEncoding = THREE.sRGBEncoding;
  const cv = R.domElement; cv.className = 'gl'; sp.appendChild(cv);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, .1, 100); cam.position.z = 10;
  
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(4, 6, 8); scene.add(dl);
  const S = r => new THREE.SphereGeometry(r, 32, 24), B = (x, y, z) => new THREE.BoxGeometry(x, y, z);
  const add = (g, geo, col, pos = [0, 0, 0], sc = [1, 1, 1]) => {
    const m = new THREE.Mesh(geo, typeof col === 'object' ? col : new THREE.MeshStandardMaterial({ color: col, roughness: .35 }));
    m.position.set(...pos); m.scale.set(...sc); g.add(m); return m;
  };
  
  const food = g => {
    add(g, new THREE.LatheGeometry([[0, -.7], [.55, -.7], [.9, -.45], [1.25, .35], [1.32, .5], [1.2, .5], [.85, -.3], [0, -.35]].map(p => new THREE.Vector2(...p)), 48),
      new THREE.MeshStandardMaterial({ color: 0xFFEA00, roughness: .3, side: THREE.DoubleSide }));
    add(g, new THREE.CircleGeometry(1.1, 40), 0xE8472B, [0, .3, 0]).rotation.x = -Math.PI / 2;
  };
  const play = g => {
    add(g, S(1), 0x1C94F5, [0, 0, 0], [1.45, .45, .85]);
    [-1, 1].forEach(s => add(g, S(1), 0x1C94F5, [s * 1.0, -.02, .62], [.5, .42, .95]));
  };
  const fashion = g => {
    add(g, new THREE.SphereGeometry(1.1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xF65AC2, roughness: .4, side: THREE.DoubleSide }), [0, 0, 0], [1, .9, 1]);
  };
  
  const objs = [['food', food, .4, 0], ['play', play, .8, 0], ['fashion', fashion, .3, .1]].map(([k, fn, tx, ty]) => {
    const root = new THREE.Group(), tilt = new THREE.Group(), spin = new THREE.Group();
    fn(spin); tilt.rotation.x = tx; tilt.position.y = ty; tilt.add(spin); root.add(tilt); scene.add(root);
    const b = $(`.hb.${k}`, sp);
    return { root, tilt, spin, tx, h: 0, yaw: 0, b, sh: $('.shape', b) };
  });

  let W, H, pu;
  const size = () => { W = sp.clientWidth; H = sp.clientHeight; R.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); pu = H / 8.284; };
  size(); const ro = new ResizeObserver(size); ro.observe(sp);

  const mouse = { x: 0, y: 0 }; let hov = -1, t0 = performance.now();
  sp.addEventListener('pointermove', e => { const r = sp.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width - .5; mouse.y = (e.clientY - r.top) / r.height - .5; });

  const tick = t => {
    if (!sp.isConnected) { ro.disconnect(); R.dispose(); return; }
    const d = Math.min((t - t0) / 1000, .05); t0 = t;
    const sr = sp.getBoundingClientRect();
    objs.forEach((o, i) => {
      const r = o.sh.getBoundingClientRect();
      const cx = r.left - sr.left + r.width / 2, cy = r.top - sr.top + r.height / 2;
      /* 2. 왜곡 없는 또렷하고 명확한 오브젝트 크기 비율 */
      const s = Math.min(r.width, r.height) * 1.1 / (3.3 * pu);
      o.h += ((hov === i ? 1 : 0) - o.h) * .1;
      o.yaw += d * o.h * 0.4;
      o.root.scale.setScalar(s * (1 + .06 * o.h));
      o.root.position.set((cx - W / 2) / pu, -(cy - H / 2) / pu, 0);
      o.spin.rotation.y = Math.sin(t / 1400 + i * 2) * .25 + mouse.x * .3 + o.yaw;
      o.tilt.rotation.x = o.tx + mouse.y * .15;
    });
    R.render(scene, cam); requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
