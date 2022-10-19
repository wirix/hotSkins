import React, { useEffect, useState } from 'react'
import './CaseItemData.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCase } from '../../redux/slices/caseDataSlice'
import GetAuth from '../../utils/GetAuth'
import loadingIcon from '../../assets/img/loading.svg'
import CompletedSkin from './CompletedSkin/CompletedSkin'

const CaseItemData = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = GetAuth()
  const id = params.id

  // загрузка подробностей кейса
  useEffect(() => {
    dispatch(fetchDataCase({ id }))
  }, [dispatch, id])

  const { caseData, loading } = useSelector((state) => state.caseData)

  const [skinItem, setSkinItem] = useState(null)
  const [isVisibleImg, setIsVisibleImg] = useState(false)

  // Расчитывание шанса на айтем и какой редкости выпадет
  const randomRareItem = () => {
    const random = Math.random()
    const randomItem = Math.round(Math.random() * 4)

    if (random <= 0.0021) {
      return 20 + randomItem
    } else if (0.0021 < random && random <= 0.0085) {
      return 15 + randomItem
    } else if (0.0085 < random && random <= 0.0405) {
      return 10 + randomItem
    } else if (0.0405 < random && random <= 0.2003) {
      return 5 + randomItem
    } else {
      return randomItem
    }
  }

  const openCase = () => {
    // мб использовать let и перекинуть объектом все в databse firestore
    const item = randomRareItem()
    const indexSkinItems = caseData.skins[item].skinItems.length - 1

    let dataSkinData = caseData.skins[item]
    let fullDataSkinData = caseData.skins[item].skinItems[Math.round(Math.random() * indexSkinItems)]

    const skinItem = {
      skinId: dataSkinData.skinId,
      skinTitle: dataSkinData.skinTitle,
      type: dataSkinData.type,
      color: dataSkinData.color,
      imageUrl: fullDataSkinData.image,
      price: fullDataSkinData.price,
      StatTrak: fullDataSkinData.StatTrak,
      property: fullDataSkinData.property,
    }
    setIsVisibleImg(true)
    setSkinItem(skinItem)
  }

  if (loading || caseData.length === 0) {
    return <img src={loadingIcon} className={'loading'} alt='' />
  }

  return (
    <div>
      <div className={'container container-transparent'}>
        <div className={'info'}>
          <h1>{caseData.title}</h1>
          {/* при покупке закрывается див с имг и открывается карусель */}
          {
            !isVisibleImg
              ? <div className={'case-form'}><img src={caseData.imageUrl} alt='' /></div>
              : <CompletedSkin
                imageUrl={skinItem.imageUrl}
                skinTitle={skinItem.skinTitle}
                type={skinItem.type}
                color={skinItem.color}
                price={skinItem.price}
                StatTrak={skinItem.StatTrak}
                property={skinItem.property} />
          }

        </div>
        <div className={'open-btn'}>
          {isAuth ? <button className={'btn'} onClick={openCase}>Открыть за {caseData.price}₽</button>
            : <Link className={'btn'} to='/signin'>Войти,  чтобы открыть</Link>}
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