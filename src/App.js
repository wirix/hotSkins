import './App.scss';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';

const App = () => {
  return (
    <div className={'app'}>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}

export default App