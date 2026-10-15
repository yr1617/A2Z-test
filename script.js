/* A2Z prototype — 해시 라우팅 SPA (#/ , #/cat/food , #/t/food/0) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* ---------------- SVG 아이콘 (48x48) ---------------- */
const I = {
  bowl: (a = '#FFEA00') => `<path d="M5 22h38c0 11-8 19-19 19S5 33 5 22z" fill="${a}"/><ellipse cx="24" cy="22" rx="19" ry="5" fill="#E8472B"/><path d="M34 5L24 22M40 8L28 22" stroke="${K}" stroke-width="2.4" stroke-linecap="round"/>`,
  controller: (a = '#1C94F5') => `<path d="M10 14h28c5 0 8 6 9 14s-3 10-6 8-5-6-8-6H15c-3 0-5 4-8 6s-7 0-6-8 4-14 9-14z" fill="${a}"/><path d="M15 21v6M12 24h6" stroke="${W}" stroke-width="2.4" stroke-linecap="round"/><circle cx="33" cy="22" r="2.2" fill="#F65AC2"/><circle cx="38" cy="26" r="2.2" fill="#FFEA00"/>`,
  bag: (a = '#F65AC2') => `<path d="M16 16a8 8 0 0116 0" fill="none" stroke="${K}" stroke-width="3"/><rect x="8" y="16" width="32" height="27" rx="4" fill="${a}"/><rect x="8" y="27" width="32" height="5" fill="${W}"/>`,
  blob: (a = '#F65AC2') => `<path d="M7 28c-2-13 9-21 18-19s16 9 15 19-9 12-17 12S8 36 7 28z" fill="${a}"/><ellipse cx="17" cy="19" rx="5" ry="3" fill="#fff7"/><circle cx="19" cy="28" r="1.8" fill="${K}"/><circle cx="29" cy="28" r="1.8" fill="${K}"/>`,
  ball: (a = '#7BE0B0') => `<circle cx="24" cy="25" r="17" fill="${a}"/><circle cx="24" cy="25" r="17" fill="#fff" opacity=".45"/><path d="M24 8l-3 9 5 6-3 9" stroke="${K}" stroke-width="1.6" fill="none" stroke-linejoin="round"/><ellipse cx="17" cy="17" rx="5" ry="3" fill="#fff"/>`,
  char: (a = '#FFB36B', k = 0) => [`<circle cx="12" cy="15" r="6" fill="${a}"/><circle cx="36" cy="15" r="6" fill="${a}"/>`, `<ellipse cx="16" cy="10" rx="4.5" ry="10" fill="${a}"/><ellipse cx="32" cy="10" rx="4.5" ry="10" fill="${a}"/>`, `<path d="M9 24L11 6l11 10zM39 24L37 6 26 16z" fill="${a}"/>`][k % 3] + `<circle cx="24" cy="29" r="15" fill="${a}"/><circle cx="18" cy="28" r="2" fill="${K}"/><circle cx="30" cy="28" r="2" fill="${K}"/><circle cx="13.5" cy="33" r="2.5" fill="#F65AC2" opacity=".45"/><circle cx="34.5" cy="33" r="2.5" fill="#F65AC2" opacity=".45"/><path d="M22 33q2 2 4 0" stroke="${K}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  charm: (a = '#FFB36B', k = 0) => `<circle cx="24" cy="8" r="6" fill="#7CC6FB" fill-opacity=".2" stroke="#7CC6FB" stroke-width="2.2"/><g transform="translate(6 11) scale(.75)">${I.char(a, k)}</g>`,
  jacket: (a = '#6B8EAD') => `<path d="M17 6L6 14l4 10 5-3v21h18V21l5 3 4-10-11-8-7 7z" fill="${a}"/><path d="M24 13v29" stroke="${K}" stroke-width="1.6"/>`,
  sneaker: (a = '#F65AC2') => `<path d="M4 31c6 0 8-6 10-10l6 4 8 2c8 1 12 4 12 8v3H4z" fill="${a}"/><path d="M4 37h40" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M19 25l3-4M24 27l3-4" stroke="${W}" stroke-width="2" stroke-linecap="round"/>`,
  radio: (a = '#FFB36B') => `<rect x="6" y="14" width="36" height="25" rx="4" fill="${a}"/><circle cx="17" cy="27" r="7" fill="${W}"/><path d="M30 22h8M30 27h8M30 32h8" stroke="${K}" stroke-width="2"/><path d="M32 14l8-8" stroke="${K}" stroke-width="2"/>`,
  cap: (a = '#1C94F5') => `<path d="M8 28a16 14 0 0132 0z" fill="${a}"/><path d="M6 28h38c0 5-9 6-21 4z" fill="${K}"/>`,
  book: (a = '#7BE0B0') => `<rect x="9" y="6" width="30" height="36" rx="3" fill="${a}"/><rect x="14" y="12" width="20" height="5" fill="${W}"/><path d="M9 37h30" stroke="${K}" stroke-width="2"/>`,
  shades: (a = K) => `<rect x="5" y="16" width="16" height="13" rx="5" fill="${a}"/><rect x="27" y="16" width="16" height="13" rx="5" fill="${a}"/><path d="M21 20h6" stroke="${a}" stroke-width="2.6"/>`,
  mochi: (a = '#FF5470') => `<ellipse cx="24" cy="30" rx="19" ry="13" fill="${W}" stroke="#B9BFC9" stroke-width="2"/><circle cx="24" cy="29" r="7.5" fill="${a}"/><path d="M24 22v15M16.5 29h15" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`,
  pizza: () => `<path d="M4 12q20-10 40 0L24 44z" fill="#FFD84D"/><path d="M4 12q20-10 40 0" stroke="#D9A441" stroke-width="5" fill="none"/><circle cx="18" cy="20" r="3.5" fill="#E8472B"/><circle cx="29" cy="18" r="3.5" fill="#E8472B"/><circle cx="23" cy="30" r="3.5" fill="#E8472B"/>`,
  loaf: () => `<path d="M8 22a8 8 0 018-8h16a8 8 0 018 8c0 3-2 4-3 5v13H11V27c-1-1-3-2-3-5z" fill="#E9A85C"/><path d="M17 20l3 6M25 20l3 6" stroke="#fff8" stroke-width="2" stroke-linecap="round"/>`,
  cbread: () => `${I.loaf()}<circle cx="35" cy="34" r="9" fill="#F65AC2"/><path d="M35 28l1.6 3.4 3.7.4-2.8 2.5.8 3.7-3.3-1.9-3.3 1.9.8-3.7-2.8-2.5 3.7-.4z" fill="${W}"/>`,
  croissant: () => `<path d="M4 34c2-14 10-22 20-22s18 8 20 22c-4 0-5-4-9-4-3 0-3 4-6 4s-3-4-6-4-3 4-6 4-4-4-7-4-4 4-6 4z" fill="#E9A85C"/><path d="M16 18l3 10M24 14v14M32 18l-3 10" stroke="#B87A35" stroke-width="2"/>`,
  bun: () => `<ellipse cx="24" cy="28" rx="18" ry="13" fill="#D9934A"/><path d="M14 23q10-8 20 0" stroke="#fff7" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  bangle: (a = '#6FCFA5') => `<circle cx="24" cy="24" r="15" fill="none" stroke="${a}" stroke-width="9"/><path d="M13 15a15 15 0 0112-6" stroke="#fff" stroke-opacity=".8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  jar: (a = '#8A5A3C') => `<path d="M17 9h14v5c9 3 13 9 13 17 0 8-7 13-20 13S4 39 4 31c0-8 4-14 13-17z" fill="${a}"/><rect x="14" y="5" width="20" height="6" rx="3" fill="${K}"/><path d="M11 24q13 7 26 0" stroke="#fff" stroke-opacity=".3" stroke-width="2.4" fill="none"/>`,
  shoe: (a = '#D8B58A') => `<path d="M4 36c0-9 2-17 8-21l7 3c3 2 7 4 13 5 8 1 13 4 13 11v5H4z" fill="${a}"/><path d="M4 39h40" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M8 15q1-4 4-3t4-1 4 1 3 3" stroke="${W}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M17 24l13 5" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="26.5" r="2" fill="#E8C65A"/>`,
  tomato: () => `<circle cx="24" cy="27" r="15" fill="#E8472B"/><path d="M24 11l-5 6 5-2 5 2z" fill="#4CAF50"/>`,
  chili: () => `<path d="M12 10c18-2 28 10 26 30-10-4-22-12-26-30z" fill="#D9382B"/><path d="M12 10l-4-4" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>`,
  leaf: () => `<path d="M24 44c-10-6-14-20-6-34 4-5 8-5 12 0 8 14 4 28-6 34z" fill="#6CC070"/><path d="M24 40V14" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`,
  mushroom: () => `<path d="M6 26a18 16 0 0136 0z" fill="#C9996B"/><rect x="18" y="26" width="12" height="14" rx="4" fill="#F1E3CF"/>`,
  beef: () => `<rect x="6" y="12" width="36" height="24" rx="10" fill="#C0504D"/><path d="M14 22h20M16 28h14" stroke="#F4B5B0" stroke-width="3" stroke-linecap="round"/>`,
  noodle: () => `<path d="M8 14c8-6 12 6 20 0s10-4 12 2M8 24c8-6 12 6 20 0s10-4 12 2M8 34c8-6 12 6 20 0s10-4 12 2" stroke="#F3D58C" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  cheese: () => `<path d="M4 36L44 16v20z" fill="#FFD84D"/><circle cx="30" cy="30" r="2.5" fill="#E6B800"/><circle cx="19" cy="33" r="2" fill="#E6B800"/>`,
  olive: () => `<circle cx="24" cy="24" r="14" fill="#3F4A2A"/><circle cx="24" cy="24" r="5" fill="#E1E5EA"/>`,
  corn: () => `<circle cx="24" cy="24" r="12" fill="#FFD23F"/><circle cx="19" cy="20" r="3" fill="#fff" opacity=".5"/>`,
  bacon: () => `<path d="M6 12q9 6 18 0t18 0v9q-9 6-18 0t-18 0z" fill="#D9534F"/><path d="M6 27q9 6 18 0t18 0v9q-9 6-18 0t-18 0z" fill="#E98A86"/>`,
  clock: () => `<circle cx="24" cy="24" r="17" fill="${W}" stroke="${K}" stroke-width="3"/><path d="M24 13v11l7 5" stroke="${K}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  camera: () => `<rect x="5" y="14" width="38" height="26" rx="5" fill="#4B4F59"/><circle cx="24" cy="27" r="9" fill="#B9BFC9"/><circle cx="24" cy="27" r="5" fill="${K}"/><rect x="14" y="9" width="10" height="6" rx="2" fill="#4B4F59"/>`,
  vase: () => `<path d="M18 6h12v7c10 4 12 12 8 20-3 6-8 9-14 9s-11-3-14-9c-4-8-2-16 8-20z" fill="#7BE0B0"/><path d="M13 25q11 5 22 0" stroke="${W}" stroke-width="2.5" fill="none"/>`,
  record: () => `<circle cx="24" cy="24" r="19" fill="${K}"/><circle cx="24" cy="24" r="7" fill="#F65AC2"/><circle cx="24" cy="24" r="1.8" fill="${W}"/><path d="M10 24a14 14 0 0114-14" stroke="#fff" stroke-opacity=".4" stroke-width="2" fill="none"/>`,
  bow: () => `<path d="M24 24L6 12v24zM24 24l18-12v24z" fill="#F65AC2"/><circle cx="24" cy="24" r="5" fill="${W}"/>`,
  star: () => `<path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#FFEA00"/>`,
  flower: () => `<g fill="${W}"><circle cx="24" cy="10" r="8"/><circle cx="37" cy="19" r="8"/><circle cx="32" cy="35" r="8"/><circle cx="16" cy="35" r="8"/><circle cx="11" cy="19" r="8"/></g><circle cx="24" cy="24" r="6" fill="#FFEA00"/>`,
  heart: () => `<path d="M24 42C6 28 6 12 17 11c4 0 7 3 7 6 0-3 3-6 7-6 11 1 11 17-7 31z" fill="#F65AC2"/>`,
};
const ic = (n, a, b) => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">${I[n](a, b)}</svg>`;

const CATS = {
  food: { n: '먹거리', i: 'bowl', d: '줄 서서 먹는 이유가 있어요. 요즘 맛집 문법을 맛보기로 체험해보세요.' },
  play: { n: '놀거리', i: 'controller', d: '손끝으로, 발품으로, 수집으로. 요즘 세대가 노는 방식을 직접 만져보세요.' },
  fashion: { n: '패션', i: 'bag', d: '입는 것을 넘어 꾸미고 고르는 즐거움. 내 취향대로 조합해보세요.' },
};

const smooth = pts => {
  const n = pts.length; let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return `<svg viewBox="-3 -3 106 106" preserveAspectRatio="none"><path d="${d}z"/></svg>`;
};
const BLOB = {
  food: smooth([[30, 8], [70, 2], [100, 20], [97, 52], [72, 74], [52, 100], [36, 82], [27, 58], [2, 42], [8, 18]]),
  play: smooth([[46, 0], [80, 6], [100, 32], [96, 66], [70, 86], [40, 100], [8, 94], [12, 62], [0, 30], [22, 12]]),
  fashion: smooth([[58, 0], [96, 24], [100, 66], [68, 100], [22, 94], [0, 50], [24, 10]]),
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

/* ---------------- 트렌드 데이터 ---------------- */
const T = {
  play: [
    { t: '말랑이 · 탱글 · 키캡', type: 'squish',
      lead: '손끝으로 만지고, 비틀고, 누르는 촉감 장난감이 다시 인기예요.',
      body: ['말랑이는 누르면 천천히 눌렸다가 느릿하게 되돌아오는 쫀득한 장난감이에요. 모양과 질감이 다양해서 마음에 드는 것을 골라 모으는 재미가 있어요. 탱글은 아치형 곡선 플라스틱 조각을 마디마디 이어 놓은 피젯 토이로, 손으로 비틀고 꺾고 돌리며 놀아요. 키캡은 키보드 윗부분을 꾸미는 작은 부품으로, 누를 때 나는 소리와 색 조합까지 즐기는 취미가 됐어요.',
        '어릴 적 구슬이나 슬라임을 만지작거리던 기억이 있다면 낯설지 않아요. 손을 계속 움직이면 마음이 차분해져서, 바쁜 하루 중 잠깐 쉬어 가는 도구로도 쓰여요. 아래에서 모양과 질감을 골라 직접 눌러보고 비틀어보세요.'],
      talk: '어릴 적 손에 쥐고 놀던 장난감이 있나요? 지금의 말랑이와 무엇이 닮았고 무엇이 다른지 이야기해봐요.' },
    { t: '왁뿌볼', type: 'wax',
      lead: '말랑이 겉에 왁스를 입힌, 깨는 맛이 있는 장난감이에요.',
      body: ['말랑이 위에 왁스를 부어 얇게 굳힌 장난감이에요. 겉은 단단해 보이지만 꽉 누르면 와작 소리와 함께 갈라지고, 그 안에서 말랑한 속이 드러나요.',
        '깨지는 순간의 소리와 촉감, 단단함과 말랑함의 대비가 재미 포인트예요. 얼음을 깨 먹거나 과자 껍질을 부수던 느낌과도 닮았어요. 아래에서 꾹 눌러 껍질을 깨보세요.'],
      talk: '“바삭하다가 말랑한” 반전이 있는 놀이나 음식이 떠오르나요? 하나씩 말해봐요.' },
    { t: '먼작귀', type: 'clicker',
      lead: '‘먼가 작고 귀여운 녀석’의 줄임말로, 작은 캐릭터가 건네는 소소한 위로예요.',
      body: ['작고 둥근 캐릭터들의 일상이 담긴 이야기로, 굿즈를 모으고 가방에 달며 좋아하는 마음을 표현하는 문화로 이어졌어요. 귀여운 것을 곁에 두는 것만으로도 하루가 조금 가벼워진다고 해요.',
        '귀여움은 세대를 가리지 않는 마음이에요. 아래 체험에서는 가상의 캐릭터를 쓰다듬어 귀여움 점수를 모으고, 간식을 주거나 친구를 불러 새 캐릭터를 만나보세요.'],
      talk: '요즘 나를 웃게 하는 작고 귀여운 것은 무엇인가요? 사진이나 이야기로 나눠봐요.' },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000, '#6B8EAD'], ['cap', '볼캡', 4000, '#1C94F5'], ['shades', '선글라스', 3000, K], ['sneaker', '헌 운동화', 8000, '#F65AC2']] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000, '#FFB36B'], ['camera', '필름 카메라', 9000], ['clock', '탁상시계', 5000], ['vase', '화병', 6000]] },
        { n: '책방 · 음반 가게', c: '#1C94F5', items: [['book', '옛날 책', 2000, '#7BE0B0'], ['record', 'LP 음반', 4000], ['blob', '말랑이 인형', 3000, '#F7B6D8'], ['bag', '천가방', 5000, '#FFB36B']] },
      ],
      lead: '서울 동묘 구제시장에서 오래된 옷과 물건 사이의 보물을 찾는 쇼핑이에요.',
      body: ['동묘 앞 구제시장은 빈티지 옷, 골동품, 헌책과 음반까지 골목마다 다른 물건이 쌓여 있는 곳이에요. 적은 돈으로 나만의 물건을 찾고, 가게 주인과 값을 흥정하는 재미까지 있어서 요즘 젊은 세대에게도 인기 있는 장소가 됐어요.',
        '예전 시장에서 물건을 고르고 깎아보던 기억과 닮았어요. 아래에서 가게를 돌아다니며 물건을 고르고 흥정한 뒤, 마지막에 영수증으로 오늘의 쇼핑을 확인해보세요.'],
      talk: '시장이나 중고 가게에서 건진 보물이 있나요? 가격과 사연을 함께 이야기해봐요.' },
  ],
  food: [
    { t: '토마토마라탕', type: 'dish', mode: 'pick', base: '#E8603A', sip: 1,
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2], ['당면', 'noodle', null, 3], ['치즈', 'cheese', null, 2], ['고추', 'chili', null, 2]],
      lead: '새콤한 토마토 국물에 얼얼한 마라를 더한 퓨전 마라탕이에요.',
      body: ['토마토의 새콤함이 마라의 얼얼한 매운맛을 부드럽게 감싸서, 매운 음식이 부담스러운 사람도 즐길 수 있어요. 재료를 직접 골라 담는 마라탕의 특성상 ‘나만의 조합’을 공유하는 재미가 더해져요.',
        '익숙한 김치찌개에 라면사리를 넣어 먹던 것처럼, 아는 맛에 새로움을 더하는 방식이에요. 아래에서 재료를 골라 그릇에 담고 한입씩 먹어보세요.'],
      talk: '좋아하는 국물 요리에 나만의 재료를 더한 적이 있나요? 나만의 조합을 이야기해봐요.' },
    { t: '한정선', type: 'dish', mode: 'fixed', base: '#F3F5F8',
      items: [['딸기', 'mochi', '#FF5470', 4], ['귤', 'mochi', '#FF9F1C', 4], ['샤인머스캣', 'mochi', '#9BD65A', 4], ['복숭아', 'mochi', '#FFB4A2', 4]],
      lead: '과일이 통째로 들어간 쫀득한 찹쌀떡이에요.',
      body: ['부드러운 찹쌀떡 속에 과일이 통째로 들어 있어서, 한입 베어 물면 과일 단면이 드러나요. 한정 수량으로 판매되는 경우가 많아 나오자마자 사라져서 ‘오픈런’이 벌어지기도 해요.',
        '찹쌀떡은 오래된 간식이지만 과일을 더해 새로운 모습이 됐어요. 쫀득한 겉과 상큼한 속의 조합을 아래에서 직접 베어 물어 확인해보세요.'],
      talk: '명절이나 특별한 날 줄 서서 사 먹던 간식이 있나요? 요즘 한정 간식과 비교해봐요.' },
    { t: '피자설기', type: 'pizza',
      lead: '쫀득한 설기 떡 위에 피자 토핑을 올린 퓨전 간식이에요.',
      body: ['떡 케이크 같은 설기 위에 치즈, 토마토, 올리브 같은 피자 토핑을 얹은 간식이에요. 전통 떡과 양식의 만남이라는 낯선 조합이 오히려 신선하게 받아들여졌어요.',
        '쫀득한 식감과 짭짤한 토핑이 어우러져 한 조각씩 나눠 먹기 좋아요. 아래에서 토핑을 골라 올린 뒤 조각을 한입씩 먹어보세요.'],
      talk: '떡이나 빵에 의외의 재료를 올려 먹어본 적이 있나요? 가장 신기했던 조합은 무엇인가요?' },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '짜게 끓인 라면의 면을 접시에 말려 꼬들꼬들하게 먹는 방법이에요.',
      body: ['조금 짜게 끓인 라면에서 면만 접시에 건져 잠시 두면, 면이 마르면서 조금 건조하고 뻑뻑해져요. 그때 먹으면 평소와 다른 꼬들꼬들하고 짭짤한 식감이 나서 과자처럼 즐기는 사람도 많아요.',
        '너무 오래 두면 딱딱해지고 너무 빨리 먹으면 평범한 라면이라, 기다리는 시간이 맛을 좌우해요. 아래에서 직접 끓이고 말린 뒤 먹어보세요.'],
      talk: '라면을 맛있게 먹는 나만의 방법이 있나요? 서로의 레시피를 이야기해봐요.' },
  ],
  fashion: [
    { t: '옥', type: 'jade',
      lead: '옥을 팔찌, 목걸이, 반지 같은 패션 소품으로 즐기는 흐름이에요.',
      body: ['맑고 은은한 옥빛이 어떤 옷에도 포인트가 되어, 전통 소재가 요즘 감각의 액세서리로 다시 주목받고 있어요. 팔찌, 펜던트, 귀걸이, 반지로 부담 없이 착용할 수 있어요.',
        '옥가락지나 노리개를 아껴 두던 마음과 이어지는 취향이에요. 아래에서 옷을 고르고 옥 액세서리를 착용해 나만의 코디를 완성해보세요.'],
      talk: '집에 오래 전해 내려온 소품이나 액세서리가 있나요? 요즘 스타일에 어떻게 어울릴지 이야기해봐요.' },
    { t: '메지루시', type: 'decor',
      items: [{ n: '우산', a: 'umb', at: [154, 296] }, { n: '가방', a: 'bag', at: [230, 122] }, { n: '텀블러', a: 'tum', at: [302, 160] }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#7BE0B0', '#1C1C20'],
      parts: ['charm:#FFB36B:0', 'charm:#F7B6D8:1', 'charm:#B79CFF:2', 'charm:#7BE0B0:0', 'charm:#FFE16B:2', 'charm:#9CCBF5:1'],
      lead: '우산, 가방, 텀블러에 달아 내 물건임을 표시하는 작은 캐릭터 참이에요.',
      body: ['끝에 투명한 링이 달린 작은 캐릭터 참으로, 우산이나 가방, 텀블러 같은 소품에 걸어 ‘내 물건’ 표시를 해두는 액세서리이자 키링이에요. 똑같이 생긴 물건 사이에서도 내 것을 바로 알아볼 수 있어요.',
        '이름표를 달던 마음에 귀여움이 더해진 거예요. 아래에서 소품을 고르고 메지루시를 추가한 뒤, 드래그해서 원하는 위치에 달아보세요.'],
      talk: '내 물건을 알아보기 위해 달아둔 나만의 표시가 있나요? 이유와 함께 이야기해봐요.' },
    { t: '젤리슈즈 꾸미기', type: 'decor',
      items: [{ n: '젤리슈즈', a: 'shoe', at: [188, 164] }],
      colors: ['#F7A8D8', '#9CCBF5', '#C9F5E1', '#E1E5EA', '#FFE16B'],
      parts: ['star', 'heart', 'flower', 'bow', 'charm:#FFB36B:0', 'charm:#B79CFF:2'],
      lead: '말랑한 젤리 소재 신발에 장식을 달아 꾸미는 유행이에요.',
      body: ['반투명한 젤리 신발은 색감이 맑고 가벼워서 여름뿐 아니라 일상에서도 인기예요. 신발 구멍에 작은 장식을 꽂아 나만의 신발로 만드는 재미가 있어요.',
        '어릴 적 신던 젤리 샌들의 추억이 새로운 방식으로 돌아온 셈이에요. 아래에서 색을 고르고 장식을 드래그해 원하는 곳에 달아보세요.'],
      talk: '어릴 적 신던 신발 중 기억에 남는 것이 있나요? 요즘 신발과 비교해봐요.' },
    { t: '볼펜 꾸미기', type: 'decor',
      items: [{ n: '볼펜', a: 'pen', at: [180, 165] }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#1C1C20', '#7BE0B0'],
      parts: ['star', 'heart', 'flower', 'bow', 'charm:#FFB36B:0', 'charm:#B79CFF:2'],
      lead: '평범한 볼펜에 스티커와 장식을 더해 나만의 펜으로 만드는 놀이예요.',
      body: ['볼펜에 스티커를 붙이고 작은 장식을 달아 꾸미는 놀이가 인기예요. 매일 쓰는 도구를 내 취향으로 바꾸면 필기하는 시간이 조금 더 즐거워져요.',
        '다이어리 꾸미기나 필통 꾸미기의 연장선이라 세대 구분 없이 즐길 수 있어요. 아래에서 펜 색을 고르고 장식을 드래그해 붙여보세요.'],
      talk: '아끼는 문구나 필기도구가 있나요? 좋아하는 이유를 이야기해봐요.' },
  ],
};

/* ---------------- 공통 유틸 ---------------- */
let ac, uid = 0;
const beep = (f = 520) => { try { ac = ac || new AudioContext(); const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square'; o.frequency.value = f; g.gain.setValueAtTime(.07, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .08); o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + .09); } catch (e) {} };
const noise = (sec, vol, pow) => { try { ac = ac || new AudioContext(); const n = ac.sampleRate * sec, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, pow); const s = ac.createBufferSource(), g = ac.createGain(); g.gain.value = vol; s.buffer = b; s.connect(g).connect(ac.destination); s.start(); } catch (e) {} };
const crunch = () => noise(.07, .25, 2), crack = () => noise(.12, .3, 3);
const bounce = el => { el.classList.remove('bn'); void el.offsetWidth; el.classList.add('bn'); };
const rowOf = (label, html) => `<div class="grp"><em>${label}</em>${html}</div>`;
const colBar = bar => { bar.style.flexDirection = 'column'; bar.style.alignItems = 'center'; };
const won = v => v.toLocaleString() + '원';
const BP = [-.5, 3.5, 1.6, .35, 2.8].map(a => [24 + 17 * Math.cos(a), 26 + 15 * Math.sin(a)]);
/* 한입씩 베어 문 자국이 남는 SVG */
const bitten = (inner, n, id) => `<svg class="ic" viewBox="0 0 48 48"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/>${BP.slice(0, n).map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${7 + i * 1.3}" fill="#000"/>`).join('')}</mask></defs><g mask="url(#${id})">${inner}</g></svg>`;
function piece(inner, max, onBite, onGone) {
  const el = document.createElement('button'), id = 'bm' + (++uid); let n = 0; el.className = 'pc';
  const draw = () => el.innerHTML = bitten(inner, n, id); draw();
  el.onclick = () => { if (n >= max) return; n++; crunch(); draw(); bounce(el); onBite && onBite(); if (n >= max) { el.classList.add('gone'); setTimeout(() => el.remove(), 300); onGone && onGone(); } };
  return el;
}

/* 장식 꾸미기용 도안 (360x330) */
const ART = {
  umb: c => `<path d="M40 150Q180 -20 320 150Q290 128 255 150Q217 128 180 150Q143 128 105 150Q70 128 40 150z" fill="${c}"/><path d="M180 36L105 150M180 36V150M180 36L255 150" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none"/><path d="M180 150V268q0 26-26 26" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="180" cy="34" r="5" fill="${K}"/>`,
  bag: c => `<path d="M130 120Q130 52 180 52T230 120" stroke="${K}" stroke-width="9" fill="none"/><rect x="85" y="116" width="190" height="170" rx="18" fill="${c}"/><rect x="85" y="156" width="190" height="14" fill="#fff" fill-opacity=".7"/><rect x="125" y="200" width="110" height="56" rx="10" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-dasharray="6 5"/>`,
  tum: c => `<rect x="108" y="64" width="144" height="26" rx="10" fill="${K}"/><rect x="170" y="30" width="14" height="40" rx="6" fill="${K}"/><path d="M116 90H244L232 280q-2 22-24 22H152q-22 0-24-22z" fill="${c}"/><path d="M244 130H276q26 0 26 28v10q0 28-26 28H238" stroke="${K}" stroke-width="10" fill="none"/><path d="M140 110L148 270" stroke="#fff" stroke-opacity=".45" stroke-width="8" stroke-linecap="round"/>`,
  shoe: c => `<path d="M30 252C30 202 56 176 100 172C138 168 150 150 176 138C210 122 238 134 258 162C278 192 320 202 334 252z" fill="${c}" fill-opacity=".78"/><path d="M30 252H334V266Q334 286 312 286H52Q30 286 30 266z" fill="${c}"/><path d="M118 176Q188 150 252 170" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M60 214Q110 190 168 200" stroke="#fff" stroke-opacity=".55" stroke-width="8" fill="none" stroke-linecap="round"/><g fill="#fff" fill-opacity=".85"><circle cx="150" cy="170" r="5"/><circle cx="188" cy="164" r="5"/><circle cx="226" cy="168" r="5"/><circle cx="86" cy="226" r="5"/><circle cx="262" cy="226" r="5"/></g>`,
  pen: c => `<g transform="rotate(-24 180 165)"><rect x="70" y="150" width="230" height="30" rx="15" fill="${c}"/><rect x="70" y="150" width="60" height="30" fill="${K}" fill-opacity=".18"/><rect x="250" y="146" width="22" height="38" rx="6" fill="#fff" fill-opacity=".6"/><path d="M70 150L30 165L70 180z" fill="${K}"/><rect x="300" y="157" width="22" height="16" rx="4" fill="${K}"/><path d="M96 158H240" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/></g>`,
};

/* ---------------- 인터랙션 모듈 ---------------- */
const X = {
  /* 말랑이(모양·질감 선택, 스프링 물리) · 탱글(닫힌 고리) · 키캡 */
  squish(st, bar) {
    let mode = 'm', shp = 0, mat = 0, n = 0, rid = 0;
    const SH = [['푸딩', '#F7B6D8', '<path d="M14 62C10 32 34 16 52 16s40 18 36 46c-3 22-20 28-38 28S16 84 14 62z"/>'],
      ['별', '#FFE16B', '<path d="M50 12L61 38L89 41L68 59L75 87L50 72L25 87L32 59L11 41L39 38Z" stroke-width="12" stroke-linejoin="round"/>'],
      ['구름', '#9CCBF5', '<circle cx="34" cy="58" r="22"/><circle cx="58" cy="44" r="26"/><circle cx="74" cy="64" r="18"/><rect x="32" y="60" width="44" height="22" rx="10"/>'],
      ['하트', '#F65AC2', '<path d="M50 88C14 62 8 34 28 24c11-5 22 0 22 11 0-11 11-16 22-11 20 10 14 38-22 64z"/>'],
      ['고양이', '#FFB36B', '<path d="M18 40L22 10L44 26zM82 40L78 10L56 26z"/><circle cx="50" cy="56" r="34"/>'],
      ['딸기', '#FF5470', '<path d="M50 90C20 78 8 52 16 36c8-14 60-14 68 0 8 16-4 42-34 54z"/>']];
    const MT = [['쫀득', 180, 9], ['슬로우', 20, 10], ['탱탱', 320, 5]];
    const face = `<circle cx="38" cy="57" r="3.4" fill="${K}"/><circle cx="62" cy="57" r="3.4" fill="${K}"/><path d="M45 66q5 5 10 0" stroke="${K}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="30" cy="66" r="4" fill="#F65AC2" opacity=".4"/><circle cx="70" cy="66" r="4" fill="#F65AC2" opacity=".4"/><ellipse cx="32" cy="32" rx="9" ry="5" fill="#fff" opacity=".5" transform="rotate(-25 32 32)"/>`;
    const sv = (i, cls) => `<svg class="${cls}" viewBox="0 0 100 100"><g fill="${SH[i][1]}" stroke="${SH[i][1]}">${SH[i][2]}</g>${cls === 'sq3' ? face : ''}</svg>`;
    const draw = () => {
      bar.innerHTML = rowOf('종류', [['m', '말랑이'], ['t', '탱글'], ['k', '키캡']].map(([k, l]) => `<button class="chip${k === mode ? ' on' : ''}" data-m="${k}">${l}</button>`).join('')) + (mode === 'm' ? rowOf('질감', MT.map((m, i) => `<button class="chip${i === mat ? ' on' : ''}" data-t="${i}">${m[0]}</button>`).join('')) : ''); colBar(bar);
      rid++; if (mode === 'k') keys(); else if (mode === 't') tangle(); else squ();
    };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.m) mode = b.dataset.m; if (b.dataset.t) mat = +b.dataset.t; draw(); };
    function squ() {
      st.innerHTML = `<div class="sqwrap">${sv(shp, 'sq3')}</div><div class="thumbs">${SH.map((s, i) => `<button class="thb${i === shp ? ' on' : ''}" data-i="${i}" aria-label="${s[0]}">${sv(i, 'th')}</button>`).join('')}</div><div class="count">만진 횟수 <b id="n">${n}</b> · ${SH[shp][0]}</div><p class="hint">꾹 눌렀다 놓아보세요 · 아래에서 다른 모양을 골라보세요</p>`;
      const el = $('.sq3', st), me = rid, [, k, cd] = MT[mat]; let sx = 1, sy = 1, vx = 0, vy = 0, tx = 1, ty = 1;
      const loop = () => { if (me !== rid || !el.isConnected) return; const dt = 1 / 60; vx += (-k * (sx - tx) - cd * vx) * dt; vy += (-k * (sy - ty) - cd * vy) * dt; sx += vx * dt; sy += vy * dt; el.style.transform = `scale(${sx},${sy})`; requestAnimationFrame(loop); };
      loop();
      const up = () => { if (ty !== 1) { n++; $('#n', st).textContent = n; } tx = ty = 1; };
      el.onpointerdown = () => { tx = 1.3; ty = .6; beep(150); }; el.onpointerup = up; el.onpointerleave = up; el.onpointercancel = up;
      $$('.thb', st).forEach(b => b.onclick = () => { shp = +b.dataset.i; squ(); });
    }
    function tangle() {
      st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">마디가 이어진 고리를 잡고 끌어서 비틀고 꺾어보세요</p>';
      const cv = $('canvas', st), x = cv.getContext('2d'), dp = Math.min(devicePixelRatio, 2), w = cv.clientWidth, h = cv.clientHeight;
      cv.width = w * dp; cv.height = h * dp; x.scale(dp, dp);
      const n = 28, P = [], O = [];
      for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n, k = 1 + .28 * Math.sin(3 * t); P.push([w / 2 + w * .3 * k * Math.cos(t), h / 2 + h * .3 * k * Math.sin(t)]); O.push([...P[i]]); }
      let per = 0; for (let i = 0; i < n; i++) per += Math.hypot(P[(i + 1) % n][0] - P[i][0], P[(i + 1) % n][1] - P[i][1]);
      const L = per / n; let d = -1;
      const at = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      cv.onpointerdown = e => { const q = at(e); let m = 70; P.forEach((p, i) => { const k = Math.hypot(p[0] - q[0], p[1] - q[1]); if (k < m) { m = k; d = i; } }); cv.setPointerCapture(e.pointerId); beep(300); };
      cv.onpointermove = e => { if (d < 0) return; const q = at(e); P[d] = [q[0], q[1]]; O[d] = [q[0], q[1]]; };
      cv.onpointerup = () => d = -1;
      const fix = (a, b, len, mn) => { const A = P[a], B = P[b], dx = B[0] - A[0], dy = B[1] - A[1], s = Math.hypot(dx, dy) || .001; if (mn && s >= len) return; const f = (s - len) / s, wa = a === d ? 0 : 1, wb = b === d ? 0 : 1, t = wa + wb; if (!t) return; A[0] += dx * f * wa / t; A[1] += dy * f * wa / t; B[0] -= dx * f * wb / t; B[1] -= dy * f * wb / t; };
      const draw2 = () => {
        x.clearRect(0, 0, w, h); x.lineCap = x.lineJoin = 'round'; const lw = w * .05;
        for (let i = 0; i < n; i++) { x.strokeStyle = (i >> 1) % 2 ? '#9CCBF5' : '#F7A8D8'; x.lineWidth = lw; x.beginPath(); x.moveTo(...P[i]); x.lineTo(...P[(i + 1) % n]); x.stroke(); }
        x.strokeStyle = 'rgba(255,255,255,.5)'; x.lineWidth = lw * .2; x.beginPath(); P.forEach((p, i) => x[i ? 'lineTo' : 'moveTo'](p[0] - lw * .15, p[1] - lw * .2)); x.closePath(); x.stroke();
      };
      const step = () => {
        if (!cv.isConnected) return;
        P.forEach((p, i) => { if (i === d) return; const vx = (p[0] - O[i][0]) * .94, vy = (p[1] - O[i][1]) * .94; O[i] = [p[0], p[1]]; p[0] += vx; p[1] += vy; });
        for (let k = 0; k < 8; k++) {
          for (let i = 0; i < n; i++) fix(i, (i + 1) % n, L, 0);
          for (let i = 0; i < n; i++) fix(i, (i + 2) % n, L * 1.8, 1);
          P.forEach(p => { p[0] = Math.min(w - 24, Math.max(24, p[0])); p[1] = Math.min(h - 24, Math.max(24, p[1])); });
        }
        draw2(); requestAnimationFrame(step);
      };
      step();
    }
    function keys() {
      let th = 0, typed = ''; const TH = [['#FFEA00', '#1C94F5', '#F65AC2'], ['#FEFEFE', '#E1E5EA', '#B9BFC9'], ['#7BE0B0', '#FFB36B', '#B79CFF']];
      const L = ['A', '2', 'Z', 'T', 'R', 'E', 'N', 'D'];
      const paint = () => $$('.key', st).forEach((k, i) => k.style.background = TH[th][i % 3]);
      st.innerHTML = `<div class="say" id="ty">키를 눌러 글자를 쳐보세요</div><div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><button class="bigbtn" id="th">키캡 색상 바꾸기</button><p class="hint">눌러서 딸깍 소리를 들어보세요 (소리 켜기)</p>`;
      paint(); $('#th', st).onclick = () => { th = (th + 1) % 3; paint(); };
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { beep(260 + i * 50); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); typed = (typed + L[i]).slice(-14); $('#ty', st).textContent = typed; });
    }
    draw();
  },

  /* 왁뿌볼: 꾹 누르면 껍질이 갈라지고 깨짐 */
  wax(st, bar) {
    let iv, hold, broken, col;
    const build = () => {
      clearInterval(iv); hold = 0; broken = false; col = PAL[Math.floor(Math.random() * 6)];
      st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path class="k1" d="M52 6 L45 28 L55 40 L48 58"/><path class="k1" d="M55 40 L74 46"/><path class="k2" d="M30 20 L38 38 L24 52 L30 74"/><path class="k2" d="M48 58 L66 72 L62 92"/><path class="k3" d="M80 24 L70 34 L84 52 L76 70"/><path class="k3" d="M24 52 L8 56"/></svg></div></div></div><div class="count" id="pr">꾹 눌러보세요</div><p class="hint">누르고 있을수록 껍질에 금이 가요 (소리 켜기)</p>`;
      const wx = $('#wx', st), pr = $('#pr', st), wrap = wx.parentElement;
      const shatter = () => { $('.shell', wx).remove(); for (let i = 0; i < 14; i++) { const a = Math.random() * 6.28, d = 90 + Math.random() * 90; wrap.insertAdjacentHTML('beforeend', `<i class="shard" style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg;--c:${col}"></i>`); } setTimeout(() => $$('.shard', wrap).forEach(x => x.remove()), 1100); };
      const stop = () => { clearInterval(iv); if (wx.classList.contains('sq')) { wx.classList.remove('sq'); bounce(wx); } };
      wx.onpointerdown = () => {
        wx.classList.add('sq'); beep(160);
        iv = setInterval(() => {
          hold++; if (broken) return;
          if (hold === 4) { wx.classList.add('l1'); crack(); pr.textContent = '사삭… 금이 갔어요'; }
          if (hold === 8) { wx.classList.add('l2'); crack(); pr.textContent = '조금만 더!'; }
          if (hold === 12) { wx.classList.add('l3'); crack(); }
          if (hold === 15) { broken = true; shatter(); crack(); pr.textContent = '와작! 속은 말랑말랑'; }
        }, 130);
      };
      wx.onpointerup = stop; wx.onpointerleave = stop;
    };
    bar.innerHTML = '<button class="chip" id="nw">새 왁뿌볼 꺼내기</button>'; $('#nw', bar).onclick = build; build();
  },

  /* 먼작귀: 클리커 */
  clicker(st, bar) {
    let sc = 0, pw = 1, ps = 0, cur = 0;
    const CH = [[0, '#FFB36B', 0], [30, '#F7B6D8', 1], [120, '#B79CFF', 2], [400, '#7BE0B0', 0], [1000, '#FFE16B', 1]];
    const UP = [['간식 주기', '쓰다듬기 +1', 15, () => pw++], ['친구 부르기', '초당 +1', 40, () => ps++], ['리본 달기', '쓰다듬기 +3', 120, () => pw += 3], ['단체 사진', '초당 +5', 300, () => ps += 5]];
    const cost = UP.map(u => u[2]);
    st.innerHTML = '<div class="count">귀여움 <b id="sc">0</b> · 초당 <b id="ps">0</b></div><div class="clkwrap"><button class="clk" id="clk" aria-label="쓰다듬기"></button></div><div class="crew2" id="cr"></div><div class="ups" id="up"></div><p class="hint">캐릭터를 눌러 귀여움을 모으고, 점수로 업그레이드해 새 캐릭터를 만나보세요</p>';
    const ui = () => {
      $('#sc', st).textContent = Math.floor(sc); $('#ps', st).textContent = ps;
      $('#clk', st).innerHTML = ic('char', CH[cur][1], CH[cur][2]);
      $('#cr', st).innerHTML = CH.map((c, i) => `<button class="cc${sc >= c[0] || i <= cur ? '' : ' lock'}${i === cur ? ' on' : ''}" data-i="${i}" ${sc >= c[0] ? '' : 'disabled'}>${ic('char', c[1], c[2])}</button>`).join('');
      $('#up', st).innerHTML = UP.map((u, i) => `<button class="upg" data-i="${i}" ${sc >= cost[i] ? '' : 'disabled'}><b>${u[0]}</b><small>${u[1]} · ${Math.ceil(cost[i])}</small></button>`).join('');
    };
    st.onclick = e => {
      const c = e.target.closest('.cc'), u = e.target.closest('.upg'), k = e.target.closest('#clk');
      if (c) cur = +c.dataset.i;
      if (u && sc >= cost[u.dataset.i]) { const i = +u.dataset.i; sc -= cost[i]; cost[i] *= 1.45; UP[i][3](); beep(900); }
      if (k) { sc += pw; bounce(k); beep(500 + Math.random() * 200); const f = document.createElement('span'); f.className = 'fl'; f.textContent = '+' + pw; f.style.left = 30 + Math.random() * 40 + '%'; $('.clkwrap', st).appendChild(f); setTimeout(() => f.remove(), 800); }
      ui();
    };
    const iv = setInterval(() => { if (!st.isConnected) return clearInterval(iv); if (ps) { sc += ps; ui(); } }, 1000);
    bar.innerHTML = '<span class="hint">모은 점수는 이 화면에서만 유지돼요</span>'; ui();
  },

  /* 동묘 쇼핑: 가게 돌아다니기 · 흥정 · 영수증 */
  flea(st, bar, c) {
    let sh = 0, sel = null, basket = [], rc = false;
    const spent = () => basket.reduce((a, b) => a + b.p, 0);
    const aw = col => `<svg class="aw" viewBox="0 0 320 50" preserveAspectRatio="none">${Array.from({ length: 8 }, (_, i) => `<rect x="${i * 40}" y="0" width="40" height="32" fill="${i % 2 ? '#FEFEFE' : col}"/><circle cx="${i * 40 + 20}" cy="32" r="18" fill="${i % 2 ? '#FEFEFE' : col}"/>`).join('')}</svg>`;
    const render = () => {
      if (rc) {
        st.innerHTML = `<div class="receipt"><h4>동묘 구제시장</h4><small>오늘의 쇼핑 영수증</small><hr>${basket.length ? basket.map(b => `<div class="rl"><span>${b.n}</span><span>${won(b.p)}</span></div>`).join('') : '<div class="rl"><span>산 물건 없음</span><span>-</span></div>'}<hr><div class="rl"><b>합계</b><b>${won(spent())}</b></div><div class="rl"><span>남은 돈</span><span>${won(c.budget - spent())}</span></div><div class="rl"><span>흥정 성공</span><span>${basket.filter(b => b.h).length}회</span></div><hr><small>*** 또 오세요 ***</small></div><button class="bigbtn" data-a="back">다시 쇼핑하기</button>`;
        return;
      }
      const s = c.shops[sh];
      const deal = sel ? `<b>${s.items[sel.i][1]}</b> ${won(sel.p)} <button class="chip" data-a="buy">${basket.some(b => b.n === s.items[sel.i][1]) ? '환불' : '사기'}</button><button class="chip" data-a="hag" ${sel.tried ? 'disabled' : ''}>깎아달라고 하기</button><div class="hint">${sel.m || ''}</div>` : '<span class="hint">물건을 눌러 가격을 확인하고 흥정해보세요</span>';
      st.innerHTML = `${aw(s.c)}<div class="stallname">${s.n}</div><div class="shelf">${s.items.map((it, i) => `<button class="item${basket.some(b => b.n === it[1]) ? ' in' : ''}${sel && sel.i === i ? ' pick' : ''}" data-i="${i}">${ic(it[0], it[3])}<small>${it[1]}<br>${won(it[2])}</small></button>`).join('')}</div><div class="deal">${deal}</div><div class="count">장바구니 ${basket.length}개 · 남은 돈 ${won(c.budget - spent())}</div>`;
    };
    const bars = () => { bar.innerHTML = rc ? '' : rowOf('가게 이동', c.shops.map((s, i) => `<button class="chip${i === sh ? ' on' : ''}" data-s="${i}">${s.n}</button>`).join('')) + rowOf('', '<button class="chip" data-a="rc">영수증 보기</button><button class="chip" data-a="clr">비우기</button>'); colBar(bar); };
    const act = e => {
      const b = e.target.closest('button'); if (!b) return; const d = b.dataset, s = c.shops[sh];
      if (d.s !== undefined) { sh = +d.s; sel = null; beep(400); }
      if (d.i !== undefined && b.classList.contains('item')) { const it = s.items[+d.i]; const had = basket.find(x => x.n === it[1]); sel = { i: +d.i, p: had ? had.p : it[2], tried: !!had }; }
      if (d.a === 'hag' && sel && !sel.tried) { sel.tried = true; if (Math.random() < .55) { sel.p = Math.round(s.items[sel.i][2] * (.7 + Math.random() * .2) / 100) * 100; sel.h = 1; sel.m = '“에이, 그럼 이 가격에 가져가세요!” 깎았어요'; beep(800); } else sel.m = '“그건 힘들어~ 이게 최저가예요”'; }
      if (d.a === 'buy' && sel) { const it = s.items[sel.i], at = basket.findIndex(x => x.n === it[1]); if (at > -1) basket.splice(at, 1); else if (spent() + sel.p <= c.budget) { basket.push({ n: it[1], p: sel.p, h: sel.h }); beep(600); sel = null; } else sel.m = '돈이 부족해요!'; }
      if (d.a === 'rc') rc = true; if (d.a === 'back') rc = false; if (d.a === 'clr') { basket = []; sel = null; }
      bars(); render();
    };
    st.onclick = act; bar.onclick = act; bars(); render();
  },

  /* 먹는 접시: 한입씩 베어 먹기 (토마토마라탕 · 한정선) */
  dish(st, bar, c) {
    let bites = 0, done = 0, sip = 0; const live = new Map();
    st.innerHTML = `<div class="plate" id="pl" style="--b:${c.base}"><i class="base"></i></div><div class="count" id="ct"></div><p class="hint" id="hn"></p>`;
    const pl = $('#pl', st);
    const upd = () => {
      const els = [...live.values()], n = els.length;
      els.forEach((e, i) => { const a = 2 * Math.PI * i / n - Math.PI / 2, r = n === 1 ? 0 : 30; e.style.left = 50 + r * Math.cos(a) + '%'; e.style.top = 50 + r * Math.sin(a) + '%'; });
      pl.style.setProperty('--s', sip * 5 + '%');
      $('#ct', st).textContent = `한입 ${bites}번 · 다 먹은 것 ${done}개`;
      $('#hn', st).textContent = n ? '재료를 눌러 한입씩 먹어보세요' : (done ? '잘 먹었습니다!' : '아래에서 재료를 골라 담아보세요');
    };
    const add = it => { const el = piece(I[it[1]](it[2]), it[3], () => { bites++; upd(); }, () => { done++; live.delete(it[0]); upd(); }); el.title = it[0]; live.set(it[0], el); pl.appendChild(el); };
    if (c.mode === 'fixed') { c.items.forEach(add); bar.innerHTML = '<button class="chip" id="rs">새 접시 받기</button>'; $('#rs', bar).onclick = () => X.dish(st, bar, c); }
    else {
      bar.innerHTML = rowOf('재료', c.items.map(it => `<button class="chip" data-k="${it[0]}">${it[0]}</button>`).join('')) + rowOf('', '<button class="chip" data-a="sip">국물 한 모금</button><button class="chip" data-a="rs">새 그릇</button>'); colBar(bar);
      bar.onclick = e => {
        const b = e.target.closest('.chip'); if (!b) return;
        if (b.dataset.k) { const it = c.items.find(x => x[0] === b.dataset.k); if (live.has(it[0])) { live.get(it[0]).remove(); live.delete(it[0]); b.classList.remove('on'); } else { add(it); b.classList.add('on'); beep(640); } }
        if (b.dataset.a === 'sip' && sip < 6) { sip++; noise(.15, .12, 1); }
        if (b.dataset.a === 'rs') return X.dish(st, bar, c);
        upd();
      };
    }
    upd();
  },

  /* 피자설기: 토핑을 올리고 조각을 한입씩 */
  pizza(st, bar) {
    const TP = [['토마토', 'tomato'], ['치즈', 'cheese'], ['올리브', 'olive'], ['콘', 'corn'], ['베이컨', 'bacon']]; let sel = [], bites = Array(8).fill(0);
    const P = (a, r) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)], rad = Math.PI / 4;
    st.innerHTML = '<svg class="pz" viewBox="0 0 200 200"></svg><div class="count" id="ct"></div><p class="hint">토핑을 올린 뒤 조각을 눌러 한입씩 먹어보세요</p>';
    const render = () => {
      let defs = '', body = '<circle cx="100" cy="100" r="97" fill="#FEFEFE" stroke="#1C1C20" stroke-width="2"/>';
      for (let i = 0; i < 8; i++) {
        const a0 = i * rad - Math.PI / 2, a1 = a0 + rad, am = a0 + rad / 2, [x0, y0] = P(a0, 90), [x1, y1] = P(a1, 90);
        defs += `<mask id="pm${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200"><rect width="200" height="200" fill="#fff"/>${Array.from({ length: bites[i] }, (_, b) => { const [bx, by] = P(am, 96 - b * 2); return `<circle cx="${bx}" cy="${by}" r="${16 + b * 10}" fill="#000"/>`; }).join('')}</mask>`;
        const tops = sel.map((t, j) => { const [tx, ty] = P(am + (j % 2 ? .12 : -.12), 36 + (j % 3) * 15); return `<g transform="translate(${tx - 9} ${ty - 9}) scale(.38)">${I[t[1]]()}</g>`; }).join('');
        if (bites[i] < 3) body += `<g class="sl" data-i="${i}" mask="url(#pm${i})"><path d="M100 100L${x0} ${y0}A90 90 0 0 1 ${x1} ${y1}Z" fill="#F7E7C4" stroke="#1C1C20" stroke-width="2" stroke-linejoin="round"/><path d="M${x0} ${y0}A90 90 0 0 1 ${x1} ${y1}" stroke="#E2B97A" stroke-width="9" fill="none"/>${tops}</g>`;
      }
      $('.pz', st).innerHTML = `<defs>${defs}</defs>${body}`;
      const gone = bites.filter(b => b >= 3).length; $('#ct', st).textContent = `먹은 조각 ${gone}/8`;
    };
    st.onclick = e => { const g = e.target.closest('.sl'); if (!g) return; const i = +g.dataset.i; if (bites[i] < 3) { bites[i]++; crunch(); render(); } };
    bar.innerHTML = rowOf('토핑', TP.map(t => `<button class="chip" data-k="${t[0]}">${t[0]}</button>`).join('')) + rowOf('', '<button class="chip" data-a="rs">새 피자설기</button>'); colBar(bar);
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; if (b.dataset.a) { sel = []; bites.fill(0); $$('.chip', bar).forEach(x => x.classList.remove('on')); } else { const t = TP.find(x => x[0] === b.dataset.k), at = sel.indexOf(t); if (at > -1) { sel.splice(at, 1); b.classList.remove('on'); } else { sel.push(t); b.classList.add('on'); beep(640); } } render(); };
    render();
  },

  /* 라면 말려먹기: 끓이기 → 간 맞추기 → 건지기 → 말리기 → 먹기 */
  ramen(st, bar) {
    let step = 0, salt = 1, dry = 0, bites = 0, iv, tip = '';
    const BC = [[70, 100], [200, 112], [130, 80], [160, 140], [100, 140]];
    const waves = (d, x0, y0, rows, n) => { const a = 12 * (1 - d * .85), col = d < .4 ? '#F6D98B' : d < .75 ? '#EBC66E' : '#D9A94B'; let p = ''; for (let k = 0; k < rows; k++) p += `<path d="M${x0} ${y0 + k * 11}q10 ${-a} 20 0${'t20 0'.repeat(n)}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`; return p; };
    const plate = (d, b) => `<svg class="rm" viewBox="0 0 300 200"><defs><mask id="nm" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="200"><rect width="300" height="200" fill="#fff"/>${BC.slice(0, b).map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="32" fill="#000"/>`).join('')}</mask></defs><ellipse cx="150" cy="130" rx="135" ry="62" fill="#FEFEFE" stroke="#1C1C20" stroke-width="2"/><ellipse cx="150" cy="130" rx="105" ry="46" fill="#E1E5EA"/>${b < 4 ? `<g mask="url(#nm)">${waves(d, 45, 90, 6, 6)}</g>` : ''}</svg>`;
    const pot = () => `<svg class="rm" viewBox="0 0 300 200"><path d="M70 72h160v78q0 20-20 20H90q-20 0-20-20z" fill="#4B4F59"/><rect x="48" y="86" width="22" height="10" rx="5" fill="#4B4F59"/><rect x="230" y="86" width="22" height="10" rx="5" fill="#4B4F59"/><ellipse cx="150" cy="72" rx="80" ry="16" fill="#2A2B31"/><ellipse cx="150" cy="74" rx="70" ry="12" fill="${['#D9A441', '#C9772F', '#A8531F'][salt]}"/><path d="M100 76q10-6 20 0t20 0t20 0t20 0" stroke="#F6D98B" stroke-width="5" fill="none" stroke-linecap="round"/><path class="stm" d="M120 54q-8-12 0-24M150 54q-8-12 0-24M180 54q-8-12 0-24" stroke="#B9BFC9" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
    const feel = () => dry < .3 ? '아직 촉촉해서 평범한 라면 같아요. 조금 더 기다려볼걸!' : dry < .75 ? (salt === 0 ? '꼬들꼬들해요! 다만 간이 심심하니 다음엔 더 짜게 끓여보세요.' : salt === 2 ? '꼬들꼬들하지만 정말 짜요! 물이 필요해요.' : '꼬들꼬들하고 짭짤해요. 딱 좋은 상태예요!') : '뻑뻑하고 딱딱해요. 너무 오래 두었어요.';
    const go = () => {
      clearInterval(iv); st.onclick = null;
      bar.innerHTML = '<button class="chip" id="rs">처음부터 다시</button>'; $('#rs', bar).onclick = () => { step = 0; dry = 0; bites = 0; tip = ''; go(); };
      if (step === 0) { st.innerHTML = `${pot()}<div class="say">물이 끓으면 라면을 넣어요</div><button class="bigbtn" id="a">라면 끓이기</button>`; $('#a', st).onclick = () => { step = 1; go(); }; }
      else if (step === 1) { st.innerHTML = `${pot()}<div class="say">간을 골라요. 이 방법은 조금 짜게 끓여요</div><div class="grp">${['보통', '조금 짜게', '아주 짜게'].map((s, i) => `<button class="bigbtn" data-i="${i}">${s}</button>`).join('')}</div>`; st.onclick = e => { const b = e.target.closest('[data-i]'); if (b) { salt = +b.dataset.i; step = 2; go(); } }; }
      else if (step === 2) { st.innerHTML = `${pot()}<div class="say">면이 익었어요. 국물은 두고 면만 건져요</div><button class="bigbtn" id="a">면만 접시에 건지기</button>`; $('#a', st).onclick = () => { step = 3; go(); }; }
      else {
        st.innerHTML = '<div id="nd"></div><div class="meter"><i id="mt"></i></div><div class="say" id="sy"></div><button class="bigbtn" id="fan">부채질하기</button>';
        const paint = () => { $('#nd', st).innerHTML = plate(dry, bites); $('#mt', st).style.width = Math.min(100, dry * 100) + '%'; $('#sy', st).textContent = tip || (dry < .3 ? '면이 마르는 중이에요. 조금 기다려요' : dry < .75 ? '꼬들꼬들해졌어요! 지금 먹어보세요' : '꽤 말랐어요. 더 딱딱해지기 전에!'); };
        $('#fan', st).onclick = () => { dry = Math.min(1, dry + .1); paint(); };
        iv = setInterval(() => { if (!st.isConnected) return clearInterval(iv); dry = Math.min(1, dry + .02); if (bites < 4) paint(); }, 400);
        st.onclick = e => { if (!e.target.closest('#nd') || bites >= 4) return; bites++; crunch(); tip = feel(); if (bites >= 4) { tip = '잘 먹었습니다! ' + tip; clearInterval(iv); } paint(); };
        paint();
      }
    };
    go();
  },

  /* 옥: 옷을 고르고 옥 액세서리를 착용해 코디 */
  jade(st, bar) {
    const TN = [['백옥', '#F2FBF6', '#CDEBDB', '#8FC4A9'], ['비취옥', '#C9F5E1', '#5FCFA0', '#1F8F65'], ['녹옥', '#8FDCB0', '#2FA06A', '#14603F'], ['자옥', '#EBDDFB', '#B79CFF', '#6E4FB5']];
    const OF = [['블랙 니트', '#1C1C20'], ['화이트 셔츠', '#FEFEFE'], ['핑크 원피스', '#F9B8E0'], ['스카이 블라우스', '#9CCBF5']];
    const MSG = ['검은 옷 위에서 옥빛이 가장 선명하게 살아나요.', '흰 셔츠에는 은은한 옥빛이 깔끔한 포인트가 돼요.', '핑크와 옥빛의 대비가 발랄한 분위기를 만들어요.', '하늘색과 옥빛이 시원한 한 쌍이에요.'];
    const AC = [['neck', '목걸이'], ['wrist', '팔찌'], ['ear', '귀걸이'], ['ring', '반지']]; let ti = 1, of = 0; const on = { neck: true, wrist: true, ear: false, ring: false };
    const skin = '#F2CDB5', J = 'url(#jg)';
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 300 340"></svg><div class="say" id="say"></div>';
    const draw = () => {
      const t = TN[ti], o = OF[of][1], sleeve = of === 1 ? '#FEFEFE' : o;
      const defs = `<defs><radialGradient id="jg" cx=".5" cy=".5" r=".7" fx=".3" fy=".25"><stop offset="0" stop-color="${t[1]}"/><stop offset=".55" stop-color="${t[2]}"/><stop offset="1" stop-color="${t[3]}"/></radialGradient></defs>`;
      const line = of === 1 ? ' stroke="#B9BFC9" stroke-width="2"' : '';
      let s = defs + `<rect x="136" y="128" width="28" height="52" fill="${skin}"/>`;
      s += `<path d="M74 214L50 300" stroke="${sleeve}" stroke-width="34" stroke-linecap="round"/><path d="M226 214L250 300" stroke="${sleeve}" stroke-width="34" stroke-linecap="round"/><circle cx="46" cy="318" r="17" fill="${skin}"/><circle cx="254" cy="318" r="17" fill="${skin}"/>`;
      s += `<path d="M56 340V262Q56 206 108 188L140 176H160L192 188Q244 206 244 262V340z" fill="${o}"${line}/>`;
      s += of === 1 ? `<path d="M124 178L142 200L150 178zM176 178L158 200L150 178z" fill="#fff" stroke="#B9BFC9" stroke-width="2"/><circle cx="150" cy="226" r="3" fill="#B9BFC9"/><circle cx="150" cy="254" r="3" fill="#B9BFC9"/>` : `<path d="M124 182Q150 216 176 182L164 170H136z" fill="${skin}"/>`;
      if (of === 0) s += '<path d="M100 220V340M124 214V340M176 214V340M200 220V340" stroke="#fff" stroke-opacity=".08" stroke-width="3"/>';
      s += `<circle cx="150" cy="92" r="42" fill="${skin}"/><circle cx="108" cy="98" r="9" fill="${skin}"/><circle cx="192" cy="98" r="9" fill="${skin}"/><path d="M104 96C98 50 126 40 150 40S202 50 196 96C184 74 168 64 150 64S116 74 104 96z" fill="${K}"/><circle cx="134" cy="98" r="3" fill="${K}"/><circle cx="166" cy="98" r="3" fill="${K}"/><path d="M142 114q8 6 16 0" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="124" cy="108" r="5" fill="#F65AC2" opacity=".3"/><circle cx="176" cy="108" r="5" fill="#F65AC2" opacity=".3"/>`;
      if (on.neck) s += `<path d="M133 158Q150 212 167 158" fill="none" stroke="${J}" stroke-width="5" stroke-linecap="round"/><circle cx="150" cy="186" r="11" fill="${J}"/><circle cx="150" cy="186" r="4" fill="${o === '#FEFEFE' ? skin : o}"/>`;
      if (on.ear) s += `<path d="M108 106V114M192 106V114" stroke="#E8C65A" stroke-width="2"/><circle cx="108" cy="121" r="7" fill="${J}"/><circle cx="192" cy="121" r="7" fill="${J}"/>`;
      if (on.wrist) s += `<ellipse cx="48" cy="306" rx="19" ry="7" fill="none" stroke="${J}" stroke-width="8"/>`;
      if (on.ring) s += `<circle cx="254" cy="322" r="7" fill="none" stroke="${J}" stroke-width="4"/><ellipse cx="254" cy="316" rx="6" ry="4" fill="${J}"/>`;
      $('#sc', st).innerHTML = s;
      $('#say', st).textContent = `${OF[of][0]} × ${t[0]} — ${MSG[of]}`;
    };
    const rows = () => { bar.innerHTML = rowOf('옷', OF.map((o, i) => `<button class="chip${i === of ? ' on' : ''}" data-o="${i}">${o[0]}</button>`).join('')) + rowOf('옥빛', TN.map((t, i) => `<button class="chip${i === ti ? ' on' : ''}" data-t="${i}">${t[0]}</button>`).join('')) + rowOf('착용', AC.map(a => `<button class="chip${on[a[0]] ? ' on' : ''}" data-a="${a[0]}">${a[1]}</button>`).join('')); colBar(bar); };
    bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; const d = b.dataset; if (d.o) of = +d.o; if (d.t) ti = +d.t; if (d.a) on[d.a] = !on[d.a]; beep(600); rows(); draw(); };
    rows(); draw();
  },

  /* 메지루시 · 젤리슈즈 · 볼펜: 장식을 추가하고 드래그해서 배치 */
  decor(st, bar, c) {
    let it = 0, col = 0, ch = [], id = 0;
    st.innerHTML = '<svg id="sc" class="scene dgs" viewBox="0 0 360 330"></svg><p class="hint">장식을 추가한 뒤 드래그해서 원하는 곳에 달아보세요 · 더블클릭하면 떼요</p>';
    const svg = $('#sc', st);
    const partSvg = k => { if (k.startsWith('charm:')) { const [, h, n] = k.split(':'); return `<g transform="translate(-31 -10) scale(1.3)">${I.charm(h, +n)}</g>`; } return `<g transform="translate(-26 -26) scale(1.1)">${I[k]()}</g>`; };
    const draw = () => { svg.innerHTML = ART[c.items[it].a](c.colors[col]) + ch.map(p => `<g class="dg" data-id="${p.id}" transform="translate(${p.x} ${p.y})"><g class="${p.k.startsWith('charm') ? 'swy' : ''}">${partSvg(p.k)}</g></g>`).join(''); };
    const label = k => k.startsWith('charm:') ? ic('charm', k.split(':')[1], +k.split(':')[2]) : ic(k);
    const rows = () => { bar.innerHTML = (c.items.length > 1 ? rowOf('물건', c.items.map((x, i) => `<button class="chip${i === it ? ' on' : ''}" data-it="${i}">${x.n}</button>`).join('')) : '') + rowOf('색상', c.colors.map((x, i) => `<button class="sw${i === col ? ' on' : ''}" data-c="${i}" style="background:${x}" aria-label="색 ${i + 1}"></button>`).join('')) + rowOf('장식 추가', c.parts.map(k => `<button class="chip" data-k="${k}">${label(k)}</button>`).join('') + '<button class="chip" data-r="1">모두 떼기</button>'); colBar(bar); };
    bar.onclick = e => {
      const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
      if (d.it) it = +d.it; if (d.c) col = +d.c;
      if (d.k) { const at = c.items[it].at; ch.push({ id: ++id, k: d.k, x: Math.max(30, Math.min(330, at[0] + (Math.random() - .5) * 150)), y: Math.max(30, Math.min(300, at[1] + 10 + Math.random() * 50)) }); if (ch.length > 8) ch.shift(); beep(700); }
      if (d.r) ch = [];
      rows(); draw();
    };
    const pt = e => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    let drag = null;
    svg.onpointerdown = e => { const g = e.target.closest('.dg'); if (!g) return; const p = ch.find(x => x.id == g.dataset.id), q = pt(e); drag = { p, g, ox: p.x - q.x, oy: p.y - q.y }; svg.setPointerCapture(e.pointerId); g.classList.add('lift'); ch.push(ch.splice(ch.indexOf(p), 1)[0]); svg.appendChild(g); };
    svg.onpointermove = e => { if (!drag) return; const q = pt(e), p = drag.p; p.x = Math.max(20, Math.min(340, q.x + drag.ox)); p.y = Math.max(20, Math.min(310, q.y + drag.oy)); drag.g.setAttribute('transform', `translate(${p.x} ${p.y})`); };
    svg.onpointerup = svg.onpointercancel = () => { if (drag) drag.g.classList.remove('lift'); drag = null; };
    svg.ondblclick = e => { const g = e.target.closest('.dg'); if (g) { ch = ch.filter(x => x.id != g.dataset.id); draw(); } };
    rows(); draw();
  },
};

/* ---------------- 화면 렌더 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

const burst = (n, ro, ri) => { let p = ''; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2, r = i % 2 ? ri : ro; p += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(1)} ${(50 + r * Math.sin(a)).toFixed(1)}`; } return p + 'z'; };
const BADGE = { food: ['FOOD', '맛보기', '#FFEA00', K], play: ['PLAY', '즐기기', '#1C94F5', W], fashion: ['FASHION', '꾸미기', '#F65AC2', K] };
const badge = k => { const [en, ko, c, tc] = BADGE[k]; return `<span class="bd"><svg viewBox="0 0 100 100"><path d="${burst(14, 48, 36)}" fill="${c}" stroke="${K}" stroke-width="1.6" stroke-linejoin="round"/><text x="50" y="48" text-anchor="middle" font-size="${en.length > 5 ? 12 : 16}" font-weight="800" fill="${tc}" font-family="SUIT Variable,sans-serif">${en}</text><text x="50" y="63" text-anchor="middle" font-size="11" font-weight="800" fill="${tc}" font-family="SUIT Variable,sans-serif">${ko}</text></svg></span>`; };
const POP = [[10, 36, 'burst', '#FFEA00', 34], [66, 11, 'spark', '#1C94F5', 30], [36, 80, 'dot', '#FFEA00', 24], [93, 24, 'ring', '#F65AC2', 26], [53, 58, 'spark', '#F65AC2', 22], [24, 88, 'burst', '#1C94F5', 22]];
const popSvg = (t, c) => t === 'burst' ? `<svg viewBox="0 0 100 100"><path d="${burst(8, 48, 26)}" fill="${c}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/></svg>`
  : t === 'spark' ? `<svg viewBox="0 0 24 24"><path d="M12 1C13 8 16 11 23 12C16 13 13 16 12 23C11 16 8 13 1 12C8 11 11 8 12 1z" fill="${c}" stroke="${K}" stroke-width="1.2" stroke-linejoin="round"/></svg>`
  : `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${t === 'dot' ? c : 'none'}" stroke="${t === 'dot' ? K : c}" stroke-width="${t === 'dot' ? 1.4 : 3}"/></svg>`;
const pops = () => POP.map(([x, y, t, c, w]) => `<span class="pp" style="left:${x}%;top:${y}%;width:${w}px">${popSvg(t, c)}</span>`).join('');

const ABOUT_STEPS = { food: ['읽고', '맛보고'], play: ['읽고', '즐기고'], fashion: ['읽고', '꾸미고'] };
function about(ks) {
  const cat = k => `<a class="ab-cat ${k}" href="#/cat/${k}"><span class="tagp ${k}">${LAB[k]}</span><h4>${CATS[k].n}</h4><p>${CATS[k].d}</p><span class="view-more">VIEW →</span></a>`;
  return `<section class="about" id="about">
    <div class="ab-in">
      <div class="ab-head">
        <span class="ab-kick">ABOUT A2Z</span>
        <h2 class="ab-logo"><span>A</span><em>2</em><span>Z</span></h2>
        <p class="ab-sub">A to Z에서 <b>to</b>를 <b>2</b>로 바꿨어요.<br>A부터 Z까지, 전 세대가 함께 최신 트렌드를 경험하는 놀이터예요.</p>
      </div>
      <div class="ab-grid">
        <div class="ab-card why"><span class="tagp play">NAME</span><h3>왜 A2Z일까요?</h3><p>가장 앞의 A부터 맨 끝의 Z까지, 알파벳 전체를 다 아우르듯 <b>모든 세대</b>가 한자리에 모인다는 뜻이에요. 가운데의 <em>to</em>는 숫자 <em>2</em>로 바꿔서, 세대와 세대 사이를 잇는 다리이자 &lsquo;둘이 함께&rsquo;라는 의미를 담았어요.</p></div>
        <div class="ab-card young"><span class="tagp food">10대 · 20대</span><h3>마음껏 즐겨요</h3><p>지금 가장 핫한 유행을 읽고 직접 해보면서 내 취향을 마음껏 즐겨보세요.</p></div>
        <div class="ab-card elder"><span class="tagp fashion">윗세대</span><h3>왜 좋아하는지 공감해요</h3><p>직접 체험해 보면 &ldquo;요즘 애들은 왜 이런 걸 좋아할까?&rdquo; 하던 궁금증이 &ldquo;아, 그래서 좋아하는구나&rdquo; 하는 공감으로 바뀌어요.</p></div>
      </div>
      <div class="ab-how">
        <div class="ab-how-t"><span class="ab-kick">HOW IT WORKS</span><h3>세 가지 카테고리,<br>읽고 바로 체험해요</h3><p>카테고리마다 요즘 유행하는 트렌드를 골라 설명을 읽고, 그 자리에서 간단한 체험까지 해볼 수 있어요.</p></div>
        <div class="ab-cats">${ks.map(cat).join('')}</div>
      </div>
      <a class="ab-top" href="#/" onclick="scrollTo({top:0,behavior:'smooth'});return false">↑ 처음으로</a>
    </div>
  </section>`;
}

function home() {
  const ks = Object.keys(CATS);
  app.innerHTML = `<section class="view space">${pops()}${ks.map(k => `<a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}"><div class="shape">${BLOB[k]}</div>${badge(k)}<div class="txt"><span class="tagp ${k}">${LAB[k]}</span><h2>${CATS[k].n}</h2><p>${CATS[k].d}</p><span class="vlink">VIEW <svg viewBox="0 0 20 12" width="20" height="12" aria-hidden="true"><path d="M1 6h17M13 1.5L18 6l-5 4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div></a>`).join('')}
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <div class="tip">오브젝트를 클릭해보세요</div>
    <a class="cue" href="#about" aria-label="사이트 소개로 스크롤"><span>SCROLL</span><svg viewBox="0 0 12 16" width="12" height="16"><path d="M6 1v13M1.5 9.5L6 14l4.5-4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></a></section>${about(ks)}`;
  const sp = $('.space');
  space3d(sp);
  if (!$('.gl', sp)) $$('.shape', sp).forEach((s, i) => s.insertAdjacentHTML('beforeend', ic(CATS[ks[i]].i)));
  tutorial(sp);
}

async function tutorial(sp) {
  const cur = $('.cursor', sp), rp = $('.ripple', sp), tip = $('.tip', sp), orbs = $$('.hb', sp); let stop = false, i = 0;
  orbs.forEach(o => o.addEventListener('pointerenter', () => { stop = true; cur.remove(); rp.remove(); tip.classList.add('off'); }));
  await sleep(900);
  while (!stop && sp.isConnected) {
    const o = orbs[i++ % 3], r = $('.shape', o).getBoundingClientRect(), s = sp.getBoundingClientRect();
    const x = r.left - s.left + r.width * .5, y = r.top - s.top + r.height * .5;
    try {
      await cur.animate([{ transform: `translate(${s.width * .5}px,${s.height * .95}px)`, opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(${x}px,${y}px)`, opacity: 1 }], { duration: 1500, easing: 'ease-in-out', fill: 'forwards' }).finished;
      if (stop) break;
      rp.style.left = x + 'px'; rp.style.top = y + 'px';
      rp.animate([{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(2)', opacity: 0 }], 700);
      sp.dispatchEvent(new CustomEvent('pulse', { detail: orbs.indexOf(o) }));
      $('.shape', o).animate([{ scale: 1 }, { scale: .9 }, { scale: 1.08 }, { scale: 1 }], 500);
      await sleep(1200); if (stop) break;
      await cur.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).finished;
      await sleep(500);
    } catch (e) { break; }
  }
}

/* 목록 카드: 세로 변은 수직, 위·아래 변은 카드마다 다른 각도의 사각형 (TL, TR, BR, BL — 영역 대비 비율) */
const GEO = [
  [[0, .0907], [.3543, 0], [.3543, .9176], [0, .993]],
  [[.3723, .0137], [.7051, .0659], [.7051, .4711], [.3723, .5275]],
  [[.7223, .0769], [1, 0], [1, .434], [.7223, .4725]],
  [[.374, .5645], [.9991, .4643], [.9991, .8969], [.374, 1]],
];
function roundedPath(pts, r) {
  const n = pts.length; let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n];
    const v1 = [p0[0] - p1[0], p0[1] - p1[1]], v2 = [p2[0] - p1[0], p2[1] - p1[1]], l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const a = [p1[0] + v1[0] / l1 * r, p1[1] + v1[1] / l1 * r], b = [p1[0] + v2[0] / l2 * r, p1[1] + v2[1] / l2 * r];
    d += `${i ? 'L' : 'M'}${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }
  return d + 'Z';
}
function layoutCards(mo) {
  const W = mo.clientWidth, H = mo.clientHeight;
  $$('.c3', mo).forEach((el, i) => {
    const g = GEO[i]; if (!g) return;
    const P = g.map(([x, y]) => [x * W, y * H]), xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
    const Q = P.map(p => [p[0] - x0, p[1] - y0]), d = roundedPath(Q, 14), [, , BR, BL] = Q, xt = Math.min(w * .7, 340);
    Object.assign(el.style, { left: x0 + 'px', top: y0 + 'px', width: w + 'px', height: h + 'px', clipPath: `path('${d}')` });
    $('.ol', el).innerHTML = `<path d="${d}"/>`;
    const ct = $('.ct', el); ct.classList.remove('nop'); ct.style.bottom = (h - (BL[1] + (BR[1] - BL[1]) * xt / w) + 46) + 'px';
    const topEdge = g[0][1] * H - y0 + (g[1][1] - g[0][1]) * H * (w - 40) / w;
    if (h - parseFloat(ct.style.bottom) - ct.offsetHeight < topEdge + 28) ct.classList.add('nop');
  });
}
function category(k) {
  const C = CATS[k], ts = T[k];
  const chev = '<svg viewBox="0 0 8 12" width="7" height="11"><path d="M1.5 1.5l4.5 4.5-4.5 4.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const card = (t, i) => `<a class="c3${t.img ? ' has-img' : ''}" href="#/t/${k}/${i}"><div class="ph"${t.img ? ` style="background-image:url(${t.img})"` : ''}></div><svg class="ol"></svg><div class="ct"><h3>${t.t}</h3><p>${t.lead.split('.')[0]}.</p><span class="vm">VIEW MORE ${chev}</span></div></a>`;
  app.innerHTML = `<section class="view cat4"><div class="cat4-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div><div class="mo2">${ts.slice(0, 4).map(card).join('')}</div></section>`;
  const mo = $('.mo2'); layoutCards(mo); new ResizeObserver(() => layoutCards(mo)).observe(mo);
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
  nav.innerHTML = Object.keys(CATS).map(c => `<a href="#/cat/${c}" class="${c === cat ? 'on' : ''}" style="${c === cat ? '' : ''}">${CATS[c].n}</a>`).join('');
  scrollTo(0, 0);
  if (!cat) home(); else if (a === 'cat') category(k); else trend(k, +i || 0);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a.cue'); if (!a) return;
  e.preventDefault(); const t = $('#about'); if (t) t.scrollIntoView({ behavior: 'smooth' });
});
addEventListener('hashchange', route);
route();

/* ---------------- 메인 3D (Three.js r128) ----------------
   먹거리=라면 그릇 / 놀거리=게임 컨트롤러 / 패션=모자+선글라스.
   각 .hb 블록 안의 .shape(도형) 중심에 오브젝트를 올려둔다(DOM 위치를 읽어 3D 좌표로 변환). */
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
    add(g, new THREE.TorusGeometry(.45, .09, 10, 30), 0xFFD27A, [.25, .34, -.1]).rotation.x = Math.PI / 2;
    add(g, S(.3), 0xFEFEFE, [-.4, .4, .2], [1, .7, 1]); add(g, S(.14), 0xFFB300, [-.4, .55, .2]);
    add(g, S(.25), 0x4CAF50, [.55, .42, .5], [1, .6, 1]);
    [.3, .6].forEach(z => add(g, new THREE.CylinderGeometry(.04, .04, 2.9, 8), 0x1C1C20, [0, .62, z]).rotation.z = Math.PI / 2);
  };
  const play = g => {
    add(g, S(1), 0x1C94F5, [0, 0, 0], [1.45, .45, .85]);
    [-1, 1].forEach(s => add(g, S(1), 0x1C94F5, [s * 1.0, -.02, .62], [.5, .42, .95]));
    add(g, B(.55, .1, .17), 0xFEFEFE, [-.75, .43, -.1]); add(g, B(.17, .1, .55), 0xFEFEFE, [-.75, .43, -.1]);
    [[.2, 0, 0xF65AC2], [-.2, 0, 0xFFEA00], [0, .2, 0x7BE0B0], [0, -.2, 0xFEFEFE]].forEach(([x, z, c]) => add(g, S(.12), c, [.75 + x, .43, -.1 + z]));
    [-.4, .4].forEach(x => add(g, new THREE.CylinderGeometry(.17, .2, .14, 20), 0x1C1C20, [x, .43, .35]));
  };
  const fashion = g => {
    add(g, new THREE.SphereGeometry(1.1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xF65AC2, roughness: .5, side: THREE.DoubleSide }), [0, 0, 0], [1, .9, 1]);
    add(g, new THREE.CylinderGeometry(1.2, 1.2, .1, 32, 1, false, -Math.PI / 2, Math.PI), 0xE04AAE, [0, -.02, .05], [1, 1, 1.45]);
    add(g, S(.12), 0xFEFEFE, [0, .98, 0]);
    [-1, 1].forEach(s => { add(g, S(1), 0xFEFEFE, [s * .65, -.95, 1.0], [.55, .4, .1]); add(g, S(1), 0x1C1C20, [s * .65, -.95, 1.07], [.46, .32, .06]); });
    add(g, B(.3, .07, .07), 0xFEFEFE, [0, -.88, 1.0]);
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
  sp.addEventListener('pulse', e => objs[e.detail].p = 1);
  objs.forEach((o, i) => { ['pointerenter', 'focus'].forEach(ev => o.b.addEventListener(ev, () => hov = i)); ['pointerleave', 'blur'].forEach(ev => o.b.addEventListener(ev, () => hov = -1)); });

  const tick = t => {
    if (!sp.isConnected) { ro.disconnect(); R.dispose(); return; }
    const d = Math.min((t - t0) / 1000, .05); t0 = t;
    const sr = sp.getBoundingClientRect();
    objs.forEach((o, i) => {
      const r = o.sh.getBoundingClientRect();   // 도형 중심 → 3D 좌표
      const cx = r.left - sr.left + r.width / 2, cy = r.top - sr.top + r.height / 2;
      o.s = Math.min(r.width, r.height) * 1.0 / (3.3 * pu);
      o.h += ((hov === i ? 1 : 0) - o.h) * .12; o.p *= .9; o.yaw += d * o.h * 3;
      o.root.scale.setScalar(o.s * (1 + .12 * o.h - .14 * o.p));
      o.root.position.set((cx - W / 2) / pu, -(cy - H / 2) / pu + Math.sin(t / 900 + i * 2) * .1, 0);
      o.spin.rotation.y = Math.sin(t / 1400 + i * 2) * .4 + mouse.x * .5 + o.yaw;
      o.tilt.rotation.x = o.tx + mouse.y * .25;
    });
    R.render(scene, cam); requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
