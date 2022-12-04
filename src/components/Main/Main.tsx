import { Link } from 'react-router-dom'
import './Main.scss'

const Main = () => {
  return (
    <main className={'main'}>
      <div className={'container container-transparent container-flex'}>
        <div className={'title'}>
          <p>Открывайте кейсы по&nbsp;самым лучшим ценам&nbsp;!</p>
        </div>
        <Link to={'/login'} className={'btn btn-big'}>Регистрация</Link>
      </div>
    </main>
  )
}

export default Main