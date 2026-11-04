/* 左上角三條線選單：在「施測報名」「基本資料表」「研究問卷」之間切換。
   每一頁的 .rail 第一個 .tag 會被換成選單按鈕。要新增頁面，改下面的 PAGES 就好。 */
(function () {
  const PAGES = [
    { href: 'index.html', key: 'book', no: '01', title: '施測報名', sub: '選擇施測日期與時段' },
    { href: 'survey.html?f=basic', key: 'basic', no: '02', title: '基本資料表', sub: '施測當天，任務開始前填寫' },
    { href: 'survey.html?f=post', key: 'post', no: '03', title: '研究問卷', sub: '創意任務完成後填寫，約 5 分鐘' },
  ];
  const current = document.body.dataset.page || 'book';

  const css = `
  .menu-btn { width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 50%; background: var(--surface); color: var(--ink);
    display: grid; place-items: center; cursor: pointer; padding: 0; }
  .menu-btn:hover { border-color: var(--ink); }
  .menu-btn span, .menu-btn span::before, .menu-btn span::after { display: block; width: 16px; height: 1.5px; background: currentColor; border-radius: 2px; position: relative; }
  .menu-btn span::before, .menu-btn span::after { content: ""; position: absolute; left: 0; }
  .menu-btn span::before { top: -5px; } .menu-btn span::after { top: 5px; }
  .menu-scrim { position: fixed; inset: 0; z-index: 30; background: rgb(0 0 0 / .35); }
  .menu-panel { position: fixed; z-index: 31; top: 0; left: 0; bottom: 0; width: min(360px, 88vw); background: var(--surface); color: var(--ink);
    padding: calc(20px + env(safe-area-inset-top, 0px)) 20px calc(24px + env(safe-area-inset-bottom, 0px)) max(20px, env(safe-area-inset-left, 0px));
    display: flex; flex-direction: column; gap: 20px; box-shadow: 8px 0 32px rgb(0 0 0 / .18); overflow-y: auto; }
  .menu-head { display: flex; justify-content: space-between; align-items: center; }
  .menu-head .eyebrow { font: 400 11px/1 var(--small); letter-spacing: .16em; color: var(--muted); }
  .menu-close { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--line); background: var(--surface); color: var(--ink); font-size: 18px; cursor: pointer; }
  .menu-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .menu-list a { display: grid; grid-template-columns: 44px 1fr; gap: 2px 12px; align-items: baseline; padding: 14px 16px; border-radius: 14px;
    border: 1px solid var(--line); color: var(--ink); text-decoration: none; }
  .menu-list a:hover { border-color: var(--ink); }
  .menu-list a[aria-current="page"] { background: var(--inverse-bg); color: var(--inverse-ink); border-color: var(--inverse-bg); }
  .menu-list .no { grid-row: span 2; font: 200 30px/1 var(--display); font-variant-numeric: tabular-nums; }
  .menu-list .t { font: 500 16px/1.3 var(--body); }
  .menu-list .s { font: 400 12px/1.4 var(--small); opacity: .65; letter-spacing: .04em; }
  .menu-foot { margin-top: auto; font: 400 11px/1.6 var(--small); color: var(--muted); letter-spacing: .04em; }`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-btn';
  btn.setAttribute('aria-label', '開啟選單');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span>';
  const slot = document.querySelector('.rail .tag');
  if (slot) slot.replaceWith(btn); else document.body.prepend(btn);

  const scrim = document.createElement('div');
  scrim.className = 'menu-scrim';
  scrim.hidden = true;
  const panel = document.createElement('nav');
  panel.className = 'menu-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', '頁面選單');
  panel.innerHTML = `
    <div class="menu-head"><span class="eyebrow">MENU · 選單</span><button type="button" class="menu-close" aria-label="關閉選單">×</button></div>
    <ul class="menu-list">${PAGES.map(p => `
      <li><a href="${p.href}"${p.key === current ? ' aria-current="page"' : ''}>
        <span class="no">${p.no}</span><span class="t">${p.title}</span><span class="s">${p.sub}</span></a></li>`).join('')}
    </ul>
    <p class="menu-foot">創意發想研究｜國立臺北商業大學</p>`;
  document.body.append(scrim, panel);

  const open = yes => {
    scrim.hidden = panel.hidden = !yes;
    btn.setAttribute('aria-expanded', String(yes));
    if (yes) panel.querySelector('.menu-close').focus(); else btn.focus();
  };
  btn.addEventListener('click', () => open(true));
  scrim.addEventListener('click', () => open(false));
  panel.querySelector('.menu-close').addEventListener('click', () => open(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false); });
})();
