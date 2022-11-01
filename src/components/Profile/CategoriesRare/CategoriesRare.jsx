import React from 'react'
import './CategoriesRare.scss'

const CategoriesRare = () => {
  return (
    <div className={'categories-rare'}>
      <span className={'rare-title'}>Редкость</span>
      <span className={'rare-item'}>
        <button className={'square square-mystery'} >square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-covert'} >square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-classified'} >square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-restricted'} >square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-mil-spec-grade'} >square</button>
        <span className={'number'}>0</span>
      </span>
    </div>
  )
}

export default CategoriesRare