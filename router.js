(function () {
  const pageOrder = ['home', 'tuklog', 'today', 'my'];
  const routes = {
    home: 'home',
    editor: 'editor',
    today: 'today',
    tuklog: 'tuklog',
    my: 'my'
  };

  function currentPage() {
    const match = location.pathname.replace(/\\/g, '/').match(/\/pages\/([^/]+)\//);
    return match ? match[1] : 'home';
  }

  function pageUrl(page, params) {
    const target = routes[page] || routes.home;
    const prefix = currentPage() ? '../' : 'pages/';
    const url = `${prefix}${target}/index.html`;
    const query = params ? new URLSearchParams(params).toString() : '';
    return query ? `${url}?${query}` : url;
  }

  function navigate(page, params) {
    location.href = pageUrl(page, params);
  }

  function stopAndGo(event, page, params) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    navigate(page, params);
  }

  function bindRouting() {
    normalizeBottomNav();
    document.addEventListener('click', function (event) {
      const navItem = event.target.closest('.bottom-nav .nav-item, .bottom-tabs button');
      if (navItem) {
        const nav = navItem.closest('.bottom-nav, .bottom-tabs');
        const index = Array.from(nav.querySelectorAll('.nav-item, button')).indexOf(navItem);
        const page = pageOrder[index];
        if (page && page !== currentPage()) {
          stopAndGo(event, page);
        }
        return;
      }

      const viewAll = event.target.closest('#viewAllBtn, #showDayList');
      if (viewAll) {
        stopAndGo(event, 'tuklog');
        return;
      }

      const profile = event.target.closest('#profileBtn');
      if (profile) {
        stopAndGo(event, 'my');
        return;
      }

      const quickType = event.target.closest('#quickSheet [data-type]');
      if (quickType) {
        stopAndGo(event, 'editor', { category: quickType.dataset.type || '' });
        return;
      }

      const backButton = event.target.closest('#backButton');
      if (backButton && currentPage() === 'editor' && history.length <= 1) {
        stopAndGo(event, 'home');
      }
    }, true);
  }

  function navMarkup(activePage) {
    const items = [
      ['home', '<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5V21H7v-7h10v7"/></svg><span>오늘</span>'],
      ['tuklog', '<svg viewBox="0 0 24 24"><path d="M5 6h14M5 12h14M5 18h14"/></svg><span>툭로그</span>'],
      ['today', '<svg viewBox="0 0 24 24"><path d="M4 13c2-5 4 5 7 0s5 5 9-1"/></svg><span>요즘</span>'],
      ['my', '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.6-4.2 3.1-6.5 7.5-6.5s6.9 2.3 7.5 6.5"/></svg><span>나</span>']
    ];
    return items.map(([page, content]) => `<button class="nav-item${page === activePage ? ' active' : ''}" type="button">${content}</button>`).join('');
  }

  function injectBottomNavStyle() {
    if (document.getElementById('maumtalk-home-nav-style')) return;
    const style = document.createElement('style');
    style.id = 'maumtalk-home-nav-style';
    style.textContent = `
      .bottom-nav{
        position:absolute!important;
        z-index:20!important;
        left:14px!important;
        right:14px!important;
        bottom:calc(12px + env(safe-area-inset-bottom))!important;
        height:70px!important;
        padding:6px 9px!important;
        display:grid!important;
        grid-template-columns:repeat(4,1fr)!important;
        border:1px solid rgba(226,230,224,.9)!important;
        border-radius:24px!important;
        background:rgba(255,255,255,.94)!important;
        box-shadow:0 12px 32px rgba(24,35,53,.10)!important;
        backdrop-filter:blur(18px)!important;
      }
      .bottom-nav .nav-item{
        position:relative!important;
        display:grid!important;
        place-items:center!important;
        align-content:center!important;
        gap:4px!important;
        color:#79818C!important;
        font-size:11px!important;
        font-weight:650!important;
        z-index:1!important;
      }
      .bottom-nav .nav-item svg{width:22px!important;height:22px!important}
      .bottom-nav .nav-item.active{color:#3D9E69!important}
      .bottom-nav .nav-item.active:before{
        content:""!important;
        position:absolute!important;
        width:58px!important;
        height:54px!important;
        border-radius:18px!important;
        background:#EAF6EE!important;
        z-index:-1!important;
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeBottomNav() {
    const existing = document.querySelector('.bottom-nav, .bottom-tabs');
    if (!existing) return;
    injectBottomNavStyle();
    existing.className = 'bottom-nav';
    existing.setAttribute('aria-label', '주요 메뉴');
    existing.innerHTML = navMarkup(currentPage());
  }

  window.MaumTalkRouter = {
    routes,
    currentPage,
    navigate,
    pageUrl
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindRouting);
  } else {
    bindRouting();
  }
})();
