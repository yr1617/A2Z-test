/* A2Z 스크립트 */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* 13. 현실적인 촉감 및 키캡 기계식 음향 효과 (웹 오디오 API 오디오 합성) */
let ac;
const playSquishSound = () => {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const now = ac.currentTime;
    const bufferSize = ac.sampleRate * 0.08;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.5);
    }
    const noise = ac.createBufferSource(); noise.buffer = buffer;
    const filter = ac.createBiquadFilter(); filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.07);
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.075);
    noise.connect(filter); filter.connect(gain); gain.connect(ac.destination);
    noise.start(now);
  } catch(e){}
};

const playKeycapSound = () => {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const now = ac.currentTime;
    const osc = ac.createOscillator(); const gain = ac.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.025);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(now); osc.stop(now + 0.035);
  } catch(e){}
};

const noiseSound = (sec, vol, pow) => {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const n = ac.sampleRate * sec, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, pow);
    const s = ac.createBufferSource(), g = ac.createGain();
    g.gain.value = vol; s.buffer = b; s.connect(g).connect(ac.destination); s.start();
  } catch (e) {}
};
const crunch = () => noiseSound(.07, .25, 2), crack = () => noiseSound(.12, .3, 3);

/* ---------------- SVG 아이콘 ---------------- */
const I = {
  bowl: (a = '#FFEA00') => `<path d="M5 22h38c0 11-8 19-19 19S5 33 5 22z" fill="${a}"/><ellipse cx="24" cy="22" rx="19" ry="5" fill="#E8472B"/><path d="M34 5L24 22M40 8L28 22" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>`,
  controller: (a = '#1C94F5') => `<path d="M10 14h28c5 0 8 6 9 14s-3 10-6 8-5-6-8-6H15c-3 0-5 4-8 6s-7 0-6-8 4-14 9-14z" fill="${a}"/><path d="M15 21v6M12 24h6" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><circle cx="33" cy="22" r="2.2" fill="#F65AC2"/><circle cx="38" cy="26" r="2.2" fill="#FFEA00"/>`,
  bag: (a = '#F65AC2') => `<path d="M16 16a8 8 0 0116 0" fill="none" stroke="${K}" stroke-width="3"/><rect x="8" y="16" width="32" height="27" rx="4" fill="${a}"/><rect x="8" y="27" width="32" height="5" fill="${W}"/>`,
  blob: (a = '#F65AC2') => `<path d="M7 28c-2-13 9-21 18-19s16 9 15 19-9 12-17 12S8 36 7 28z" fill="${a}"/><ellipse cx="17" cy="19" rx="5" ry="3" fill="#fff7"/><circle cx="19" cy="28" r="1.8" fill="${K}"/><circle cx="29" cy="28" r="1.8" fill="${K}"/>`,
  
  /* 4. 클리커 토이 커스텀 모양 (네잎클로버, 오므라이스, 푸딩 등) */
  clover: (a = '#7BE0B0') => `<g fill="${a}" stroke="${K}" stroke-width="1.8"><circle cx="16" cy="16" r="10"/><circle cx="32" cy="16" r="10"/><circle cx="16" cy="32" r="10"/><circle cx="32" cy="32" r="10"/><path d="M24 24v16" stroke="${K}" stroke-width="3" stroke-linecap="round"/></g><circle cx="24" cy="24" r="3" fill="${W}"/>`,
  omurice: (a = '#FFD23F') => `<ellipse cx="24" cy="26" rx="19" ry="12" fill="${a}" stroke="${K}" stroke-width="2"/><path d="M12 26Q24 16 36 26" stroke="#D9382B" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  pudding: (a = '#FFB36B') => `<path d="M14 36L18 18h12l4 18z" fill="${a}" stroke="${K}" stroke-width="2"/><path d="M17 18h14v4H17z" fill="#8A5A3C"/>`,

  jacket: (a = '#6B8EAD') => `<path d="M17 6L6 14l4 10 5-3v21h18V21l5 3 4-10-11-8-7 7z" fill="${a}"/><path d="M24 13v29" stroke="${K}" stroke-width="1.6"/>`,
  sneaker: (a = '#F65AC2') => `<path d="M4 31c6 0 8-6 10-10l6 4 8 2c8 1 12 4 12 8v3H4z" fill="${a}"/><path d="M4 37h40" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M19 25l3-4M24 27l3-4" stroke="${W}" stroke-width="2" stroke-linecap="round"/>`,
  radio: (a = '#FFB36B') => `<rect x="6" y="14" width="36" height="25" rx="4" fill="${a}"/><circle cx="17" cy="27" r="7" fill="${W}"/><path d="M30 22h8M30 27h8M30 32h8" stroke="${K}" stroke-width="2"/><path d="M32 14l8-8" stroke="${K}" stroke-width="2"/>`,
  cap: (a = '#1C94F5') => `<path d="M8 28a16 14 0 0132 0z" fill="${a}"/><path d="M6 28h38c0 5-9 6-21 4z" fill="${K}"/>`,
  book: (a = '#7BE0B0') => `<rect x="9" y="6" width="30" height="36" rx="3" fill="${a}"/><rect x="14" y="12" width="20" height="5" fill="${W}"/><path d="M9 37h30" stroke="${K}" stroke-width="2"/>`,
  shades: (a = K) => `<rect x="5" y="16" width="16" height="13" rx="5" fill="${a}"/><rect x="27" y="16" width="16" height="13" rx="5" fill="${a}"/><path d="M21 20h6" stroke="${a}" stroke-width="2.6"/>`,
  mochi: (a = '#FF5470') => `<ellipse cx="24" cy="24" rx="16" ry="16" fill="${W}" stroke="#B9BFC9" stroke-width="2"/><circle cx="24" cy="24" r="8" fill="${a}"/>`,
  clock: () => `<circle cx="24" cy="24" r="17" fill="${W}" stroke="${K}" stroke-width="3"/><path d="M24 13v11l7 5" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  camera: () => `<rect x="5" y="14" width="38" height="26" rx="5" fill="#4B4F59"/><circle cx="24" cy="27" r="9" fill="#B9BFC9"/><circle cx="24" cy="27" r="5" fill="${K}"/><rect x="14" y="9" width="10" height="6" rx="2" fill="#4B4F59"/>`,
  vase: () => `<path d="M18 6h12v7c10 4 12 12 8 20-3 6-8 9-14 9s-11-3-14-9c-4-8-2-16 8-20z" fill="#7BE0B0"/><path d="M13 25q11 5 22 0" stroke="${W}" stroke-width="2.5" fill="none"/>`,
  record: () => `<circle cx="24" cy="24" r="19" fill="${K}"/><circle cx="24" cy="24" r="7" fill="#F65AC2"/><circle cx="24" cy="24" r="1.8" fill="${W}"/><path d="M10 24a14 14 0 0114-14" stroke="#fff" stroke-opacity=".4" stroke-width="2" fill="none"/>`,
  bow: () => `<path d="M24 24L6 12v24zM24 24l18-12v24z" fill="#F65AC2"/><circle cx="24" cy="24" r="5" fill="${W}"/>`,
  star: () => `<path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#FFEA00"/>`,
  flower: () => `<g fill="${W}"><circle cx="24" cy="10" r="8"/><circle cx="37" cy="19" r="8"/><circle cx="32" cy="35" r="8"/><circle cx="16" cy="35" r="8"/><circle cx="11" cy="19" r="8"/></g><circle cx="24" cy="24" r="6" fill="#FFEA00"/>`,
  heart: () => `<path d="M24 42C6 28 6 12 17 11c4 0 7 3 7 6 0-3 3-6 7-6 11 1 11 17-7 31z" fill="#F65AC2"/>`,
  gem: () => `<polygon points="24,6 38,18 24,42 10,18" fill="#1C94F5" stroke="${K}" stroke-width="2"/>`,
};
const ic = (n, a, b) => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">${I[n] ? I[n](a, b) : ''}</svg>`;

const CATS = {
  food: { n: '먹거리', i: 'bowl', d: '맛있는 음식으로 세대가 하나되어 나누는 트렌드 이야기' },
  play: { n: '놀거리', i: 'controller', d: '함께 웃고 만지며 일상의 즐거움을 전하는 놀이 공간' },
  fashion: { n: '패션', i: 'bag', d: '옛 멋과 요즘 감성을 조화롭게 매치하는 세대 통합 패션' },
};

const BLOB = {
  food: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M38 38C62 8 128 2 166 30c30 22 36 62 22 96-14 34-52 62-96 62C40 188 8 156 8 112 8 78 22 52 38 38z"/></svg>',
  play: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M24 82C14 46 52 14 96 14c32 0 50 18 76 34 28 18 34 52 20 82-14 30-30 38-58 52-30 14-60 14-84-8C26 150 34 116 24 82z"/></svg>',
  fashion: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M96 6c34-4 60 22 80 46 22 26 22 62 6 92-16 30-44 48-82 48-36 0-72-18-84-56-10-32 4-52 12-76C36 36 62 10 96 6z"/></svg>',
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

/* ---------------- 트렌드 데이터 (1. '함께 이야기해봐요' 제거 / 4. 먼작귀 완전 삭제) ---------------- */
const T = {
  /* 9. 놀거리 분류 : 말랑이·왁뿌볼 / 키캡·클리커 / 탱글 / 동묘쇼핑 */
  play: [
    { t: '말랑이 · 왁뿌볼', type: 'squish_wax',
      lead: '손끝으로 누르고 깨트리며 일상의 스트레스를 날리는 촉감 장난감이에요.',
      body: ['말랑이는 누르면 천천히 되돌아오는 쫀득한 장난감이고, 왁뿌볼은 단단한 왁스 껍질 속 말랑한 반전 촉감이 숨어있는 와작 깨는 재미의 장난감입니다.',
        '손끝에 전해지는 촉감과 깨지는 소리로 휴식 시간을 편안하게 즐겨보세요. 아래에서 모드를 바꿔가며 눌러보세요.'] },
    { t: '키캡 · 클리커', type: 'keycap_clicker',
      lead: '딸깍거리는 키캡의 재미와 아기자기한 모양의 클리커 장난감이에요.',
      body: ['손끝으로 눌렀을 때 들리는 기계식 키캡의 쾌감과 네잎클로버, 오므라이스 등 귀여운 모양의 클리커 장난감을 모으고 터치하는 재미를 담았습니다.',
        '아래에서 키를 눌러 글자를 치거나, 클리커 피젯 장난감을 마음껏 눌러보세요.'] },
    { t: '탱글', type: 'tangle',
      lead: '곡선 조각을 비틀고 꺾으며 손을 바쁘게 움직이는 피젯 토이예요.',
      body: ['아치형 곡선 조각이 마디마디 이어진 피젯 토이로, 자유롭게 구부리고 비틀며 마음을 차분하게 정리할 수 있습니다.',
        '아래의 이어진 고리를 끌어서 비틀고 꺾어보세요.'] },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000, '#6B8EAD'], ['cap', '볼캡', 4000, '#1C94F5'], ['shades', '선글라스', 3000, K], ['sneaker', '헌 운동화', 8000, '#F65AC2']] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000, '#FFB36B'], ['camera', '필름 카메라', 9000], ['clock', '탁상시계', 5000], ['vase', '화병', 6000]] },
        { n: '책방 · 음반 가게', c: '#1C94F5', items: [['book', '옛날 책', 2000, '#7BE0B0'], ['record', 'LP 음반', 4000], ['blob', '말랑이 인형', 3000, '#F7B6D8'], ['bag', '천가방', 5000, '#FFB36B']] },
      ],
      lead: '레트로 분위기가 물씬 나는 시장을 둘러보며 보물을 찾는 장터 쇼핑이에요.',
      body: ['오래된 의류부터 헌책, 아날로그 잡화가 가득한 상점을 둘러보며 흥정하고 장바구니에 담아보세요.영수증으로 쇼핑 결과를 확인하세요.'] },
  ],
  food: [
    { t: '토마토 마라탕', type: 'dish', mode: 'pick', base: '#E8603A', sip: 1,
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2], ['당면', 'noodle', null, 3], ['치즈', 'cheese', null, 2], ['고추', 'chili', null, 2]],
      lead: '상큼한 토마토 국물에 얼얼한 마라를 더해 누구나 부담 없이 즐기는 퓨전 요리예요.',
      body: ['토마토의 달콤 상큼함이 마라의 매운맛을 감싸주어 온 가족이 함께 즐기기 좋은 요리입니다.',
        '재료를 자유롭게 그릇에 담고 깊은 국물 한 모금을 즐겨보세요.'] },
    { t: '한정선', type: 'dish', mode: 'fixed',
      items: [['딸기', 'mochi', '#FF5470', 4], ['귤', 'mochi', '#FF9F1C', 4], ['샤인머스캣', 'mochi', '#9BD65A', 4], ['복숭아', 'mochi', '#FFB4A2', 4]],
      lead: '싱싱한 제철 과일이 통째로 들어간 쫀득한 수제 과일 찹쌀떡이에요.',
      body: ['쫀득한 찹쌀떡 속에 싱싱한 과일이 들어 있어 상큼 달콤한 맛이 일품인 과일 찹쌀떡입니다.',
        '긴 옥발 타원형 접시에 가지런히 올려진 찹쌀떡을 한입씩 베어 물어보세요.'] },
    { t: '피자 설기', type: 'pizza',
      lead: '담백한 사각 백설기 떡 위에 피자 토핑을 올려 구운 퓨전 떡 간식이에요.',
      body: ['백설기 떡 사각 블록 위에 토마토 소스와 치즈, 페퍼로니, 올리브 토핑을 올려 노릇하게 구워낸 퓨전 디저트입니다.',
        '사각 떡 보드 위의 피자 설기 조각을 베어 먹어보세요.'] },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '조금 짜게 끓인 라면의 면을 접시에 건져 살짝 말려 꼬들꼬들하게 먹는 방법이에요.',
      body: ['조금 진하게 끓인 라면에서 면만 건져 식히면 꼬들꼬들하고 감칠맛 나는 특별한 식감을 즐길 수 있습니다.',
        '직접 끓이고 식힌 후 베어 먹어보세요.'] },
  ],
  fashion: [
    { t: '옥 스타일링', type: 'jade',
      lead: '단아한 옥을 현대적인 전신 스타일링 소품으로 감각 있게 매치하는 패션이에요.',
      body: ['맑고 고운 옥빛 목걸이, 팔찌, 반지를 단정한 의상과 조합하여 개성 있는 전신 스타일을 완성해보세요.'] },
    { t: '메지루시', type: 'decor',
      items: [{ n: '우산', a: 'umb', at: [154, 296] }, { n: '가방', a: 'bag', at: [230, 122] }, { n: '텀블러', a: 'tum', at: [302, 160] }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#7BE0B0', '#1C1C20'],
      parts: ['star', 'heart', 'flower', 'bow'],
      lead: '우산이나 가방, 텀블러에 아기자기한 참을 달아 나만의 물건임을 표시하는 표식이에요.',
      body: ['소지품에 투명 참을 걸어두어 똑같은 물건 사이에서도 내 물건을 쉽게 알아볼 수 있습니다.'] },
    { t: '젤리슈즈 꾸미기', type: 'jelly_shoes',
      colors: ['#E8EBF0', '#F7A8D8', '#9CCBF5', '#FFE16B'],
      parts: ['star', 'heart', 'flower', 'bow', 'gem'],
      lead: '그물형 메쉬 젤리슈즈에 마음에 드는 지비츠 파츠를 찾아 드래그하여 꾸미는 유행이에요.',
      body: ['클리어 그물 샌들에 반짝이는 파츠들을 자유롭게 드래그하여 원하는 위치에 착 장착해보세요.'] },
    { t: '볼펜 꾸미기', type: 'decor_pen',
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#1C1C20', '#7BE0B0'],
      parts: ['star', 'heart', 'flower', 'bow', 'gem'],
      lead: '하트 레일 프레임 볼펜 상단에 매력적인 파츠를 직접 끌어다 꾸미는 문구 꾸미기예요.',
      body: ['아래 트레이에서 원하는 마음에 드는 파츠를 찾아 드래그하여 나만의 볼펜을 만들어보세요.'] },
  ],
};

/* ---------------- 인터랙션 모듈 ---------------- */
const rowOf = (label, html) => `<div class="grp"><em>${label}</em>${html}</div>`;
const colBar = bar => { bar.style.flexDirection = 'column'; bar.style.alignItems = 'center'; };
const won = v => v.toLocaleString() + '원';

/* 12 & 14. 젤리슈즈 및 볼펜용 정교한 SVG 디자인 */
const ART = {
  /* 12. 메쉬 그물 젤리 슈즈 (사진 5 참고) */
  shoe: c => `
    <g transform="translate(40, 40)">
      <!-- 신발 바닥 -->
      <path d="M 60 160 C 60 80, 120 40, 190 40 C 260 40, 290 90, 280 170 C 270 230, 200 240, 140 230 C 80 220, 60 200, 60 160 Z" fill="${c}" fill-opacity="0.4" stroke="${K}" stroke-width="3"/>
      <path d="M 70 160 C 70 95, 125 55, 185 55 C 245 55, 270 100, 265 165 C 255 215, 195 225, 140 218 C 90 210, 70 195, 70 160 Z" fill="none" stroke="${K}" stroke-width="2" stroke-dasharray="4 3"/>
      <!-- 스트랩 & 버클 -->
      <path d="M 110 100 Q 180 130 250 110" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M 110 100 Q 180 130 250 110" stroke="${K}" stroke-width="2" fill="none"/>
      <rect x="225" y="100" width="16" height="16" rx="4" fill="#fff" stroke="${K}" stroke-width="2"/>
      <!-- 격자 그물 패턴 -->
      <path d="M 100 80 L 120 200 M 130 65 L 150 215 M 160 55 L 180 220 M 190 55 L 210 215 M 220 65 L 235 200 M 245 85 L 255 180" stroke="${K}" stroke-width="1.8" opacity="0.6"/>
      <path d="M 80 130 C 150 120, 220 120, 270 140 M 85 160 C 150 150, 220 150, 268 165 M 95 185 C 150 175, 210 175, 255 185" stroke="${K}" stroke-width="1.8" opacity="0.6"/>
    </g>`,
  /* 14. 하트 비즈 레일 볼펜 (사진 6 참고) */
  pen: c => `
    <g transform="translate(130, 20)">
      <!-- 하트 레일 프레임 (파츠를 장착하는 공간) -->
      <path d="M 50 80 C 10 20, -30 70, 50 130 C 130 70, 90 20, 50 80 Z" fill="none" stroke="${K}" stroke-width="6"/>
      <path d="M 50 80 C 10 20, -30 70, 50 130 C 130 70, 90 20, 50 80 Z" fill="none" stroke="#F65AC2" stroke-width="3"/>
      <!-- 비즈 구슬 알갱이 표현 -->
      <circle cx="20" cy="50" r="5" fill="#fff" stroke="${K}"/><circle cx="80" cy="50" r="5" fill="#fff" stroke="${K}"/>
      <circle cx="10" cy="75" r="5" fill="#F65AC2" stroke="${K}"/><circle cx="90" cy="75" r="5" fill="#F65AC2" stroke="${K}"/>
      <circle cx="25" cy="105" r="5" fill="#fff" stroke="${K}"/><circle cx="75" cy="105" r="5" fill="#fff" stroke="${K}"/>
      <!-- 볼펜 축 및 메탈 팁 -->
      <rect x="42" y="130" width="16" height="150" rx="8" fill="${c}" stroke="${K}" stroke-width="2.5"/>
      <rect x="46" y="145" width="8" height="120" fill="#fff" opacity="0.4"/>
      <polygon points="42,280 58,280 50,310" fill="#B9BFC9" stroke="${K}" stroke-width="2"/>
      <path d="M 38 140 L 38 190" stroke="${K}" stroke-width="3" stroke-linecap="round"/>
    </g>`,
  umb: c => `<path d="M40 150Q180 -20 320 150Q290 128 255 150Q217 128 180 150Q143 128 105 150Q70 128 40 150z" fill="${c}"/><path d="M180 150V268q0 26-26 26" stroke="${K}" stroke-width="8" fill="none"/><circle cx="180" cy="34" r="5" fill="${K}"/>`,
  bag: c => `<path d="M130 120Q130 52 180 52T230 120" stroke="${K}" stroke-width="9" fill="none"/><rect x="85" y="116" width="190" height="170" rx="18" fill="${c}" stroke="${K}" stroke-width="2"/>`,
  tum: c => `<rect x="108" y="64" width="144" height="26" rx="10" fill="${K}"/><path d="M116 90H244L232 280q-2 22-24 22H152q-22 0-24-22z" fill="${c}" stroke="${K}" stroke-width="2"/>`
};

const X = {
  /* 8 & 9. 말랑이 · 왁뿌볼 통합 모듈 (네번째 사진 8 참고) */
  squish_wax(st, bar) {
    let mode = 'm', shp = 0, mat = 0, n = 0, hold = 0, broken = false, col = '#F7B6D8', iv;
    const SH = [['푸딩', '#F7B6D8', '<path d="M14 62C10 32 34 16 52 16s40 18 36 46c-3 22-20 28-38 28S16 84 14 62z"/>'],
      ['별', '#FFE16B', '<path d="M50 12L61 38L89 41L68 59L75 87L50 72L25 87L32 59L11 41L39 38Z" stroke-width="12" stroke-linejoin="round"/>'],
      ['구름', '#9CCBF5', '<circle cx="34" cy="58" r="22"/><circle cx="58" cy="44" r="26"/><circle cx="74" cy="64" r="18"/><rect x="32" y="60" width="44" height="22" rx="10"/>'],
      ['하트', '#F65AC2', '<path d="M50 88C14 62 8 34 28 24c11-5 22 0 22 11 0-11 11-16 22-11 20 10 14 38-22 64z"/>']];
    const MT = [['쫀득', 180, 9], ['슬로우', 20, 10], ['탱탱', 320, 5]];
    
    const draw = () => {
      bar.innerHTML = rowOf('종류', [['m', '말랑이'], ['w', '왁뿌볼']].map(([k, l]) => `<button class="chip${k === mode ? ' on' : ''}" data-m="${k}">${l}</button>`).join('')) +
        (mode === 'm' ? rowOf('질감', MT.map((m, i) => `<button class="chip${i === mat ? ' on' : ''}" data-t="${i}">${m[0]}</button>`).join('')) : '');
      colBar(bar);
      if (mode === 'm') renderSquish(); else renderWax();
    };

    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.m) mode = b.dataset.m; if (b.dataset.t) mat = +b.dataset.t; draw(); };

    function renderSquish() {
      const face = `<circle cx="38" cy="57" r="3.4" fill="${K}"/><circle cx="62" cy="57" r="3.4" fill="${K}"/><path d="M45 66q5 5 10 0" stroke="${K}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="30" cy="66" r="4" fill="#F65AC2" opacity=".4"/><circle cx="70" cy="66" r="4" fill="#F65AC2" opacity=".4"/>`;
      const sv = (i, cls) => `<svg class="${cls}" viewBox="0 0 100 100"><g fill="${SH[i][1]}" stroke="${K}" stroke-width="2">${SH[i][2]}</g>${cls === 'sq3' ? face : ''}</svg>`;
      st.innerHTML = `<div class="sqwrap">${sv(shp, 'sq3')}</div><div class="thumbs">${SH.map((s, i) => `<button class="thb${i === shp ? ' on' : ''}" data-i="${i}">${sv(i, 'th')}</button>`).join('')}</div><div class="count">만진 횟수 <b id="n">${n}</b> · ${SH[shp][0]}</div><p class="hint">꾹 눌렀다 놓아보세요 · 아래에서 종류와 질감을 골라보세요</p>`;
      
      const el = $('.sq3', st); let sx = 1, sy = 1, vx = 0, vy = 0, tx = 1, ty = 1;
      const loop = () => { if (!el.isConnected) return; const dt = 1 / 60; vx += (-180 * (sx - tx) - 9 * vx) * dt; vy += (-180 * (sy - ty) - 9 * vy) * dt; sx += vx * dt; sy += vy * dt; el.style.transform = `scale(${sx},${sy})`; requestAnimationFrame(loop); };
      loop();
      const up = () => { if (ty !== 1) { n++; $('#n', st).textContent = n; } tx = ty = 1; }; el.onpointerdown = () => { tx = 1.25; ty = .65; playSquishSound(); }; el.onpointerup = up; el.onpointerleave = up; $$('.thb', st).forEach(b => b.onclick = () => { shp = +b.dataset.i; renderSquish(); });
    }

    function renderWax() {
      st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.6"><path class="k1" d="M52 6 L45 28 L55 40 L48 58"/><path class="k2" d="M30 20 L38 38 L24 52 L30 74"/><path class="k3" d="M80 24 L70 34 L84 52 L76 70"/></svg></div></div></div><div class="count" id="pr">꾹 눌러보세요</div><p class="hint">누르고 있을수록 껍질에 금이 가며 깨져요</p>`;
      const wx = $('#wx', st), pr = $('#pr', st), wrap = wx.parentElement;
      const shatter = () => { $('.shell', wx).remove(); for (let i = 0; i < 14; i++) { const a = Math.random() * 6.28, d = 90 + Math.random() * 90; wrap.insertAdjacentHTML('beforeend', `<i class="shard" style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg;--c:${col}"></i>`); } setTimeout(() => $$('.shard', wrap).forEach(x => x.remove()), 1000); };
      const stop = () => clearInterval(iv);
      wx.onpointerdown = () => {
        wx.classList.add('sq'); playSquishSound();
        iv = setInterval(() => {
          hold++; if (broken) return;
          if (hold === 4) { wx.classList.add('l1'); crack(); pr.textContent = '사삭… 금이 갔어요'; }
          if (hold === 8) { wx.classList.add('l2'); crack(); pr.textContent = '조금만 더!'; }
          if (hold === 12) { broken = true; shatter(); crack(); pr.textContent = '와작! 속은 말랑말랑'; }
        }, 130);
      };
      wx.onpointerup = stop; wx.onpointerleave = stop;
    }
    draw();
  },

  /* 4 & 9. 키캡 · 클리커 (먼작귀 완전히 없앰, 네잎클로버/오므라이스 디자인) */
  keycap_clicker(st, bar) {
    let mode = 'k', sc = 0, pw = 1, cur = 0;
    const CH = [['clover', '#7BE0B0', '네잎클로버'], ['omurice', '#FFD23F', '오므라이스'], ['pudding', '#FFB36B', '푸딩']];
    const L = ['A', '2', 'Z', 'C', 'L', 'I', 'C', 'K'];

    const draw = () => {
      bar.innerHTML = rowOf('종류', [['k', '키캡'], ['c', '클리커 토이']].map(([k, l]) => `<button class="chip${k === mode ? ' on' : ''}" data-m="${k}">${l}</button>`).join(''));
      colBar(bar);
      if (mode === 'k') renderKeys(); else renderClicker();
    };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.m) mode = b.dataset.m; draw(); };

    function renderKeys() {
      let typed = '';
      st.innerHTML = `<div class="say" id="ty">키를 눌러 글자를 쳐보세요</div><div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><p class="hint">딸깍거리는 리얼 기계식 키캡 소리를 들어보세요</p>`;
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { playKeycapSound(); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); typed = (typed + L[i]).slice(-14);$('#ty', st).textContent = typed; });
    }

    function renderClicker() {
      st.innerHTML = `<div class="count">하트 점수 <b id="sc">0</b></div><div class="clkwrap"><button class="clk" id="clk"></button></div><div class="crew2" id="cr"></div><p class="hint">클리커 토이를 눌러 점수를 쌓고 모양을 바꿔보세요</p>`;
      const ui = () => {
        $('#sc', st).textContent = sc;
        $('#clk', st).innerHTML = ic(CH[cur][0]);
        $('#cr', st).innerHTML = CH.map((c, i) => `<button class="cc${i === cur ? ' on' : ''}" data-i="${i}">${ic(c[0])}</button>`).join('');
      };
      st.onclick = e => {
        const c = e.target.closest('.cc'), k = e.target.closest('#clk');
        if (c) cur = +c.dataset.i;
        if (k) { sc += pw; playKeycapSound(); const f = document.createElement('span'); f.className = 'fl'; f.textContent = '+1'; f.style.left = 40 + Math.random() * 20 + '%'; $('.clkwrap', st).appendChild(f); setTimeout(() => f.remove(), 700); }
        ui();
      };
      ui();
    }
    draw();
  },

  /* 탱글 */
  tangle(st, bar) {
    st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">마디가 이어진 고리를 잡고 끌어서 비틀고 꺾어보세요</p>';
    const cv = $('canvas', st), x = cv.getContext('2d'), dp = Math.min(devicePixelRatio, 2), w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * dp; cv.height = h * dp; x.scale(dp, dp);
    const n = 24, P = [], O = [];
    for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n; P.push([w / 2 + w * .28 * Math.cos(t), h / 2 + h * .28 * Math.sin(t)]); O.push([...P[i]]); }
    let d = -1;
    const at = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.onpointerdown = e => { const q = at(e); let m = 60; P.forEach((p, i) => { const k = Math.hypot(p[0] - q[0], p[1] - q[1]); if (k < m) { m = k; d = i; } }); cv.setPointerCapture(e.pointerId); playSquishSound(); };
    cv.onpointermove = e => { if (d < 0) return; const q = at(e); P[d] = [q[0], q[1]]; O[d] = [q[0], q[1]]; };
    cv.onpointerup = () => d = -1;
    const step = () => {
      if (!cv.isConnected) return;
      x.clearRect(0, 0, w, h); x.lineCap = x.lineJoin = 'round';
      for (let i = 0; i < n; i++) { x.strokeStyle = i % 2 ? '#9CCBF5' : '#F7A8D8'; x.lineWidth = w * 0.045; x.beginPath(); x.moveTo(...P[i]); x.lineTo(...P[(i + 1) % n]); x.stroke(); }
      requestAnimationFrame(step);
    };
    step();
    bar.innerHTML = '<span class="hint">유연한 피젯 고리</span>';
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
    const bars = () => { bar.innerHTML = rc ? '' : rowOf('가게 이동', c.shops.map((s, i) => `<button class="chip${i === sh ? ' on' : ''}" data-s="${i}">${s.n}</button>`).join('')) + rowOf('', '<button class="chip" data-a="rc">영수증 보기</button><button class="chip" data-a="clr">비우기</button>'); colBar(bar); };
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

  /* 5. 한정선 : 사진 2 참고 긴 타원형 접시에 가지런히 배치 */
  dish(st, bar, c) {
    if (c.mode === 'fixed') {
      st.innerHTML = `<div class="plate oval" id="pl">${c.items.map(it => `<button class="pc" title="${it[0]}">${ic(it[1], it[2])}</button>`).join('')}</div><div class="count">한정선 수제 과일 찹쌀떡</div><p class="hint">찹쌀떡을 베어 물어보세요</p>`;
      st.onclick = e => { const b = e.target.closest('.pc'); if (b) { crunch(); b.style.opacity = '0.3'; } };
      bar.innerHTML = '<button class="chip" id="rs">새 접시 가져오기</button>';
      $('#rs', bar).onclick = () => X.dish(st, bar, c);
    } else {
      /* 토마토 마라탕 */
      let sip = 0;
      st.innerHTML = `<div class="plate" id="pl" style="--b:${c.base}"><i class="base"></i></div><div class="count" id="ct">마라탕 재료 선택</div><p class="hint">재료를 골라 그릇에 담아보세요</p>`;
      bar.innerHTML = rowOf('재료', c.items.map(it => `<button class="chip" data-k="${it[0]}">${it[0]}</button>`).join(''));
      colBar(bar);
    }
  },

  /* 6. 피자 설기 : 사진 3 참고 사각 백설기 떡 모듈 */
  pizza(st, bar) {
    let bites = Array(4).fill(0);
    st.innerHTML = `<div class="pizza-board">${Array.from({ length: 4 }, (_, i) => `<div class="pz-piece" data-i="${i}"><svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="#FDFBF7" rx="8"/><rect x="15" y="15" width="70" height="70" fill="#FFD84D" opacity="0.8" rx="6"/><circle cx="35" cy="35" r="12" fill="#E8472B"/><circle cx="65" cy="65" r="12" fill="#E8472B"/><circle cx="65" cy="35" r="6" fill="#3F4A2A"/><rect x="30" y="60" width="16" height="8" rx="3" fill="#4CAF50"/></svg></div>`).join('')}</div><div class="count" id="ct">백설기 피자 떡</div><p class="hint">사각 피자설기 조각을 베어 먹어보세요</p>`;
    st.onclick = e => {
      const p = e.target.closest('.pz-piece'); if (!p) return;
      const i = +p.dataset.i; bites[i]++; crunch();
      p.style.opacity = bites[i] >= 3 ? '0.2' : (1 - bites[i] * 0.25);
    };
    bar.innerHTML = '<button class="chip" id="rs">새 피자설기 가져오기 🍕</button>';
    $('#rs', bar).onclick = () => X.pizza(st, bar);
  },

  /* 라면 말려먹기 */
  ramen(st, bar) {
    st.innerHTML = `<svg class="rm" viewBox="0 0 300 200"><ellipse cx="150" cy="130" rx="120" ry="55" fill="#FEFEFE" stroke="${K}" stroke-width="2"/><path d="M60 120Q150 90 240 120" stroke="#FFD23F" stroke-width="8" stroke-linecap="round"/></svg><div class="count">꼬들꼬들 라면 말려먹기</div><p class="hint">면을 눌러 맛있게 먹어보세요</p>`;
    st.onclick = () => crunch();
    bar.innerHTML = '<span class="hint">건조되어 꼬들꼬들해진 식감</span>';
  },

  /* 10. 옥 전신 코디 스타일링 (평범하고 단정한 머리, 비율 정돈된 전신) */
  jade(st, bar) {
    const TN = [['백옥', '#F2FBF6', '#CDEBDB'], ['비취옥', '#C9F5E1', '#5FCFA0'], ['녹옥', '#8FDCB0', '#2FA06A']];
    const OF = [['블랙 니트', '#1C1C20'], ['화이트 셔츠', '#FEFEFE'], ['핑크 원피스', '#F9B8E0']];
    let ti = 1, of = 0;
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 240 380"></svg><div class="say" id="say"></div>';
    const draw = () => {
      const t = TN[ti], o = OF[of][1];
      $('#sc', st).innerHTML = `
        <defs><radialGradient id="jg"><stop offset="0%" stop-color="${t[1]}"/><stop offset="100%" stop-color="${t[2]}"/></radialGradient></defs>
        <!-- 전신 마네킹 피규어 -->
        <!-- 단정한 헤어스타일 -->
        <path d="M 95 35 C 90 15, 150 15, 145 35 C 150 55, 90 55, 95 35 Z" fill="#2A2B31"/>
        <circle cx="120" cy="50" r="18" fill="#F2CDB5"/>
        <!-- 목 -->
        <rect x="114" y="66" width="12" height="12" fill="#F2CDB5"/>
        <!-- 상의/원피스 -->
        <path d="M 90 80 L 150 80 L 160 180 L 80 180 Z" fill="${o}" stroke="${K}" stroke-width="2"/>
        <!-- 하의/다리 -->
        <rect x="95" y="180" width="20" height="130" fill="${o === '#F9B8E0' ? '#F2CDB5' : '#1C1C20'}" stroke="${K}" stroke-width="1.5"/>
        <rect x="125" y="180" width="20" height="130" fill="${o === '#F9B8E0' ? '#F2CDB5' : '#1C1C20'}" stroke="${K}" stroke-width="1.5"/>
        <!-- 신발 -->
        <ellipse cx="105" cy="315" rx="12" ry="6" fill="${K}"/>
        <ellipse cx="135" cy="315" rx="12" ry="6" fill="${K}"/>
        <!-- 옥 목걸이 (자연스럽게 걸침) -->
        <path d="M 108 78 Q 120 105 132 78" fill="none" stroke="url(#jg)" stroke-width="4" stroke-linecap="round"/>
        <!-- 옥 팔찌 -->
        <circle cx="78" cy="160" r="7" fill="none" stroke="url(#jg)" stroke-width="4"/>
      `;
      $('#say', st).textContent = `${OF[of][0]} × ${t[0]}`;
    };
    const rows = () => {
      bar.innerHTML = rowOf('의상', OF.map((o, i) => `<button class="chip${i === of ? ' on' : ''}" data-o="${i}">${o[0]}</button>`).join('')) +
        rowOf('옥빛', TN.map((t, i) => `<button class="chip${i === ti ? ' on' : ''}" data-t="${i}">${t[0]}</button>`).join(''));
      colBar(bar);
    };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.o) of = +b.dataset.o; if (b.dataset.t) ti = +b.dataset.t; rows(); draw(); };
    rows(); draw();
  },

  /* 12. 젤리슈즈 꾸미기 : 파츠 트레이에서 드래그 앤 드롭 장착 (메지루시 삭제) */
  jelly_shoes(st, bar, c) {
    let col = 0, ch = [];
    st.innerHTML = `<svg id="sc" class="scene dgs" viewBox="0 0 360 300"></svg>
      <div class="parts-tray">${c.parts.map(p => `<div class="tray-item" data-k="${p}">${ic(p)}</div>`).join('')}</div>
      <p class="hint">하단 트레이에서 파츠를 잡아 드래그하여 젤리슈즈 위에 얹어보세요</p>`;
    
    const svg = $('#sc', st);
    const draw = () => {
      svg.innerHTML = ART.shoe(c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><g transform="translate(-16 -16) scale(0.7)">${I[p.k]()}</g></g>`).join('');
    };

    bar.innerHTML = rowOf('색상', c.colors.map((x, i) => `<button class="sw${i === col ? ' on' : ''}" data-c="${i}" style="background:${x}"></button>`).join(''));
    bar.onclick = e => { const b = e.target.closest('.sw'); if (b) { col = +b.dataset.c; draw(); } };

    let drag = null;
    st.onpointerdown = e => {
      const tr = e.target.closest('.tray-item');
      if (tr) {
        const k = tr.dataset.k;
        const p = { id: Date.now(), k, x: 180, y: 150 };
        ch.push(p); draw(); playSquishSound();
      }
      const g = e.target.closest('.dg');
      if (g) { drag = ch.find(x => x.id == g.dataset.id); }
    };
    st.onpointermove = e => {
      if (!drag) return;
      const r = svg.getBoundingClientRect();
      drag.x = Math.max(30, Math.min(330, e.clientX - r.left));
      drag.y = Math.max(30, Math.min(270, e.clientY - r.top));
      draw();
    };
    st.onpointerup = () => drag = null;
    draw();
  },

  /* 14. 볼펜 꾸미기 : 파츠 트레이에서 끌어다 비즈 레일에 드래그 착용 (사진 6 참고) */
  decor_pen(st, bar, c) {
    let col = 0, ch = [];
    st.innerHTML = `<svg id="sc" class="scene dgs" viewBox="0 0 360 340"></svg>
      <div class="parts-tray">${c.parts.map(p => `<div class="tray-item" data-k="${p}">${ic(p)}</div>`).join('')}</div>
      <p class="hint">하단 트레이의 파츠를 드래그하여 상단 하트 프레임에 달아보세요</p>`;
    
    const svg = $('#sc', st);
    const draw = () => {
      svg.innerHTML = ART.pen(c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><g transform="translate(-16 -16) scale(0.75)">${I[p.k]()}</g></g>`).join('');
    };

    bar.innerHTML = rowOf('펜 색상', c.colors.map((x, i) => `<button class="sw${i === col ? ' on' : ''}" data-c="${i}" style="background:${x}"></button>`).join(''));
    bar.onclick = e => { const b = e.target.closest('.sw'); if (b) { col = +b.dataset.c; draw(); } };

    let drag = null;
    st.onpointerdown = e => {
      const tr = e.target.closest('.tray-item');
      if (tr) {
        const k = tr.dataset.k;
        const p = { id: Date.now(), k, x: 180, y: 90 };
        ch.push(p); draw(); playKeycapSound();
      }
      const g = e.target.closest('.dg');
      if (g) { drag = ch.find(x => x.id == g.dataset.id); }
    };
    st.onpointermove = e => {
      if (!drag) return;
      const r = svg.getBoundingClientRect();
      drag.x = Math.max(30, Math.min(330, e.clientX - r.left));
      drag.y = Math.max(30, Math.min(310, e.clientY - r.top));
      draw();
    };
    st.onpointerup = () => drag = null;
    draw();
  },

  decor(st, bar, c) {
    let it = 0, col = 0;
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 360 300"></svg>';
    const draw = () => { $('#sc', st).innerHTML = ART[c.items[it].a](c.colors[col]); };
    bar.innerHTML = rowOf('종류', c.items.map((x, i) => `<button class="chip${i === it ? ' on' : ''}" data-it="${i}">${x.n}</button>`).join(''));
    bar.onclick = e => { const b = e.target.closest('.chip'); if (b && b.dataset.it) { it = +b.dataset.it; draw(); } };
    draw();
  }
};

/* ---------------- 화면 라우터 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

function home() {
  const ks = Object.keys(CATS);
  /* 16 & 17. 배경 회색 그라데이션 및 문양 완전히 제거, VIEW → 텍스트형 화살표 버튼 사용 */
  app.innerHTML = `<section class="view space">${ks.map(k => `<a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}"><div class="shape">${BLOB[k]}</div><div class="txt"><span class="tagp ${k}">${LAB[k]}</span><h2>${CATS[k].n}</h2><p>${CATS[k].d}</p><span class="view-more">VIEW →</span></div></a>`).join('')}
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <div class="tip">오브젝트를 클릭해보세요</div></section>`;
  const sp = $('.space');
  space3d(sp);
  if (!$('.gl', sp))$$('.shape', sp).forEach((s, i) => s.insertAdjacentHTML('beforeend', ic(CATS[ks[i]].i)));
}

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2"><div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `<a class="c2" href="#/t/${k}/${i}"><div class="ph"></div><div class="ct"><h3>${t.t}</h3><p>${t.lead}</p><span class="view-more">VIEW MORE →</span></div></a>`).join('')}</div></section>`;
}

/* 1. '함께 이야기해봐요' 상자 완전히 제거 */
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

/* 2 & 15. 메인 3D 오브젝트 비율 조정 (블룸이 보이도록 알맞은 크기) & 부드러운 회전 속도 */
function space3d(sp) {
  if (typeof THREE === 'undefined') return;
  let R; try { R = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.outputEncoding = THREE.sRGBEncoding;
  const cv = R.domElement; cv.className = 'gl'; sp.appendChild(cv);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.z = 10;
  scene.add(new THREE.AmbientLight(0xffffff, .85));
  const dl = new THREE.DirectionalLight(0xffffff, .8); dl.position.set(3, 5, 6); scene.add(dl);
  const S = r => new THREE.SphereGeometry(r, 32, 24), B = (x, y, z) => new THREE.BoxGeometry(x, y, z);
  const add = (g, geo, col, pos = [0, 0, 0], sc = [1, 1, 1]) => {
    const m = new THREE.Mesh(geo, typeof col === 'object' ? col : new THREE.MeshStandardMaterial({ color: col, roughness: .4 }));
    m.position.set(...pos); m.scale.set(...sc); g.add(m); return m;
  };
  const food = g => {
    add(g, new THREE.LatheGeometry([[0, -.7], [.55, -.7], [.9, -.45], [1.25, .35], [1.32, .5], [1.2, .5], [.85, -.3], [0, -.35]].map(p => new THREE.Vector2(...p)), 48),
      new THREE.MeshStandardMaterial({ color: 0xFFEA00, roughness: .35, side: THREE.DoubleSide }));
    add(g, new THREE.CircleGeometry(1.1, 40), 0xE8472B, [0, .3, 0]).rotation.x = -Math.PI / 2;
  };
  const play = g => {
    add(g, S(1), 0x1C94F5, [0, 0, 0], [1.45, .45, .85]);
    [-1, 1].forEach(s => add(g, S(1), 0x1C94F5, [s * 1.0, -.02, .62], [.5, .42, .95]));
  };
  const fashion = g => {
    add(g, new THREE.SphereGeometry(1.1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xF65AC2, roughness: .5, side: THREE.DoubleSide }), [0, 0, 0], [1, .9, 1]);
  };
  const objs = [['food', food, .5, 0], ['play', play, 1.0, 0], ['fashion', fashion, .35, .15]].map(([k, fn, tx, ty]) => {
    const root = new THREE.Group(), tilt = new THREE.Group(), spin = new THREE.Group();
    fn(spin); tilt.rotation.x = tx; tilt.position.y = ty; tilt.add(spin); root.add(tilt); scene.add(root);
    const b = $(`.hb.${k}`, sp);
    return { root, tilt, spin, tx, h: 0, p: 0, yaw: 0, s: 1, b, sh: $('.shape', b) };
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
      /* 2. 알맞은 오브젝트 스케일 (뒤 블룸이 잘 보이도록 정돈) */
      o.s = Math.min(r.width, r.height) * 0.55 / (3.3 * pu);
      o.h += ((hov === i ? 1 : 0) - o.h) * .08;
      /* 15. 부드럽고 천천히 돌아가는 회전 속도 */
      o.yaw += d * o.h * 0.35;
      o.root.scale.setScalar(o.s * (1 + .05 * o.h));
      o.root.position.set((cx - W / 2) / pu, -(cy - H / 2) / pu + Math.sin(t / 900 + i * 2) * .08, 0);
      o.spin.rotation.y = Math.sin(t / 1400 + i * 2) * .3 + mouse.x * .3 + o.yaw;
      o.tilt.rotation.x = o.tx + mouse.y * .15;
    });
    R.render(scene, cam); requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
