/* YUM! Recipes - App principal (sem banco de dados) */

let recipes = [];
let currentFilter = 'all';
let currentSearch = '';
const FAV_KEY = 'yum_favorites';

// ----- Favoritos (localStorage) -----
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(x => x !== id);
  } else {
    favs.unshift(id); // mais recente primeiro
  }
  saveFavorites(favs);
  // Re-renderiza a tela atual
  if (document.querySelector('.recipe-hero')) {
    showRecipe(id);
  } else {
    renderHome();
  }
}

function getFavoriteRecipes() {
  const favs = getFavorites();
  return favs.map(id => recipes.find(r => r.id === id)).filter(Boolean).slice(0, 8);
}

// Carrega as receitas do JSON
async function loadRecipes() {
  try {
    const res = await fetch('data/recipes.json');
    recipes = await res.json();
    renderHome();
  } catch (err) {
    console.error('Erro ao carregar receitas:', err);
    document.getElementById('app').innerHTML = `
      <div class="empty-state">
        <div class="icon">😕</div>
        <h2>Não foi possível carregar as receitas</h2>
        <p>Verifique se o arquivo data/recipes.json existe.</p>
      </div>`;
  }
}

// Formata data
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Filtra receitas
function getFilteredRecipes() {
  return recipes.filter(r => {
    const matchCat = currentFilter === 'all' || r.categories.some(c => 
      c.toLowerCase().includes(currentFilter.toLowerCase())
    );
    const matchSearch = !currentSearch || 
      r.title.toLowerCase().includes(currentSearch) ||
      r.excerpt.toLowerCase().includes(currentSearch) ||
      r.categories.some(c => c.toLowerCase().includes(currentSearch));
    return matchCat && matchSearch;
  });
}

// Renderiza a home
function renderHome() {
  const filtered = getFilteredRecipes();
  
  document.getElementById('app').innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">beyum</div>
        <h1>Busque entre <span>${recipes.length}</span> receitas</h1>
        <p>Descubra pratos deliciosos para o café da manhã, almoço, jantar e sobremesas.</p>
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Digite o nome da receita..." value="${currentSearch}">
          <button onclick="doSearch()">🔍</button>
        </div>
      </div>
    </section>

    <div class="categories">
      <div class="cat-card ${currentFilter === 'all' ? 'active' : ''}" onclick="filterCategory('all')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" alt="Todas"></div>
        <span>Todas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Bolos e tortas' ? 'active' : ''}" onclick="filterCategory('Bolos e tortas')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop" alt="Bolos e tortas"></div>
        <span>Bolos e tortas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Carnes' ? 'active' : ''}" onclick="filterCategory('Carnes')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=120&h=120&fit=crop" alt="Carnes"></div>
        <span>Carnes</span>
      </div>
      <div class="cat-card ${currentFilter === 'Aves' ? 'active' : ''}" onclick="filterCategory('Aves')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=120&h=120&fit=crop" alt="Aves"></div>
        <span>Aves</span>
      </div>
      <div class="cat-card ${currentFilter === 'Peixes e Frutos do Mar' ? 'active' : ''}" onclick="filterCategory('Peixes e Frutos do Mar')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=120&fit=crop" alt="Peixes"></div>
        <span>Peixes</span>
      </div>
      <div class="cat-card ${currentFilter === 'Saladas e molhos' ? 'active' : ''}" onclick="filterCategory('Saladas e molhos')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop" alt="Saladas"></div>
        <span>Saladas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Sopas' ? 'active' : ''}" onclick="filterCategory('Sopas')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&h=120&fit=crop" alt="Sopas"></div>
        <span>Sopas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Massas' ? 'active' : ''}" onclick="filterCategory('Massas')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=120&h=120&fit=crop" alt="Massas"></div>
        <span>Massas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Bebidas' ? 'active' : ''}" onclick="filterCategory('Bebidas')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=120&h=120&fit=crop" alt="Bebidas"></div>
        <span>Bebidas</span>
      </div>
      <div class="cat-card ${currentFilter === 'Doces e Sobremesas' ? 'active' : ''}" onclick="filterCategory('Doces e Sobremesas')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=120&h=120&fit=crop" alt="Doces"></div>
        <span>Doces</span>
      </div>
      <div class="cat-card ${currentFilter === 'Lanches' ? 'active' : ''}" onclick="filterCategory('Lanches')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=120&h=120&fit=crop" alt="Lanches"></div>
        <span>Lanches</span>
      </div>
      <div class="cat-card ${currentFilter === 'Alimentação Saudável' ? 'active' : ''}" onclick="filterCategory('Alimentação Saudável')">
        <div class="icon"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&crop=center" alt="Saudável"></div>
        <span>Saudável</span>
      </div>
    </div>

    ${renderFavoritesCarousel()}

    <section class="section">
      <h2 class="section-title">Nossas últimas <span>receitas</span></h2>
      <div class="recipe-grid" id="recipeGrid">
        ${filtered.length === 0 ? `
          <div class="empty-state" style="grid-column: 1 / -1">
            <div class="icon">🔍</div>
            <h3>Nenhuma receita encontrada</h3>
            <p>Tente outro termo ou categoria.</p>
          </div>
        ` : filtered.slice(0, 6).map(r => `
          <article class="recipe-card" onclick="showRecipe('${r.id}')">
            <div class="img-wrap">
              <img src="${r.image}" alt="${r.title}" loading="lazy">
              <button class="fav-btn ${isFavorite(r.id) ? 'active' : ''}" onclick="toggleFavorite('${r.id}', event)" title="${isFavorite(r.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                ${isFavorite(r.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div class="body">
              <div class="date">🕐 ${formatDate(r.date)}</div>
              <h3>${r.title}</h3>
              <p>${r.excerpt}</p>
              <span class="btn-read">Ler mais</span>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Evento de busca ao pressionar Enter
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') doSearch();
    });
  }

  // Atualiza nav
  setActiveNav('home');
}

// Carrossel de favoritos (até 4 visíveis, scroll horizontal)
function renderFavoritesCarousel() {
  const favRecipes = getFavoriteRecipes();
  if (favRecipes.length === 0) {
    return `
      <section class="section favorites-section">
        <h2 class="section-title">Minhas receitas <span>Favoritas</span></h2>
        <div class="fav-empty">
          <p>❤️ Clique no coração de uma receita para adicioná-la aqui.</p>
        </div>
      </section>
    `;
  }
  return `
    <section class="section favorites-section">
      <h2 class="section-title">Minhas receitas <span>Favoritas</span></h2>
      <div class="fav-carousel-wrap">
        <button class="fav-nav fav-prev" onclick="scrollFav(-1)" aria-label="Anterior">‹</button>
        <div class="fav-carousel" id="favCarousel">
          ${favRecipes.map(r => `
            <div class="fav-slide" onclick="showRecipe('${r.id}')">
              <div class="fav-img">
                <img src="${r.image}" alt="${r.title}" loading="lazy">
                <button class="fav-btn active" onclick="toggleFavorite('${r.id}', event)" title="Remover dos favoritos">❤️</button>
              </div>
              <h3>${r.title}</h3>
            </div>
          `).join('')}
        </div>
        <button class="fav-nav fav-next" onclick="scrollFav(1)" aria-label="Próximo">›</button>
      </div>
    </section>
  `;
}

function scrollFav(dir) {
  const el = document.getElementById('favCarousel');
  if (!el) return;
  const amount = el.clientWidth * 0.85;
  el.scrollBy({ left: dir * amount, behavior: 'smooth' });
}

// Filtra por categoria
function filterCategory(cat) {
  currentFilter = cat;
  currentSearch = '';
  renderHome();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Busca
function doSearch() {
  const input = document.getElementById('searchInput');
  currentSearch = input ? input.value.trim().toLowerCase() : '';
  currentFilter = 'all';
  renderHome();
}

// Mostra receita individual
function showRecipe(id) {
  const r = recipes.find(x => x.id === id);
  if (!r) return;

  document.getElementById('app').innerHTML = `
    <div class="recipe-hero" style="background-image: url('${r.image}')">
      <div class="recipe-hero-content">
        <div class="back-btn" onclick="renderHome()">← Voltar para receitas</div>
        <h1>${r.title}</h1>
        <div class="recipe-meta">
          <span>👤 ${r.author}</span>
          <span>📅 ${formatDate(r.date)}</span>
          <span>🏷️ ${r.categories.join(', ')}</span>
        </div>
      </div>
    </div>

    <div class="recipe-stats">
      <div class="stat-card">
        <div class="label">Dificuldade</div>
        <div class="value">${r.difficulty}</div>
      </div>
      <div class="stat-card">
        <div class="label">Preparo</div>
        <div class="value">${r.prepTime}</div>
      </div>
      <div class="stat-card">
        <div class="label">Cozimento</div>
        <div class="value">${r.cookTime}</div>
      </div>
      <div class="stat-card">
        <div class="label">Rendimento</div>
        <div class="value">${r.servings}</div>
      </div>
    </div>

    <div class="print-bar no-print">
      <button class="btn-fav-detail ${isFavorite(r.id) ? 'active' : ''}" onclick="toggleFavorite('${r.id}', event)" title="${isFavorite(r.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
        ${isFavorite(r.id) ? '❤️ Favorita' : '🤍 Favoritar'}
      </button>
      <button class="btn-print" onclick="window.print()" title="Imprimir receita">
        🖨️ Imprimir receita
      </button>
    </div>

    <div class="recipe-content">
      <div>
        <div class="card" style="margin-bottom: 24px">
          <h2>Descrição</h2>
          <p class="description">${r.description}</p>
        </div>
        <div class="card">
          <h2>Modo de preparo</h2>
          <ol class="instructions-list">
            ${r.instructions.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      </div>
      <div>
        <div class="card ingredients-card">
          <h2>Ingredientes</h2>
          <ul class="ingredients-list">
            ${r.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setActiveNav('');
}

// Navegação ativa
function setActiveNav(page) {
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  if (page === 'home') {
    const home = document.querySelector('.nav a[data-page="home"]');
    if (home) home.classList.add('active');
  }
}

// Menu mobile
function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// Fecha menu ao clicar fora (mobile)
document.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.menu-toggle');
  if (sidebar && sidebar.classList.contains('open') && 
      !sidebar.contains(e.target) && 
      toggle && !toggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// Inicia
loadRecipes();
