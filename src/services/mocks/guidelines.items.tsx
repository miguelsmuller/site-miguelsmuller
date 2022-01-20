export interface GuidelinesType {
  introduction: string
  mission: string
  vision: string
  values: string
}

export default function GuidelinesContent() {
  const content: GuidelinesType = {
    introduction:
      '<p>A <strong>DEVIM</strong> é agência full service digital de resultados que atende em todo o território nacional e tem sua sede localizada no interior do Rio de Janeiro, na cidade de Rio Claro. Surgimos ainda como uma ideia em 2013, e já no final de 2014 a <strong>DEVIM</strong> se tornou uma agência web atuante no mercado. O ano de 2015 está sendo dedicado a reforçar a nossa imagem e promover uma forte expansão para o mercado.</p>\
    <p>Apostamos na marca <strong>DEVIM</strong> como forte e única. Fortalecer a nossa identidade é fortalecer a empresa. Aumentamos o nosso grau de notoriedade e criamos uma conexão maior com os clientes. Agimos de forma consciente e audaciosa, assegurando a qualidade dos nossos produtos e das soluções desenvolvidas. Trabalhamos com a análise inicial do negócio, passando pelo planejamento do projeto digital, desenvolvimento de arquitetura, conteúdo e design, além de mídia e controle de dados. Atuamos em projetos web e aplicativos sociais e mobile.</p>',

    mission:
      'Criar e implementar soluções em desenvolvimento, comunicação e gerência digital de forma personalizada, oferecendo aos clientes diferencial competitivo.',
    vision:
      'Ser uma agencia digital reconhecida por excelência no desenvolvimento de projetos, criando soluções para as necessidades de nossos clientes.',
    values:
      'Foco em resultados, inovação, alto desempenho digital, responsabilidade social e comprometimento.'
  }

  return content
}
