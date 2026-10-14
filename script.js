/* A2Z prototype — SPA (#/ , #/cat/food , #/t/food/0) */
const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];
const K = '#1C1C20', W = '#FEFEFE';

const LOGO = `<svg viewBox="0 0 72 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#C5E8B7"/><circle cx="20" cy="31" r="5" fill="#A5D8FF"/><circle cx="31" cy="31" r="5" fill="#E2C2F7"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text></svg>`;

/* ---------------- 오디오 효과 (리얼리스틱 필터 노이즈) ---------------- */
let ac;
const getAC = () => { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); return ac; };

const audioSquish = (mode = 'normal') => {
  try {
    const ctx = getAC(), now = ctx.currentTime;
    const dur = mode === 'crunch' ? 0.1 : 0.08;
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, mode === 'crunch' ? 1.5 : 3);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const flt = ctx.createBiquadFilter();
    flt.type = mode === 'crunch' ? 'bandpass' : 'lowpass';
    flt.frequency.setValueAtTime(mode === 'crunch' ? 1600 : 450, now);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.3, now); g.gain.exponentialRampToValueAtTime(0.01, now + dur);
    src.connect(flt); flt.connect(g); g.connect(ctx.destination); src.start(now);
  } catch(e){}
};

const audioKeycap = () => {
  try {
    const ctx = getAC(), now = ctx.currentTime;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);
    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.038);
  } catch(e){}
};

const audioBite = () => audioSquish('crunch');

/* ---------------- SVG 아이콘 ---------------- */
const I = {
  clover: (a = '#7BE0B0') => `<g fill="${a}"><circle cx="17" cy="17" r="9"/><circle cx="31" cy="17" r="9"/><circle cx="17" cy="31" r="9"/><circle cx="31" cy="31" r="9"/></g><path d="M24 24q-4 16-10 18" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  omurice: () => `<ellipse cx="24" cy="28" rx="18" ry="12" fill="#FFB36B"/><path d="M8 28q16-12 32 0" stroke="#FF5470" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  pudding: (a = '#FFEA00') => `<path d="M14 38l4-20h20l4 20z" fill="${a}"/><path d="M18 18c2-4 10-4 12 0s8 2 10 0" fill="#8A5A3C"/>`,
  heart: (a = '#F65AC2') => `<path d="M24 40C8 28 8 14 18 12c4 0 6 3 6 5 0-2 2-5 6-5 10 2 10 16-6 28z" fill="${a}"/>`,
  star: (a = '#FFEA00') => `<path d="M24 6l5 12 13 2-9 9 2 13-11-6-11 6 2-13-9-9 13-2z" fill="${a}"/>`,
  flower: (a = '#F65AC2') => `<g fill="${a}"><circle cx="24" cy="12" r="7"/><circle cx="36" cy="20" r="7"/><circle cx="31" cy="34" r="7"/><circle cx="17" cy="34" r="7"/><circle cx="12" cy="20" r="7"/></g><circle cx="24" cy="24" r="5" fill="#FFEA00"/>`,
  bow: (a = '#1C94F5') => `<path d="M24 24L8 14v20zM24 24l16-10v20z" fill="${a}"/><circle cx="24" cy="24" r="4" fill="${W}"/>`,
  mochi: (a = '#FF5470') => `<ellipse cx="24" cy="24" rx="16" ry="14" fill="${W}" stroke="#D1D5DB" stroke-width="2"/><circle cx="24" cy="24" r="7" fill="${a}"/>`,
  jacket: (a = '#6B8EAD') => `<path d="M17 6L6 14l4 10 5-3v21h18V21l5 3 4-10-11-8-7 7z" fill="${a}"/><path d="M24 13v29" stroke="${K}" stroke-width="1.6"/>`,
  cap: (a = '#1C94F5') => `<path d="M8 28a16 14 0 0132 0z" fill="${a}"/><path d="M6 28h38c0 5-9 6-21 4z" fill="${K}"/>`,
  shades: (a = K) => `<rect x="5" y="16" width="16" height="13" rx="5" fill="${a}"/><rect x="27" y="16" width="16" height="13" rx="5" fill="${a}"/><path d="M21 20h6" stroke="${a}" stroke-width="2.6"/>`,
  radio: (a = '#FFB36B') => `<rect x="6" y="14" width="36" height="25" rx="4" fill="${a}"/><circle cx="17" cy="27" r="7" fill="${W}"/><path d="M30 22h8M30 27h8M30 32h8" stroke="${K}" stroke-width="2"/>`,
  camera: () => `<rect x="5" y="14" width="38" height="26" rx="5" fill="#4B4F59"/><circle cx="24" cy="27" r="9" fill="#B9BFC9"/><circle cx="24" cy="27" r="5" fill="${K}"/>`,
  book: (a = '#7BE0B0') => `<rect x="9" y="6" width="30" height="36" rx="3" fill="${a}"/><rect x="14" y="12" width="20" height="5" fill="${W}"/>`,
  record: () => `<circle cx="24" cy="24" r="19" fill="${K}"/><circle cx="24" cy="24" r="7" fill="#F65AC2"/><circle cx="24" cy="24" r="1.8" fill="${W}"/>`,
  blob: (a = '#F65AC2') => `<path d="M7 28c-2-13 9-21 18-19s16 9 15 19-9 12-17 12S8 36 7 28z" fill="${a}"/>`,
  bag: (a = '#F65AC2') => `<path d="M16 16a8 8 0 0116 0" fill="none" stroke="${K}" stroke-width="3"/><rect x="8" y="16" width="32" height="27" rx="4" fill="${a}"/>`,
  tomato: () => `<circle cx="24" cy="27" r="15" fill="#E8472B"/><path d="M24 11l-5 6 5-2 5 2z" fill="#4CAF50"/>`,
  chili: () => `<path d="M12 10c18-2 28 10 26 30-10-4-22-12-26-30z" fill="#D9382B"/>`,
  leaf: () => `<path d="M24 44c-10-6-14-20-6-34 4-5 8-5 12 0 8 14 4 28-6 34z" fill="#6CC070"/>`,
  mushroom: () => `<path d="M6 26a18 16 0 0136 0z" fill="#C9996B"/><rect x="18" y="26" width="12" height="14" rx="4" fill="#F1E3CF"/>`,
  beef: () => `<rect x="6" y="12" width="36" height="24" rx="10" fill="#C0504D"/>`,
  noodle: () => `<path d="M8 14c8-6 12 6 20 0s10-4 12 2M8 24c8-6 12 6 20 0s10-4 12 2" stroke="#F3D58C" stroke-width="4" fill="none"/>`,
  cheese: () => `<path d="M4 36L44 16v20z" fill="#FFD84D"/>`,
  charm: (a = '#FFB36B') => `<circle cx="24" cy="12" r="6" fill="${a}"/><rect x="22" y="18" width="4" height="20" rx="2" fill="${K}"/>`,
};
const ic = (n, a, b) => `<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">${I[n] ? I[n](a, b) : ''}</svg>`;

/* ---------------- 데이터 정의 ---------------- */
const CATS = {
  food: { n: '먹거리', i: 'pudding', d: '줄 서서 먹는 이유가 있어요. 요즘 맛집 문법을 맛보기로 체험해보세요.' },
  play: { n: '놀거리', i: 'clover', d: '손끝으로, 발품으로, 수집으로. 요즘 세대가 노는 방식을 직접 만져보세요.' },
  fashion: { n: '패션', i: 'bag', d: '입는 것을 넘어 꾸미고 고르는 즐거움. 내 취향대로 조합해보세요.' },
};

const BLOB = {
  food: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M38 38C62 8 128 2 166 30c30 22 36 62 22 96-14 34-52 62-96 62C40 188 8 156 8 112 8 78 22 52 38 38z" fill="#C5E8B7"/></svg>',
  play: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M24 82C14 46 52 14 96 14c32 0 50 18 76 34 28 18 34 52 20 82-14 30-30 38-58 52-30 14-60 14-84-8C26 150 34 116 24 82z" fill="#A5D8FF"/></svg>',
  fashion: '<svg viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M96 6c34-4 60 22 80 46 22 26 22 62 6 92-16 30-44 48-82 48-36 0-72-18-84-56-10-32 4-52 12-76C36 36 62 10 96 6z" fill="#E2C2F7"/></svg>',
};
const LAB = { food: 'FOOD', play: 'PLAY', fashion: 'FASHION' };

const T = {
  play: [
    { t: '말랑이 · 왁뿌볼', type: 'squish_wax',
      lead: '손끝으로 만지는 쫀득한 촉감 장난감과 와작 깨트리는 반전의 왁뿌볼이에요.',
      body: ['말랑이는 누르면 천천히 눌렸다가 느릿하게 되돌아오는 쫀득한 장난감이에요. 왁뿌볼은 말랑이 겉에 왁스를 입혀 꽉 누르면 와작 소리와 함께 갈라져 단단함과 말랑함의 반전을 선사해요.',
        '바쁜 하루 중 잠깐 쉬어가는 도구로 손의 촉감에 집중하며 마음을 가라앉혀 보세요. 아래에서 직접 만져보거나 껍질을 깨보세요.'] },
    { t: '키캡 · 클리커', type: 'keycap_clicker',
      lead: '눌렀을 때의 딸깍거리는 소리와 손맛을 즐기는 피젯 토이 문화예요.',
      body: ['키캡은 키보드 위 부품을 꾸미고 누르는 소리를 즐기는 취미에서 시작했어요. 네잎클로버나 오므라이스 모양의 피젯 클리커 장난감은 손에 쥐고 마음껏 누르며 스트레스를 푸는 도구랍니다.',
        '아래에서 개성 넘치는 모양의 클리커와 키캡을 눌러 손맛을 느껴보세요.'] },
    { t: '탱글', type: 'tangle',
      lead: '아치형 곡선 조각을 마디마디 이어 자유롭게 비트는 피젯 토이예요.',
      body: ['탱글은 마디를 이어 만든 고리로, 손으로 비틀고 꺾고 돌리며 무한한 형태를 만들어낼 수 있어요.',
        '손을 계속 움직이다 보면 마음이 차분해지는 정서적 안정감을 얻을 수 있습니다. 아래에서 고리를 잡고 끌어 비틀어보세요.'] },
    { t: '동묘 쇼핑', type: 'flea', budget: 30000,
      shops: [
        { n: '빈티지 옷가게', c: '#F65AC2', items: [['jacket', '데님 재킷', 9000, '#6B8EAD'], ['cap', '볼캡', 4000, '#1C94F5'], ['shades', '선글라스', 3000, K]] },
        { n: '골동품 잡화점', c: '#FFEA00', items: [['radio', '라디오', 7000, '#FFB36B'], ['camera', '필름 카메라', 9000]] },
        { n: '책방 · 음반 가게', c: '#1C94F5', items: [['book', '옛날 책', 2000, '#7BE0B0'], ['record', 'LP 음반', 4000], ['bag', '천가방', 5000, '#FFB36B']] },
      ],
      lead: '서울 동묘 구제시장에서 오래된 물건 사이 보물을 찾는 쇼핑이에요.',
      body: ['적은 돈으로 나만의 유니크한 물건을 찾고 주인과 정겹게 흥정하는 재미가 가득한 레트로 쇼핑 공간입니다. 가게를 둘러보며 보물을 찾아보세요.'] }
  ],
  food: [
    { t: '토마토 마라탕', type: 'dish', mode: 'pick', base: '#E8603A',
      items: [['토마토', 'tomato', null, 2], ['청경채', 'leaf', null, 2], ['버섯', 'mushroom', null, 2], ['소고기', 'beef', null, 2], ['당면', 'noodle', null, 3], ['치즈', 'cheese', null, 2], ['고추', 'chili', null, 2]],
      lead: '새콤한 토마토 국물에 얼얼한 마라를 더한 퓨전 마라탕이에요.',
      body: ['토마토의 새콤함이 마라의 매운맛을 부드럽게 감싸주어 누구나 부담 없이 즐길 수 있어요. 나만의 취향에 맞게 재료를 선택해 그릇에 담아보세요.'] },
    { t: '한정선 수제 과일 찹쌀떡', type: 'hanjeongseon',
      items: [['딸기 찹쌀떡', '#FF5470'], ['귤 찹쌀떡', '#FF9F1C'], ['샤인머스캣 찹쌀떡', '#9BD65A'], ['복숭아 찹쌀떡', '#FFB4A2']],
      lead: '과일이 통째로 들어간 쫀득하고 고급스러운 수제 찹쌀떡이에요.',
      body: ['부드러운 피 속에 신선한 과일이 통째로 들어있어 베어 물면 화려한 과일 단면이 드러납니다. 정갈한 타원형 접시 위의 찹쌀떡을 베어 물어보세요.'] },
    { t: '피자 설기', type: 'pizza_seolgi',
      lead: '쫀득한 사각 백설기 위에 피자 토핑을 올린 퓨전 간식이에요.',
      body: ['전통 백설기 떡 위에 짭조름한 치즈, 페퍼로니, 피망 토핑을 얹은 대중적인 피자 설기입니다. 나뭇판 위 조각을 베어 물며 감상해보세요.'] },
    { t: '라면 말려먹기', type: 'ramen',
      lead: '짜게 끓인 라면의 면을 건져 살짝 말려 꼬들꼬들하게 먹는 방법이에요.',
      body: ['면을 건져 잠시 말리면 꼬들꼬들하고 짭조름한 과자 같은 식감이 살아납니다. 타이밍을 맞춰 라면을 먹어보세요.'] }
  ],
  fashion: [
    { t: '옥 스타일링', type: 'jade',
      lead: '전통 옥을 현대적이고 세련된 액세서리로 매치하는 스타일링이에요.',
      body: ['은은한 옥빛이 현대적인 착장에 매력적인 포인트가 됩니다. 전신 착장에 옥 목걸이, 팔찌, 반지를 매치해 세련된 룩을 완성해 보세요.'] },
    { t: '메지루시', type: 'decor_mejirusi',
      items: [{ n: '우산', a: 'umb' }, { n: '가방', a: 'bag' }],
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#7BE0B0'],
      parts: ['charm:#FFB36B', 'charm:#F7B6D8', 'charm:#B79CFF'],
      lead: '우산이나 가방에 달아 나만의 표식을 더하는 작은 참 장식이에요.',
      body: ['투명 링으로 소품에 걸어 내 물건을 쉽게 구분할 수 있어요. 마음에 드는 위치에 메지루시를 달아보세요.'] },
    { t: '젤리슈즈 꾸미기', type: 'jelly_shoes',
      colors: ['#F7A8D8', '#9CCBF5', '#C9F5E1', '#FFE16B'],
      parts: ['star', 'heart', 'flower', 'bow', 'clover', 'pudding'],
      lead: '투명하고 말랑한 메쉬 젤리슈즈에 귀여운 장식을 달아 꾸미는 놀이예요.',
      body: ['가볍고 상큼한 젤리슈즈 구멍 사이에 지비츠 파츠를 드래그하여 나만의 여름 신발을 연출해보세요.'] },
    { t: '볼펜 꾸미기', type: 'pen_decor',
      colors: ['#1C94F5', '#F65AC2', '#FFEA00', '#7BE0B0'],
      parts: ['star', 'heart', 'flower', 'bow', 'clover'],
      lead: '상단 하트 비즈 고리가 달린 볼펜에 스티커와 키링을 걸어 꾸미는 개성만점 취미예요.',
      body: ['매일 쓰는 볼펜에 내가 좋아하는 취향을 듬뿍 담아 나만의 전용 볼펜을 만들어보세요.'] }
  ]
};

/* ---------------- 인터랙션 모듈 구현 ---------------- */
const X = {
  /* 말랑이 & 왁뿌볼 */
  squish_wax(st, bar) {
    let mode = 'm', mat = 0, n = 0, hold = 0, broken = false, col = '#F7B6D8';
    const draw = () => {
      bar.innerHTML = `<div class="grp"><em>모드</em><button class="chip${mode==='m'?' on':''}" id="bm">말랑이</button><button class="chip${mode==='w'?' on':''}" id="bw">왁뿌볼</button></div>`;
      if (mode === 'm') {
        st.innerHTML = `<div class="sqwrap"><svg class="sq3" viewBox="0 0 100 100"><path id="mpath" d="M14 62C10 32 34 16 52 16s40 18 36 46c-3 22-20 28-38 28S16 84 14 62z" fill="#F7B6D8"/></svg></div>
          <div class="count">만진 횟수 <b id="cnt">${n}</b> · 푸딩 말랑이</div>
          <p class="hint">꾹 눌렀다 놓아보세요 · 아래에서 다른 질감을 골라보세요</p>`;
        const sq = $('.sq3', st);
        sq.onpointerdown = () => { sq.style.transform = 'scale(1.25, 0.7)'; audioSquish('normal'); };
        sq.onpointerup = sq.onpointerleave = () => { sq.style.transform = 'scale(1, 1)'; n++; if($('#cnt', st)) $('#cnt', st).textContent = n; };
      } else {
        st.innerHTML = `<div class="waxwrap"><div class="wax" id="wx" style="--c:${col}"><div class="shell"><svg viewBox="0 0 100 100" fill="none" stroke="${K}" stroke-width="1.5"><path class="k1" d="M52 6 L45 28 L55 40"/><path class="k2" d="M30 20 L38 38 L24 52"/><path class="k3" d="M80 24 L70 34 L84 52"/></svg></div></div></div>
          <div class="count" id="pr">꾹 누르면 와작!</div><p class="hint">누르고 있을수록 껍질에 금이 가요</p>`;
        const wx = $('#wx', st), pr = $('#pr', st);
        wx.onpointerdown = () => {
          audioSquish('normal');
          hold = 0; broken = false;
          const iv = setInterval(() => {
            hold++;
            if (hold === 3) { wx.classList.add('l1'); audioSquish('crunch'); pr.textContent = '사삭… 금이 가요'; }
            if (hold === 6) { wx.classList.add('l2'); audioSquish('crunch'); pr.textContent = '조금만 더!'; }
            if (hold === 9) { wx.classList.add('l3'); audioSquish('crunch'); pr.textContent = '와작! 속은 쫀득해요'; clearInterval(iv); }
          }, 150);
          wx.onpointerup = wx.onpointerleave = () => clearInterval(iv);
        };
      }
    };
    bar.onclick = e => {
      if (e.target.id === 'bm') { mode = 'm'; draw(); }
      if (e.target.id === 'bw') { mode = 'w'; draw(); }
    };
    draw();
  },

  /* 키캡 & 클리커 */
  keycap_clicker(st, bar) {
    let mode = 'k', sc = 0;
    const draw = () => {
      bar.innerHTML = `<div class="grp"><em>종류</em><button class="chip${mode==='k'?' on':''}" id="bk">키캡</button><button class="chip${mode==='c'?' on':''}" id="bc">피젯 클리커</button></div>`;
      if (mode === 'k') {
        const L = ['A', '2', 'Z', 'T', 'R', 'E', 'N', 'D'];
        st.innerHTML = `<div class="say" id="ty">키를 눌러 소리를 들어보세요</div><div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><p class="hint">딸깍딸깍 기계식 스위치의 손맛을 느껴보세요</p>`;
        $$('.key', st).forEach((k, i) => k.onpointerdown = () => {
          audioKeycap();
          k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120);
          $('#ty', st).textContent = `눌린 키: ${L[i]}`;
        });
      } else {
        st.innerHTML = `<div class="count">클릭 횟수 <b id="sc">0</b></div>
          <div class="clkwrap"><button class="clk" id="clk">${I.clover('#7BE0B0')}</button></div>
          <p class="hint">네잎클로버 피젯 장난감을 마음껏 눌러보세요</p>`;
        $('#clk', st).onclick = () => {
          sc++; $('#sc', st).textContent = sc;
          audioKeycap();
        };
      }
    };
    bar.onclick = e => {
      if (e.target.id === 'bk') { mode = 'k'; draw(); }
      if (e.target.id === 'bc') { mode = 'c'; draw(); }
    };
    draw();
  },

  /* 탱글 */
  tangle(st) {
    st.innerHTML = '<canvas class="tgc"></canvas><p class="hint">마디가 이어진 고리를 끌어서 비틀어보세요</p>';
    const cv = $('canvas', st), ctx = cv.getContext('2d');
    cv.width = cv.clientWidth; cv.height = cv.clientHeight;
    let dragging = false;
    cv.onpointerdown = () => { dragging = true; audioSquish('normal'); };
    cv.onpointerup = () => dragging = false;
    const drawTangle = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.strokeStyle = '#A5D8FF';
      ctx.beginPath(); ctx.arc(cv.width/2, cv.height/2, 70, 0, Math.PI * 2); ctx.stroke();
    };
    drawTangle();
  },

  /* 동묘 쇼핑 */
  flea(st, bar, c) {
    let basket = [];
    const spent = () => basket.reduce((a, b) => a + b.p, 0);
    st.innerHTML = `<div class="shelf">${c.shops[0].items.map((it, i) => `<button class="item" data-i="${i}">${ic(it[0], it[3])}<small>${it[1]}<br>${it[2]}원</small></button>`).join('')}</div>
      <div class="count">남은 예산 ${c.budget - spent()}원</div>`;
    st.onclick = e => {
      const b = e.target.closest('.item');
      if (b) {
        const it = c.shops[0].items[+b.dataset.i];
        if (spent() + it[2] <= c.budget) {
          basket.push({ n: it[1], p: it[2] });
          audioKeycap();
          $('.count', st).textContent = `남은 예산 ${c.budget - spent()}원`;
          b.classList.add('in');
        }
      }
    };
  },

  /* 토마토 마라탕 */
  dish(st, bar, c) {
    st.innerHTML = `<div class="plate" style="width:260px;height:260px;border-radius:50%;background:#FEFEFE;border:2px solid #1C1C20;display:flex;align-items:center;justify-content:center;position:relative;" id="pl"></div>
      <div class="count">재료를 눌러 한입씩 먹어보세요</div>`;
    const pl = $('#pl', st);
    c.items.forEach(it => {
      const el = document.createElement('button'); el.className = 'pc'; el.style.position = 'absolute';
      el.innerHTML = ic(it[1]); el.onclick = () => { audioBite(); el.remove(); };
      pl.appendChild(el);
    });
  },

  /* 한정선 수제 과일 찹쌀떡 (타원형 접시 디자인) */
  hanjeongseon(st, bar, c) {
    st.innerHTML = `<div class="oval-plate">
        ${c.items.map((it, i) => `<button class="pc" data-i="${i}" style="width:58px;height:58px;border-radius:50\%;background:${it[1]};border:2px solid #1C1C20;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:800;">${it[0]}</button>`).join('')}
      </div>
      <div class="count">찹쌀떡을 눌러 과일 단면을 베어 물어보세요</div>`;
    $$('.pc', st).forEach(b => b.onclick = () => { audioBite(); b.style.opacity = '0.3'; });
  },

  /* 피자 설기 (사각 떡 나뭇판 디자인) */
  pizza_seolgi(st) {
    st.innerHTML = `<div class="seolgi-board">
        <div class="seolgi-piece" id="p1" style="display:flex;align-items:center;justify-content:center;">${ic('tomato')}</div>
        <div class="seolgi-piece" id="p2" style="display:flex;align-items:center;justify-content:center;">${ic('cheese')}</div>
        <div class="seolgi-piece" id="p3" style="display:flex;align-items:center;justify-content:center;">${ic('leaf')}</div>
        <div class="seolgi-piece" id="p4" style="display:flex;align-items:center;justify-content:center;">${ic('chili')}</div>
      </div>
      <div class="count">사각 피자 설기를 눌러 한입씩 먹어보세요</div>`;
    $$('.seolgi-piece', st).forEach(p => p.onclick = () => { audioBite(); p.style.opacity = '0.25'; });
  },

  /* 라면 말려먹기 */
  ramen(st) {
    st.innerHTML = `<div class="say">라면이 말라가는 중이에요!</div>
      <button class="bigbtn" id="ea">건져서 말려 먹기</button>`;
    $('#ea', st).onclick = () => { audioBite(); $('.say', st).textContent = '꼬들꼬들하게 완성!'; };
  },

  /* 옥 스타일링 (전신 마네킹 착장) */
  jade(st, bar) {
    let col = '#C9F5E1';
    st.innerHTML = `<svg class="scene" viewBox="0 0 200 360">
        <!-- 머리 -->
        <circle cx="100" cy="45" r="22" fill="#F2CDB5"/>
        <path d="M78 45c0-15 10-25 22-25s22 10 22 25z" fill="#1C1C20"/>
        <!-- 정상 목 -->
        <rect x="94" y="65" width="12" height="14" fill="#F2CDB5"/>
        <!-- 전신 상체 및 하체 -->
        <path d="M70 80h60l-10 110H80z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="2"/>
        <rect x="80" y="190" width="16" height="130" fill="#F2CDB5"/>
        <rect x="104" y="190" width="16" height="130" fill="#F2CDB5"/>
        <!-- 옥 목걸이 -->
        <path id="jneck" d="M88 80q12 18 24 0" stroke="${col}" stroke-width="5" fill="none"/>
        <!-- 옥 팔찌 -->
        <circle id="jwrist" cx="68" cy="160" r="7" fill="none" stroke="${col}" stroke-width="4"/>
      </svg>
      <div class="count">은은한 옥빛 액세서리 매칭</div>`;
    bar.innerHTML = `<div class="grp"><em>옥빛</em>
      <button class="sw on" style="background:#C9F5E1" data-c="#C9F5E1"></button>
      <button class="sw" style="background:#8FDCB0" data-c="#8FDCB0"></button>
      <button class="sw" style="background:#EBDDFB" data-c="#EBDDFB"></button>
    </div>`;
    bar.onclick = e => {
      const b = e.target.closest('.sw');
      if (b) {
        col = b.dataset.c;
        $('#jneck', st).setAttribute('stroke', col);
        $('#jwrist', st).setAttribute('stroke', col); $$('.sw', bar).forEach(s => s.classList.remove('on'));
        b.classList.add('on');
        audioSquish('normal');
      }
    };
  },

  /* 메지루시 */
  decor_mejirusi(st) {
    st.innerHTML = `<svg class="scene" viewBox="0 0 200 200">
        <path d="M40 120Q100 20 160 120z" fill="#A5D8FF"/><rect x="96" y="120" width="8" height="60" fill="#1C1C20"/>
        <circle cx="160" cy="120" r="12" fill="none" stroke="#F65AC2" stroke-width="4"/>
      </svg>
      <div class="count">우산 손잡이에 메지루시 참 걸기</div>`;
  },

  /* 젤리슈즈 꾸미기 (망사 메쉬 샌들 & 드래그 파츠 트레이) */
  jelly_shoes(st, bar, c) {
    st.innerHTML = `<svg class="scene" viewBox="0 0 300 200">
        <!-- 메쉬 망사 젤리슈즈 플랫 -->
        <path d="M40 140 C40 90, 80 70, 150 70 C220 70, 260 90, 260 140 Z" fill="none" stroke="#1C1C20" stroke-width="3"/>
        <path d="M40 140 H260 V155 H40 Z" fill="#A5D8FF" opacity="0.6"/>
        <!-- 메쉬 격자 패턴 -->
        <path d="M70 120 L230 120 M90 100 L210 100 M110 80 L190 80" stroke="#1C1C20" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M120 70 V140 M150 70 V140 M180 70 V140" stroke="#1C1C20" stroke-width="1.5" stroke-dasharray="4 4"/>
      </svg>
      <div class="parts-tray">
        ${c.parts.map(p => `<div class="tray-part">${ic(p)}</div>`).join('')}
      </div>
      <p class="hint">하단 트레이의 파츠를 눌러 슈즈 구멍에 장식해 보세요</p>`;
    $$('.tray-part', st).forEach(p => p.onclick = () => audioKeycap());
  },

  /* 볼펜 꾸미기 (하트 비즈 고리 볼펜 디자인 & 드래그 파츠 트레이) */
  pen_decor(st, bar, c) {
    st.innerHTML = `<svg class="scene" viewBox="0 0 300 200">
        <!-- 볼펜 몸통 -->
        <rect x="40" y="90" width="200" height="20" rx="10" fill="#E2C2F7" stroke="#1C1C20" stroke-width="2"/>
        <!-- 상단 하트 비즈 고리 프레임 -->
        <path d="M240 100 C260 70, 290 90, 270 110 C250 120, 240 100, 240 100 Z" fill="none" stroke="#F65AC2" stroke-width="3"/>
        <circle cx="255" cy="85" r="4" fill="#FFEA00"/>
        <circle cx="270" cy="95" r="4" fill="#7BE0B0"/>
      </svg>
      <div class="parts-tray">
        ${c.parts.map(p => `<div class="tray-part">${ic(p)}</div>`).join('')}
      </div>
      <p class="hint">파츠를 선택해 하트 고리에 걸어 꾸며보세요</p>`;
    $$('.tray-part', st).forEach(p => p.onclick = () => audioKeycap());
  }
};

/* ---------------- 라우팅 & 메인 뷰 ---------------- */
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
}

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat2"><div class="cat2-head"><span class="tagp ${k}">${LAB[k]}</span><h2>${C.n}</h2><p>${C.d}</p></div>
    <div class="mosaic">${T[k].map((t, i) => `<a class="c2" href="#/t/${k}/${i}"><div class="ph"></div><div class="ct"><h3>${t.t}</h3><p>${t.lead}</p><span class="view-more">VIEW →</span></div></a>`).join('')}</div></section>`;
}

/* 트렌드 상세 화면 (함께 이야기해봐요 섹션 제거 적용) */
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

/* ---------------- 메인 3D 오브젝트 (Three.js - 부드러운 완만한 회전) ---------------- */
function space3d(sp) {
  if (typeof THREE === 'undefined') return;
  let R; try { R = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  R.setPixelRatio(Math.min(devicePixelRatio, 2));
  const cv = R.domElement; cv.className = 'gl'; sp.appendChild(cv);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100); cam.position.z = 10;
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const dl = new THREE.DirectionalLight(0xffffff, 0.6); dl.position.set(3, 5, 6); scene.add(dl);

  const addM = (g, geo, col, pos = [0,0,0]) => {
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 }));
    m.position.set(...pos); g.add(m); return m;
  };

  const food3D = g => {
    addM(g, new THREE.CylinderGeometry(0.8, 0.6, 1.4, 32), 0xC5E8B7, [0, 0, 0]);
    addM(g, new THREE.CylinderGeometry(0.4, 0.4, 0.4, 32), 0xFFEA00, [0.8, -0.3, 0.3]);
  };
  const play3D = g => {
    addM(g, new THREE.BoxGeometry(1.6, 0.8, 0.5), 0xA5D8FF, [0, 0, 0]);
    addM(g, new THREE.SphereGeometry(0.3, 16, 16), 0xFEFEFE, [0, 0.5, 0]);
  };
  const fashion3D = g => {
    addM(g, new THREE.SphereGeometry(0.8, 32, 16, 0, Math.PI*2, 0, Math.PI/2), 0xE2C2F7, [0, 0, 0]);
  };

  const objs = [['food', food3D], ['play', play3D], ['fashion', fashion3D]].map(([k, fn]) => {
    const root = new THREE.Group(), spin = new THREE.Group();
    fn(spin); root.add(spin); scene.add(root);
    const b = $(`.hb.${k}`, sp);
    return { root, spin, b, sh: $('.shape', b) };
  });

  const size = () => {
    const W = sp.clientWidth, H = sp.clientHeight;
    R.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix();
  };
  size();

  const tick = () => {
    if (!sp.isConnected) { R.dispose(); return; }
    objs.forEach(o => {
      /* 완만하고 천천히 회전 */
      o.spin.rotation.y += 0.006;
    });
    R.render(scene, cam);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
