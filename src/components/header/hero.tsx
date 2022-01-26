import React, { useRef } from 'react'

import HeroLogo from '../graphics/hero-logo'
import HeroButton from '../graphics/hero-button'

import theme from '../../styles/theme'
import { State } from 'src/pages'

function Hero(props: any, ref: any) {
  const data: any = State()

  return (
    <div className="root" ref={ref}>
      <div className="container">
        <div className="logo">
          <HeroLogo />
        </div>

        <div className="text">
          <p className="display">{data?.pageHome.coverTitle}</p>
          <p className="lead">{data?.pageHome.coverTagLine}</p>
        </div>

        <div className="button">
          <a href="/">
            <HeroButton />
          </a>
        </div>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: center;

          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-color: ${theme.colors.darkBlue};
          background-image: url('/assets/hero-background.svg');

          border-top: 10px solid ${theme.colors.red};

          color: ${theme.colors.white};
        }

        .logo {
          text-align: center;
          padding: ${14 * 8}px 0px ${5 * 8}px;
        }

        .text {
          padding: ${6 * 8}px 0px ${6 * 8}px;
          text-align: center;
        }
        .text > .display {
          font-size: 36px;
          font-weight: ${theme.weight.bold};
          line-height: 36px;
          text-transform: uppercase;
          padding: 0px;
        }
        .text > .lead {
          font-size: 24px;
          font-weight: ${theme.weight.semiBold};
          line-height: 33px;
          opacity: 0.6;
          padding: 0px;
        }

        .button {
          text-align: center;
          padding: ${12 * 8}px 0px ${12 * 8}px;
          animation: wiggle 2s linear infinite;
        }

        @keyframes wiggle {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-30px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  )
}

export default React.forwardRef(Hero)
