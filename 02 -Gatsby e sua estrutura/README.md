# Gatsby e sua estrutura

## :robot: - Indíce

- 1 - [Indtrodução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](#2)
  - 2.0 - [Iniciando o projeto e entendendo os comandos do gatsby-cli](#2-0)
  - 2.1 - [Entendendo a estrutura](#2-1)
  - 2.2 - [Criando uma página](#2-2)
  - 2.3 - [Linkando páginas com Gatsby Link](#2-3)
  - 2.4 - [Criando um componente e compartilhando entre páginas](#2-4)
****

## <a name="#2-0">Comandos básicos gatsby-cli</a>

Para criar um novo projeto em gatsby:
```console
gatsby new myblog
```

Para monitorar enquanto desenvolvimento:
```console
gatsby develop
```

Comando final para gera arquivos estáticos:
```console
gatsby build
```

Para levantar servidor em cima dos arquivos estáticos já criados:
```console
gatsby serve
```

Para apagar cach e assets que o Gatsby gera
```console
gatsby clean
```

****

##  <a name="2-1">Entendendo a estrutura</a>

- **gatsby-config.js** - É responsável por fazer toda a configuração do Gatsby em relação a plugins e outro dados.

- **gatsby-browser.js** - É onde passamos toda variável e bibliotecas que for utilizar no front-end.

- **gatsby-node.js** - Serve para trabalhar com a API do Gatsby.

- **gatsby-ssr.js** - Serve para trabalhar com server-sid rendering.
****
- Pasta **src** - É onde ficará todo nosso código
- Pasta **public** - É onde ficará todos os arquivos estáticos gerados.
****

## <a name="2-2">Criando uma página</a>

Para isso basta que se crie um arquivo .js na pasta **pages**, a estrutura para criar uma página é a mesma que em React:

```jsx
import React from 'react';

const HelloPage = () => {
  return (
     <h1>Hello Friend</h1>
  )
}

export default AboutPage;
```
> Finalizado, não é necessário configurar nd

****

## <a name="2-3">Como o Gatsby Link funciona</a>

A abordagem tradicional...
```html
<a href="/about">About</a>
```
Não é utilizada aqui, então usamor o Gatsby Link que faz várias coisas de forma **otimizada**.

```jsx
import { Link } from 'gatsby';

...

<Link to="/about">About</Link>
```
> Vale lembrar que o download é feito apartir do hover no link, tornando o AWP mais flúida.

É possível definir algumas propriedades para esse elemento como activeStyle entre outras, possível ver todas [aqui](https://www.gatsbyjs.org/docs/gatsby-link/).

****

## <a name="2-4">Criando um componente e compartilhando entre páginas</a>

Na pasta components é criado uma pasta para agrupar um grupo de componentes que participaração de uma mesma parte do site, por exemplo **Profile**. Componentes que aparecerão em todas as páginas são importados para dentro do layout.js

layout.js
```jsx
const Layout = ({ children }) => {

  return (
    <>
      <aside><Profile /></aside>
      <main>{children}</main>
    </>
  )
}
```

Nas páginas:
```jsx
<Layout>
  <SEO title="About" />
  <h1>About the friend</h1>
</Layout>
```
> Com isso o componente Profile será incluso.

****