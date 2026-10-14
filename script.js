/* A2Z 스크립트 */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

// 5. 로고 한글 '에이투지' 제거하고 A2Z 영문 디자인으로 고정
const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* ---------------- SVG 아이콘 ---------------- */
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
  shoe: (a = '#D8B58A') => `<path d="M4 36c0-9 2-17 8-21l7 3c3 2 7 4 13 5 8 1 13 4 13 11v5H4z" fill="${a}"/><path d="M4 39h40" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M8 15q1-4 4-3t4-1 4 1 3 3" stroke="${W}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M17 24l13 5" stroke="${K}" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="26.5" r="2" fill="#E8C65A"/>`,
  tomato: () => `<circle cx="24" cy="27" r="15" fill="#E8472B"/><path d="M24 11l-5 6 5-2 5 2z" fill="#4CAF50"/>`,
  chili: () => `<path d="M12 10c18-2 28 10 26 30-10-4-22-12-26-30z" fill="#D9382B"/><path d="M12 10l-4-4" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>`,
  leaf: () => `<path d="M24 44c-10-6-14-20-6-34 4-5 8-5 12 0 8 14 4 28-6 34z" fill="#6CC070"/><path d="M24 40V14" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`,
  mushroom: () => `<path d="M6 26a18 16 0 0136 0z" fill="#C9996B"/><rect x="18" y="26" width="12" height="14" rx="4" fill="#F1E3CF"/>`,
  beef: () => `<rect x="6" y="12" width="36" height="24" rx="10" fill="#C0504D"/><path d="M14 22h20M16 28h14" stroke="#F4B5B0" stroke-width="3" stroke-linecap="round"/>`,
  cheese: () => `<path d="M4 36L44 16v20z" fill="#FFD84D"/><circle cx="30" cy="30" r="2.5" fill="#E6B800"/><circle cx="19" cy="33" r="2" fill="#E6B800"/>`,
  olive: () => `<circle cx="24" cy="24" r="14" fill="#3F4A2A"/><circle cx="24" cy="24" r="5" fill="#E1E5EA"/>`,
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

/* ---------------- 4. 트렌드 데이터 (세대 구분 없이 공감 위주의 텍스트 및 풍부한 설명) ---------------- */
const T = {
  play: [
    { t: '말랑이 · 탱글 · 키캡', type: 'squish',
      lead: '손끝으로 만지고 누르며 일상의 스트레스를 날려주는 감성 촉감 장난감이에요.',
      body: ['손에 쏙 들어오는 말랑이는 꾹 누르면 부드럽게 늘어났다가 천천히 제모양으로 되돌아오는 힐링 아이템입니다. 모양과 질감이 다채로워 취향대로 고르는 재미가 있습니다.',
        '손을 움직이는 동안 마음이 편안해져 바쁜 하루 중 짧은 휴식을 다 함께 나누기 좋습니다. 아래에서 여러 모양과 질감을 직접 눌러보고 비틀어보세요.'],
      talk: '어릴 적 손에 쥐고 놀던 추억의 장난감이 있나요? 요즘 장난감과 어떤 점이 닮았는지 함께 이야기해봐요.' },
    { t: '왁뿌볼', type: 'wax',
      lead: '단단한 왁스 껍질 속 말랑한 반전 촉감이 숨어있는 와작 깨먹는 장난감이에요.',
      body: ['겉은 얇고 바삭한 왁스로 감싸여 있어 꾹 누르면 와작 소리와 함께 금이 가고, 그 안에서 부드러운 속이 드러납니다.',
        '손끝에 전해지는 바삭함과 말랑함의 대비가 소소한 재미와 쾌감을 선사합니다. 아래에서 꾹 눌러 껍질을 깨보세요.'],
      talk: '“바삭하다가 말랑한” 반전 매력이 있는 음식이나 놀이가 떠오르나요? 이야기를 나눠봐요.' },
    { t: '먼작귀 클리커', type: 'clicker',
      lead: '귀엽고 작아서 소중한 캐릭터들과 함께 마음을 나누는 힐링 클리커 게임이에요.',
      body: ['귀여운 캐릭터를 마음껏 터치하여 하트 점수를 모으고, 간식을 주거나 친구를 불러 새 캐릭터를 만나는 소소한 즐거움을 느낄 수 있습니다.',
        '보는 것만으로도 미소가 지어지는 순수한 귀여움으로 온 가족에게 따뜻한 활력을 전합니다.'],
      talk: '요즘 나를 웃게 만드는 귀여운 존재나 소품이 있나요? 사진이나 사연을 공유해보세요.' },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000, '#6B8EAD'], ['cap', '볼캡', 4000, '#1C94F5'], ['shades', '선글라스', 3000, K], ['sneaker', '헌 운동화', 8000, '#F65AC2']] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000, '#FFB36B'], ['camera', '필름 카메라', 9000], ['clock', '탁상시계', 5000], ['vase', '화병', 6000]] },
        { n: '책방 · 음반 가게', c: '#1C94F5', items: [['book', '옛날 책', 2000, '#7BE0B0'], ['record', 'LP 음반', 4000], ['blob', '말랑이 인형', 3000, '#F7B6D8'], ['bag', '천가방', 5000, '#FFB36B']] },
      ],
      lead: '세월의 흔적이 담긴 골목을 누비며 나만의 레트로 보물을 찾는 장터 쇼핑이에요.',
      body: ['빈티지 의류부터 아날로그 소품, 헌책과 음반까지 정겨운 물건들이 가득한 동묘 시장을 자유롭게 둘러볼 수 있습니다.',
        '정답게 가격을 흥정하고 장바구니를 채우며 추억과 요즘 감성이 교차하는 재미를 느껴보세요. 아래에서 영수증으로 오늘의 쇼핑을 확인해보세요.'],
      talk: '시장이나 중고 가게에서 발견한 뜻밖의 보물이 있나요? 구매 사연을 이야기해보세요.' },
  ],
  food: [
    { t: '토마토 마라탕', type: 'dish', mode: 'pick', base: '#E8603A', sip: 1,
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2], ['당면', 'noodle', null, 3], ['치즈', 'cheese', null, 2], ['고추', 'chili', null, 2]],
      lead: '상큼한 토마토 국물에 얼얼한 마라를 더해 온 가족이 부담 없이 즐기는 퓨전 요리예요.',
      body: ['토마토의 부드러움이 마라의 자극적인 매운맛을 달콤하게 감싸주어 매운 것에 서툰 사람도 다 함께 즐길 수 있는 특별한 요리입니다.',
        '원하는 재료를 자유롭게 담고 깊은 국물과 함께 즐기며 식탁 위에서 따뜻한 온기를 나누어 보세요.'],
      talk: '좋아하는 국물 요리에 나만의 재료를 더해본 적이 있나요? 나만의 레시피를 공유해봐요.' },
    { t: '한정선', type: 'dish', mode: 'fixed', base: '#F3F5F8',
      items: [['딸기', 'mochi', '#FF5470', 4], ['귤', 'mochi', '#FF9F1C', 4], ['샤인머스캣', 'mochi', '#9BD65A', 4], ['복숭아', 'mochi', '#FFB4A2', 4]],
      lead: '제철 과일이 통째로 들어간 달콤하고 쫀득한 수제 과일 찹쌀떡이에요.',
      body: ['쫀득하고 고소한 찹쌀떡 속에 싱싱한 과일이 통째로 들어 있어, 한입 베어 물면 새콤달콤한 과즙이 입안 가득 퍼집니다.',
        '전통 찹쌀떡의 깊은 식감과 신선한 과일의 조화로 온 가족이 디저트로 함께 나누기 좋습니다.'],
      talk: '특별한 날 다 함께 둘러앉아 나누어 먹던 추억의 간식이 있다면 이야기해봐요.' },
    { t: '피자 설기', type: 'pizza',
      lead: '담백한 백설기 위에 고소한 치즈와 풍성한 피자 토핑을 얹은 퓨전 떡 간식이에요.',
      body: ['전통 백설기의 쫀득하고 담백한 식감에 치즈와 토마토, 올리브 등 피자 풍미가 더해져 예스러움과 색다른 맛을 동시에 즐길 수 있습니다.',
        '한 조각씩 보기 좋게 나뉘어 있어 다 함께 둘러앉아 간편하게 베어 먹기 좋은 인기 별미입니다.'],
      talk: '떡이나 빵에 의외의 재료를 올려 맛있게 먹었던 기억이 있나요?' },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '조금 짜게 끓인 라면의 면을 접시에 건져 살짝 말려 꼬들꼬들한 식감으로 즐기는 유행이에요.',
      body: ['조금 진하게 끓인 국물 라면에서 면발만 접시에 건져 잠시 식혀두면, 면이 건조해지면서 한층 꼬들꼬들하고 뻑뻑한 특유의 감칠맛 식감이 살아납니다.',
        '기다리는 시간에 따라 달라지는 면발의 식감을 비교해보며 꼬들라면의 매력을 경험해보세요.'],
      talk: '라면을 더 맛있게 즐기기 위한 나만의 비법이나 습관이 있다면 나누어 보세요.' },
  ],
  fashion: [
    { t: '옥 스타일링', type: 'jade',
      lead: '은은하고 단아한 옥을 현대적인 모던 패션 소품으로 감각 있게 매치하는 스타일이에요.',
      body: ['맑고 기품 있는 옥빛 액세서리는 단정한 자켓이나 캐주얼한 티셔츠 어디에나 고급스러운 포인트를 더해줍니다.',
        '원하는 옷과 옥 반지, 목걸이를 조합하며 클래식한 멋을 나만의 느낌으로 연출해보세요.'],
      talk: '집안에 오래 전해 내려온 소품이나 장신구를 요즘 옷차림에 매치해본 적이 있나요?' },
    { t: '메지루시', type: 'decor',
      items: [{ n: '우산', a: 'umb', at: [154, 296] }, { n: '가방', a: 'bag', at: [230, 122] }, { n: '텀블러', a: 'tum', at: [302, 160] }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#7BE0B0', '#1C1C20'],
      parts: ['charm:#FFB36B:0', 'charm:#F7B6D8:1', 'charm:#B79CFF:2', 'charm:#7BE0B0:0', 'charm:#FFE16B:2', 'charm:#9CCBF5:1'],
      lead: '우산이나 가방, 텀블러에 아기자기한 참을 달아 나만의 물건임을 표시하는 참 트렌드예요.',
      body: ['링이 달린 아크릴 캐릭터 참을 소지품에 걸어두면 똑같은 물건 사이에서도 내 것을 단번에 알아볼 수 있습니다.',
        '원하는 소품을 고르고 메지루시 참을 자유롭게 드래그하여 나만의 위치에 달아보세요.'],
      talk: '내 물건임을 알아보기 위해 달아두었던 나만의 개성 있는 표시가 있나요?' },
    { t: '젤리슈즈 꾸미기', type: 'decor',
      items: [{ n: '젤리슈즈', a: 'shoe', at: [188, 164] }],
      colors: ['#F7A8D8', '#9CCBF5', '#C9F5E1', '#E1E5EA', '#FFE16B'],
      parts: ['star', 'heart', 'flower', 'bow', 'charm:#FFB36B:0', 'charm:#B79CFF:2'],
      lead: '말랑말랑한 젤리 신발 구멍에 다채로운 장신구 파츠를 꽂아 완성하는 DIY 패션이에요.',
      body: ['가볍고 투명한 젤리 슈즈에 아기자기한 참과 꽃, 하트 파츠를 조합하여 신발을 화사하게 꾸밀 수 있습니다.',
        '상큼한 색상과 취향에 맞는 파츠를 자유롭게 드래그하여 신발에 꽂아보세요.'],
      talk: '어릴 적 신었던 신발 중 가장 기억에 남는 추억의 신발은 무엇인가요?' },
    { t: '볼펜 꾸미기', type: 'decor',
      items: [{ n: '볼펜', a: 'pen', at: [180, 165] }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#1C1C20', '#7BE0B0'],
      parts: ['star', 'heart', 'flower', 'bow', 'charm:#FFB36B:0', 'charm:#B79CFF:2'],
      lead: '일상에서 늘 사용하는 볼펜에 장식 클립과 참을 더해 특별하게 만드는 문구 꾸미기예요.',
      body: ['평범한 볼펜 상단에 구슬과 캐릭터 장식을 조합하여 필기하는 시간을 한층 더 즐겁게 만들어줍니다.',
        '원하는 펜 색상을 고르고 장식을 드래그하여 나만의 전용 볼펜을 완성해보세요.'],
      talk: '평소에 아끼고 애용하는 나만의 문구나 만년필, 필기도구가 있나요?' },
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
const bitten = (inner, n, id) => `<svg class="ic" viewBox="0 0 48 48"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48"><rect width="48" height="48" fill="#fff"/>${BP.slice(0, n).map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${7 + i * 1.3}" fill="#000"/>`).join('')}</mask></defs><g mask="url(#${id})">${inner}</g></svg>`;

function piece(inner, max, onBite, onGone) {
  const el = document.createElement('button'), id = 'bm' + (++uid); let n = 0; el.className = 'pc';
  const draw = () => el.innerHTML = bitten(inner, n, id); draw();
  el.onclick = () => { if (n >= max) return; n++; crunch(); draw(); bounce(el); onBite && onBite(); if (n >= max) { el.classList.add('gone'); setTimeout(() => el.remove(), 300); onGone && onGone(); } };
  return el;
}

const ART = {
  umb: c => `<path d="M40 150Q180 -20 320 150Q290 128 255 150Q217 128 180 150Q143 128 105 150Q70 128 40 150z" fill="${c}"/><path d="M180 36L105 150M180 36V150M180 36L255 150" stroke="#fff" stroke-opacity=".35" stroke-width="2" fill="none"/><path d="M180 150V268q0 26-26 26" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="180" cy="34" r="5" fill="${K}"/>`,
  bag: c => `<path d="M130 120Q130 52 180 52T230 120" stroke="${K}" stroke-width="9" fill="none"/><rect x="85" y="116" width="190" height="170" rx="18" fill="${c}"/><rect x="85" y="156" width="190" height="14" fill="#fff" fill-opacity=".7"/><rect x="125" y="200" width="110" height="56" rx="10" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-dasharray="6 5"/>`,
  tum: c => `<rect x="108" y="64" width="144" height="26" rx="10" fill="${K}"/><rect x="170" y="30" width="14" height="40" rx="6" fill="${K}"/><path d="M116 90H244L232 280q-2 22-24 22H152q-22 0-24-22z" fill="${c}"/><path d="M244 130H276q26 0 26 28v10q0 28-26 28H238" stroke="${K}" stroke-width="10" fill="none"/><path d="M140 110L148 270" stroke="#fff" stroke-opacity=".45" stroke-width="8" stroke-linecap="round"/>`,
  shoe: c => `<path d="M30 252C30 202 56 176 100 172C138 168 150 150 176 138C210 122 238 134 258 162C278 192 320 202 334 252z" fill="${c}" fill-opacity=".78"/><path d="M30 252H334V266Q334 286 312 286H52Q30 286 30 266z" fill="${c}"/><path d="M118 176Q188 150 252 170" stroke="${c}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M60 214Q110 190 168 200" stroke="#fff" stroke-opacity=".55" stroke-width="8" fill="none" stroke-linecap="round"/><g fill="#fff" fill-opacity=".85"><circle cx="150" cy="170" r="5"/><circle cx="188" cy="164" r="5"/><circle cx="226" cy="168" r="5"/><circle cx="86" cy="226" r="5"/><circle cx="262" cy="226" r="5"/></g>`,
  pen: c => `<g transform="rotate(-24 180 165)"><rect x="70" y="150" width="230" height="30" rx="15" fill="${c}"/><rect x="70" y="150" width="60" height="30" fill="${K}" fill-opacity=".18"/><rect x="250" y="146" width="22" height="38" rx="6" fill="#fff" fill-opacity=".6"/><path d="M70 150L30 165L70 180z" fill="${K}"/><rect x="300" y="157" width="22" height="16" rx="4" fill="${K}"/><path d="M96 158H240" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/></g>`,
};

/* ---------------- 인터랙션 모듈 ---------------- */
const X = {
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
      st.innerHTML = `<div class="say" id="ty">키를 눌러 글자를 쳐보세요</div><div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><button class="bigbtn" id="th">키캡 색상 바꾸기</button><p class="hint">눌러서 딸깍 소리를 들어보세요</p>`;
      paint(); $('#th', st).onclick = () => { th = (th + 1) % 3; paint(); };
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { beep(260 + i * 50); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); typed = (typed + L[i]).slice(-14); $('#ty', st).textContent = typed; });
    }
    draw();
  },

  wax(st, bar) {
    let iv, hold, broken, col;
    const build = () => {
      clearInterval(iv); hold = 0; broken = false; col = PAL[Math.floor(Math.random() * 6)];
      st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path class="k1" d="M52 6 L45 28 L55 40 L48 58"/><path class="k1" d="M55 40 L74 46"/><path class="k2" d="M30 20 L38 38 L24 52 L30 74"/><path class="k2" d="M48 58 L66 72 L62 92"/><path class="k3" d="M80 24 L70 34 L84 52 L76 70"/><path class="k3" d="M24 52 L8 56"/></svg></div></div></div><div class="count" id="pr">꾹 눌러보세요</div><p class="hint">누르고 있을수록 껍질에 금이 가요</p>`;
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

  clicker(st, bar) {
    let sc = 0, pw = 1, ps = 0, cur = 0;
    const CH = [[0, '#FFB36B', 0], [30, '#F7B6D8', 1], [120, '#B79CFF', 2], [400, '#7BE0B0', 0], [1000, '#FFE16B', 1]];
    const UP = [['간식 주기', '쓰다듬기 +1', 15, () => pw++], ['친구 부르기', '초당 +1', 40, () => ps++], ['리본 달기', '쓰다듬기 +3', 120, () => pw += 3], ['단체 사진', '초당 +5', 300, () => ps += 5]];
    const cost = UP.map(u => u[2]);
    st.innerHTML = '<div class="count">귀여움 <b id="sc">0</b> · 초당 <b id="ps">0</b></div><div class="clkwrap"><button class="clk" id="clk" aria-label="쓰다듬기"></button></div><div class="crew2" id="cr"></div><div class="ups" id="up"></div><p class="hint">캐릭터를 눌러 귀여움을 모으고, 점수로 새 친구를 만나보세요</p>';
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

  /* 7. 피자 설기: 조합 과정 없이 완제 상태에서 바로 한입씩 베어 먹는 방식 */
  pizza(st, bar) {
    const sel = [['토마토', 'tomato'], ['치즈', 'cheese'], ['올리브', 'olive']];
    let bites = Array(8).fill(0);
    const P = (a, r) => [100 + r * Math.cos(a), 100 + r * Math.sin(a)], rad = Math.PI / 4;
    st.innerHTML = '<svg class="pz" viewBox="0 0 200 200"></svg><div class="count" id="ct"></div><p class="hint">피자 설기 조각을 눌러 한입씩 맛있게 먹어보세요</p>';
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
    bar.innerHTML = '<button class="chip" id="rs">새 피자 설기 가져오기 🍕</button>';
    $('#rs', bar).onclick = () => { bites.fill(0); render(); };
    render();
  },

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
        const paint = () => { $('#nd', st).innerHTML = plate(dry, bites); $('#mt', st).style.width = Math.min(100, dry * 100) + '\%'; $('#sy', st).textContent = tip || (dry < .3 ? '면이 마르는 중이에요. 조금 기다려요' : dry < .75 ? '꼬들꼬들해졌어요! 지금 먹어보세요' : '꽤 말랐어요. 더 딱딱해지기 전에!'); };
        $('#fan', st).onclick = () => { dry = Math.min(1, dry + .1); paint(); };
        iv = setInterval(() => { if (!st.isConnected) return clearInterval(iv); dry = Math.min(1, dry + .02); if (bites < 4) paint(); }, 400);
        st.onclick = e => { if (!e.target.closest('#nd') || bites >= 4) return; bites++; crunch(); tip = feel(); if (bites >= 4) { tip = '잘 먹었습니다! ' + tip; clearInterval(iv); } paint(); };
        paint();
      }
    };
    go();
  },

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

const DECO = [[3, 14, 34, '#FFEA00', 's'], [31, 7, 20, '#F65AC2', 'c'], [48, 3, 38, '#1C94F5', 's'], [62, 20, 18, '#FFEA00', 'c'], [90, 9, 36, '#F65AC2', 's'], [96, 47, 16, '#1C94F5', 'c'], [29, 50, 26, '#1C94F5', 's'], [57, 66, 30, '#F65AC2', 's'], [47, 90, 20, '#FFEA00', 'c'], [79, 90, 34, '#1C94F5', 's'], [2, 62, 18, '#F65AC2', 'c']];
const deco = () => DECO.map(([x, y, w, c, k]) => `<span class="dc" style="left:${x}%;top:${y}%;width:${w}px"><svg viewBox="0 0 24 24">${k === 's' ? `<path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0z" fill="${c}"/>` : `<circle cx="12" cy="12" r="9" fill="none" stroke="${c}" stroke-width="4"/>`}</svg></span>`).join('');

function home() {
  const ks = Object.keys(CATS);
  app.innerHTML = `<section class="view space">${deco()}${ks.map(k => `<a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}"><div class="shape">${BLOB[k]}</div><div class="txt"><span class="tagp ${k}">${LAB[k]}</span><h2>${CATS[k].n}</h2><p>${CATS[k].d}</p><span class="view-more">VIEW →</span></div></a>`).join('')}
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <div class="tip">오브젝트를 클릭해보세요</div></section>`;
  const sp = $('.space');
  space3d(sp);
  if (!$('.gl', sp))$$('.shape', sp).forEach((s, i) => s.insertAdjacentHTML('beforeend', ic(CATS[ks[i]].i)));
  tutorial(sp);
}

async function tutorial(sp) {
  const cur = $('.cursor', sp), rp =$('.ripple', sp), tip = $('.tip', sp), orbs =$$('.hb', sp); let stop = false, i = 0;
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

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2"><div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `<a class="c2${t.img ? ' has-img' : ''}" href="#/t/${k}/${i}"><div class="ph"${t.img ? ` style="background-image:url(${t.img})"` : ''}></div><div class="ct"><h3>${t.t}</h3><p>${t.lead.split('.')[0]}.</p><span class="view-more">VIEW MORE →</span></div></a>`).join('')}</div></section>`;
}

/* 4. 세로 화면 구성 및 차분한 문구 레이아웃 */
function trend(k, i) {
  const list = T[k], t = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
  app.innerHTML = `<section class="view tpage"><div class="tw"><a class="back" href="#/cat/${k}">← ${CATS[k].n} 목록</a>
    <h1>${t.t}</h1><p class="lead">${t.lead}</p>${t.body.map(p => `<p class="tx">${p}</p>`).join('')}
    <div class="stage-wrap"><div class="stage" id="st"></div><div class="stage-bar" id="bar"></div></div>
    <div class="box y"><b>함께 이야기해봐요</b>${t.talk}</div>
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
addEventListener('hashchange', route);
route();

/* ---------------- 1. 메인 3D 오브젝트 크기 확장 ---------------- */
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
      const r = o.sh.getBoundingClientRect();
      const cx = r.left - sr.left + r.width / 2, cy = r.top - sr.top + r.height / 2;
      // 1. 3D 오브젝트 스케일을 기존 1.3에서 2.1로 키움
      o.s = Math.min(r.width, r.height) * 2.1 / (3.3 * pu);
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
