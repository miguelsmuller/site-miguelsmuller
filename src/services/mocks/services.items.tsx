export interface ServiceType {
  introduction: string
  services: Array<{
    label: string
    icon: string
  }>
}

export default function ServiceContent() {
  const content: ServiceType = {
    introduction:
      '<p>Sou <strong>Desenvolvedor Full-Stack</strong>, ou seja, sou o profissional programador que transita entre <em>desenvolvimento back-end</em> e <em>desenvolvimento front-end</em>, possuindo habilidades em Análise, Modelagem, Arquitetura, compreendendo assim todo o ciclo da <em>Cultura Dev-Ops</em>.</p><p>Possuo conhecimento em tecnologias como Javascript & Node, Python e PHP além de familiaridade em outras linguagens de programação do mercado, bem como conhecimento em Banco de Dados, Estrutura de Dados e Engenharia e Arquitetura de software.</p><p>Meu objetivo é colaborar com times ágeis e multidisciplinares no projeto, codificação e manutenção de aplicações consistentes e escaláveis através de códigos cada vez melhores, contribuindo para atender rigorosos padrões de qualidade.</p>',

    services: [
      {
        label: 'Programação nas principais linguagens do mercado',
        icon: 'IconConsultancy.svg'
      },
      {
        label: 'Engenharia de Software e Análise de Sistemas',
        icon: 'IconCriation.svg'
      },
      {
        label: 'Banco de Dados SQL e NO-SQL',
        icon: 'IconMarketing.svg'
      },
      {
        label: 'Infraestrutura, Virtualização e Versionamento',
        icon: 'IconOptimization.svg'
      }
    ]
  }

  return content
}
