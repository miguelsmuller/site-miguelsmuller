export interface PresentationType {
  image: string
  text: string
}

export default function PresentationContent() {
  const content: PresentationType = {
    image: '',
    text: '<p>Sou <strong>Miguel Müller</strong>, Flamenguista do interior do Rio de Janeiro, mais especificamente de Rio Claro, filho mais velho de pais comerciantes e já na infância tive a oportunidade de acompanhar e contribuir no tradicional negócio da família.</p><p>Aos 14 anos eu e meu irmão ganhamos nosso primeiro computador - um AMD K6 2 de meros 500Mhz – que tinha como objetivo ajudar nos estudos, pesquisas e trabalhos escolares. Em meados da década de 2000, enquanto a maioria dos meus amigos se divertia no boom da internet com mensageiros e blogs eu estava definitivamente apaixonado por aprender programação com intuíto de criar um sistema para ajudar a gerenciar o negócio da família.</p><p>Assembly, C, Clipper, Pascal, Visual FoxPro.... Bits, Bits e mais Bits.... Zeros e Uns.... O interesse era contínuo em querer entender como todas essas engrenagens da tecnologia conseguiam funcionar juntas, em uma sincronia perfeita, comparável a uma grande orquestra sob a regência do maestro executando uma belíssima sinfonia.</p><p>Sempre com desejo de criar um código melhor, nunca deixei de estudar e acompanhar o mercado. Sou Técnico de Informática com ênfase em Desenvolvimento, estou no último ano da Graduação em Sistemas da Computação pela Universidade Federal Fluminense - UFF, e já estou de olho nos cursos de extensão e especialização em Engenharia de Software e Engenharia de Dados.</p><p>Hoje temos uma vasta lista de nomenclaturas e posições, mas na essência do ofício somos eternos estudantes, compondo sinfonias e regendo essa orquestra já faz parte do nosso dia a dia.</p>'
  }
  return content
}
