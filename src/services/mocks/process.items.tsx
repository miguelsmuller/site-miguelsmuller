export interface ProcessType {
  imagine: string
  plan: string
  create: string
  follow: string
}

export default function ProcessContent() {
  const content: ProcessType = {
    imagine:
      '<p>Você identifica uma necessidade na sua empresa e logo muitas ideias surgem? Novos planos e metas pipocam na sua cabeça? Idealizar aonde você quer chegar é o pontapé inicial de todo o processo de desenvolvimento.</p><p>A DEVIM oferece o suporte necessário nesse momento. Definimos metas e, a partir dos nossos serviços, você pode obter melhores resultados para o seu negócio online.</p>',

    plan: '<p>Uma boa estratégia é a chave para o sucesso do negócio. Conhecer a estrutura da empresa, planejar ações coerentes e definir metas realísticas permite colher bons resultados ao final do processo.</p><p>Nessa fase são feitos estudos minuciosos sobre as necessidades e objetivos do seu projeto sempre buscando o retorno esperado e a satisfação do público alvo.</p>',

    create:
      '<p>É preocupação constante da DEVIM gerar um produto final com a alma do seu negócio. Encaramos a criação de um site como a pintura de um quadro: são únicos e personalizados.</p><p>É aqui que o negócio toma a forma do mundo digital. É a hora de traduzir todo o planejamento anterior e os dados obtidos em um sistema elegante e de alta performance.</p>',

    follow:
      '<p>Um acompanhamento posterior é um diferencial oferecido pela DEVIM. Avaliar o produto final nos permite compreender as métricas e fazer uma análise dos resultados reais, gerando estratégias ainda mais satisfatórias.</p><p>Podem aparecer novas ideias, possibilidades e necessidades. A DEVIM te acompanha e preza por dar continuidade ao ciclo de melhoria do seu projeto, com excelência e comprometimento.</p>'
  }

  return content
}
