export interface HeaderType {
  logo: string
  itens: Array<{
    target: string
    href: string
    text: string
  }>
}

export default function HeaderContent() {
  const content: HeaderType = {
    logo: '',
    itens: [
      {
        target: '_self',
        href: '#',
        text: 'Apresentação'
      },
      {
        target: '_self',
        href: '#',
        text: 'Serviços'
      },
      {
        target: '_blank',
        href: 'https://github.com/miguelsmuller',
        text: 'Github'
      },
      {
        target: '_blank',
        href: 'https://www.linkedin.com/in/miguelsmuller/',
        text: 'Linkedin'
      },
      {
        target: '_blank',
        href: 'https://1drv.ms/b/s!AgCzmShiilsriJ0RcqWjuqzF0Pxo4A?e=fkn4XY',
        text: 'Meu Currículo'
      }
    ]
  }

  return content
}
