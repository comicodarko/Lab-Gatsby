# Gatsby e GraphQL

## :robot: - Indíce

- 1 - [Introdução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](#3-1)
  - 3.1 - [Introdução ao GraphQL](#3-1)
  - 3.2 - [GraphiQL e primeira query](#3-2)
  - 3.3 - [Renderizando dados com StaticQuery](#3-3)
  - 3.4 - [Renderizando dados com Hooks](#3-4)

****

## <a name="3-1">Introdução ao GraphQL</a>

É uma linguagem de consulta de dados desenvolvida e usada pelo Fa3-2cebook para realizar requisições e entregar informações para aplicações web e mobile.

### Problemas em uma REST API

- Dificuldades para evoluir a API (criação de N versões)
- Entrega de dados as vezes não necessaŕios (aumento da requisição)
- Rotas altamente acopladas(caso 2 dados diferentes, é necessário 2 rotas diferentes)

****

## Vantagens do GraphQL

- Permite evolução contante
- Entrega somente dados requisitados (tamanho menos e mais rápido)
- Rota única, dados altamente desacoplados

****

### Como funciona o GraphQL?

Preparamos um Schema onde definimos o tipo do conteúdo e os dados dele.

```js
type Book {
  id: ID
  title: String
  published: Date
  price: String
  author: Author
}3-2

type Author {
  id: ID
  firtName: String
  lastName: String
  books: [Book]
}
```

Busca dos dados desejados:

```js
{
  book(id:"1") {
    title
    author{
      firstname
    }
  }
}
```

Será retornado apenas os dados requisitados:

```json
{
  "title": "Java Web",
  "author": {
    "firstName": "Adolf"
  }
}
```
> O tamanho da requisição fica menor e isso ajuda tanto no tratamento dos dados.

****

## <a name="3-2">Conhecendo o GraphiQL</a>

Na rota **:8000/__graphql** temos acesso ao GraphiQL que é uma IDE dentro do browser que permite que possamos rodar nossas querys e conseguir explorar quais os dados que recebemos de uma forma bem mais fácil.

- Prettify - Nos ajuda com identação e autocomplete.
- Explorer - Nos ajuda avisualizar tudo no nosso site.

```
query MySiteMetada {
  site {
    siteMetadata {
      title
      description
      author
    }
  }
}
```
> Retornará todos os meta dados antes definidos do nosso site.

### Utilizando o GraphQL Playgroud

Basta adicionar o seguinte no package.json:

```json
"develop:playground": "GATSBY_GRAPHQL_IDE=playground gatsby develop"
```
> E por fim rodar yarn develop:playground no terminal.

Sendo assim, ao acessar a url **:8000/__graphql**, você utilizará o Playground.

****

## <a name="3-3">Renderizandodados com StaticQuery</a>

Como fazer para passar os dados das queries para a interface? 
>https://www.gatsbyjs.org/docs/static-query/

```jsx
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const Profile = () => {
  return (

    <StaticQuery
      query={graphql`
        query MySiteMetadata {
          site {
            siteMetadata {
              title
              description
              author
            }
          }
        }
      `}
    
      render={data => ( 
        <div className="Profile-wrapper">
          <h1>{data.site.siteMetadata.title}</h1>
          <h2>{data.site.siteMetadata.description}</h2>
          <p>{data.site.siteMetadata.author}</p>
        </div>
      )}
    />
  )
}

export default Profile;
```

### Vale lembrar que caso o arquivo **gatsby-config.js** seja modificado (plugin, siteMetaData...)é necessário reiniciar o yarn develop.

Também é possível usar desestruturação:

```jsx
render={({ site: { siteMetaData: { title, position, description } } }) => ( 
  <div className="Profile-wrapper">
    <h1>{title}</h1>
    <h2>{description}</h2>
    <p>{author}</p>
  </div>
)}
```

## <a name="3-4">Renderizando com Hooks</a>

O useStaticQuery separa em uma parte onde vamos trabalhar os dados e outra parte onde renderizamos os dados.

```jsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const Profile = () => {
  const {
    site: {
      siteMetadata: { title, description, author }
    }
  } = useStaticQuery(graphql`
    query MySiteMetadata {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `) 

  return (
    <div className="Profile-wrapper">
      <h1>{title}</h1>
      <h2>{description}</h2>
      <p>{author}</p>
    </div>
  )
}
```

****