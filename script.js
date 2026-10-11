/* A2Z prototype — 해시 라우팅 SPA (#/ , #/cat/food , #/t/food/0) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PAL = ['#FFEA00', '#1C94F5', '#F65AC2', '#7BE0B0', '#FFB36B', '#B79CFF'];

const LOGO = `<svg viewBox="0 0 132 40" role="img" aria-label="A2Z"><circle cx="9" cy="31" r="5" fill="#FFEA00"/><circle cx="20" cy="31" r="5" fill="#1C94F5"/><circle cx="31" cy="31" r="5" fill="#F65AC2"/><text x="0" y="24" font-family="SUIT Variable,SUIT,sans-serif" font-weight="900" font-size="26" letter-spacing="-1.5" fill="currentColor">A2Z</text><text x="64" y="23" font-family="SUIT Variable,SUIT,sans-serif" font-weight="700" font-size="11" fill="#868D99">에이투지</text></svg>`;

const CATS = {
  food: { n: '먹거리', e: '🍜', d: '줄 서서 먹는 이유가 있어요. 요즘 맛집 문법을 맛보기로 체험해보세요.' },
  play: { n: '놀거리', e: '🎮', d: '손끝으로, 대화로, 발품으로. 요즘 세대가 노는 방식을 직접 만져보세요.' },
  fashion: { n: '패션', e: '👗', d: '입는 것을 넘어 꾸미고 고르는 즐거움. 내 취향대로 조합해보세요.' },
};

/* ---------------- 트렌드 데이터 ----------------
   tmp:true → 설명이 임시인 항목(기획 확정 후 교체) */
const T = {
  play: [
    { t: '말랑이 · 탱글 · 키캡', e: '🫧', tag: '손맛 트렌드', type: 'squish',
      lead: '꾹 누르면 쫀득, 놓으면 탱글, 누르면 딸깍. 손끝으로 노는 촉감 장난감이 다시 인기예요.',
      y: '스트레스를 풀고, 책상 위를 꾸미고, 영상으로 소리까지 즐기는 ‘손맛 수집’ 문화예요.',
      o: '어릴 적 슬라임·뽁뽁이와 같은 마음이에요. 지금은 모으고 자랑하는 재미가 더해졌어요.' },
    { t: 'AI에게 나에 대해 물어보기', e: '🤖', tag: '대화 트렌드', type: 'chat',
      qa: [['내 성격 맞혀볼래?', '대화 말투를 보니 호기심이 많고 새로운 걸 먼저 시도하는 편 같아요. 맞나요? 😄'],
           ['오늘 점심 뭐 먹지?', '날이 쌀쌀하니 따끈한 국물 요리 어때요? 마라탕이나 칼국수를 추천해요.'],
           ['요즘 애들 말 알려줘', '“찐이다”는 진짜 좋다, “킹받네”는 몹시 짜증난다는 뜻으로 쓰여요.'],
           ['부모님과 대화 팁은?', '결론보다 안부를 먼저 물어보세요. 사진 한 장 보내는 것도 좋은 시작이에요.']],
      lead: 'AI에게 내 취향과 고민을 털어놓고, 나를 어떻게 보는지 물어보는 놀이예요.',
      y: '운세나 심리테스트처럼 ‘나를 알아가는 재미’로 쓰고, 결과를 친구와 공유해요.',
      o: '말동무에게 이야기하듯 편하게 시작해도 돼요. 정답을 찾기보다 대화를 즐기는 게 핵심이에요.' },
    { t: '먼작귀', e: '🐹', tag: '캐릭터 트렌드', type: 'crew',
      pals: [['🐹', '우와~ 만났다!'], ['🐰', '으쌰으쌰 힘내자!'], ['🐱', '왠지 기분 좋은 날이야'], ['🦔', '조금 떨리지만 괜찮아'], ['🐻', '맛있는 거 먹으러 갈까?']],
      lead: '‘먼가 작고 귀여운 녀석’의 줄임말. 작은 캐릭터들의 소소한 일상이 위로가 돼요.',
      y: '굿즈를 모으고 가방에 달며 ‘귀여움’으로 하루를 버티는 문화예요.',
      o: '손주가 인형을 들고 다니는 이유가 궁금하셨다면, 작은 위로를 곁에 두는 마음이라고 보시면 돼요. (체험 속 캐릭터는 이해를 돕는 가상의 친구들이에요.)' },
    { t: '동묘 쇼핑', e: '🧥', tag: '구제 트렌드', type: 'flea', budget: 20000,
      items: [['🧥', '빈티지 재킷', 8000], ['👟', '운동화', 6000], ['📻', '라디오', 5000], ['🧢', '볼캡', 3000], ['📚', '옛날 책', 2000], ['🕶️', '선글라스', 3000]],
      lead: '서울 동묘 구제시장에서 낡은 옷과 물건 속 보물을 찾는 쇼핑이에요.',
      y: '적은 돈으로 나만의 스타일을 만들고, 발견하는 재미를 즐겨요.',
      o: '예전 장터에서 물건을 고르던 기억과 닮았어요. 시대를 넘어 같은 시장에서 만나는 셈이에요.' },
  ],
  food: [
    { t: '토마토마라탕', e: '🍅', tag: '맛 조합', type: 'build',
      groups: [{ n: '국물', single: 1, items: [['🍅', '토마토'], ['🌶️', '마라']] }, { n: '맵기', single: 1, items: [['🙂', '순한맛'], ['🔥', '매운맛'], ['🌋', '극강']] }, { n: '재료', items: [['🥬', '청경채'], ['🍄', '버섯'], ['🥩', '소고기'], ['🍜', '당면'], ['🧀', '치즈']] }],
      lead: '새콤한 토마토와 얼얼한 마라를 합친 국물. 취향대로 재료를 넣어 나만의 한 그릇을 만들어요.',
      y: '‘나만의 조합’을 공유하는 커스텀 문화가 핵심이에요.',
      o: '김치찌개에 라면사리를 넣던 것처럼, 익숙한 맛에 새로움을 더하는 방식이에요.' },
    { t: '한정선', e: '🎁', tag: '임시 콘텐츠', type: 'rush', item: '🎁', tmp: 1,
      lead: '한정 수량, 한정 기간 메뉴를 사려고 줄을 서는 ‘오픈런’을 체험해요. (프로토타입용 임시 설명)',
      y: '‘지금 아니면 못 먹는다’는 희소성이 구매와 인증 욕구를 키워요.',
      o: '명절 앞 떡집 줄서기와 비슷해요. 기다림 자체가 이야기가 되는 거예요.' },
    { t: '피자설기', e: '🍕', tag: '퓨전 디저트', type: 'build',
      groups: [{ n: '토핑', items: [['🍅', '토마토'], ['🧀', '치즈'], ['🫒', '올리브'], ['🌽', '콘'], ['🥓', '베이컨']] }],
      lead: '쫀득한 설기 떡 위에 피자 토핑을 얹은 퓨전 간식이에요. 토핑을 올려 완성해보세요.',
      y: '전통과 양식이 만나는 ‘뉴트로 퓨전’이 인기 포인트예요.',
      o: '떡은 낯익고 토핑은 새로워요. 입맛이 다른 세대가 함께 나눠 먹기 좋아요.' },
    { t: '리센느빵', e: '🥐', tag: '임시 콘텐츠', type: 'build', tmp: 1,
      groups: [{ n: '쟁반에 담기', items: [['🥐', '크루아상'], ['🍞', '식빵'], ['🥖', '바게트'], ['🥯', '베이글'], ['🧁', '컵케이크']] }],
      lead: '쟁반 가득 빵을 고르는 베이커리 투어 감각의 체험이에요. (프로토타입용 임시 설명)',
      y: '빵집을 찾아다니는 ‘빵지순례’가 하나의 여가가 됐어요.',
      o: '동네 빵집 가는 즐거움을 도시 전체로 넓힌 거예요.' },
  ],
  fashion: [
    { t: '옥', e: '📿', tag: '임시 콘텐츠', type: 'cust', tmp: 1,
      colors: ['#9BE3C3', '#6FCFA5', '#D9F2E6', '#F65AC2'], charms: ['💎', '🪷', '✨', '🧿'], 
      lead: '맑은 옥빛 포인트를 주는 스타일링이에요. 색과 장식을 골라보세요. (프로토타입용 임시 설명)',
      y: '전통 소재를 요즘 감각으로 가볍게 푸는 시도예요.',
      o: '옥가락지·노리개의 멋이 다시 돌아온 것으로 보시면 돼요.' },
    { t: '메지루시', e: '👜', tag: '임시 콘텐츠', type: 'cust', tmp: 1,
      colors: ['#1C1C20', '#F65AC2', '#FFEA00', '#1C94F5'], charms: ['🧸', '🔑', '🎀', '⭐', '🍒'],
      lead: '가방에 표식(키링·참)을 달아 나만의 가방을 만드는 스타일이에요. (프로토타입용 임시 설명)',
      y: '‘꾸미기’가 곧 취향 표현이에요. 키링 하나가 개성이 돼요.',
      o: '예전 가방에 달던 부적이나 장식과 닮았어요.' },
    { t: '장독대 텀블러', e: '🥤', tag: '임시 콘텐츠', type: 'cust', tmp: 1,
      colors: ['#C9794A', '#E8D2B0', '#4B4F59', '#F65AC2'], charms: ['🌿', '🍯', '🏷️', '🌸'],
      lead: '옛 항아리의 분위기를 담은 텀블러를 꾸며보는 체험이에요. (프로토타입용 임시 설명)',
      y: '텀블러는 이제 음료통이 아니라 패션 아이템이에요.',
      o: '장독대의 정서를 요즘 물건에 입힌 시도라 할 수 있어요.' },
    { t: '어그 메리제인슈즈', e: '🥿', tag: '슈즈 트렌드', type: 'cust',
      colors: ['#D8B58A', '#6B4A33', '#1C1C20', '#F7C4E4'], charms: ['🎀', '⭐', '🌸', '💛'],
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

/* ---------------- 인터랙션 모듈 ---------------- */
const X = {
  squish(st, bar) {
    let n = 0;
    chips(bar, [['m', '말랑이'], ['t', '탱글'], ['k', '키캡']], mode => {
      n = 0;
      if (mode === 'k') return keys();
      st.innerHTML = `<div class="blobs ${mode}">${PAL.map(c => `<div class="blob" style="background:${c}"></div>`).join('')}</div><div class="count">만진 횟수 <b id="n">0</b></div><p class="hint">${mode === 'm' ? '꾹 누르고 있다가 놓아보세요' : '마우스를 올리면 탱글탱글 흔들려요'}</p>`;
      $$('.blob', st).forEach(b => {
        const up = () => { if (b.classList.contains('sq')) { b.classList.remove('sq'); bounce(b); $('#n', st).textContent = ++n; } };
        b.onpointerdown = () => { b.classList.add('sq'); beep(180); };
        b.onpointerup = up; b.onpointerleave = up;
      });
    });
    function keys() {
      let th = 0; const TH = [['#FFEA00', '#1C94F5', '#F65AC2'], ['#FEFEFE', '#E1E5EA', '#B9BFC9'], ['#7BE0B0', '#FFB36B', '#B79CFF']];
      const L = ['A', '2', 'Z', 'T', 'R', 'E', 'N', 'D'];
      const paint = () => $$('.key', st).forEach((k, i) => k.style.background = TH[th][i % 3]);
      st.innerHTML = `<div class="keys">${L.map(l => `<button class="key">${l}</button>`).join('')}</div><button class="bigbtn" id="th">키캡 색상 바꾸기</button><p class="hint">눌러서 딸깍 소리를 들어보세요 (소리 켜기)</p>`;
      paint(); $('#th', st).onclick = () => { th = (th + 1) % 3; paint(); };
      $$('.key', st).forEach((k, i) => k.onpointerdown = () => { beep(260 + i * 50); k.classList.add('dn'); setTimeout(() => k.classList.remove('dn'), 120); });
    }
  },

  chat(st, bar, c) {
    st.innerHTML = `<div class="chat" id="ch"><div class="msg ai">안녕하세요! 아래 질문을 눌러 저에게 물어보세요.</div></div><p class="hint">시연용으로 미리 정해둔 답변이에요</p>`;
    const ch = $('#ch', st);
    chips(bar, c.qa.map((q, i) => [i, q[0]]), () => {});
    $$('.chip', bar).forEach(b => b.classList.remove('on'));
    bar.onclick = async e => {
      const b = e.target.closest('.chip'); if (!b) return; const [q, a] = c.qa[b.dataset.k];
      ch.insertAdjacentHTML('beforeend', `<div class="msg me">${q}</div>`);
      const d = document.createElement('div'); d.className = 'msg ai'; d.textContent = '…'; ch.append(d); ch.scrollTop = 1e5;
      await sleep(800); d.textContent = a; ch.scrollTop = 1e5;
    };
  },

  crew(st, bar, c) {
    const got = new Set();
    st.innerHTML = `<div class="crew">${c.pals.map((p, i) => `<button class="pal" data-i="${i}" aria-label="친구 ${i + 1}">${p[0]}</button>`).join('')}</div><div class="say" id="say">친구들을 눌러보세요</div><div class="count">만난 친구 <b id="n">0</b>/${c.pals.length}</div>`;
    $$('.pal', st).forEach(p => p.onclick = () => { bounce(p); p.classList.add('got'); got.add(p.dataset.i); $('#say').textContent = c.pals[p.dataset.i][1]; $('#n').textContent = got.size; beep(700 + p.dataset.i * 90); });
    bar.innerHTML = '<button class="chip" id="rs">처음부터 다시</button>'; $('#rs').onclick = () => X.crew(st, bar, c);
  },

  flea(st, bar, c) {
    const bag = new Set(); const won = v => v.toLocaleString() + '원';
    st.innerHTML = `<div class="shelf">${c.items.map((it, i) => `<button class="item" data-i="${i}">${it[0]}<small>${it[1]}<br>${won(it[2])}</small></button>`).join('')}</div><div class="count" id="tot"></div><p class="hint" id="msg">예산 ${won(c.budget)} 안에서 득템해보세요</p>`;
    const upd = () => { const s = [...bag].reduce((a, i) => a + c.items[i][2], 0); $('#tot').innerHTML = `쓴 돈 <b>${won(s)}</b> · 남은 돈 <b>${won(c.budget - s)}</b>`; return s; };
    upd();
    $$('.item', st).forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (bag.has(i)) { bag.delete(i); b.classList.remove('in'); } else {
        if (upd() + c.items[i][2] > c.budget) { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); $('#msg').textContent = '예산이 부족해요! 흥정은 동묘의 묘미죠 😉'; return; }
        bag.add(i); b.classList.add('in'); beep(500);
      }
      const s = upd(); $('#msg').textContent = s ? `득템 ${bag.size}개 완료!` : '다시 골라보세요';
    });
    bar.innerHTML = '<button class="chip" id="rs">장바구니 비우기</button>'; $('#rs').onclick = () => X.flea(st, bar, c);
  },

  build(st, bar, c) {
    const sel = c.groups.map(() => []);
    const draw = () => {
      const list = sel.flat(); const n = list.length;
      $('.plate', st).innerHTML = list.map((it, i) => { const a = 2 * Math.PI * i / n - Math.PI / 2, r = n === 1 ? 0 : 27; return `<span style="left:${50 + r * Math.cos(a)}%;top:${50 + r * Math.sin(a)}%">${it[0]}</span>`; }).join('');
      $('.sum', st).textContent = n ? list.map(x => x[1]).join(' + ') : '아래에서 재료를 골라 올려보세요';
    };
    st.innerHTML = '<div class="plate"></div><div class="sum"></div>';
    bar.innerHTML = c.groups.map((g, gi) => `<div class="grp"><em>${g.n}</em>${g.items.map((it, ii) => `<button class="chip" data-g="${gi}" data-i="${ii}">${it[0]} ${it[1]}</button>`).join('')}</div>`).join('');
    bar.style.flexDirection = 'column'; bar.style.alignItems = 'center';
    bar.onclick = e => {
      const b = e.target.closest('.chip'); if (!b) return; const g = c.groups[b.dataset.g], it = g.items[b.dataset.i], s = sel[b.dataset.g];
      const at = s.indexOf(it);
      if (at > -1) s.splice(at, 1); else { if (g.single) s.length = 0; s.push(it); beep(640); }
      $$(`.chip[data-g="${b.dataset.g}"]`, bar).forEach(x => x.classList.toggle('on', s.includes(g.items[x.dataset.i])));
      draw();
    };
    draw();
  },

  rush(st, bar, c) {
    st.innerHTML = `<div class="count" id="sc">준비됐나요?</div><div class="field" id="f"><button class="gift" id="g" style="left:50%;top:50%" hidden>${c.item}</button></div><button class="bigbtn" id="go">오픈런 시작! (8초)</button><p class="hint">움직이는 상품을 최대한 많이 잡으세요</p>`;
    bar.innerHTML = '<span class="hint">한정 수량이 모두 소진되기 전에!</span>';
    const g = $('#g'), sc = $('#sc'); let s = 0, t = 0, iv;
    const mv = () => { g.style.left = 10 + Math.random() * 80 + '%'; g.style.top = 12 + Math.random() * 76 + '%'; };
    g.onclick = () => { s++; beep(800); mv(); sc.textContent = `득템 ${s}개 · 남은 시간 ${t.toFixed(0)}초`; };
    $('#go').onclick = () => {
      clearInterval(iv); s = 0; t = 8; g.hidden = false; mv();
      iv = setInterval(() => {
        t -= .5; if (!st.isConnected) return clearInterval(iv);
        if (t <= 0) { clearInterval(iv); g.hidden = true; sc.textContent = s ? `품절! ${s}개 득템 🎉` : '품절! 다음엔 더 빠르게 🥲'; } else { sc.textContent = `득템 ${s}개 · 남은 시간 ${Math.ceil(t)}초`; if (t % 2 === 0) mv(); }
      }, 500);
    };
  },

  cust(st, bar, c, t) {
    const SL = [[16, 22], [84, 22], [6, 56], [94, 56], [22, 86], [78, 86]]; let col = 0, ch = [];
    st.innerHTML = `<div class="cust" id="cu">${t.e}</div><p class="hint">색을 고르고 장식을 눌러 달아보세요</p>`;
    bar.innerHTML = `<div class="grp"><em>색상</em>${c.colors.map((k, i) => `<button class="sw${i ? '' : ' on'}" data-c="${i}" style="background:${k}" aria-label="색 ${i + 1}"></button>`).join('')}</div><div class="grp"><em>장식</em>${c.charms.map(k => `<button class="chip" data-m="${k}">${k}</button>`).join('')}<button class="chip" data-r="1">지우기</button></div>`;
    bar.style.flexDirection = 'column'; bar.style.alignItems = 'center';
    const draw = () => { const cu = $('#cu'); cu.style.background = c.colors[col]; $$('.c', cu).forEach(x => x.remove()); ch.forEach((m, i) => cu.insertAdjacentHTML('beforeend', `<span class="c" style="left:${SL[i][0]}%;top:${SL[i][1]}%;translate:-50% -50%">${m}</span>`)); };
    bar.onclick = e => { const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.c) { col = +b.dataset.c; $$('.sw', bar).forEach(x => x.classList.toggle('on', x === b)); }
      if (b.dataset.m) { ch.push(b.dataset.m); if (ch.length > 6) ch.shift(); beep(700); }
      if (b.dataset.r) ch = [];
      draw(); };
    draw();
  },
};

/* ---------------- 화면 렌더 ---------------- */
const app = $('#app'), nav = $('#nav');
$('.logo').innerHTML = LOGO;

function home() {
  app.innerHTML = `<section class="view space"><div class="stars"></div><div class="stars b"></div>
    <div class="hero"><h1>모든 세대가 함께 노는<br>트렌드 우주</h1><p>궁금한 행성을 눌러 여행을 시작하세요</p></div>
    ${Object.keys(CATS).map(k => `<button class="orb ${k}" data-k="${k}" aria-label="${CATS[k].n}"><span class="em">${CATS[k].e}</span><span class="lb">${CATS[k].n}</span></button>`).join('')}
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5 2l14 11-6.5 1.2L9.8 21z" fill="#FEFEFE" stroke="#1C1C20" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <div class="tip">🖱️ 행성을 클릭해보세요</div></section>`;
  const sp = $('.space'); $$('.orb', sp).forEach(o => o.onclick = () => location.hash = '#/cat/' + o.dataset.k);
  tutorial(sp);
}

async function tutorial(sp) {
  const cur = $('.cursor', sp), rp = $('.ripple', sp), tip = $('.tip', sp), orbs = $$('.orb', sp); let stop = false, i = 0;
  orbs.forEach(o => o.addEventListener('pointerenter', () => { stop = true; cur.remove(); rp.remove(); tip.classList.add('off'); }));
  await sleep(900);
  while (!stop && sp.isConnected) {
    const o = orbs[i++ % 3], r = o.getBoundingClientRect(), s = sp.getBoundingClientRect();
    const x = r.left - s.left + r.width * .58, y = r.top - s.top + r.height * .5;
    try {
      await cur.animate([{ transform: `translate(${s.width * .5}px,${s.height * .95}px)`, opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(${x}px,${y}px)`, opacity: 1 }], { duration: 1500, easing: 'ease-in-out', fill: 'forwards' }).finished;
      if (stop) break;
      rp.style.left = x + 'px'; rp.style.top = y + 'px';
      rp.animate([{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(2)', opacity: 0 }], 700);
      o.animate([{ scale: 1 }, { scale: .9 }, { scale: 1.08 }, { scale: 1 }], 500);
      await sleep(1200); if (stop) break;
      await cur.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }).finished;
      await sleep(500);
    } catch (e) { break; }
  }
}

function category(k) {
  const C = CATS[k];
  app.innerHTML = `<section class="view cat"><div class="cat-head"><div><h2>${C.n}</h2><p>${C.d}</p></div><div class="big">${C.e}</div></div>
    <div class="grid">${T[k].map((t, i) => `<a class="card" href="#/t/${k}/${i}"><div class="thumb">${t.e}<i>${t.tag}</i></div><h3>${t.t}</h3><p>${t.lead.split('.')[0]}.</p></a>`).join('')}</div></section>`;
}

function trend(k, i) {
  const list = T[k], t = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
  app.innerHTML = `<section class="view trend">
    <div class="stage-wrap"><div class="stage" id="st"></div><div class="stage-bar" id="bar"></div></div>
    <article class="read"><a class="back" href="#/cat/${k}">← ${CATS[k].n} 목록</a><br>
      <span class="tag">${t.tag}</span><h2>${t.t}</h2><p class="lead">${t.lead}</p>
      <div class="box y"><b>👀 청년층은 이렇게 즐겨요</b>${t.y}</div>
      <div class="box o"><b>🤝 윗세대를 위한 공감 번역</b>${t.o}</div>
      ${t.tmp ? '<p class="hint" style="text-align:left">※ 프로토타입용 임시 콘텐츠입니다. 기획 확정 후 교체하세요.</p>' : ''}
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
