import React from 'react'
import './Home.scss'
import { useEffect } from 'react'
import CaseItem from './CaseItem/CaseItem'
import { fetchCases } from '../../redux/slices/casesSlice'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  const {cases} = useSelector((state) => state.cases)

  useEffect(() => {
    dispatch(fetchCases())
  }, [dispatch])

  return (
    <div className={'container container-transparent'}>
      <div className={'title'}>
        <h1>HOT OFFERS</h1>
        <h2>ЛУЧШИЕ КЕЙСЫ С БОЛЬШИМИ СКИДКАМИ</h2>
      </div>
      <div className={'cases'}>
        {cases && cases.map(item => (
          <CaseItem imageUrl={item.imageUrl} title={item.title} price={item.price} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Home