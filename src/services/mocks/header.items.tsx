export interface HeaderType {
  logo: string
  itens: Array<{
    href: string
    text: string
  }>
}

export default function HeaderContent() {
  const content: HeaderType = {
    logo: '',
    itens: [
      {
        href: '#',
        text: 'Inicio'
      },
      {
        href: '#',
        text: 'Apresentação'
      },
      {
        href: '#',
        text: 'Serviços'
      },
      {
        href: '#',
        text: 'Portifólio'
      },
      {
        href: '#',
        text: 'Artigos'
      }
    ]
  }

  return content
}
