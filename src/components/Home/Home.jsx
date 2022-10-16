import React from 'react'
import './Home.scss'
import { useEffect } from 'react'
import CaseItem from './CaseItem/CaseItem'
import { fetchCases } from '../../redux/slices/casesSlice'
import { useDispatch, useSelector } from 'react-redux'
import loadingIcon from '../../assets/img/loading.svg'
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch()
  const { cases, loading } = useSelector((state) => state.cases)

  const fetchDataCase = async () => {
    let response = await axios.get(`https://634a618a5df952851410556e.mockapi.io/cases?id=2`)
    console.log(response.data)
  }

  // загрузка кейсов
  useEffect(() => {
    if (cases.length === 0) {
      dispatch(fetchCases())
    }
    fetchDataCase()
  }, [dispatch, cases])

 

  return (
    <div className={'container container-transparent container-cases'}>
      <div className={'title'}>
        <h1>HOT OFFERS</h1>
        <h2>ЛУЧШИЕ КЕЙСЫ С БОЛЬШИМИ СКИДКАМИ</h2>
      </div>
      {loading ? <span className={'loading'}><img src={loadingIcon} alt="" /></span> : null}
      <div className={'cases'}>
        {cases && cases.map(item => (
          <CaseItem imageUrl={item.imageUrl} title={item.title} price={item.price} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Home