/* ============================================================
   Orlando & Miami Trip Planner 2026 - Storage Module
   ============================================================
   Gerencia persistência de dados via LocalStorage
   ============================================================ */

const Storage = {
  /**
   * Salva um valor no LocalStorage
   * @param {string} key - Chave do armazenamento
   * @param {any} value - Valor a ser armazenado
   */
  set(key, value) {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
      return true;
    } catch (e) {
      console.error('Storage.set error:', e);
      return false;
    }
  },

  /**
   * Recupera um valor do LocalStorage
   * @param {string} key - Chave do armazenamento
   * @param {any} defaultValue - Valor padrão caso não exista
   * @returns {any} Valor armazenado ou defaultValue
   */
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage.get error:', e);
      return defaultValue;
    }
  },

  /**
   * Remove um item do LocalStorage
   * @param {string} key - Chave a ser removida
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage.remove error:', e);
      return false;
    }
  },

  /**
   * Limpa todos os dados do LocalStorage (apenas chaves do app)
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('orlando_')) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Storage.clear error:', e);
      return false;
    }
  },

  /**
   * Retorna todas as chaves do app
   * @returns {string[]}
   */
  keys() {
    const result = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('orlando_')) {
          result.push(key);
        }
      }
    } catch (e) {
      console.error('Storage.keys error:', e);
    }
    return result;
  },

  /**
   * Retorna estatísticas de uso do LocalStorage
   * @returns {{used: number, total: number, percent: number}}
   */
  stats() {
    let used = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            used += key.length + value.length;
          }
        }
      }
    } catch (e) {
      console.error('Storage.stats error:', e);
    }
    // Cada caractere = 2 bytes (UTF-16)
    const total = 5 * 1024 * 1024; // 5MB
    return {
      used: used * 2,
      total: total,
      percent: ((used * 2) / total) * 100
    };
  }
};

/* ============================================================
   Orlando Data Store - Estrutura de dados da aplicação
   ============================================================ */

const Store = {
  /** Prefixo das chaves no LocalStorage */
  prefix: 'orlando_',

  /**
   * Recupera dados de uma coleção
   * @param {string} collection - Nome da coleção
   * @param {any} defaultData - Dados padrão
   */
  get(collection, defaultData = null) {
    return Storage.get(this.prefix + collection, defaultData);
  },

  /**
   * Salva dados em uma coleção
   * @param {string} collection - Nome da coleção
   * @param {any} data - Dados a salvar
   */
  set(collection, data) {
    return Storage.set(this.prefix + collection, data);
  },

  /**
   * Adiciona um item a uma coleção
   * @param {string} collection - Nome da coleção
   * @param {object} item - Item a adicionar
   */
  add(collection, item) {
    const items = this.get(collection, []);
    item.id = item.id || Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    item.createdAt = item.createdAt || new Date().toISOString();
    item.updatedAt = new Date().toISOString();
    items.push(item);
    return this.set(collection, items) ? item : null;
  },

  /**
   * Atualiza um item em uma coleção pelo ID
   * @param {string} collection - Nome da coleção
   * @param {string} id - ID do item
   * @param {object} updates - Dados a atualizar
   */
  update(collection, id, updates) {
    const items = this.get(collection, []);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      return this.set(collection, items) ? items[index] : null;
    }
    return null;
  },

  /**
   * Remove um item de uma coleção pelo ID
   * @param {string} collection - Nome da coleção
   * @param {string} id - ID do item
   */
  remove(collection, id) {
    const items = this.get(collection, []);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length !== items.length) {
      return this.set(collection, filtered);
    }
    return false;
  },

  /**
   * Remove todos os itens de uma coleção
   * @param {string} collection - Nome da coleção
   */
  clear(collection) {
    return Storage.remove(this.prefix + collection);
  }
};

/* ============================================================
   Dados Padrão da Aplicação
   ============================================================ */

const DefaultData = {
  /** Participantes do grupo */
  group: [
    { id: 'p1', name: 'Michel Aguiar', role: 'Organizador', phone: '+55 (11) 99999-0001', passport: '', visa: '', insurance: '123456', status: 'confirmed', notes: '', avatar: null },
    { id: 'p2', name: 'Convidado 2', role: 'Participante', phone: '+55 (11) 99999-0002', passport: '', visa: '', insurance: '', status: 'pending', notes: '', avatar: null },
    { id: 'p3', name: 'Convidado 3', role: 'Participante', phone: '+55 (11) 99999-0003', passport: '', visa: '', insurance: '', status: 'pending', notes: '', avatar: null },
    { id: 'p4', name: 'Convidado 4', role: 'Participante', phone: '+55 (11) 99999-0004', passport: '', visa: '', insurance: '', status: 'pending', notes: '', avatar: null }
  ],

  /** Cronograma dos 13 dias */
  schedule: [
    { day: 1, date: '2026-11-01', weekday: 'Domingo', city: 'Orlando', park: 'Magic Kingdom', checkIn: '08:00', checkOut: '22:00', restaurant: 'Be Our Guest', show: 'Happily Ever After', fireworks: true, obs: 'Chegada e check-in no hotel', status: 'pending' },
    { day: 2, date: '2026-11-02', weekday: 'Segunda', city: 'Orlando', park: 'EPCOT', checkIn: '09:00', checkOut: '21:00', restaurant: 'Via Napoli', show: 'Harmonious', fireworks: true, obs: 'Reservar Lightning Lane', status: 'pending' },
    { day: 3, date: '2026-11-03', weekday: 'Terça', city: 'Orlando', park: 'Hollywood Studios', checkIn: '08:30', checkOut: '21:00', restaurant: 'Sci-Fi Dine-In', show: 'Fantasmic!', fireworks: true, obs: 'Usar Single Rider', status: 'pending' },
    { day: 4, date: '2026-11-04', weekday: 'Quarta', city: 'Orlando', park: 'Animal Kingdom', checkIn: '08:00', checkOut: '18:00', restaurant: 'Tusker House', show: 'Festival of Lion King', fireworks: false, obs: 'Levar repelente', status: 'pending' },
    { day: 5, date: '2026-11-05', weekday: 'Quinta', city: 'Orlando', park: 'Universal Studios', checkIn: '09:00', checkOut: '21:00', restaurant: 'Hard Rock Cafe', show: 'CineSational', fireworks: true, obs: 'Express Pass necessário', status: 'pending' },
    { day: 6, date: '2026-11-06', weekday: 'Sexta', city: 'Orlando', park: 'Islands of Adventure', checkIn: '09:00', checkOut: '21:00', restaurant: 'Three Broomsticks', show: 'Nighttime Lights', fireworks: true, obs: 'Levar capa de chuva', status: 'pending' },
    { day: 7, date: '2026-11-07', weekday: 'Sábado', city: 'Orlando', park: 'Dia Livre', checkIn: '-', checkOut: '-', restaurant: '-', show: '-', fireworks: false, obs: 'Compras no Outlet e descanso', status: 'pending' },
    { day: 8, date: '2026-11-08', weekday: 'Domingo', city: 'Orlando', park: 'SeaWorld', checkIn: '09:00', checkOut: '19:00', restaurant: 'Sharks Underwater Grill', show: 'Orca Encounter', fireworks: true, obs: 'Levar protetor solar', status: 'pending' },
    { day: 9, date: '2026-11-09', weekday: 'Segunda', city: 'Orlando', park: 'Aquatica', checkIn: '09:00', checkOut: '17:00', restaurant: 'Banana Beach Cookout', show: '-', fireworks: false, obs: 'Levar roupa de banho e protetor solar', status: 'pending' },
    { day: 10, date: '2026-11-10', weekday: 'Terça', city: 'Orlando', park: 'Disney Springs', checkIn: '10:00', checkOut: '23:00', restaurant: 'The Boathouse', show: 'Música ao vivo', fireworks: false, obs: 'Compras e restaurantes', status: 'pending' },
    { day: 11, date: '2026-11-11', weekday: 'Quarta', city: 'Miami', park: 'Viagem Orlando → Miami', checkIn: '08:00', checkOut: '-', restaurant: '-', show: '-', fireworks: false, obs: 'Viagem de carro (~4h). Check-in hotel Miami', status: 'pending' },
    { day: 12, date: '2026-11-12', weekday: 'Quinta', city: 'Miami', park: 'Miami Beach / South Beach', checkIn: '-', checkOut: '-', restaurant: 'Joe\'s Stone Crab', show: '-', fireworks: false, obs: 'Praia, compras e passeio', status: 'pending' },
    { day: 13, date: '2026-11-13', weekday: 'Sexta', city: 'Miami', park: 'Retorno', checkIn: '-', checkOut: '10:00', restaurant: '-', show: '-', fireworks: false, obs: 'Check-out, devolução carro, aeroporto', status: 'pending' }
  ],

  /** Orçamento */
  budget: {
    categories: [
      { id: 'b1', name: 'Passagens', icon: 'fa-plane', budget: 12000, paid: 0, color: '#0057D9' },
      { id: 'b2', name: 'Hotel', icon: 'fa-hotel', budget: 8000, paid: 0, color: '#2E8BFF' },
      { id: 'b3', name: 'Parques', icon: 'fa-ticket-alt', budget: 10000, paid: 0, color: '#9B59B6' },
      { id: 'b4', name: 'Compras', icon: 'fa-shopping-bag', budget: 5000, paid: 0, color: '#E74C3C' },
      { id: 'b5', name: 'Alimentação', icon: 'fa-utensils', budget: 4000, paid: 0, color: '#FF9800' },
      { id: 'b6', name: 'Carro', icon: 'fa-car', budget: 3000, paid: 0, color: '#1ABC9C' },
      { id: 'b7', name: 'Seguro', icon: 'fa-shield-alt', budget: 1500, paid: 0, color: '#2ECC71' },
      { id: 'b8', name: 'Extras', icon: 'fa-ellipsis-h', budget: 2000, paid: 0, color: '#34495E' }
    ]
  },

  /** Checklist */
  checklist: {
    'Antes da Viagem': [
      'Passaportes válidos',
      'Visto americano (ESTA)',
      'Seguro viagem contratado',
      'Passagens aéreas compradas',
      'Reserva do hotel confirmada',
      'Carro alugado reservado',
      'Ingressos dos parques comprados',
      'Dinheiro em espécie (USD)',
      'Cartão internacional habilitado',
      'Aplicativos baixados (Uber, Maps)',
      'Chip de celular internacional',
      'Roteiro impresso',
      'Malas preparadas',
      'Casa e animais cuidados'
    ],
    'Documentos': [
      'Passaportes',
      'Vistos / ESTA',
      'Seguro viagem',
      'Passagens aéreas',
      'Voucher do hotel',
      'Voucher do carro',
      'Ingressos parques',
      'CNH (Carteira de Motorista)',
      'Cartão de crédito',
      'Cópia digital dos documentos'
    ],
    'Mala': [
      'Roupas leves (Orlando/Miami)',
      'Casaco (para ar condicionado)',
      'Roupa de banho',
      'Protetor solar',
      'Repelente',
      'Tênis confortável',
      'Sandálias',
      'Capa de chuva',
      'Óculos de sol',
      'Boné / chapéu',
      'Carregadores portáteis',
      'Adaptador de tomada',
      'Medicamentos',
      'Kit de higiene'
    ],
    'Parques': [
      'Ingressos (impressos ou app)',
      'Reservas Lightning Lane',
      'Reservas Express Pass',
      'Reservas de restaurantes',
      'Mapa dos parques',
      'Protetor solar extra',
      'Garrafa de água',
      'Lanches',
      'Mochila confortável',
      'Carregador portátil'
    ],
    'Retorno': [
      'Confirmar check-out',
      'Devolução do carro',
      'Check-in online do voo',
      'Malas pesadas',
      'Documentos separados',
      'Lembranças organizadas',
      'Declaração de bens (Receita)'
    ]
  }
};
