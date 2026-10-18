let posts = [];

async function loadPosts() {
  try {
    const res = await fetch('data/posts.json');
    posts = await res.json();
    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const hash = location.hash.replace('#', '');
    if (hash.startsWith('post/')) {
      showPost(hash.replace('post/', ''));
    } else {
      renderList();
    }
  } catch (e) {
    document.getElementById('app').innerHTML = '<p style="padding:40px;text-align:center">Erro ao carregar posts. Verifique data/posts.json</p>';
  }
}

function formatDate(d) {
  try {
    return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch {
    return d;
  }
}

function renderList() {
  history.replaceState(null, '', location.pathname);
  document.getElementById('app').innerHTML = `
    <section class="hero">
      <h1>Blog de Comida</h1>
      <p>Dicas, curiosidades e ideias para cozinhar melhor no dia a dia.</p>
    </section>
    <div class="wrap">
      <div class="grid">
        ${posts.map(p => `
          <article class="card" onclick="showPost('${p.id}')">
            <div class="img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
            <div class="body">
              <div class="meta">${p.category} · ${formatDate(p.date)}</div>
              <h2>${p.title}</h2>
              <p>${p.excerpt}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPost(id) {
  const p = posts.find(x => x.id === id);
  if (!p) {
    renderList();
    return;
  }
  location.hash = 'post/' + id;
  const paragraphs = (p.content || []).map(t => `<p>${t}</p>`).join('');
  document.getElementById('app').innerHTML = `
    <div class="wrap">
      <div class="back" onclick="renderList()">← Voltar ao blog</div>
      <article class="article">
        <div class="article-hero" style="background-image:url('${p.image}')"></div>
        <div class="article-body">
          <div class="meta">${p.category} · ${formatDate(p.date)} · ${p.author}</div>
          <h1>${p.title}</h1>
          <div class="content">${paragraphs}</div>
        </div>
      </article>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '');
  if (hash.startsWith('post/')) showPost(hash.replace('post/', ''));
  else if (posts.length) renderList();
});

loadPosts();
