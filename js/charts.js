/* ============================================================
   Orlando & Miami Trip Planner 2026 - Charts Module
   ============================================================
   Gráficos do Dashboard de Orçamento
   ============================================================ */

const Charts = {
  /** Instâncias de gráficos ativas */
  instances: {},

  /**
   * Cria gráfico de donut para o orçamento
   * @param {string|HTMLElement} canvas - Canvas do gráfico
   */
  createBudgetDonut(canvas) {
    const el = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
    if (!el || typeof Chart === 'undefined') return;

    const data = Store.get('orlando_budget', DefaultData.budget);
    const categories = data.categories || [];

    const labels = categories.map(c => c.name);
    const values = categories.map(c => c.budget);
    const colors = categories.map(c => c.color);

    if (this.instances.budgetDonut) {
      this.instances.budgetDonut.destroy();
    }

    this.instances.budgetDonut = new Chart(el, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12,
                family: "'Inter', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((context.parsed / total) * 100).toFixed(1);
                return ` ${context.label}: R$ ${context.parsed.toLocaleString('pt-BR')} (${percent}%)`;
              }
            }
          }
        }
      }
    });
  },

  /**
   * Cria gráfico de barras para pagamento vs orçamento
   * @param {string|HTMLElement} canvas - Canvas do gráfico
   */
  createBudgetBar(canvas) {
    const el = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
    if (!el || typeof Chart === 'undefined') return;

    const data = Store.get('orlando_budget', DefaultData.budget);
    const categories = data.categories || [];

    const labels = categories.map(c => c.name);
    const budget = categories.map(c => c.budget);
    const paid = categories.map(c => c.paid);
    const colors = categories.map(c => c.color);

    if (this.instances.budgetBar) {
      this.instances.budgetBar.destroy();
    }

    this.instances.budgetBar = new Chart(el, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Orçado',
            data: budget,
            backgroundColor: colors.map(c => c + '40'),
            borderColor: colors,
            borderWidth: 2,
            borderRadius: 4,
            barPercentage: 0.6
          },
          {
            label: 'Pago',
            data: paid,
            backgroundColor: colors,
            borderWidth: 0,
            borderRadius: 4,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rectRounded',
              padding: 16,
              font: { size: 12, family: "'Inter', sans-serif" }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: R$ ${context.parsed.toLocaleString('pt-BR')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'R$ ' + value.toLocaleString('pt-BR');
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  },

  /**
   * Cria gráfico de progresso da viagem
   * @param {string|HTMLElement} canvas - Canvas do gráfico
   */
  createProgressChart(canvas) {
    const el = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
    if (!el || typeof Chart === 'undefined') return;

    const schedule = Store.get('orlando_schedule', DefaultData.schedule);
    const completed = schedule.filter(d => d.status === 'completed').length;
    const total = schedule.length;
    const remaining = total - completed;

    if (this.instances.progressChart) {
      this.instances.progressChart.destroy();
    }

    this.instances.progressChart = new Chart(el, {
      type: 'doughnut',
      data: {
        labels: ['Completos', 'Restantes'],
        datasets: [{
          data: [completed, remaining],
          backgroundColor: ['#2ECC71', '#E8ECF1'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 16,
              font: { size: 12 }
            }
          }
        }
      }
    });
  },

  /**
   * Cria gráfico de gastos por dia (linha)
   * @param {string|HTMLElement} canvas - Canvas do gráfico
   */
  createDailyChart(canvas) {
    const el = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
    if (!el || typeof Chart === 'undefined') return;

    const schedule = Store.get('orlando_schedule', DefaultData.schedule);

    if (this.instances.dailyChart) {
      this.instances.dailyChart.destroy();
    }

    this.instances.dailyChart = new Chart(el, {
      type: 'line',
      data: {
        labels: schedule.map(d => `Dia ${d.day}`),
        datasets: [{
          label: 'Gastos Estimados',
          data: schedule.map(() => Math.floor(Math.random() * 500) + 100),
          borderColor: '#0057D9',
          backgroundColor: 'rgba(0, 87, 217, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0057D9',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + value
            }
          }
        }
      }
    });
  },

  /**
   * Destrói todos os gráficos
   */
  destroyAll() {
    Object.values(this.instances).forEach(chart => {
      if (chart) chart.destroy();
    });
    this.instances = {};
  }
};
