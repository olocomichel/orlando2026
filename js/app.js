/* ============================================================
   Orlando & Miami Trip Planner 2026 - Main Application
   ============================================================
   Inicialização e utilidades globais
   ============================================================ */

const App = {
  /** Versão da aplicação */
  version: '1.0.0',

  /** Dados diversos armazenados */
  data: {
    dollarRate: 5.85,
    lastUpdate: null
  },

  /**
   * Inicializa a aplicação
   */
  init() {
    // Carregar dados
    this.loadData();

    // Inicializar tema
    Theme.init();

    // Inicializar sidebar
    this.initSidebar();

    // Inicializar navegação ativa
    this.initActiveNav();

    // Inicializar busca
    this.initSearch();

    // Inicializar back to top
    this.initBackToTop();

    // Inicializar tooltips
    this.initTooltips();

    // Inicializar botão de tema
    this.initThemeToggle();

    // Inicializar lazy loading
    this.initLazyLoading();

    // Inicializar contagem regressiva
    Countdown.start();

    // Verificar localStorage
    this.checkStorage();

    console.log(`Orlando Trip Planner v${this.version} initialized`);
  },

  /**
   * Carrega dados iniciais
   */
  loadData() {
    // Inicializar dados padrão se não existirem
    if (!Storage.get('orlando_schedule')) {
      Storage.set('orlando_schedule', DefaultData.schedule);
    }
    if (!Storage.get('orlando_budget')) {
      Storage.set('orlando_budget', DefaultData.budget);
    }
    if (!Storage.get('orlando_checklist')) {
      Storage.set('orlando_checklist', DefaultData.checklist);
    }
    if (!Storage.get('orlando_group')) {
      Storage.set('orlando_group', DefaultData.group);
    }
    if (!Storage.get('orlando_documents')) {
      Storage.set('orlando_documents', []);
    }

    // Simular cotação do dólar
    this.data.dollarRate = (5.75 + Math.random() * 0.2).toFixed(2);
    this.data.lastUpdate = new Date().toLocaleString('pt-BR');
  },

  /**
   * Inicializa a sidebar (mobile toggle)
   */
  initSidebar() {
    const toggle = document.querySelector('[data-sidebar-toggle]');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      });

      // Fechar ao clicar em nav item (mobile)
      sidebar.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 992) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
          }
        });
      });
    }

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  },

  /**
   * Destaca o link de navegação ativo
   */
  initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      }
    });
  },

  /**
   * Inicializa campo de busca global
   */
  initSearch() {
    const searchInput = document.querySelector('[data-global-search]');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        document.querySelectorAll('.searchable').forEach(el => {
          el.style.display = '';
        });
        return;
      }

      document.querySelectorAll('.searchable').forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(query) ? '' : 'none';
      });
    });
  },

  /**
   * Inicializa botão back to top
   */
  initBackToTop() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  /**
   * Inicializa tooltips do Bootstrap
   */
  initTooltips() {
    if (typeof bootstrap !== 'undefined') {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el);
      });
    }
  },

  /**
   * Inicializa toggle de tema
   */
  initThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Theme.toggle();
      });
    });
  },

  /**
   * Inicializa lazy loading de imagens
   */
  initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback para browsers sem suporte
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
      });
    }
  },

  /**
   * Verifica disponibilidade do localStorage
   */
  checkStorage() {
    try {
      const testKey = '_test_storage_';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
    } catch (e) {
      this.showToast(
        'Armazenamento indisponível',
        'Os dados não serão salvos neste navegador.',
        'error'
      );
    }
  },

  /**
   * Mostra um toast de notificação
   * @param {string} title - Título
   * @param {string} message - Mensagem
   * @param {string} type - Tipo: success, error, info, warning
   * @param {number} duration - Duração em ms
   */
  showToast(title, message, type = 'info', duration = 4000) {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle'
    };

    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
      <div class="toast-icon ${type}">
        <i class="fas ${icons[type] || icons.info}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Abre um modal Bootstrap
   * @param {string} title - Título do modal
   * @param {string} body - Conteúdo HTML do body
   * @param {string} size - Tamanho: sm, lg, xl
   */
  showModal(title, body, size = '') {
    let modalEl = document.querySelector('#dynamicModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'dynamicModal';
      modalEl.className = 'modal fade';
      modalEl.setAttribute('tabindex', '-1');
      modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ${size}">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    }

    modalEl.querySelector('.modal-title').textContent = title;
    modalEl.querySelector('.modal-body').innerHTML = body;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  },

  /**
   * Formata valor monetário em Real
   * @param {number} value - Valor
   * @returns {string} Valor formatado
   */
  formatCurrency(value) {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  /**
   * Formata valor em Dólar
   * @param {number} value - Valor
   * @returns {string} Valor formatado
   */
  formatUSD(value) {
    return '$ ' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  /**
   * Retorna data formatada em português
   * @param {string} dateStr - Data ISO
   * @returns {string} Data formatada
   */
  formatDate(dateStr) {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  },

  /**
   * Salva dados no LocalStorage com toast de feedback
   * @param {string} key - Chave
   * @param {any} data - Dados
   * @param {string} message - Mensagem de confirmação
   */
  saveWithFeedback(key, data, message = 'Dados salvos com sucesso!') {
    Storage.set(key, data);
    this.showToast('Salvo!', message, 'success');
  },

  /**
   * Carrega o clima simulado para Orlando
   * @returns {object} Dados do clima
   */
  getWeather() {
    const conditions = ['Ensolarado', 'Parcialmente nublado', 'Sol com algumas nuvens'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temp = Math.floor(Math.random() * 8) + 26; // 26-33°C

    return {
      temperature: temp,
      condition: condition,
      icon: 'fa-sun',
      humidity: Math.floor(Math.random() * 30) + 50 + '%',
      wind: Math.floor(Math.random() * 15) + 5 + ' km/h'
    };
  }
};

/* ============================================================
   Inicialização
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
