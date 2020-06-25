# Gatsby e sua estrutura

## :robot: - Indíce

- 1 - [Indtrodução](https://github.com/comicodarko/Lab-Gatsby)
- 2 - [Gatsby e sua estrutura](#2)
  - 2.0 - [Iniciando o projeto e entendendo os comandos do gatsby-cli](#2-0)
  - 2.1 - [Entendendo a estrutura](#2-1)

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