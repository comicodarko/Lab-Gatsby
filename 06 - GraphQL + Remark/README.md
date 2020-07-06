# GraphQL + Remark

## :robot: - Indíce

- 1 - [Introdução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](https://github.com/comicodarko/Lab-Gatsby/tree/master/03%20-%20Gatsbt%20e%20GraphQL)
- 4 - [Gatsby e imagens](https://github.com/comicodarko/Lab-Gatsby/tree/master/04%20-%20Trabalhando%20com%20imagens%20no%20Gatsby)
- 5 - [Layout e Style Components](https://github.com/comicodarko/Lab-Gatsby/tree/master/05%20-%20Layout%20e%20Styled%20Components)
- 6 - [GraphQL + Remark](#6-1)
  - 6.1 - [Markdown](#6-1)
  - 6.2 - [Configurando o gatsby-transformer-remark](#6-2)
  - 6.3 - [Pegando os dados do MD e usando GraphQL](#6-3)
  - 6.4 - [Tratando Datas no GraphQL](#6-4)
  - 6.5 - [Passando os dados do GraphQL para a página](#6-5)
  - 6.6 - [Adicionando fields, onCreateNode (SLUG)](#6-6)
  - 6.7 - [Usando o createPages da Gatsby Node API](#6-7)
  - 6.8 - [Filtando dados no GraphQL usando variáveis](#6-8)
  - 6.9 - [Criando o template para o Blog Post](#6-9)
****

## <a name="6-1">Markdown</a>

O Markdown é uma **estrutura de texto** que é convertida em HTML no final.

Alguns padrões utilizado para postagens:

- Pasta de post separada do código.
- Arquivo **.md** começando pela data e em seguida o título.
- Título de ser em letras minúsculas sem acento e com palavras separadas por traço.

O Markdown nos permite usar o **front matter** que é um bloco com alguns dados importantes que iremos utilizar.
> No nosso componente PostItem temos: slug, background, category, date, timeToread, title e description, estes dados são informados no front matter na hora de escrever o Markdown.
```md
---
date: 2020-07-04 11:21:00
title: Bye Friend
description: Ipsum Dolor Lorem Ipsum.
category: JS
background: "#7AAB13"
---

# Bye Friend

Lorem Ipsum
...
```
> A cor é necessário usar aspas, para o MD não entender como comentário.

****

## <a name="6-2">Configurando o gatsby-transformer-remark</a>

Pareseia o código Markdown e joga para o GraphQL.

```
npm install --save gatsby-transformer-remark
```

Agora precisamos:

- Definir que a pasta de posts seja lida no sistema.

```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `posts`,
    path: `${__dirname}/posts`,
  },
},
```

- Configurar o gatsby-transformer-remark

```js
{
    resolve: `gatsby-transformer-remark`,
    options: {
      // CommonMark mode (default: true)
      commonmark: true,
      // Footnotes mode (default: true)
      footnotes: true,
      // Pedantic mode (default: true)
      pedantic: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: [],
    },
  },
```
> Os default true não são necessários.

****

## <a name="6-3">Pegando os dados do MD e usando GraphQL</a>

No GraphQL será recebido 2 novos campos: **allMarkdownRemark** e **markdownRemark**

- **allMarkdownRemark** - Pega todos os posts que temos.
- **markdownRemark** - Pega 1 post só.

> edges = Array 
> node = item do Array

Existe apossibilidade de pegarmos o timeToRead que o Markdown calcula automaticamente.

****

## <a name="6-4">Tratando Datas no GraphQL</a>

Em AllMarkdownRemark > edges > node > frontmatter > date, é possível acessar alguns tratamentos:

- **difference** - Retorna diferença entre a data criada e a data atual.
- **formatString** - Nos permite a fromatação da data na forma a qual queremos.
- **fromNow** - Quanto tempo já passou até agora.
- **locale** - Definição da língua.

```graph
query MySiteMetadata {
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
        }
      }
    }
  }
}
```
> A data retornará "pronta" (03 de janeiro de 2020)

****

## <a name="6-5">Passando os dados do GraphQL para a página</a>

No index será necessário fazer nossa query.

```js
const IndexPage = () => { 

  const { allMarkdownRemark } = useStaticQuery(graphql`
    query PostList {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
            }
          }
        }
      }
    }
  `)

const postList = allMarkdownRemark.edges;
```

Com o **postList** será feito um map:

```jsx
{postList.map(({
  node: {
    frontmatter: { background, category, date, description, title },
    timeToRead
  }
}) => (
  <PostItem 
  slug={title}
  background={background}
  category={category}
  date={date}
  timeToRead={timeToRead}
  title={title}
  description={description}
  />
))}
```

****

## <a name="6-6">Adicionando fields, onCreateNode (SLUG)</a>

Para adicionar campos novos precisamos usar as API's node do Gatsby em **gatsby-node.js**, aqui ficará:

- Tudo que for preciso tratar de geração de dados.
>https://www.gatsbyjs.org/docs/node-apis/

Em nosso caso usaremos o **onCreateNode**, que basicamente é chamado toda vez que um novo nó é criado (no nosso caso um novo post). Justo dele utilizaremos o gatsby-source-filesystem, para poder utilizar de um método chamado **createFilePath**.

Com algumas configurações o **gatsby-node.js** ficará assim:

```js
const { createFilePath } = require(`gatsby-source-filesystem`);

// To add the slug field to each post
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(12)}`,
    })
  }
}
```

Agora no GraphQL em **allMarkdownRemark>edges>node>fields** será criado o **slug**, bastará incluir na query que será retornado sem problema algum.

****

## <a name="6-7">Usando o createPages da Gatsby Node API</a>
>https://www.gatsbyjs.org/docs/node-apis/#createPages

Apesar de termos um campo novo de slug e o link está correto, não criamos ainda a página, para isso usaremos o **createPages**.

```js
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug: node.fields.slug
        }
      })
    })
  })
}
```
> Lembrando que sempre que for trabalhar com a API node do Gatsby utilizar o arquivo gatsby-node.js

**** 

## <a name="6-8">Filtando dados no GraphQL usando variáveis</a>

Será necessário criar o **blog-post.js**

Para cada página de posts eu quero os dados apenas desse post, e para identificar o post, estamos usando o slug.
> Relembrando que **allMarkdownRemak** serve para pegar todos os posts enquanto o **markdownRemark** serve para pegar apenas um post

Caso isso seja rodado no GraphQL, será retornado o **ULTIMO POST**:
```graph
query LastPost {
  markdownRemark {
    frontmatter {
      title
    }
    html
  }
}
```

Para poder definir algo mais concreto é necessário que a Query receba parâmetros (no nosso caso o slug), por ser fortemente tipado, o GraphQL é necessário informar o tipo do que estamos pesquisando, string:

```graph
query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
    html
  }
}
```

E em query variables:

```graph  
{
  "slug": "/hello-friend/"
}
```

Ao acessar localhost:8000/hello-friend/ será redirecionado para uma página em branco.

## <a name="6-9">Criando o template para o Blog Post</a>

Nossa página já aparece, porém em branco já que não tempos nenhum conteúdo.

O template nada mais é que um componente React, então seguimos o mesmo padrão

```jsx
import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
    html
  }
}

`

const BlogPost = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  )

}


export default BlogPost;
```


> dangerouslySetInnerHTML diz que passamos um dado que pode ser perigoso já que está sendo passando HTML puro, porém sabemos todos os dados que serão passados então não tem problema.