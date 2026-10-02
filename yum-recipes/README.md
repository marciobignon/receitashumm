# 🍳 YUM! Recipes — Site de Receitas para Netlify

Site estático de receitas inspirado no tema **Betheme Recipes 3**.  
**Sem banco de dados**. Você adiciona/edita receitas editando um arquivo JSON.

---

## 📦 O que está incluso

```
yum-recipes/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Todo o visual (laranja + sidebar)
├── js/
│   └── app.js          ← Lógica de listagem, filtro e detalhe
├── data/
│   └── recipes.json    ← AQUI ficam todas as receitas
└── README.md           ← Este arquivo
```

---

## 🚀 Como colocar no Netlify (3 minutos)

### Opção 1 — Arrastar e soltar (mais fácil)

1. Acesse [https://app.netlify.com](https://app.netlify.com) e faça login
2. Vá em **Sites** → **Add new site** → **Deploy manually**
3. Arraste a pasta `yum-recipes` (ou o ZIP descompactado) para a área de drop
4. Pronto! O Netlify gera uma URL tipo `https://algo-aleatorio.netlify.app`

### Opção 2 — GitHub + Netlify (recomendado para atualizar depois)

1. Crie um repositório no GitHub e envie a pasta `yum-recipes`
2. No Netlify: **Add new site** → **Import an existing project**
3. Conecte o repositório
4. Configurações de build:
   - **Build command**: deixe em branco
   - **Publish directory**: `.` (ponto) ou a pasta raiz
5. Deploy

Depois de conectar o GitHub, toda vez que você editar o `recipes.json` e der push, o site atualiza sozinho.

---

## ➕ Como adicionar novas receitas

Abra o arquivo `data/recipes.json` e adicione um novo objeto no array (não esqueça da vírgula entre os objetos).

### Modelo de uma receita:

```json
{
  "id": "nome-unico-sem-espaco",
  "title": "Nome da Receita",
  "slug": "nome-unico-sem-espaco",
  "excerpt": "Uma frase curta que aparece no card.",
  "image": "https://images.unsplash.com/photo-XXXX?w=800&q=80",
  "date": "2025-01-15",
  "author": "Seu Nome",
  "categories": ["Café da manhã", "Saudável"],
  "difficulty": "Fácil / Iniciante",
  "prepTime": "15 minutos",
  "cookTime": "20 minutos",
  "servings": "4 porções",
  "description": "Texto mais longo descrevendo a receita.",
  "ingredients": [
    "1 xícara de farinha",
    "2 ovos",
    "..."
  ],
  "instructions": [
    "Primeiro passo...",
    "Segundo passo...",
    "..."
  ]
}
```

### Dicas importantes:

- **id** e **slug** devem ser iguais e únicos (use hífen, sem acento)
- **image**: use imagens do [Unsplash](https://unsplash.com) ou hospede as suas no próprio Netlify (pasta `images/`)
- **categories** possíveis (use exatamente estes nomes):  
  `Bolos e tortas`, `Carnes`, `Aves`, `Peixes e Frutos do Mar`, `Saladas e molhos`, `Sopas`, `Massas`, `Bebidas`, `Doces e Sobremesas`, `Lanches`, `Alimentação Saudável`  
  (você pode usar mais de uma categoria por receita)
- Depois de salvar o JSON, faça o deploy de novo (ou push no GitHub)

---

## 🎨 Personalização rápida

| O que mudar              | Onde                          |
|--------------------------|-------------------------------|
| Cores (laranja)          | `css/style.css` → `:root`     |
| Logo / nome do site      | `index.html` → classe `.logo` |
| E-mail de contato        | `index.html` → `mailto:`      |
| Redes sociais            | `index.html` → `.social`      |
| Texto do hero            | `js/app.js` → função `renderHome` |

---

## 📱 Recursos já prontos

- ✅ Design responsivo (celular + desktop)
- ✅ Sidebar lateral (estilo do demo original)
- ✅ Busca por nome / categoria
- ✅ Filtro por categorias
- ✅ Página individual da receita com:
  - Tempo de preparo / cozimento
  - Dificuldade
  - Porções
  - Lista de ingredientes
  - Modo de preparo numerado
- ✅ 6 receitas de exemplo
- ✅ Zero dependência externa de JS (vanilla)
- ✅ Pronto para Netlify (sem build)

---

## ❓ Dúvidas comuns

**Posso ter muitas receitas?**  
Sim. O JSON aguenta centenas sem problema. Para milhares, ainda funciona, mas a busca fica um pouco mais lenta (ainda sem banco).

**Como hospedar minhas próprias fotos?**  
Coloque as imagens em uma pasta `images/` e use o caminho relativo:
```json
"image": "images/minha-receita.jpg"
```

**Preciso de domínio próprio?**  
No Netlify você pode conectar um domínio gratuito ou o seu próprio (ex: `minhasreceitas.com.br`).

**Dá para adicionar receitas pelo site (formulário)?**  
Não, porque é 100% estático e sem backend. A forma de adicionar é editando o `recipes.json`.  
Se no futuro quiser formulário + banco, aí precisaria de um backend (Supabase, Firebase, etc.).

---

Feito com ❤️ para você colocar no ar em minutos.  
Bom apetite! 🍳
