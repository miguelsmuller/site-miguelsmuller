export interface PresentationType {
  image: string
  text: string
}

export default function PresentationContent() {
  const content: PresentationType = {
    image: '',
    text: '<p>A <strong>DEVIM</strong> oferece a você soluções digitais. <span className="color-red">Pensamos</span>, <span className="color-red">planejamos</span> e <span className="color-red">desenvolvemos</span> o potencial da sua empresa na internet, para que você possa focar na administração física do seu negócio.</p>\
  <p>Utilizando as mais modernas ferramentas web, em sintonia com a necessidade da sua empresa, construímos uma imagem digital de forma inteligente e eficiente. Colocamos a ideia que você traz do empreendimento em prática, construindo um produto de verdadeira personalidade.</p>\
  <p>Somos uma agência digital com portfólio variado: atuamos em ações específicas e também oferecemos assessoria digital. Queremos te ajudar a conseguir resultados.</p>\
  <p>Você cria coisas incríveis quando escolhe uma equipe completa!</p>'
  }
  return content
}
