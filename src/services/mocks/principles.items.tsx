export interface GuidelinesType {
  introduction: string
  mission: string
  vision: string
  values: string
}

export default function GuidelinesContent() {
  const content: GuidelinesType = {
    introduction:
      '<p>É difícil imaginarmos a vida sem uma série de facilidades que a tecnologia nos trouxe. Quando eu era criança já havia percebido que a tecnologia poderia ser usada para melhorar e facilitar a vida das pessoas.</p><p>É através do software criado por programadores que máquinas se tornam inteligentes e consequentemente úteis resolvendo problemas reais da sociedade.</p><p>Meu conceito de software vai além de operadores condicionais e lógicos e algoritmos. Software tem a ver com humanidade e simplicidade de maneira a ser um facilitador para o cumprimento de um requisito.</p>',

    mission:
      'Criar e implementar soluções em desenvolvimento, comunicação e gerência digital de forma personalizada, oferecendo aos clientes diferencial competitivo.',
    vision:
      'Ser uma agencia digital reconhecida por excelência no desenvolvimento de projetos, criando soluções para as necessidades de nossos clientes.',
    values:
      'Foco em resultados, inovação, alto desempenho digital, responsabilidade social e comprometimento.'
  }

  return content
}
