/* ============================================================
   Orlando & Miami Trip Planner 2026 - Theme Module
   ============================================================
   Gerencia o tema (claro/escuro) com persistência
   ============================================================ */

const Theme = {
  /** Chave do LocalStorage */
  storageKey: 'orlando_theme',

  /** Elemento HTML raiz */
  root: document.documentElement,

  /**
   * Inicializa o tema
   */
  init() {
    const savedTheme = Storage.get(this.storageKey, 'light');
    this.apply(savedTheme);
    this.updateIcon(savedTheme);
  },

  /**
   * Aplica o tema
   * @param {string} theme - 'light' ou 'dark'
   */
  apply(theme) {
    if (theme === 'dark') {
      this.root.setAttribute('data-theme', 'dark');
    } else {
      this.root.removeAttribute('data-theme');
    }
    Storage.set(this.storageKey, theme);
  },

  /**
   * Alterna entre claro e escuro
   * @returns {string} Novo tema
   */
  toggle() {
    const current = this.getCurrent();
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    this.updateIcon(next);
    this.showToast(next);
    return next;
  },

  /**
   * Retorna o tema atual
   * @returns {string} 'light' ou 'dark'
   */
  getCurrent() {
    return this.root.hasAttribute('data-theme') ? 'dark' : 'light';
  },

  /**
   * Atualiza o ícone do botão de tema
   * @param {string} theme - Tema atual
   */
  updateIcon(theme) {
    const btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Modo Claro' : 'Modo Escuro');
      btn.title = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    });
  },

  /**
   * Mostra toast de confirmação
   * @param {string} theme - Novo tema
   */
  showToast(theme) {
    const label = theme === 'dark' ? 'escuro' : 'claro';
    App.showToast(`Modo ${label} ativado`, 'Tema alterado com sucesso', 'info');
  },

  /**
   * Verifica preferência do sistema
   * @returns {string} Tema preferido
   */
  getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
};
