import styled, { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.darkBlue};
    font-family: 'Open Sans', sans-serif;
    font-weight: ${props => props.theme.weight.semiBold};
    font-size: 16px;
  }

  a{
    display: inline-block;
  }

  p{
    padding-bottom: 15px;
    :last-child{
      padding-bottom: 0px;
    }
  }

  p+p{
    :last-child(){

    }
  }

  strong{
    font-weight: ${props => props.theme.weight.extraBold};
  }

  .shadow{
    box-shadow: 0px 16px 40px 50px rgba(202,202,202,0.2);
  }

  .color-darkBlue{
    color: ${props => props.theme.colors.darkBlue};
  }
  .color-red{
    color: ${props => props.theme.colors.red};
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding-left: ${3 * 8}px;
    padding-right: ${3 * 8}px;
  }

  // 640px BREAKPOINT
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }

  // 768px BREAKPOINT
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }

  // 1024px BREAKPOINT
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }

  // 1280px BREAKPOINT
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }

  // 1536px BREAKPOINT
  @media (min-width: 1536px) {
    .container {
      max-width: 1536px;
    }
  }
`
