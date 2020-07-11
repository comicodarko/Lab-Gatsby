# Estruturando a Página de Posts

## :robot: - Indíce

- 1 - [Indtrodução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](https://github.com/comicodarko/Lab-Gatsby/tree/master/03%20-%20Gatsbt%20e%20GraphQL)
- 4 - [Gatsby e imagens](https://github.com/comicodarko/Lab-Gatsby/tree/master/04%20-%20Trabalhando%20com%20imagens%20no%20Gatsby)
- 5 - [Layout e Style Components](https://github.com/comicodarko/Lab-Gatsby/tree/master/05%20-%20Layout%20e%20Styled%20Components)
- 6 - [GraphQL + Remark](https://github.com/comicodarko/Lab-Gatsby/tree/master/06%20-%20GraphQL%20%2B%20Remark)
- 7 - [Estruturando a Home](#7https://github.com/comicodarko/Lab-Gatsby/tree/master/07%20-%20Estruturando%20a%20Home)
- 8 - [Estruturando a Página de Posts](#8)
  - 8.1 - [Adicionando estilos bases para o post](#8-1)
  - 8.2 - [Configurando as imagens do post com gatsby-remark-images](#8-2)
  - 8.3 - [Configurando o PrismJS para highlight de código](#8-3)
  - 8.4 - [Criando contextos de post anterior e próximo post](#8-4)
  - 8.5 - [Criando o RecommendedPosts component](#8-5)
  - 8-6 - [Configurando o Disqus para comentários](#8-6)
****

<p name="8">A primeira coisa que temos que fazer é aplicar o layout padrão na página de posts, para isso temos que passar a mesma estrutura que temos em blog-list, para blog-post:</p>

```js
...
import Layout from "../components/Layout"
import SEO from "../components/seo"
...

return (
  <Layout>
    <SEO title={post.frontmatter.title} />
    <h1>{post.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
)
...

```
## <a name="8-1">Adicionando estilos bases para o post</a>

Primeiramente vamos pegar os dados de leitura e a data:

```js
export const query = graphql`
  query Post($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      title
      description
      date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
    }
    html
    timeToRead
  }
}
```

Agora é criado um componente apenas de estilos para os Posts e em seguida o mesmo é passado para o blog-post.

```js
import * as S from "../components/Post/styled";

...

return (
  <Layout>
    <SEO title={post.frontmatter.title} />
    <S.PostHeader>
      <S.PostDate>
        {post.frontmatter.date} • {post.timeToRead} min de leitura
      </S.PostDate>
      <S.PostTitle>{post.frontmatter.title}</S.PostTitle>
      <S.PostDescription>{post.frontmatter.description}</S.PostDescription>
    </S.PostHeader>
    <S.MainContent> 
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </S.MainContent>
  </Layout>
)
...
```

****

## <a name="8-2">Configurando as imagens do post com gatsby-remark-images</a>

Será utilizado:

- **gatsby-remark-images** - Será responsável por conectar o gatsby image com o remark.
- **gatsby-remark-relative-images** - É importante para converter imagem para que ela fique na pasta correta.
- **gatsby-remark-lazy-load** - Faz com que a imagem seja carregada apenas quando se está próximo a imagem.

```console
yarn add gatsby-remark-images gatsby-remark-relative-images gatsby-remark-lazy-load lazysizes
```
> Lazysizes é instalado por ser dependência do lazy-load  
> relative-images@0.3.0 não está funcionando, tentar relative-images@0.2.3

Agora vamos as configurações em **gatsby-config**:

```js
plugins: [
  ...
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `uploads`,
      path: `${__dirname}/static/assets/img`,
    },
  },
  ...
```
> É necessário que venha antes do gatsby-remark-images.

É necessário a configurção de plugins em gatsby-transformer-remark:

```js
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: "gatsby-remark-relative-images",
        options: {
          name: "uploads"
        }
      },
      {
        resolve: "gatsby-remark-images",
        options: {
          maxWidth: 960,
          linkImagesToOriginal: false
        }
      },
      `gatsby-remark-lazy-load`
    ],
  },
},

```

É também necessário uma pequena alteração **gatsby-browser.js**.

- O gatsby-browser serve para que possamos importar bibliotecas ou qualquer coisa JS que precisamos fazer **fora** do React.

```js
import "lazysizes";
```

****

## <a name="8-3">Configurando o PrismJS para highlight de código</a>

Para utilizar o PrismJS, iremos utilizar o **gatsby-remark-prismjs**

```console
yarn add gatsby-remark-prismjs prismjs
```

E agora a configuração no **gatsby-config.js** em gatsby-remark:

- No caso do prism ele precisa ser sempre o **ultimo** plugin.

```js
resolve: `gatsby-transformer-remark`,
  options: {
    ...
      `gatsby-remark-prismjs`
    ...
```

Agora é necessário escolher o tema em gatsby-browser.js

```js
require("prismjs/themes/prism-tomorrowNight.css");
```

****

## <a name="8-4">Criando contextos de post anterior e próximo post</a>

- Por precisar trabalhar com contexto é necessário usar o **gatsby-node.js**.
- Como estamos usando a ordem decrescente pode ficar confuso, o next será o que vem depois (post mais antigo)

No GraphQL dentro de **edges** temos o **next** e o **previous**. No nosso caso queremos o **título** e o **slug**. Sendo assim, nossa query ficará:

```js
{
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          background
          category
          date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
          description
          title
        }
        timeToRead
      }
      // Next: próximo post (mais antigo)
      next {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
      previous {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
}
```

Sendo assim, nosso forEach ficará assim: 

```js
posts.forEach(({ node, next, previous }) => {
  createPage({
    path: node.fields.slug,
    component: path.resolve(`./src/templates/blog-post.js`),
    context: {
      // Data passed to context is available
      // in page queries as GraphQL variables.
      slug: node.fields.slug,
      previousPost: next,
      nextPost: previous
    },
  })
})
```

## <a name="8-5">Criando o RecommendedPosts component</a>

```js
import React from "react"
import propTypes from "prop-types"
import * as S from "./styled"

const RecommendedPosts = ({ next, previous }) => (
  <S.RecommendedWrapper>
    {previous && (
      <S.RecommendedLink to={previous.fields.slug} className="previous">
        {previous.frontmatter.title}
      </S.RecommendedLink>
    )}
    {next && (
      <S.RecommendedLink to={next.fields.slug} className="next">
        {next.frontmatter.title}
      </S.RecommendedLink>
    )}
  </S.RecommendedWrapper>
)

RecommendedPosts.propTypes = {
  next: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired,
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired,
    }),
  }),
  previous: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired,
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired,
    }),
  }),
}

export default RecommendedPosts
```

****

## <a name="8-6">Configurando o Disqus para comentários</a>
>https://github.com/basicsharp/react-disqus-comments

Disqus é um serviço separado que cria toda a interface de comentários, facilitando a implementação.

- Para usar o Disqus usaremos o **react-disqus-comments**.

```console
yarn add react-disqus-comments
```