import './Home.scss'
import { FC, useEffect } from 'react'
import CaseItem from './CaseItem/CaseItem'
import { fetchCases, ICasesData } from '../../redux/slices/casesSlice'
import { useSelector } from 'react-redux'
import loadingIcon from '../../assets/img/loading.svg'
import { RootState, useAppDispatch } from '../../redux/store'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { cases, loading } = useSelector((state: RootState) => state.cases)

  // загрузка кейсов
  useEffect(() => {
    if (cases.length === 0) {
      dispatch(fetchCases())
    }
  }, [dispatch, cases])

  return (
    <div className={'container container-transparent container-cases'}>
      <div className={'title'}>
        <h1>HOT OFFERS</h1>
        <h2>ЛУЧШИЕ КЕЙСЫ С БОЛЬШИМИ СКИДКАМИ</h2>
      </div>
      {loading ? <span className={'loading'}><img src={loadingIcon} alt="" /></span> : null}
      <div className={'cases'}>
        {cases && cases.map((item: ICasesData) => (
          <CaseItem imageUrl={item.imageUrl} title={item.title} price={item.price} key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Home