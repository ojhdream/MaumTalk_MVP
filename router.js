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
