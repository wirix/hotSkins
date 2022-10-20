import React, { useEffect, useState } from 'react'
import './CaseItemData.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCase } from '../../redux/slices/caseDataSlice'
import GetAuth from '../../utils/GetAuth'
import loadingIcon from '../../assets/img/loading.svg'
import CompletedSkin from './CompletedSkin/CompletedSkin'
import { writeUserData } from '../../firebase'

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
  const { balance, uid, username, email } = useSelector((state) => state.login)

  const [skinItem, setSkinItem] = useState(null)
  const [isVisibleImg, setIsVisibleImg] = useState(false)
  const [warning, setWarning] = useState(true)
  const [dropItem, setDropItem] = useState(false)
  const [dropPrice, setDropPrice] = useState(0)

  // Расчитывание шанса на редкость айтема
  const randomRareItem = () => {
    const random = Math.random()
    const randomItem = Math.round(Math.random() * 4)

    if (random <= 0.0026) {
      return 20 + randomItem
    } else if (0.0026 < random && random <= 0.009) {
      return 15 + randomItem
    } else if (0.009 < random && random <= 0.041) {
      return 10 + randomItem
    } else if (0.041 < random && random <= 0.2053) {
      return 5 + randomItem
    } else {
      return randomItem
    }
  }

  // Продаем айтем
  const sellItem = (price) => {
    let userUpdateData = {
      uid,
      username,
      email,
      balance: Math.round(balance + price)
    }
    writeUserData(userUpdateData)
    setDropItem(false)
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
    let userUpdatData = {
      uid,
      username,
      email,
      balance: balance - caseData.price
    }
    setIsVisibleImg(true)
    // Если баланс больше 0 то обновляем данные пользователя и показываем дроп иначе пополнить баланс
    if (balance - caseData.price >= 0) {
      writeUserData(userUpdatData)
      setSkinItem(skinItem)
      setDropPrice(skinItem.price)
      setDropItem(true)
    } else {
      setWarning(false)
    }
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
          {isAuth && warning && !dropItem && <button className={'btn'} onClick={openCase}>Открыть за {caseData.price}₽</button>}
          {isAuth && dropItem && <button className={'btn'} onClick={() => sellItem(dropPrice)}>Продать за {dropPrice}₽</button>}
          {!isAuth && <Link className={'btn'} to='/signin'>Войти, чтобы открыть</Link>}
          {!warning && <button className={'btn'}>Пополнить баланс</button>}
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