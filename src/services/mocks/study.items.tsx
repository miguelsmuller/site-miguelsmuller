export interface StudyType {
  studyGroupName: string
  studyGroupReadMore: string
  studies: Array<{
    name: string
    local: string
  }>
}

export default function StudyContent() {
  const content: StudyType[] = [
    {
      studyGroupName: 'Acadêmica',
      studyGroupReadMore: 'Ver o Lattes »',
      studies: [
        {
          name: 'Superior em Sistemas da Computação',
          local: 'Universidade Federal Fluminense - UFF'
        },
        {
          name: 'Técnico em Informática',
          local: 'Escola Técnica Pandiá Calógeras - ETPC'
        }
      ]
    },
    {
      studyGroupName: 'Certificações',
      studyGroupReadMore: 'Ver todas as certificações »',
      studies: [
        {
          name: 'Mauris eget ante facilisis bibendum',
          local: 'Pellentesque gravida turpis dolor'
        },
        {
          name: 'Nam vel ipsum non risus euismod',
          local: 'Suspendisse non turpis elementum'
        }
      ]
    },
    {
      studyGroupName: 'Cursos',
      studyGroupReadMore: 'Ver todos os cursos »',
      studies: [
        {
          name: 'Programação em C# - Avançado',
          local: 'Fundação Bradesco'
        },
        {
          name: 'Práticas avançadas em projetos com ReactJS',
          local: 'Digital Innovation One'
        },
        {
          name: 'Desenvolvimento de aplicações com ReactJS',
          local: 'Digital Innovation One'
        }
      ]
    }
  ]

  return content
}
