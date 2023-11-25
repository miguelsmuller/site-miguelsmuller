import React from 'react'

export default function HeaderButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <defs>
        <clipPath>
          <path d="M0 0h48v48H0z"></path>
        </clipPath>
      </defs>

      <rect width="48" height="48" fill="#2c3e50" rx="8"></rect>
      <path
        fill="#fff"
        d="M11 16.5h26a1 1 0 001-1V13a1 1 0 00-1-1H11a1 1 0 00-1 1v2.5a1 1 0 001 1zm0 10h26a1 1 0 001-1V23a1 1 0 00-1-1H11a1 1 0 00-1 1v2.5a1 1 0 001 1zm0 10h26a1 1 0 001-1V33a1 1 0 00-1-1H11a1 1 0 00-1 1v2.5a1 1 0 001 1z"
      ></path>
    </svg>
  )
}
