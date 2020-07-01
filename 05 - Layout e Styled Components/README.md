# Trabalhando com imagens no Gatsby

## :robot: - Indíce

- 1 - [Introdução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](https://github.com/comicodarko/Lab-Gatsby/tree/master/02%20-Gatsby%20e%20sua%20estrutura)
- 3 - [Gatsby e GraphQL](https://github.com/comicodarko/Lab-Gatsby/tree/master/03%20-%20Gatsbt%20e%20GraphQL)
- 4 - [Gatsby e imagens](https://github.com/comicodarko/Lab-Gatsby/tree/master/04%20-%20Trabalhando%20com%20imagens%20no%20Gatsby)
- 5 - [Layout e Style Components](#5-1)
  - 5.1 - [Introdução ao Styled Componentes](#5-1)
  - 5.2 - [Criando o Layout Component](#5-2)
  - 5.3 - [Estilos globais](#5-3)
  - 5.4 - [Refatorando o Styled Components](#5-4)
  - 5.5 - [Estilizando componentes vindo do Gatsby](#5-5)
  - 5.6 - [Icones com Styled Icons](#5-6)
  - 5.7 - [Passando valores através das propriedades](#5-7)
****

## <a name="5-1">Introdução ao Styled Componentes</a>

O Styeled Componentes é uma ferramenta para uma metodologia chamada "CSS in JS".

- Carrega somente o que a página está renderizando.
- Sem bug de class name.
- Permite criar um style mais dinâmico baseado em **props**.
- Fácil manutenibilidade.
- Prefix automático.

>https://styled-components.com

### Instalando e configurando o Styled Components

```console
npm install --save styled-components
```

É necessário agora um plugin que permita a conexão do Styled Components para o Gatsby:

```console
npm install --save gatsby-plugin-styled-components
```

E agora é necessário configurar no **gatsby.config.js**.

```js
...
  plugins: [
    `gatsby-plugin-styled-components`
...
```

****

## <a name="5-2">Criando o Layout Component</a>

- Primeiro importe o styled-components
- Crie uma constante com os componentes com os estilizados
- Utilize os componentes

```js
import styled from 'styled-components';

const LayoutWrapper = styled.section`
  display: flex;
`

const LayoutMain = styled.main`
  background: #16202c;
  min-height: 100vh;
  padding: 0 3.75rem 0 20rem;
  width: 100%;
`

...

<LayoutWrapper>
    <aside><Profile /></aside>Criando o Avatar Component
  <LayoutMain>{children}</LayoutMain>
</LayoutWrapper>
```

****

## <a name="5-3">Estilos globais</a>

Para utilizar um reset nos elementos que os browsers acabam aplicando é necessário um método dentro do styled-components, chamado de createGlobalStyle.

- Basta importar e usar o estilo

>[Reset de CSS](https://meyerweb.com/eric/tools/css/reset/)

```js
import { createGlobalStyle  } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    background: #202125;
    font-size: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

`

export default GlobalStyles;
```

Por fim basta importar o componente e utilizar ele como se fosse um componente normal.

```js
import GlobalStyles from '../../styles/global';
...
<GlobalStyles />
```
>https://styled-components.com/docs/api#createglobalstyle

****

## <a name="5-4">Refatorando o Styled Components </a>

É interessanter ter uma separação clara o que é estilo e o que é componente lógico. Basta criar um novo arquivo de nome styled.js, exportar e importar.

```js
import styled from 'styled-components';

export const LayoutWrapper = styled.section`
  display: flex;
`

export const LayoutMain = styled.main`
  background: #202125;
  min-height: 100vh;
  padding: 0 3.75rem 0 20rem;
  width: 100%;
`
```

```jsx
import * as S from './styled';

...


const Layout = ({ children }) => {

  return (
    <S.LayoutWrapper>
      <GlobalStyles />
      <aside><Profile /></aside>
      <S.LayoutMain>{children}</S.LayoutMain>
    </S.LayoutWrapper>

  )
}
```
- Fácil identificação do que é um componente de estilo
- Arquivo principal fica menor

****

## <a name="5-5">Estilizando componentes vindo do Gatsby</a>

É simples, em vez da abordagem tradicional, basta utilizar o styled como função:

```jsx
import styled from 'styled-components';
import Img from 'gatsby-image';

export const AvatarWrapper = styled(Img)`
  border-radius: 50%;
  height: 3.75rem;
  width: 3.75rem;
  margin: auto;
`
```

E por fim importar normalmente no index.

****

## <a name="5-6">Icones com Styled Icons</a>
>https://styled-icons.js.org

Primeiramente é necessário instalar:
```
yarn add styled-icons 
```

Em seguida basta importar o icone desejado:

```js
import { Github } from '@styled-icons/boxicons-logos/Github';
import { Facebook } from '@styled-icons/boxicons-logos/FacebookCircle';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';

const Icons = {
  Github,
  Facebook,
  Instagram
}

export default Icons;
```

Com isso já é possível utilizar apartir em qualquer componente com:
```js
Icons[github]
```

****

## <a name="5-7">Passando valores através das propriedades</a>

Primeiramente é necessário passar a props:

```js
<S.PostItemTag background="#F1D43B">JS</S.PostItemTag>
```

E por fim basta recuperar a props:

```js
background: ${props => props.background};
```

****