import './App.scss';
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className={'app'}>
      <div className={'container'}>
        <header className={'header'}>
          <Link to='' className={'logo'}><span>Hot</span><span>Skins</span></Link>
          <div className={'info'}>
            <Link to='/help'>Помощь</Link>
            <Link to='/contacts'>Контакты</Link>
          </div>
          <button className={'btn'}>Войти</button>
        </header>
      </div>
    </div>
  )
}

export default App