# Trabalhando com imagens no Gatsby

## :robot: - Indíce

- 1 - [Introdução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](https://github.com/comicodarko/Lab-Gatsby/tree/master/03%20-%20Gatsbt%20e%20GraphQL)
- 4 - [Gatsby e imagens](#4-1)
  - 4.1 - [Conhecendo o gatsby-image](#4-1)
  - 4.2 - [Primeira Query de imagens](#4-2)
  - 4.3 - [Entendendo os 2 tipos de imagens](#4-3)

****

## <a name="4-1">Conhecendo o gatsby-image</a>

O Gatsby foi criado pensando em performance e uma das coisas mais problematicas se tratando de performance são as imagens, afinal em geral são arquivos grandes. Pensando nisso foi criado esse componente especial.

- Carrega imagem de acordo com o tamanho de acordo com o device/resolução.
- Segura imagem enquanto estiver carregando no seu espaço correto.
- Carrega a imagem aumentando a resolução enquanto carrega (blur-up)
- Existe tbm a possibilidade de usar o Traced SVG que carrega um contorno para a imagem enquanto carrega.
- Permite utilizar o WepP (formato novo e otimizado para web)

## Configurando o gatsby-image

 > Utilizar o gatsby starter default, o gatsby-image já estará configurado.

> https://www.gatsbyjs.org/packages/gatsby-image

Primeiramente é necessário instalar dois plugins para o tratamento das imagens:

```console
npm install --save gatsby-transformer-sharp gatsby-plugin-sharp
```

Agora é necessário instalar o gatsby-source-filesystem para o gerenciamento de arquivos:

```console
npm install gatsby-source-filesystem
```

E por último é necessário configurar os plugins em **gatsby-config.js**.  
No array **plugins**, adicione o obejto do source-filesystem e os plugions instalados anteriormente.

```js
plugins: [
    {
      resolve: `gatsby-source-filesystem`, // Nome do nosso plugin
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // Diretório das imagens
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
...
```

Digamos que seja necessário trabalhar com outro tipo de imagem, basta duplicar o objeto do **gatsby-source-filesystem**:

```js
{
  resolve: `gatsby-source-filesystem`,
  options: {
  name: `images`,
  path: `${__dirname}/src/images`,
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
  name: `Nome para o conjunto de dados`,
  path: `${__dirname}/src/pdfs`,
},
```

****

## <a name="4-2">Primeira Query de imagens</a>
>https://www.gatsbyjs.org/packages/gatsby-image/

A primeira coisa que temos que fazer é criar nosso componente:

```jsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Avatar = () => {

  const { avatarImage } = useStaticQuery(
    graphql`
      query {
        avatarImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            fixed(width: 60, height: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )
  
  return <Img fixed={avatarImage.chieldImageSharp.fixed} />
}

export default Avatar;
```

Utilizando de imagens, é gerado imagens com qualidades diferentes, as mesmas fica em /public/static.

****

## <a name="4-3">Entendendo os 2 tipos de imagens</a>

- **fixed** - É quando sabemos a largura e a altura e eles são previamente definidas.
- **fluid** - A fluida se comporta de forma fluida baseado no container que ela está, podendo aumentar e diminuir.

> Eu sei exatamente o tamanho? Se sim = fixed.

Anteriormente foi utilizado o fixed, como utilizar o fuild?

```jsx
const Avatar = () => {

  const { avatarImage } = useStaticQuery(
    graphql`
      query {
        avatarImage: file(relativePath: { eq: "profile.png" }) {
          childImageSharp {
            fluid(maxWidth: 60, minHeight: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  
  return <Img fluid={avatarImage.childImageSharp.fluid} />
}
```
> É literalmente substituir todas as palavras fixed por fluid e definir largura/altura máxima.

****
