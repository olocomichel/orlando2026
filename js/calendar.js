/* ============================================================
   Orlando & Miami Trip Planner 2026 - Calendar Module
   ============================================================
   Inicializa e gerencia o FullCalendar
   ============================================================ */

const CalendarModule = {
  /** Instância do calendário */
  instance: null,

  /** Elemento do calendário */
  element: null,

  /**
   * Inicializa o calendário
   * @param {string|HTMLElement} element - Seletor ou elemento do calendário
   */
  init(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element || typeof FullCalendar === 'undefined') return;

    const events = this.getEvents();

    this.instance = new FullCalendar.Calendar(this.element, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      locale: 'pt-br',
      firstDay: 0,
      height: 'auto',
      contentHeight: 'auto',
      events: events,
      eventClick: (info) => this.handleEventClick(info),
      eventClassNames: (arg) => {
        const status = arg.event.extendedProps.status || '';
        return status === 'completed' ? ['fc-event-completed'] : [];
      },
      dayMaxEvents: true,
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        list: 'Lista'
      }
    });

    this.instance.render();
  },

  /**
   * Retorna eventos do cronograma
   * @returns {Array} Lista de eventos
   */
  getEvents() {
    const schedule = Store.get('orlando_schedule', DefaultData.schedule);
    const colors = {
      'Magic Kingdom': '#0057D9',
      'EPCOT': '#2E8BFF',
      'Hollywood Studios': '#9B59B6',
      'Animal Kingdom': '#2ECC71',
      'Universal Studios': '#E74C3C',
      'Islands of Adventure': '#FF9800',
      'SeaWorld': '#1ABC9C',
      'Aquatica': '#3498DB',
      'Disney Springs': '#F39C12',
      'Miami': '#E91E63',
      'Dia Livre': '#95A5A6'
    };

    return schedule.map(item => ({
      title: `${item.park ? item.park : item.city}`,
      start: item.date + 'T' + (item.checkIn !== '-' ? item.checkIn.padStart(5, ':00') : '10:00:00'),
      end: item.date + 'T' + (item.checkOut !== '-' ? item.checkOut.padStart(5, ':00') : '22:00:00'),
      backgroundColor: colors[item.park] || '#0057D9',
      borderColor: 'transparent',
      textColor: '#ffffff',
      extendedProps: {
        day: item.day,
        city: item.city,
        park: item.park,
        restaurant: item.restaurant,
        show: item.show,
        fireworks: item.fireworks,
        obs: item.obs,
        status: item.status
      },
      className: 'rounded-pill'
    }));
  },

  /**
   * Manipula clique em evento
   * @param {object} info - Informações do evento
   */
  handleEventClick(info) {
    const props = info.event.extendedProps;
    const content = `
      <div class="text-start">
        <p class="mb-1"><strong>Dia ${props.day}</strong> · ${props.city}</p>
        <p class="mb-1"><i class="far fa-clock me-1"></i> ${info.event.startStr.split('T')[1]?.substring(0, 5) || '-'} às ${info.event.endStr?.split('T')[1]?.substring(0, 5) || '-'}</p>
        ${props.restaurant !== '-' ? `<p class="mb-1"><i class="fas fa-utensils me-1"></i> ${props.restaurant}</p>` : ''}
        ${props.show !== '-' ? `<p class="mb-1"><i class="fas fa-music me-1"></i> ${props.show}</p>` : ''}
        ${props.fireworks ? '<p class="mb-0"><i class="fas fa-star me-1 text-warning"></i> Com fogos!</p>' : ''}
        ${props.obs ? `<p class="mb-0 mt-1 text-muted"><small>${props.obs}</small></p>` : ''}
      </div>
    `;

    App.showModal(
      `${info.event.title} - Dia ${props.day}`,
      content
    );
  },

  /**
   * Recarrega os eventos
   */
  refresh() {
    if (this.instance) {
      this.instance.removeAllEvents();
      this.instance.addEventSource(this.getEvents());
    }
  }
};
