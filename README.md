# 🏰 Orlando & Miami Trip Planner 2026

**Portal de planejamento de viagem em grupo** — 13 dias em Orlando e Miami (01 a 13 de Novembro de 2026).

Um aplicativo web moderno, responsivo e completo para organizar todos os aspectos da sua viagem: cronograma, parques, restaurantes, orçamento, documentos, checklist e muito mais.

## ✨ Funcionalidades

- **Dashboard** — Visão geral com contagem regressiva, clima, cotação do dólar e cards de navegação rápida
- **Cronograma** — Timeline interativa dos 13 dias com status de conclusão
- **Parques** — 9 parques temáticos com detalhes, avaliações e informações
- **Restaurantes** — Tabela pesquisável com filtros por categoria e preço
- **Hotel** — Informações de hospedagem em Orlando e Miami
- **Compras** — Lojas, outlets e lista de compras interativa
- **Orçamento** — Dashboard financeiro com gráficos Chart.js
- **Transporte** — Carro alugado, rotas e estimativas de custo
- **Grupo** — Gerenciamento dos participantes
- **Documentos** — Upload e organização de documentos importantes
- **Checklist** — Listas de verificação com progresso
- **Mapa** — Google Maps com pontos de interesse
- **Configurações** — Tema claro/escuro, exportação/importação de dados

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Design system com variáveis CSS, glassmorphism, animações
- **Bootstrap 5.3** — Componentes responsivos
- **JavaScript ES6** — Lógica da aplicação
- **Font Awesome 6** — Ícones
- **Google Fonts** — Inter + Poppins
- **AOS Animation** — Animações de scroll
- **Animate.css** — Animações complementares
- **Chart.js** — Gráficos do orçamento
- **LocalStorage** — Persistência de dados no navegador
- **Google Maps Embed** — Mapas interativos

## 📁 Estrutura do Projeto

```
/
├── index.html            # Página inicial (Dashboard)
├── cronograma.html       # Cronograma dos 13 dias
├── parques.html          # Parques temáticos
├── restaurantes.html     # Restaurantes
├── hotel.html            # Hospedagem
├── compras.html          # Compras e outlets
├── orcamento.html        # Orçamento e gráficos
├── transporte.html       # Transporte
├── grupo.html            # Participantes
├── documentos.html       # Documentos
├── checklist.html        # Checklist interativo
├── mapa.html             # Mapa interativo
├── configuracoes.html    # Configurações e tema
├── README.md             # Documentação
│
├── /css/
│   ├── style.css         # Estilos principais
│   ├── dark.css          # Modo escuro
│   ├── animations.css    # Animações CSS
│   └── responsive.css    # Responsividade
│
├── /js/
│   ├── app.js            # Inicialização e utilidades
│   ├── storage.js        # LocalStorage e dados padrão
│   ├── theme.js          # Gerenciador de tema
│   ├── countdown.js      # Contagem regressiva
│   ├── calendar.js       # FullCalendar
│   └── charts.js         # Chart.js
│
├── /img/                 # Imagens locais
└── /assets/              # Arquivos extras
```

## 🚀 Como Publicar no GitHub Pages

### 1. Criar o repositório (se já não existir)
```bash
# O repositório já foi criado em:
# https://github.com/olocomichel/orlando2026
```

### 2. Enviar os arquivos para o GitHub
```bash
git init
git add .
git commit -m "Initial commit - Orlando & Miami Trip Planner 2026"
git branch -M main
git remote add origin https://github.com/olocomichel/orlando2026.git
git push -u origin main
```

### 3. Ativar o GitHub Pages
1. Acesse **https://github.com/olocomichel/orlando2026**
2. Vá em **Settings** > **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Selecione a branch **main** e a pasta **/(root)**
5. Clique em **Save**
6. Aguarde 1-2 minutos
7. Seu site estará disponível em: **https://olocomichel.github.io/orlando2026/**

## 📝 Como Editar

### Alterar data da viagem
No arquivo `js/countdown.js`, altere:
```javascript
const Countdown = {
  targetDate: new Date('2026-11-01T00:00:00'), // <-- Altere aqui
  targetTime: new Date('2026-11-01T00:00:00').getTime(), // <-- E aqui
```

### Alterar dados do cronograma
No arquivo `js/storage.js`, na seção `DefaultData.schedule`, você pode editar os 13 dias.

### Alterar orçamento
No mesmo arquivo `js/storage.js`, seção `DefaultData.budget`, ajuste os valores das categorias.

### Trocar imagens
O projeto usa imagens do **Unsplash** via URL. Para usar imagens locais:
1. Coloque as imagens na pasta `/img/`
2. Altere os URLs nos HTMLs:
```html
<!-- Antes (Unsplash) -->
<div class="hero-bg" style="background-image: url('https://images.unsplash.com/...');"></div>

<!-- Depois (local) -->
<div class="hero-bg" style="background-image: url('img/sua-foto.jpg');"></div>
```

### Adicionar nova página
1. Crie o arquivo `.html` na raiz do projeto
2. Copie a estrutura de sidebar e navbar de outra página
3. Adicione o link na sidebar (em todas as páginas)
4. Adicione o link na página inicial (`index.html`)

### Personalizar cores
No arquivo `css/style.css`, altere as variáveis CSS na seção `:root`:
```css
:root {
  --color-primary: #0057D9;       /* Azul Disney */
  --color-primary-light: #2E8BFF; /* Azul claro */
  --color-success: #2ECC71;       /* Verde */
  --color-warning: #FF9800;       /* Laranja */
}
```

## 💾 Como Funciona o Armazenamento

Todos os dados são salvos no **LocalStorage** do navegador com prefixo `orlando_`.

### Chaves utilizadas
| Chave | Descrição |
|-------|-----------|
| `orlando_theme` | Tema (light/dark) |
| `orlando_schedule` | Cronograma dos dias |
| `orlando_budget` | Dados do orçamento |
| `orlando_checklist` | Itens do checklist |
| `orlando_checklist_state` | Estado dos checkboxes |
| `orlando_group` | Participantes |
| `orlando_documents` | Documentos anexados |
| `orlando_shopping` | Lista de compras |

### Exportar / Importar dados
Vá em **Configurações** > **Gerenciar Dados** para exportar um backup JSON ou importar dados salvos anteriormente.

### Limpar dados
Em **Configurações** > **Gerenciar Dados** > **Resetar Tudo**.

## 📱 Responsividade

O layout se adapta automaticamente para:
- **Desktop** (1200px+) — Layout completo com sidebar fixa
- **Tablet** (992px) — Sidebar vira overlay
- **Celular** (768px) — Layout simplificado, cards em coluna
- **Celular pequeno** (480px) — Ajustes finos de padding e fontes

## 🌙 Modo Escuro

Clique no ícone de lua/sol na navbar para alternar entre modo claro e escuro. A preferência é salva automaticamente.

## 📊 Gráficos

O orçamento inclui dois gráficos interativos usando Chart.js:
- **Gráfico de Donut** — Distribuição do orçamento por categoria
- **Gráfico de Barras** — Comparação orçado vs pago

## 🗺️ Mapa

O mapa usa **Google Maps Embed** — sem necessidade de API key. Basta selecionar entre Orlando e Miami para visualizar os pontos de interesse.

## 🤝 Suporte

- **GitHub Issues**: https://github.com/olocomichel/orlando2026/issues
- **Email**: michelfaguiar@gmail.com

---

**Feito com ❤️ para a viagem em família** — Orlando & Miami, Novembro 2026.
