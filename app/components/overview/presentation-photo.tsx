import React from 'react'

import styles from './overview.module.css'

interface OverviewProps {
  coverImage: string;
}

export default function PresentationPhoto(props: OverviewProps) {
  return (
    <div className={`${styles.presentation_photo__container}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="325"
        height="325"
        viewBox="0 0 325 325"
        className={`${styles.classSVG}`}
      >
        <defs>
          <filter
            id="FundoAzul"
            width="396.462"
            height="415"
            x="-36"
            y="-45"
            filterUnits="userSpaceOnUse"
          >
            <feOffset></feOffset>
            <feGaussianBlur result="blur" stdDeviation="15"></feGaussianBlur>
            <feFlood floodColor="#2c3e50" floodOpacity="0.6"></feFlood>
            <feComposite in2="blur" operator="in"></feComposite>
            <feComposite in="SourceGraphic"></feComposite>
          </filter>
          <clipPath id="clip-POLIGONO">
            <path
              className={`${styles.Mask}`}
              fill="#2c3e50"
              d="M209.454 199.187l-81.556 46.9a31.036 31.036 0 01-31.03-.05l-81.4-47.177A31.036 31.036 0 010 171.963l.156-94.082a31.027 31.027 0 0115.562-26.845l81.556-46.9a31.036 31.036 0 0131.03.05l81.4 47.18a31.027 31.027 0 0115.471 26.9l-.156 94.081a31.027 31.027 0 01-15.565 26.84z"
              transform="rotate(14.98 32.269 245.81)"
            ></path>
          </clipPath>
          <clipPath id="clip-PRANCHETA">
            <path d="M0 0H325V325H0z"></path>
          </clipPath>
        </defs>
        <g clipPath="url(#clip-PRANCHETA)">
          <g transform="translate(-3 -1)">
            <g filter="url(#FundoAzul)" transform="translate(3 1)">
              <path
                data-name="FundoAzul"
                fill="#2c3e50"
                d="M227.6 215.648l-88.624 50.781a33.834 33.834 0 01-33.719-.054L16.812 215.3A33.578 33.578 0 010 186.174L.17 84.318a33.57 33.57 0 0116.91-29.064L105.7 4.473a33.833 33.833 0 0133.719.054l88.45 51.079a33.569 33.569 0 0116.812 29.122l-.17 101.856a33.569 33.569 0 01-16.911 29.064z"
                transform="matrix(.97 .26 -.26 .97 79.11 0)"
              ></path>
            </g>
            <path
              data-name="FundoBranco"
              fill="#fff"
              d="M217.85 207.3l-84.825 48.815a32.263 32.263 0 01-32.274-.052l-84.66-49.1A32.3 32.3 0 010 178.967l.163-97.913a32.3 32.3 0 0116.185-27.939L101.174 4.3a32.262 32.262 0 0132.274.052l84.659 49.1A32.3 32.3 0 01234.2 81.448l-.163 97.913A32.294 32.294 0 01217.85 207.3z"
              transform="rotate(14.98 15.597 328.138)"
            ></path>
          </g>
        </g>
      </svg>

      <img
        src={props.coverImage}
        className={`${styles.classIMG}`}
        width="249.452"
        height="251.069"
        alt=""
      />
    </div>
  )
}
