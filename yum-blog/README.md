# Blog de Comida (separado do site de receitas)

Site de **blog estático** sobre comida, para publicar na Netlify **à parte** do site de receitas.

## Estrutura

```
yum-blog/
├── index.html
├── css/style.css
├── js/app.js
├── data/posts.json   ← seus artigos
└── README.md
```

## Publicar na Netlify

1. Crie um **novo site** na Netlify (não misture com o de receitas).
2. Arraste a pasta `yum-blog` ou conecte um repositório só deste blog.
3. Anote a URL, por exemplo: `https://receitashummm-blog.netlify.app`

## Ligar no menu do site de receitas

No site de receitas, em `index.html`, troque:

```html
<a href="https://SEU-BLOG.netlify.app" target="_blank" rel="noopener">Blog</a>
```

pela URL real do blog.

No blog, em `index.html`, troque o link **Receitas** pela URL do site principal.

## Adicionar posts

Edite `data/posts.json` e inclua um objeto:

```json
{
  "id": "meu-post",
  "title": "Título do artigo",
  "slug": "meu-post",
  "excerpt": "Resumo curto.",
  "image": "https://images.unsplash.com/...",
  "date": "2026-10-13",
  "author": "Seu nome",
  "category": "Dicas",
  "content": [
    "Parágrafo 1.",
    "Parágrafo 2."
  ]
}
```

Depois faça deploy de novo.
