# Estruturando a Home

## :robot: - Indíce

- 1 - [Indtrodução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](https://github.com/comicodarko/Lab-Gatsby/tree/master/03%20-%20Gatsbt%20e%20GraphQL)
- 4 - [Gatsby e imagens](https://github.com/comicodarko/Lab-Gatsby/tree/master/04%20-%20Trabalhando%20com%20imagens%20no%20Gatsby)
- 5 - [Layout e Style Components](https://github.com/comicodarko/Lab-Gatsby/tree/master/05%20-%20Layout%20e%20Styled%20Components)
- 6 - [GraphQL + Remark](https://github.com/comicodarko/Lab-Gatsby/tree/master/06%20-%20GraphQL%20%2B%20Remark)
- 7 - [Estruturando a Home](#7-1)
  - 7.1 - [Ordenando os posts pela data](#7-1)
  - 7.2 - [Entendendo o limit e skip para criar uma paginação](#7-2)
  - 7.3 - [Usando o Gatsby Node API para criar a paginação](#7-3)
  - 7.4 - [Criando o template para a home](#7-4)
  - 7.5 - [Criando um componenete de paginação](#7-5)
****

## <a name="7-1">Ordenando os posts pela data</a>

Para ordenar os posts utilizaremos o sort>field e ordenaremos pelo frontmatter date na order DESC:

```graph
query PostList {
  allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD [de] MMMM [de] YYYY", locale: "pt-br")
          category
          background
          description
          title
        }
        timeToRead
      }
    }
  }
}
```

****

## <a name="7-2">Entendendo o limit e skip para criar uma paginação</a>

Digamos que temos 300 posts, o index ficará gigante e a performance comprometida. Para fazer a páginação utilizaremos o **limit** e o **skip**.

> Se tenho 5 posts na página 1, eu irei pular 0,  
> Na página 2 eu irei pular os 5 da página 1,  
> Na página 3 eu irei pular os 5 da página 1 + os 5 da página 2  
>
> É visto aqui um padrão, onde pulamos o número da página anterior vezes o número de post por página, nosso skip será baseado nisso:
>
>postPerPage * (page - 1)

****

## <a name="7-3">Usando o Gatsby Node API para criar a paginação</a>

De inicio temos um pequeno problema, caso tenhamos 10 posts e seja passado 6 posts por página a conta não baterá, basta arredondar sempre para cima:

Sendo assim 10 / 6 ele irá dizer que é duas páginas.  

gatsby-node.js:
```js
const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/` : `/page/${index + 1}`,
        component: path.resolve(`./src/templates/blog-list.js`),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: index + 1,
        },
      })
    })
  })
}
```

****

## <a name="7-4">Criando o template para a home</a>

```js
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from "../components/PostItem"

const BlogList = props => {
  const postList = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      {postList.map(
        ({
          node: {
            frontmatter: { background, category, date, description, title },
            timeToRead,
            fields: { slug },
          },
        }) => (
          <PostItem
            slug={slug}
            background={background}
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            description={description}
          />
        )
      )}
    </Layout>
  )
}

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
      }
    }
  }
`

export default BlogList
```

****

## <a name="7-5">Criando um componenete de paginação</a>

É necessário esse componente para que o usuário consiga passar de uma página para outra e informações como a página atual.

```js
import React from 'react';
import propTypes from 'prop-types';

import * as S from './styled'
import { KeyboardArrowLeft as ArrowLeft } from '@styled-icons/material-rounded/KeyboardArrowLeft';
import { KeyboardArrowRight as ArrowRight } from '@styled-icons/material-rounded/KeyboardArrowRight';

const Pagination = ({ isFirst, isLast, currentPage, numPages, prevPage, nextPage }) => {
  return (
    <S.PaginationWrapper>
      {!isFirst && 
        <S.PaginationLink to={prevPage}>
          <ArrowLeft style={{width: 25}}/> Página Anterior
        </S.PaginationLink>
      }

      <p>{currentPage} de {numPages}</p>

      {!isLast &&
        <S.PaginationLink to={nextPage}>
          Próxima Página <ArrowRight style={{width: 25}}/>
        </S.PaginationLink>
      } 
    </S.PaginationWrapper>
  )

  Pagination.propTypes = {
    isFirst: propTypes.bool.isRequired,
    isLast: propTypes.bool.isRequired,
    currentPage: propTypes.number.isRequired,
    numPages: propTypes.number.isRequired,
    prevPage: propTypes.string,
    nextPage: propTypes.string,
  }
}

export default Pagination;
```

E passar essas informações apartir do template:

```js
const BlogList = props => {
  const postList = props.data.allMarkdownRemark.edges

  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage -1 === 1 ? '/' : `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;
...

<Pagination
  isFirst={isFirst}
  isLast={isLast}
  currentPage={currentPage}
  numPages={numPages}
  prevPage={prevPage}
  nextPage={nextPage}
/>

```

****