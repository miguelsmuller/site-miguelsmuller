import React from 'react'

import Title from '../title/title'

import style from './Testimonies.module.scss'

interface TestimoniesProps {
  state?: Record<string, any>;
}

export default function Testimonies(props: TestimoniesProps) {
  const data = props.state
  const testimonials = data?.testimonies || []

  return (
    <div className={`${style.testimonials__root} container`}>
      <Title text="O que falam de mim" />

      <div className={`${style.testimonials__carousel}`}>

        {testimonials.map((item: any, index: number) => {
          const company = item.company ? { __html: item.company } : { __html: '' }
          const content = item.text ? { __html: item.text } : { __html: '' }

          return (
            <div key={index} className={`${style.testimony}`}>
              <div className={`${style.testimony__author}`}>
                <h2>{item.author}</h2>
                <div dangerouslySetInnerHTML={company} />
              </div>

              <div className={`${style.testimony__content}`}>
                <div dangerouslySetInnerHTML={content} />
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
