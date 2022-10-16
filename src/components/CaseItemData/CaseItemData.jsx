import React, { useEffect } from 'react'
import './CaseItemData.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCase } from '../../redux/slices/caseDataSlice'
import GetAuth from '../../utils/GetAuth'
import loadingIcon from '../../assets/img/loading.svg'

const CaseItemData = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = GetAuth()
  const id = params.id

  // загрузка подробностей кейса
  useEffect(() => {
    dispatch(fetchDataCase({id}))
  }, [dispatch, id])

  const { caseData, loading } = useSelector((state) => state.caseData)
  console.log(caseData)

  if (loading || caseData.length === 0) {
    return <img src={loadingIcon} className={'loading'} alt='' />
  }

  return (
    <div>
      <div className={'container container-transparent'}>
        <div className={'info'}>
          <h1>{caseData.title}</h1>
          <div><img src={caseData.imageUrl} alt='' /></div>
        </div>
        <div className={'open-btn'}>
          {isAuth ? <button className={'btn'}>Открыть за {caseData.price}₽</button> 
          : <Link className={'btn'} to='/signin'>Войти, чтобы открыть</Link>}
        </div>
      </div>
      <div className={'container container-transparent container-black'}>
        <h2>Содержимое кейса</h2>
        <div className={'skins'}>
          {caseData &&
          caseData.skins.map(skin => (
            <div key={skin.skinId} className={`skin ${skin.color}`}>
              <img src={skin.skinItems[0].image} alt='' />
              <div className={'skin-title'}>{skin.skinTitle}</div>
              <div className={'skin-type'}>{skin.type}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
    
  )
}

export default CaseItemData