/* ============================================================
   Orlando & Miami Trip Planner 2026 - Countdown Module
   ============================================================
   Contagem regressiva para 01/11/2026
   ============================================================ */

const Countdown = {
  /** Data alvo: 1 de Novembro de 2026 */
  targetDate: new Date('2026-11-01T00:00:00'),

  /** Timestamp alvo */
  targetTime: new Date('2026-11-01T00:00:00').getTime(),

  /** Timer ID */
  timerId: null,

  /**
   * Inicia a contagem regressiva
   */
  start() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  },

  /**
   * Para a contagem regressiva
   */
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  },

  /**
   * Atualiza os elementos da contagem na página
   */
  update() {
    const now = Date.now();
    const diff = this.targetTime - now;

    if (diff <= 0) {
      this.stop();
      this.render({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      document.querySelectorAll('[data-countdown-message]').forEach(el => {
        el.textContent = 'A viagem chegou! 🎉';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.render({ days, hours, minutes, seconds });
  },

  /**
   * Renderiza os valores nos elementos
   * @param {{days: number, hours: number, minutes: number, seconds: number}} time
   */
  render(time) {
    // Formatar com 2 dígitos
    const pad = (n) => String(n).padStart(2, '0');

    // Atualizar elementos individuais
    document.querySelectorAll('[data-countdown="days"]').forEach(el => { el.textContent = pad(time.days); });
    document.querySelectorAll('[data-countdown="hours"]').forEach(el => { el.textContent = pad(time.hours); });
    document.querySelectorAll('[data-countdown="minutes"]').forEach(el => { el.textContent = pad(time.minutes); });
    document.querySelectorAll('[data-countdown="seconds"]').forEach(el => { el.textContent = pad(time.seconds); });

    // Atualizar mensagem de dias restantes
    document.querySelectorAll('[data-days-remaining]').forEach(el => {
      el.textContent = `${time.days} dias`;
    });
  }
};
