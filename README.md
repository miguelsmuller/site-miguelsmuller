# Miguel Müller — site pessoal

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

Em 2010, quando iniciei minhas atividades como desenvolvedor freelancer, fundei minha agência pessoal chamada 'Devim'. Atualmente, manter o nome Devim me distancia do meu crescimento profissional, pois não é mais meu objetivo manter uma agência pessoal ou prosseguir com o desenvolvimento freelancer. Agora, busco consolidar minha carreira de forma contínua em ambientes corporativos. A homepage apresenta perfil, especialidades, experiência, formação, artigos e projetos em uma interface editorial, responsiva e acessível.

Esse projeto tem 2 propósitos:
1.	Ser o repositório do meu site pessoal.
2.	Servir de laboratório de experiências.

O projeto ainda não está completo. E nunca vai estar. Assim como é a minha visão de software. Ele atende as necessidades do agora. Mais as necessidades do amanhã podem ser outras.

## Início rápido

Com Node.js 22 e npm instalados, execute:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`. O site funciona sem credenciais locais; nesse caso, apenas formação e projetos são exibidos como indisponíveis. Para carregar esse conteúdo, crie um arquivo `.env.local` com `HYGRAPH_URL` e `HYGRAPH_KEY`, conforme a seção [Gerenciamento de conteúdo](#gerenciamento-de-conteúdo).

## Visão geral

O projeto usa [Next.js](https://nextjs.org/), React e TypeScript. Ele separa o conteúdo da apresentação: dados estáveis ficam no repositório, enquanto formações, projetos, currículo e artigos vêm de fontes remotas.

```mermaid
flowchart LR
  Local[site-content.ts\nperfil, experiência e especialidades] --> Page[app/page.tsx\nServer Component]
  Hygraph[Hygraph\nformação, projetos e currículo] --> Page
  Hashnode[RSS do Hashnode\nartigos] --> Page
  Page --> Home[HomePage\nClient Component]
  Home --> UI[Navegação, tema, diálogos e listas]
```

`app/page.tsx` é renderizado dinamicamente a cada requisição. Ele busca Hashnode e Hygraph no servidor em paralelo e passa os dados normalizados para `HomePage`. O navegador não chama essas fontes de conteúdo diretamente.

## Arquitetura e responsabilidades

| Área | Local | Responsabilidade |
| --- | --- | --- |
| Página e composição | `app/page.tsx` | Busca os dados remotos, combina-os ao conteúdo local e define os metadados da página. |
| Conteúdo local | `app/data/site-content.ts` | Perfil, links, especialidades e experiências profissionais. |
| Conteúdo do Hygraph | `app/data/hygraph-content.ts` | Consulta e normaliza formação, cursos, certificações, projetos e URL do currículo. |
| Artigos | `app/data/hashnode-articles.ts` | Lê e normaliza o RSS público do Hashnode. |
| Interface | `app/components/home-page.tsx` e `app/components/home/` | Organiza as seções, navegação, diálogos, tema e comportamento responsivo. |
| Estilos | `app/components/home-page.module.css` e `app/globals.css` | Define o visual da homepage e os tokens globais de tema. |
| Descoberta | `app/layout.tsx`, `app/robots.ts` e `app/sitemap.ts` | Fornece metadados, Open Graph, Twitter Card, `robots.txt` e `sitemap.xml`. |

### Interface e acessibilidade

A homepage tem índice lateral em telas maiores e drawer de navegação em dispositivos móveis. A seção visível atual é indicada pelo `IntersectionObserver`; o tema é administrado por `next-themes` e respeita a preferência do sistema por padrão.

Os diálogos de contato e projeto usam portal, fecham com `Escape`, preservam o foco dentro da interface e devolvem o foco ao elemento que os abriu. Há também um atalho para pular diretamente ao conteúdo principal. As listas de artigos, cursos e projetos usam paginação progressiva sem remover o acesso a “ver todos”.

## Direção visual

A homepage segue uma estética editorial e textual, inspirada em HTML cru/browser default refinado. A intenção é parecer um documento web profissional, simples e direto, mas com acabamento de produto: bom espaçamento, hierarquia tipográfica clara, navegação acessível e interações discretas.

A interface evita padrões visuais de landing pages modernas, como heroes grandes, cards decorativos, gradientes, sombras fortes e imagens de destaque em artigos ou projetos. O refinamento visual deve vir principalmente de grid, tipografia, espaçamento, alinhamento, contraste e estados de interação.

### Princípios

- Priorizar leitura e escaneabilidade.
- Manter a estrutura próxima de um índice/documento técnico.
- Usar cores apenas com função semântica ou de navegação.
- Usar ícones pequenos e funcionais, sem excesso decorativo.
- Manter artigos e projetos sem imagens de destaque.
- Usar modais simples e acessíveis para contato e detalhes de projetos.
- Preservar consistência entre modo claro e modo escuro.

### Manutenção visual

Ao alterar a interface, evite introduzir componentes com aparência de template SaaS, cards decorativos, sombras fortes, gradientes ou animações chamativas.

Novas seções devem seguir o mesmo ritmo editorial da página atual: título claro, conteúdo textual, espaçamento consistente e separação por respiro visual. As seções principais não devem usar `border-top`; o separador horizontal deve permanecer restrito ao footer ou a divisões internas pontuais.

## Gerenciamento de conteúdo

| Conteúdo | Fonte | Como atualizar |
| --- | --- | --- |
| Perfil, redes, especialidades e experiência | `app/data/site-content.ts` | Edite os dados tipados nesse arquivo. |
| Formação, cursos, certificações, projetos e currículo | Hygraph, estágio `PUBLISHED` | Publique a alteração no Hygraph. A próxima requisição refletirá o conteúdo. |
| Artigos | `https://articles.miguelsmuller.dev.br/rss.xml` | Publique no Hashnode; o feed público é lido a cada requisição. |

O Hashnode não requer token ou variável de ambiente. Para o Hygraph, a aplicação precisa das variáveis abaixo:

```bash
# .env.local (não versionado)
HYGRAPH_URL=https://<seu-endpoint>.hygraph.com/v2/<projeto>/master
HYGRAPH_KEY=<token-de-leitura>
```

Nunca versione credenciais. Em GitHub Actions, `HYGRAPH_URL` e `HYGRAPH_KEY` devem existir como secrets do repositório.

Se o RSS estiver indisponível, a seção de artigos mostra uma mensagem temporária de indisponibilidade. Se o Hygraph não responder, apenas as seções de formação e projetos exibem esse estado; os dados locais e o restante da página continuam disponíveis.

## Configuração local

- Node.js 22
- npm

O procedimento de primeira execução está em [Início rápido](#início-rápido). Para desenvolver com formação e projetos, configure o Hygraph conforme [Gerenciamento de conteúdo](#gerenciamento-de-conteúdo).

Para validar a versão de produção localmente:

```bash
npm run build
npm run start
```

## Métricas e consentimento

O site usa a propriedade GA4 `miguelmuller-site`, com o fluxo Web `Site pessoal – produção` para `https://www.miguelsmuller.dev.br`. O ID de medição público fica em `app/lib/analytics.ts`.

No primeiro acesso, o visitante pode aceitar ou recusar o uso do Google Analytics. A escolha é salva somente no `localStorage` do navegador. A tag é inserida apenas após o aceite e somente em `www.miguelsmuller.dev.br`; ambientes locais e canais de preview não enviam dados à propriedade. O fluxo usa a Medição avançada padrão do GA4 para visualizações de página, rolagens, cliques de saída e demais eventos automáticos compatíveis.

Além dos eventos automáticos, o site registra os eventos personalizados abaixo. Os parâmetros são técnicos e não contêm dados pessoais.

| Evento | Quando ocorre | Parâmetros |
| --- | --- | --- |
| `section_view` | Uma seção passa a ser vista pela primeira vez na visita. | `section_name` |
| `contact_open` | A pessoa abre o diálogo de contato. | `contact_source` |
| `contact_link_click` | A pessoa seleciona um canal de contato ou currículo. | `contact_method`, `contact_source` |
| `project_view` | A pessoa abre os detalhes de um projeto. | `project_slug` |
| `project_link_click` | A pessoa segue um link dentro do diálogo do projeto. | `project_slug`, `project_link_label` |
| `article_click` | A pessoa abre um artigo. | `article_category` |
| `learning_filter` | A pessoa filtra cursos e certificações. | `learning_filter` |
| `content_list_action` | A pessoa expande ou recolhe uma lista. | `content_section`, `content_action` |

### Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o Next.js em desenvolvimento. |
| `npm run build` | Gera o build de produção em `nextjs/`. |
| `npm run start` | Inicia o build de produção. |
| `npm run lint` | Executa a checagem de lint configurada pelo Next.js. |
| `npm run test:e2e` | Executa os testes end-to-end com Playwright e axe. |
| `npm run serve` | Gera o build e inicia o emulador do Firebase Hosting. |
| `npm run deploy` | Publica no Firebase Hosting. |

## Testes

Os testes end-to-end ficam em `tests/e2e/professional-site.spec.ts`. Eles executam em Chromium e verificam, entre outros pontos:

- estrutura editorial e regras WCAG 2 A/AA com axe;
- diálogo de contato, foco e fechamento por `Escape`;
- filtros e paginação de formação, artigos e projetos;
- drawer de navegação em mobile e retorno ao topo.

Execute-os com:

```bash
npm run test:e2e
```

O Playwright inicia `npm run dev` automaticamente quando necessário. Os relatórios e resultados locais são ignorados pelo Git.

## Ambientes e deploy

- **Produção:** [www.miguelsmuller.dev.br](https://www.miguelsmuller.dev.br), atualizada por push na branch `master`.
- **Preview:** cada push em uma branch diferente de `master` cria um canal temporário do Firebase Hosting.

As workflows estão em `.github/workflows/`:

- `firebase-hosting-master.yml` instala as dependências, gera o build e publica a produção;
- `firebase-hosting-channel.yml` gera e publica o preview após a validação do build.

Ambas usam Node.js 22, secrets do Hygraph e a integração Firebase Hosting com Web Frameworks para hospedar o SSR do Next.js. O acompanhamento dos deploys está disponível em [GitHub Actions](https://github.com/miguelsmuller/site-miguelsmuller/actions).

## Documentos relacionados

- [Guia de contribuição](docs/CONTRIBUTING.md)
- [Workflow de Git](docs/WORKFLOW.md)
- [Changelog](docs/CHANGELOG.md)
