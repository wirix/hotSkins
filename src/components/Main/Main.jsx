import React from 'react'
import './Main.scss'

const Main = () => {
  return (
    <main className={'main'}>
      <div className={'container container-transparent container-flex'}>
        <div className={'title'}>
          <p>Открывайте кейсы по&nbsp;самым лучшим ценам</p>
        </div>
        <button className={'btn btn-big'}>Регистрация</button>
      </div>
    </main>
  )
}

export default Main