/* A2Z prototype — 해시 라우팅 SPA (#/ , #/cat/food , #/t/food/0) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

const LOGO = `<svg viewBox="0 0 132 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text><text x="64" y="23" font-family="SUIT Variable,SUIT,sans-serif" font-weight="700" font-size="11" fill="#868D99">에이투지</text></svg>`;

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

const BLOB = {
  food: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M38 38C62 8 128 2 166 30c30 22 36 62 22 96-14 34-52 62-96 62C40 188 8 156 8 112 8 78 22 52 38 38z"/></svg>',
  play: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M24 82C14 46 52 14 96 14c32 0 50 18 76 34 28 18 34 52 20 82-14 30-30 38-58 52-30 14-60 14-84-8C26 150 34 116 24 82z"/></svg>',
  fashion: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M96 6c34-4 60 22 80 46 22 26 22 62 6 92-16 30-44 48-82 48-36 0-72-18-84-56-10-32 4-52 12-76C36 36 62 10 96 6z"/></svg>',
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

/* ---------------- 트렌드 데이터 ---------------- */
const T = {
  play: [
    { t: '말랑이 · 탱글 · 키캡', i: 'blob', c: '#F65AC2', type: 'squish',
      lead: '꾹 눌러 쫀득한 말랑이, 아치형 조각을 이어 비틀고 꺾고 돌리는 탱글, 눌러서 딸깍 키캡. 손끝으로 노는 장난감이 다시 인기예요.',
      y: '손을 가만두지 않는 ‘피젯 토이’로 스트레스를 풀고, 책상 위를 꾸미고, 소리까지 영상으로 즐겨요.',
      o: '어릴 적 슬라임·뽁뽁이와 같은 마음이에요. 지금은 모으고 자랑하는 재미가 더해졌어요.' },
    { t: '왁뿌볼', i: 'ball', c: '#7BE0B0', type: 'wax',
      lead: '말랑이 겉에 왁스를 부어 굳힌 장난감이에요. 꽉 누르면 겉껍질이 와작 깨지고, 속의 말랑한 촉감이 드러나요.',
      y: '‘깨지는 소리’와 ‘말랑한 속’의 반전이 포인트. 깨는 순간을 영상으로 찍어 공유해요.',
      o: '얼음을 깨 먹거나 과자 껍질을 깨는 쾌감과 닮았어요. 바삭한 겉과 말랑한 속의 대비를 즐기는 놀이예요.' },
    { t: '먼작귀', i: 'char', c: '#FFB36B', type: 'crew',
      pals: [['#FFB36B', 0, '우와~ 만났다!'], ['#F7B6D8', 1, '으쌰으쌰 힘내자!'], ['#B79CFF', 2, '왠지 기분 좋은 날이야'], ['#7BE0B0', 0, '조금 떨리지만 괜찮아'], ['#FFE16B', 1, '맛있는 거 먹으러 갈까?']],
      lead: '‘먼가 작고 귀여운 녀석’의 줄임말. 작은 캐릭터들의 소소한 일상이 위로가 돼요.',
      y: '굿즈를 모으고 가방에 달며 ‘귀여움’으로 하루를 버티는 문화예요.',
      o: '손주가 인형을 들고 다니는 이유가 궁금하셨다면, 작은 위로를 곁에 두는 마음이라고 보시면 돼요. (체험 속 캐릭터는 이해를 돕는 가상의 친구들이에요.)' },
    { t: '동묘 쇼핑', i: 'jacket', c: '#6B8EAD', type: 'flea', budget: 20000,
      items: [['jacket', '빈티지 재킷', 8000, '#6B8EAD'], ['sneaker', '운동화', 6000, '#F65AC2'], ['radio', '라디오', 5000, '#FFB36B'], ['cap', '볼캡', 3000, '#1C94F5'], ['book', '옛날 책', 2000, '#7BE0B0'], ['shades', '선글라스', 3000, K]],
      lead: '서울 동묘 구제시장에서 낡은 옷과 물건 속 보물을 찾는 쇼핑이에요.',
      y: '적은 돈으로 나만의 스타일을 만들고, 발견하는 재미를 즐겨요.',
      o: '예전 장터에서 물건을 고르던 기억과 닮았어요. 시대를 넘어 같은 시장에서 만나는 셈이에요.' },
  ],
  food: [
    { t: '토마토마라탕', i: 'bowl', c: '#FFEA00', type: 'build', base: '#F2A05D',
      groups: [{ n: '국물', single: 1, items: [['토마토', 'tomato'], ['마라', 'chili']] }, { n: '맵기', single: 1, items: [['순한맛'], ['매운맛'], ['극강']] }, { n: '재료', items: [['청경채', 'leaf'], ['버섯', 'mushroom'], ['소고기', 'beef'], ['당면', 'noodle'], ['치즈', 'cheese']] }],
      lead: '새콤한 토마토와 얼얼한 마라를 합친 국물. 취향대로 재료를 넣어 나만의 한 그릇을 만들어요.',
      y: '‘나만의 조합’을 공유하는 커스텀 문화가 핵심이에요.',
      o: '김치찌개에 라면사리를 넣던 것처럼, 익숙한 맛에 새로움을 더하는 방식이에요.' },
    { t: '한정선', i: 'mochi', c: '#FF5470', type: 'rush', fruit: ['#FF5470', '#FF9F1C', '#8E5BD9', '#FFB4A2'],
      lead: '과일이 통째로 들어간 쫀득한 찹쌀떡이에요. 한정 수량이라 나오자마자 사라져서 ‘오픈런’까지 벌어져요.',
      y: '잘랐을 때 보이는 과일 단면과 ‘지금 아니면 못 먹는다’는 희소성이 인증 욕구를 키워요.',
      o: '명절 앞 떡집 줄서기와 닮았어요. 익숙한 찹쌀떡에 과일을 더해 새로워진 간식이에요.' },
    { t: '피자설기', i: 'pizza', c: '#FFD84D', type: 'build', base: '#F7E7C4',
      groups: [{ n: '토핑', items: [['토마토', 'tomato'], ['치즈', 'cheese'], ['올리브', 'olive'], ['콘', 'corn'], ['베이컨', 'bacon']] }],
      lead: '쫀득한 설기 떡 위에 피자 토핑을 얹은 퓨전 간식이에요. 토핑을 올려 완성해보세요.',
      y: '전통과 양식이 만나는 ‘뉴트로 퓨전’이 인기 포인트예요.',
      o: '떡은 낯익고 토핑은 새로워요. 입맛이 다른 세대가 함께 나눠 먹기 좋아요.' },
    { t: '리센느빵', i: 'cbread', c: '#E9A85C', type: 'hunt',
      lead: '아이돌 리센느와 협업해 편의점에서 파는 빵이에요. 진열대를 뒤져 협업 빵을 찾아보세요.',
      y: '좋아하는 아이돌과 협업한 상품을 사려고 편의점을 찾아다니는 ‘굿즈 같은 간식’ 문화예요.',
      o: '좋아하는 가수 이름이 붙은 과자나 빵을 사 먹던 추억과 닮았어요. 간식이 팬심을 나누는 방법이 된 거예요.' },
  ],
  fashion: [
    { t: '옥', i: 'bangle', c: '#6FCFA5', type: 'jade',
      lead: '옥을 팔찌·목걸이·반지 같은 패션 소품으로 즐기는 흐름이에요. 은은하게 비치는 옥빛을 직접 비춰보세요.',
      y: '‘전통 소재’를 요즘 감각의 포인트 액세서리로 가볍게 쓰는 게 매력이에요.',
      o: '옥가락지나 노리개를 즐기시던 마음과 닮았어요. 소재는 그대로, 쓰는 방식이 가벼워졌어요.' },
    { t: '메지루시', i: 'charm', c: '#F65AC2', type: 'tag',
      lead: '끝에 투명한 링이 달린 작은 캐릭터 참이에요. 우산, 가방, 텀블러에 걸어 ‘내 물건’이라는 표시로 쓰는 액세서리이자 키링이에요.',
      y: '똑같은 물건 사이에서 내 것을 알아보게 해주고, 취향도 보여주는 작은 표식이에요.',
      o: '예전에 가방이나 우산에 이름표나 리본을 달아두던 마음과 같아요. 이름표가 귀여운 캐릭터로 바뀐 셈이에요.' },
    { t: '장독대 텀블러', i: 'jar', c: '#8A5A3C', type: 'jar',
      lead: '빙크의 스페이스 텀블러 중, 색과 모양이 장독대와 닮은 제품을 부르는 말이에요. 항아리 같은 둥근 느낌과 짙은 갈색 유약 색감이 포인트예요.',
      y: '“어디서 본 색인데?” 하는 닮은꼴 발견이 놀이가 되고, 색 선택으로 개성을 드러내요.',
      o: '시골집 장독대의 윤기 나는 항아리가 떠오르시죠? 그 빛깔이 텀블러로 돌아온 거예요.' },
    { t: '어그 메리제인슈즈', i: 'shoe', c: '#D8B58A', type: 'shoe',
      lead: '포근한 양털 감성에 메리제인 스타일이 더해진 신발이에요. 색을 바꾸고 장식을 더해보세요.',
      y: '편하면서 귀여운 ‘꾸안꾸’ 신발로 자리 잡았어요.',
      o: '겨울 방한화의 따뜻함에 단정한 구두 모양을 합친 거예요.' },
  ],
};

/* ---------------- 공통 유틸 ---------------- */
let ac;
const beep = (f = 520) => { try { ac = ac || new AudioContext(); const o = ac.createOscillator(), g = ac.createGain(); o.type = 'square'; o.frequency.value = f; g.gain.setValueAtTime(.07, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .08); o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + .09); } catch (e) {} };
const bounce = el => { el.classList.remove('bn'); void el.offsetWidth; el.classList.add('bn'); };
function chips(bar, list, fn) {
  bar.innerHTML = list.map(([k, l], i) => `<button class="chip${i ? '' : ' on'}" data-k="${k}">${l}</button>`).join('');
  bar.onclick = e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', bar).forEach(x => x.classList.toggle('on', x === b)); fn(b.dataset.k); };
  fn(list[0][0]);
}
const rowOf = (label, html) => `<div class="grp"><em>${label}</em>${html}</div>`;
const colBar = bar => { bar.style.flexDirection = 'column'; bar.style.alignItems = 'center'; };

/* ---------------- 인터랙션 모듈 ---------------- */
const X = {
  squish(st, bar) {
    let n = 0;
    chips(bar, [['m', '말랑이'], ['t', '탱글'], ['k', '키캡']], mode => {
      if (mode === 'k') return keys();
      if (mode === 't') return tangle();
      n = 0;
      st.innerHTML = `<div class="blobs">${PAL.map(c => `<div class="blob" style="background:${c}"></div>`).join('')}</div><div class="count">만진 횟수 <b id="n">0</b></div><p class="hint">꾹 누르고 있다가 놓아보세요</p>`;
      $$('.blob', st).forEach(b => {
        const up = () => { if (b.classList.contains('sq')) { b.classList.remove('sq'); bounce(b); $('#n', st).textContent = ++n; } };
        b.onpointerdown = () => { b.classList.add('sq'); beep(180); };
        b.onpointerup = up; b.onpointerleave = up;
      });
    });
    /* 탱글: 마디가 이어진 플라스틱 줄을 끌어서 비틀고 꺾는 물리 시뮬레이션 */
    function tangle() {
      st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">잡고 끌어서 비틀고 꺾어보세요</p>';
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
      const draw = () => {
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
        draw(); requestAnimationFrame(step);
      };
      step();
    }
    function keys() {
      let th = 0; const TH = [['#FFEA00', '#1C94F5', '#F65AC2'], ['#FEFEFE', '#E1E5EA', '#B9BFC9'], ['#7BE0B0', '#FFB36B', '#B79CFF']];
      const L = ['A', '2', 'Z', 'T', 'R', 'E', 'N', 'D'];
      const paint = () => $$('.key', st).forEach((k, i) => k.style.background = TH[th][i % 3]);
      st.innerHTML = `<div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><button class="bigbtn" id="th">키캡 색상 바꾸기</button><p class="hint">눌러서 딸깍 소리를 들어보세요 (소리 켜기)</p>`;
      paint(); $('#th', st).onclick = () => { th = (th + 1) % 3; paint(); };
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { beep(260 + i * 50); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); });
    }
  },

  wax(st, bar) {
    const crack = () => { try { ac = ac || new AudioContext(); const n = ac.sampleRate * .12, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3); const s = ac.createBufferSource(), g = ac.createGain(); g.gain.value = .3; s.buffer = b; s.connect(g).connect(ac.destination); s.start(); } catch (e) {} };
    let iv, hold, broken, col;
    const build = () => {
      clearInterval(iv); hold = 0; broken = false; col = PAL[Math.floor(Math.random() * 6)];
      st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path class="k1" d="M52 6 L45 28 L55 40 L48 58"/><path class="k1" d="M55 40 L74 46"/><path class="k2" d="M30 20 L38 38 L24 52 L30 74"/><path class="k2" d="M48 58 L66 72 L62 92"/><path class="k3" d="M80 24 L70 34 L84 52 L76 70"/><path class="k3" d="M24 52 L8 56"/></svg></div></div></div><div class="count" id="pr">꾹 눌러보세요</div><p class="hint">누르고 있을수록 껍질에 금이 가요 (소리 켜기)</p>`;
      const wx = $('#wx', st), pr = $('#pr', st), wrap = wx.parentElement;
      const shatter = () => {
        $('.shell', wx).remove();
        for (let i = 0; i < 14; i++) { const a = Math.random() * 6.28, d = 90 + Math.random() * 90; wrap.insertAdjacentHTML('beforeend', `<i class="shard" style="--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--r:${Math.random() * 360}deg;--c:${col}"></i>`); }
        setTimeout(() => $$('.shard', wrap).forEach(x => x.remove()), 1100);
      };
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

  crew(st, bar, c) {
    const got = new Set();
    st.innerHTML = `<div class="crew">${c.pals.map((p, i) => `<button class="pal" data-i="${i}" aria-label="친구 ${i + 1}">${ic('char', p[0], p[1])}</button>`).join('')}</div><div class="say" id="say">친구들을 눌러보세요</div><div class="count">만난 친구 <b id="n">0</b>/${c.pals.length}</div>`;
    $$('.pal', st).forEach(p => p.onclick = () => { bounce(p); p.classList.add('got'); got.add(p.dataset.i); $('#say').textContent = c.pals[p.dataset.i][2]; $('#n').textContent = got.size; beep(700 + p.dataset.i * 90); });
    bar.innerHTML = '<button class="chip" id="rs">처음부터 다시</button>'; $('#rs').onclick = () => X.crew(st, bar, c);
  },

  flea(st, bar, c) {
    const bag = new Set(); const won = v => v.toLocaleString() + '원';
    st.innerHTML = `<div class="shelf">${c.items.map((it, i) => `<button class="item" data-i="${i}">${ic(it[0], it[3])}<small>${it[1]}<br>${won(it[2])}</small></button>`).join('')}</div><div class="count" id="tot"></div><p class="hint" id="msg">예산 ${won(c.budget)} 안에서 득템해보세요</p>`;
    const upd = () => { const s = [...bag].reduce((a, i) => a + c.items[i][2], 0); $('#tot').innerHTML = `쓴 돈 <b>${won(s)}</b> · 남은 돈 <b>${won(c.budget - s)}</b>`; return s; };
    upd();
    $$('.item', st).forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (bag.has(i)) { bag.delete(i); b.classList.remove('in'); } else {
        if (upd() + c.items[i][2] > c.budget) { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); $('#msg').textContent = '예산이 부족해요! 흥정은 동묘의 묘미죠'; return; }
        bag.add(i); b.classList.add('in'); beep(500);
      }
      const s = upd(); $('#msg').textContent = s ? `득템 ${bag.size}개 완료!` : '다시 골라보세요';
    });
    bar.innerHTML = '<button class="chip" id="rs">장바구니 비우기</button>'; $('#rs').onclick = () => X.flea(st, bar, c);
  },

  build(st, bar, c) {
    const sel = c.groups.map(() => []);
    const draw = () => {
      const all = sel.flat(), list = all.filter(x => x[1]), n = list.length;
      $('.plate', st).innerHTML = '<i class="base"></i>' + list.map((it, i) => { const a = 2 * Math.PI * i / n - Math.PI / 2, r = n === 1 ? 0 : 27; return `<span style="left:${50 + r * Math.cos(a)}%;top:${50 + r * Math.sin(a)}%">${ic(it[1])}</span>`; }).join('');
      $('.sum', st).textContent = all.length ? all.map(x => x[0]).join(' + ') : '아래에서 재료를 골라 올려보세요';
    };
    st.innerHTML = `<div class="plate" style="--b:${c.base}"></div><div class="sum"></div>`;
    bar.innerHTML = c.groups.map((g, gi) => rowOf(g.n, g.items.map((it, ii) => `<button class="chip" data-g="${gi}" data-i="${ii}">${it[0]}</button>`).join(''))).join(''); colBar(bar);
    bar.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return; const g = c.groups[b.dataset.g], it = g.items[b.dataset.i], s = sel[b.dataset.g], at = s.indexOf(it);
      if (at > -1) s.splice(at, 1); else { if (g.single) s.length = 0; s.push(it); beep(640); }
      $$(`.chip[data-g="${b.dataset.g}"]`, bar).forEach(x => x.classList.toggle('on', s.includes(g.items[x.dataset.i])));
      draw();
    };
    draw();
  },

  rush(st, bar, c) {
    st.innerHTML = `<div class="count" id="sc">준비됐나요?</div><div class="field" id="f"><button class="gift" id="g" style="left:50%;top:50%" hidden></button></div><button class="bigbtn" id="go">오픈런 시작! (8초)</button><p class="hint">움직이는 찹쌀떡을 최대한 많이 잡으세요</p>`;
    bar.innerHTML = '<span class="hint">한정 수량이 모두 소진되기 전에!</span>';
    const g = $('#g'), sc = $('#sc'); let s = 0, t = 0, iv;
    const mv = () => { g.innerHTML = ic('mochi', c.fruit[Math.floor(Math.random() * c.fruit.length)]); g.style.left = 12 + Math.random() * 76 + '%'; g.style.top = 16 + Math.random() * 68 + '%'; };
    g.onclick = () => { s++; beep(800); mv(); sc.textContent = `득템 ${s}개 · 남은 시간 ${Math.ceil(t)}초`; };
    $('#go').onclick = () => {
      clearInterval(iv); s = 0; t = 8; g.hidden = false; mv();
      iv = setInterval(() => {
        t -= .5; if (!st.isConnected) return clearInterval(iv);
        if (t <= 0) { clearInterval(iv); g.hidden = true; sc.textContent = s ? `품절! ${s}개 득템` : '품절! 다음엔 더 빠르게'; } else { sc.textContent = `득템 ${s}개 · 남은 시간 ${Math.ceil(t)}초`; if (t % 2 === 0) mv(); }
      }, 500);
    };
  },

  hunt(st, bar, c) {
    const R = ['croissant', 'bun', 'loaf'], N = 12, win = new Set(); let found = 0;
    while (win.size < 3) win.add(Math.floor(Math.random() * N));
    st.innerHTML = `<div class="shelf4">${Array.from({ length: N }, (_, i) => `<button class="item q" data-i="${i}">?</button>`).join('')}</div><div class="count">협업 빵 <b id="n">0</b>/3</div><p class="hint" id="msg">진열대를 눌러 협업 빵을 찾아보세요</p>`;
    $$('.item', st).forEach(b => b.onclick = () => {
      if (b.dataset.o) return; b.dataset.o = 1; b.classList.remove('q');
      if (win.has(+b.dataset.i)) { b.innerHTML = ic('cbread') + '<small>협업!</small>'; b.classList.add('in'); $('#n').textContent = ++found; beep(800); if (found === 3) $('#msg').textContent = '모두 찾았어요!'; }
      else { b.innerHTML = ic(R[Math.floor(Math.random() * R.length)]); beep(300); }
    });
    bar.innerHTML = '<button class="chip" id="rs">진열대 새로고침</button>'; $('#rs').onclick = () => X.hunt(st, bar, c);
  },

  /* 메지루시: 우산·가방·텀블러에 투명 링 캐릭터 참 달기 */
  tag(st, bar) {
    const IT = { umb: ['우산', [158, 270]], bag: ['가방', [220, 122]], tum: ['텀블러', [259, 150]] };
    const CH = [['#FFB36B', 0], ['#F7B6D8', 1], ['#B79CFF', 2], ['#7BE0B0', 0], ['#FFE16B', 2]];
    const art = {
      umb: `<path d="M50 140Q180 10 310 140Q278 118 245 140Q212 118 180 140Q148 118 115 140Q82 118 50 140z" fill="#1C94F5"/><path d="M180 140V250q0 22-22 22" stroke="${K}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
      bag: `<path d="M140 120Q140 56 180 56T220 120" stroke="${K}" stroke-width="8" fill="none"/><rect x="95" y="118" width="170" height="130" rx="16" fill="#F65AC2"/><rect x="95" y="160" width="170" height="14" fill="${W}"/>`,
      tum: `<rect x="110" y="70" width="110" height="20" rx="8" fill="${K}"/><path d="M118 90H212L204 250q0 14-14 14H140q-14 0-14-14z" fill="#FFEA00"/><path d="M212 120H238q22 0 22 24v6q0 24-22 24H208" stroke="${K}" stroke-width="9" fill="none"/>`,
    };
    let it = 'umb', ch = [];
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 360 330"></svg><p class="hint">물건과 캐릭터 참을 골라 걸어보세요 (최대 3개)</p>';
    const draw = () => {
      const A = IT[it][1];
      $('#sc', st).innerHTML = art[it] + ch.map((c, i) => { const s = 1.15, px = A[0] + (i - (ch.length - 1) / 2) * 46 - 24 * s, py = A[1] - 3 * s; return `<g class="swy" style="animation-delay:${i * -.6}s"><g transform="translate(${px} ${py}) scale(${s})">${I.charm(c[0], c[1])}</g></g>`; }).join('');
    };
    bar.innerHTML = rowOf('물건', Object.entries(IT).map(([k, v], i) => `<button class="chip${i ? '' : ' on'}" data-it="${k}">${v[0]}</button>`).join('')) + rowOf('캐릭터 참', CH.map((c, i) => `<button class="chip" data-c="${i}">${ic('charm', c[0], c[1])}</button>`).join('') + '<button class="chip" data-r="1">비우기</button>'); colBar(bar);
    bar.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return;
      if (b.dataset.it) { it = b.dataset.it; $$('[data-it]', bar).forEach(x => x.classList.toggle('on', x === b)); }
      if (b.dataset.c) { ch.push(CH[b.dataset.c]); if (ch.length > 3) ch.shift(); beep(700); }
      if (b.dataset.r) ch = [];
      draw();
    };
    draw();
  },

  /* 옥: 빛에 비춰보는 반투명 옥 소품 */
  jade(st, bar) {
    const TN = [['백옥', '#F2FBF6', '#CDEBDB', '#8FC4A9'], ['비취옥', '#C9F5E1', '#5FCFA0', '#1F8F65'], ['녹옥', '#8FDCB0', '#2FA06A', '#14603F'], ['자옥', '#EBDDFB', '#B79CFF', '#6E4FB5']];
    const NM = ['팔찌', '구슬 팔찌', '펜던트', '반지']; let ti = 1, it = 0;
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 300 300"></svg><p class="hint">마우스를 움직여 빛에 비춰보세요</p>';
    const draw = () => {
      const t = TN[ti];
      const defs = `<defs><radialGradient id="jg" cx=".5" cy=".5" r=".7" fx=".3" fy=".25"><stop offset="0" stop-color="${t[1]}"/><stop offset=".55" stop-color="${t[2]}"/><stop offset="1" stop-color="${t[3]}"/></radialGradient></defs>`;
      const body = [
        `<circle cx="150" cy="150" r="92" fill="none" stroke="url(#jg)" stroke-width="38"/><path d="M80 110a85 85 0 0140-38" stroke="#fff" stroke-opacity=".6" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 6.283; return `<circle cx="${150 + 88 * Math.cos(a)}" cy="${150 + 88 * Math.sin(a)}" r="21" fill="url(#jg)"/>`; }).join(''),
        `<path d="M70 20Q150 200 230 20" stroke="${K}" stroke-width="3" fill="none"/><circle cx="150" cy="190" r="62" fill="url(#jg)"/><circle cx="150" cy="190" r="17" style="fill:var(--ps)"/><circle cx="150" cy="190" r="62" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>`,
        `<circle cx="150" cy="190" r="58" fill="none" stroke="#E8C65A" stroke-width="14"/><ellipse cx="150" cy="108" rx="42" ry="34" fill="url(#jg)"/><ellipse cx="136" cy="96" rx="12" ry="7" fill="#fff" opacity=".6"/>`,
      ][it];
      $('#sc', st).innerHTML = defs + body;
    };
    st.onpointermove = e => { const r = $('#sc', st).getBoundingClientRect(), g = $('#jg', st); if (!g) return; const f = v => Math.min(.9, Math.max(.1, v)).toFixed(2); g.setAttribute('fx', f((e.clientX - r.left) / r.width)); g.setAttribute('fy', f((e.clientY - r.top) / r.height)); };
    bar.innerHTML = rowOf('소품', NM.map((n, i) => `<button class="chip${i ? '' : ' on'}" data-i="${i}">${n}</button>`).join('')) + rowOf('옥빛', TN.map((t, i) => `<button class="chip${i === 1 ? ' on' : ''}" data-t="${i}">${t[0]}</button>`).join('')); colBar(bar);
    bar.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return;
      if (b.dataset.i) { it = +b.dataset.i; $$('[data-i]', bar).forEach(x => x.classList.toggle('on', x === b)); }
      if (b.dataset.t) { ti = +b.dataset.t; $$('[data-t]', bar).forEach(x => x.classList.toggle('on', x === b)); }
      draw(); beep(600);
    };
    draw();
  },

  /* 장독대 텀블러: 장독대와 텀블러를 같은 유약 색으로 보고, 겹쳐서 닮은꼴 확인 */
  jar(st, bar) {
    const GL = [['장독 갈색', '#4A2514', '#8A4B2C', '#C77A4A'], ['황토', '#8C5A30', '#C98A55', '#E4B07A'], ['먹갈색', '#1C1210', '#3C2A22', '#6A4A3A'], ['올리브 유약', '#3D3C1E', '#6B6A3A', '#9A9A56']]; let g = 0;
    const paint = () => { const t = GL[g]; $('#jg', st).innerHTML = `<stop offset="0" stop-color="${t[1]}"/><stop offset=".35" stop-color="${t[2]}"/><stop offset=".5" stop-color="${t[3]}"/><stop offset=".7" stop-color="${t[2]}"/><stop offset="1" stop-color="${t[1]}"/>`; };
    st.innerHTML = `<svg id="sc" class="scene jarscene" viewBox="0 0 340 240"><defs><linearGradient id="jg"></linearGradient></defs>
      <g class="fj"><g class="lid"><ellipse cx="80" cy="50" rx="38" ry="10" fill="url(#jg)"/><rect x="72" y="30" width="16" height="14" rx="5" fill="${K}"/></g><path d="M52 58H108L118 72C150 92 156 136 140 172C132 196 108 206 80 206C52 206 28 196 20 172C4 136 10 92 42 72z" fill="url(#jg)"/></g>
      <g transform="translate(180 0)"><g class="lid"><rect x="40" y="38" width="80" height="18" rx="8" fill="${K}"/><rect x="74" y="22" width="12" height="18" rx="4" fill="${K}"/></g><path d="M122 86H138Q156 86 156 106V130Q156 150 138 150H120" stroke="${K}" stroke-width="9" fill="none"/><path d="M46 58H114L122 178Q122 206 96 206H64Q38 206 38 178z" fill="url(#jg)"/></g>
      <text x="80" y="230" text-anchor="middle" font-size="14" font-weight="700" fill="${K}" font-family="SUIT Variable,sans-serif">장독대</text><text x="260" y="230" text-anchor="middle" font-size="14" font-weight="700" fill="${K}" font-family="SUIT Variable,sans-serif">텀블러</text></svg><p class="hint">같은 유약 색으로 놓고 닮은 정도를 비교해보세요</p>`;
    const sc = $('#sc', st); paint();
    bar.innerHTML = rowOf('유약 색', GL.map((t, i) => `<button class="chip${i ? '' : ' on'}" data-g="${i}">${t[0]}</button>`).join('')) + rowOf('보기', '<button class="chip" data-a="open">뚜껑 열기</button><button class="chip" data-a="cmp">겹쳐보기</button>'); colBar(bar);
    bar.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return;
      if (b.dataset.g) { g = +b.dataset.g; $$('[data-g]', bar).forEach(x => x.classList.toggle('on', x === b)); paint(); }
      if (b.dataset.a) { sc.classList.toggle(b.dataset.a); b.classList.toggle('on'); beep(400); }
    };
  },

  /* 어그 메리제인슈즈: 색상 + 장식 */
  shoe(st, bar) {
    const CO = ['#D8B58A', '#6B4A33', '#1C1C20', '#F7C4E4'], DE = ['bow', 'star', 'flower', 'heart'], SL = [[24, 24], [14, 29], [32, 27]]; let col = 0, ch = [];
    st.innerHTML = '<svg id="sc" class="scene" viewBox="0 0 360 260"></svg><p class="hint">색을 고르고 장식을 달아보세요 (최대 3개)</p>';
    const draw = () => { $('#sc', st).innerHTML = `<ellipse cx="180" cy="238" rx="140" ry="10" fill="#0001"/><g transform="translate(36 6) scale(6)">${I.shoe(CO[col])}${ch.map((d, i) => `<g transform="translate(${SL[i][0] - 5} ${SL[i][1] - 5}) scale(.21)">${I[d]()}</g>`).join('')}</g>`; };
    bar.innerHTML = rowOf('색상', CO.map((c, i) => `<button class="sw${i ? '' : ' on'}" data-c="${i}" style="background:${c}" aria-label="색 ${i + 1}"></button>`).join('')) + rowOf('장식', DE.map(d => `<button class="chip" data-d="${d}">${ic(d)}</button>`).join('') + '<button class="chip" data-r="1">지우기</button>'); colBar(bar);
    bar.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.c) { col = +b.dataset.c; $$('.sw', bar).forEach(x => x.classList.toggle('on', x === b)); }
      if (b.dataset.d) { ch.push(b.dataset.d); if (ch.length > 3) ch.shift(); beep(700); }
      if (b.dataset.r) ch = [];
      draw();
    };
    draw();
  },
};

/* ---------------- 화면 렌더 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

function home() {
  const ks = Object.keys(CATS);
  app.innerHTML = `<section class="view space">${ks.map(k => `<a class="hb ${k}" href="#/cat/${k}" aria-label="${CATS[k].n}"><div class="shape">${BLOB[k]}</div><div class="txt"><span class="tagp ${k}">${LAB[k]}</span><h2>${CATS[k].n}</h2><p>${CATS[k].d}</p><span class="view-more">VIEW →</span></div></a>`).join('')}
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <div class="tip">오브젝트를 클릭해보세요</div></section>`;
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

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2"><div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `<a class="c2${t.img ? ' has-img' : ''}" href="#/t/${k}/${i}"><div class="ph"${t.img ? ` style="background-image:url(${t.img})"` : ''}></div><div class="ct"><h3>${t.t}</h3><p>${t.lead.split('.')[0]}.</p><span class="view-more">VIEW MORE →</span></div></a>`).join('')}</div></section>`;
}

function trend(k, i) {
  const list = T[k], t = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
  app.innerHTML = `<section class="view trend">
    <div class="stage-wrap"><div class="stage" id="st"></div><div class="stage-bar" id="bar"></div></div>
    <article class="read"><a class="back" href="#/cat/${k}">← ${CATS[k].n} 목록</a><br>
      <h2>${t.t}</h2><p class="lead">${t.lead}</p>
      <div class="box y"><b>청년층은 이렇게 즐겨요</b>${t.y}</div>
      <div class="box o"><b>윗세대를 위한 공감 번역</b>${t.o}</div>
      <div class="pager"><a href="#/t/${k}/${(i + list.length - 1) % list.length}">← ${prev.t}</a><a href="#/t/${k}/${(i + 1) % list.length}">${next.t} →</a></div></article></section>`;
  X[t.type]($('#st'), $('#bar'), t, t);
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
      o.s = Math.min(r.width, r.height) * .95 / (3.3 * pu);
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
