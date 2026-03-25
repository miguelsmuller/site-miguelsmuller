# **Site - Miguel Muller - Site Pessoal**
![Code quality](https://img.shields.io/scrutinizer/quality/g/miguelsmuller/site-pessoal/master?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/miguelsmuller/site-pessoal?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/miguelsmuller/site-pessoal?style=flat-square)
![GitHub branch checks state](https://img.shields.io/github/checks-status/miguelsmuller/site-pessoal/master?style=flat-square)

<table>
 <tr>
  <td><a href="docs/README-en.md"><strong>README.md - English</strong></a></td>
  <td><a href="README.md"><strong>README.md - Português</strong></a></td>
 </tr>
</table>

## :pushpin: **Apresentação**

Em 2010, quando iniciei minhas atividades como desenvolvedor freelancer, fundei minha agência pessoal chamada 'Devim'. Atualmente, manter o nome Devim me distancia do meu crescimento profissional, pois não é mais meu objetivo manter uma agência pessoal ou prosseguir com o desenvolvimento freelancer. Agora, busco consolidar minha carreira de forma contínua em ambientes corporativos.

Esse projeto é a versão reformulada do site só que agora com meu nome.

O projeto foi feito usando Next.JS, uma framework de React.js e utiliza TypeScript.

Esse projeto tem 2 propósitos:
1.	Ser o repositório do meu site pessoal.
2.	Servir de laboratório de experiências.

O projeto ainda não está completo. E nunca vai estar. Assim como é a minha visão de software. Ele atende as necessidades do agora. Mais as necessidades do amanhã podem ser outras.

<br/>

## 	:file_cabinet: **Gerencimento de Conteúdo**

O projeto utiliza o Hygraph como a ferramenta principal para o gerenciamento de conteúdo. O Hygraph é uma poderosa plataforma de gerenciamento de conteúdo que oferece uma variedade de recursos e funcionalidades para facilitar a criação, organização e publicação de conteúdo de maneira eficiente e intuitiva.

**[Admin Content - Hygraph](https://app.hygraph.com/)**

### :arrow_forward: **Configuração do Hygraph**

Antes de executar o projeto, é necessário configurar um arquivo `.env` na raiz com as variáveis do Hygraph.
Existe um modelo versionado em `.env.example`.

- `HYGRAPH_URL`
- `HYGRAPH_KEY`

Estas informações são essenciais para que o projeto possa se conectar ao Hygraph e gerenciar o conteúdo de maneira eficiente.

### :arrows_clockwise: **Atualização de Conteúdo Sem Rebuild**

O conteúdo da home usa cache com revalidação automática de **10 minutos** (ISR). Além disso, o projeto possui uma rota para revalidação imediata via webhook do Hygraph:

- Endpoint: `POST /api/revalidate`
- Header recomendado: `x-revalidate-secret: <seu_token>`
- Alternativa: `Authorization: Bearer <seu_token>`
- Env obrigatório: `REVALIDATE_SECRET=<seu_token>`

#### Exemplo de chamada

```bash
curl -X POST "https://www.seudominio.com/api/revalidate" \
  -H "x-revalidate-secret: SEU_TOKEN"
```

#### Configuração sugerida no Hygraph (Webhook)

- URL: `https://www.seudominio.com/api/revalidate`
- Método: `POST`
- Header: `x-revalidate-secret` com o mesmo valor de `REVALIDATE_SECRET`
- Evento: publicação de conteúdo usado na home (`pageHomes`, `portifolios`, `studies`, `testimonies`)

#### Variáveis de ambiente (Firebase webframeworks)

Para o runtime SSR do Firebase encontrar o Hygraph sem depender de arquivo local, configure no backend:

- `HYGRAPH_URL`
- `HYGRAPH_KEY`

Também configure:

- `REVALIDATE_SECRET` (mesmo token enviado no webhook)

<br/>

## 	:link: **Ambientes**

Este projeto possui dois ambientes principais: Produção e Desenvolvimento.

- **Produção:** O ambiente de produção é onde o site estável está hospedado. Você pode acessá-lo aqui:

<table>
 <tr>
  <td><a href="https://www.miguelsmuller.dev.br">
    <strong>Live: www.miguelsmuller.dev.br</strong>
  </a></td>
 </tr>
</table>

- **Desenvolvimento:** O ambiente de desenvolvimento contém novas funcionalidades em teste. Quando ocorrem commits em branches que não sejam a principal (master), um ambiente de homologação é gerado automaticamente. Os links para esses ambientes de homologação são temporários e só estarão disponíveis após push na branch paralela.

<br/>

## :computer: **Requerimentos e Instalação**
Os requerimentos para execução local do projeto são simples.

É necessário ter o **[NodeJS](https://nodejs.org/)** e o **[NPM](https://www.npmjs.com/)** instalado em seu computador ou em uma máquina virtual.

`$ node --version && npm --version`

_Para referência foram no desenvolvimento NodeJS v22 e NPM v9_

Instale as **Dependências** do projeto com:
`$ npm install`

Execute o **Ambiente de Desenvolvimento** com o script NPM:
`$ npm run dev`

<br/>

## :gear: **Workflow**
**[WORKFLOW.md](./docs/WORKFLOW.md)** - Este projeto utiliza o padrão de fluxo de trabalho chamado `git flow`.

- [Atlassian - Comparando Fluxos de Trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow)
- [Diferenças entre Fluxos de Trabalho](https://www.zup.com.br/blog/git-workflow)
- [Gitflow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html)

<br/>

## :1st_place_medal: **Tests**
[Precisa ser implementado]

<br/>

## :rocket: **Deploy**
**[GITHUB ACTIONS](https://github.com/miguelsmuller/site-miguelsmuller/actions)** - Este projeto utiliza duas workflows do GitHub Actions para implantação:

- **Deploy to Live ([firebase-hosting-master.yml](./.github/workflows/firebase-hosting-master.yml)):** Esta workflow é acionada automaticamente em commits na branch principal (master) e é responsável por implantar a versão estável do site no ambiente de produção.
  - Você pode acompanhar o progresso dessa workflow [aqui](https://github.com/miguelsmuller/site-miguelsmuller/actions/workflows/firebase-hosting-master.yml).

- **Deploy to Preview ([firebase-hosting-channel.yml](./.github/workflows/firebase-hosting-channel.yml)):** Esta workflow é acionada automaticamente em commits em branches que não sejam a principal (master) e é responsável por criar um ambiente de pré-visualização (preview) para testar novas funcionalidades. Os links para esses ambientes de pré-visualização são gerados de forma aleatória e temporária.
  - Você pode acompanhar o progresso dessa workflow [aqui](https://github.com/miguelsmuller/site-miguelsmuller/actions/workflows/firebase-hosting-channel.yml).


### :fire: **Firebase Hosting + Web Frameworks**

Este projeto utiliza a integração oficial do Firebase Hosting com Next.js (`webframeworks`). O backend SSR é gerado automaticamente pelo Firebase durante o deploy do Hosting.

<br/>

## :hammer_and_wrench: **Contributing**
**[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Especificações de como a contribuição deve ser enviada

<br/>

## :memo: **Changelog**
**[CHANGELOG.md](./docs/CHANGELOG.md)** - Lista cronológica de alterações para cada versão do projeto

<br>

## :framed_picture: **Screenshot**
![Home](./docs/screenshot.jpeg)
