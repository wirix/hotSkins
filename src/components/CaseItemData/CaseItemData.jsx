import React, { useEffect, useState } from 'react'
import './CaseItemData.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCase } from '../../redux/slices/caseDataSlice'
import GetAuth from '../../utils/GetAuth'
import loadingIcon from '../../assets/img/loading.svg'
import CompletedSkin from './CompletedSkin/CompletedSkin'
import { updateBalanceUser, updateInventoryUser } from '../../firebase'
import Carousel from './Carousel/Carousel'
import ControlBtn from './ControlBtn/ControlBtn'

const CaseItemData = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const isAuth = GetAuth()
  const id = params.id

  let clientWidth = document.body.clientWidth
  const random = Math.random()

  const { caseData, loading } = useSelector((state) => state.caseData)
  const { balance, uid, luckyChance, inventory } = useSelector((state) => state.login)
  const [isCarousel, setIsCarousel] = useState(false);
  const [skinItem, setSkinItem] = useState(null)
  const [allowBuy, setAllowBuy] = useState(false)
  const [dropItem, setDropItem] = useState(false)
  const [dropPrice, setDropPrice] = useState(0)
  const [duringCarousel, setDuringCarousel] = useState(false)
  const [leaveSkin, setLeaveSkin] = useState(false)

  // загрузка подробностей кейса
  useEffect(() => {
    dispatch(fetchDataCase({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (balance - caseData.price >= 0) {
      setAllowBuy(true)
    } else {
      setAllowBuy(false)
    }
  }, [balance, caseData.price])

  // Расчитывание шанса на редкость айтема
  const randomRareItem = () => {
    const quantitySingleRareSkins = caseData.skins.length / 5 - 1
    const randomItem = Math.round(Math.random() * quantitySingleRareSkins)
    let randomPlusLucky = random - luckyChance
    if (randomPlusLucky <= 0.0026) {
      return 20 + randomItem
    } else if (0.0026 < randomPlusLucky && randomPlusLucky <= 0.009) {
      return 15 + randomItem
    } else if (0.009 < randomPlusLucky && randomPlusLucky <= 0.041) {
      return 10 + randomItem
    } else if (0.041 < randomPlusLucky && randomPlusLucky <= 0.2053) {
      return 5 + randomItem
    } else {
      return randomItem
    }
  }

  // Продаем айтем
  const sellItem = (price) => {
    updateBalanceUser(uid, Math.round(balance + price))
    setIsCarousel(false)
    setDropItem(false)
    setLeaveSkin(false)
  }

  const leaveSkinInProfile = (item) => {
    if (!inventory) {
      updateInventoryUser(uid, [item])
    } else {
      let arrayDataItems = [...inventory, item]
      updateInventoryUser(uid, arrayDataItems)
    }
    setLeaveSkin(false)
    setIsCarousel(false)
    setDropItem(false)
  }

  const openCase = () => {
    const item = randomRareItem()
    const indexSkinItems = caseData.skins[item].skinItems.length / 2 - 1
    let dataSkinData = caseData.skins[item]

    const setStatTrak = () => {
      if (Math.random() <= 0.1) {
        return indexSkinItems + 1
      } else {
        return 0
      }
    }

    let fullDataSkinData = dataSkinData.skinItems[Math.round(Math.random() * indexSkinItems) + setStatTrak()]

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

    setIsCarousel(true)
    updateBalanceUser(uid, balance - caseData.price)
    setSkinItem(skinItem)
    setDropPrice(skinItem.price)
    setDuringCarousel(true)
    setTimeout(() => {
      setLeaveSkin(true)
      setDropItem(true)
    }, 11700)
    setTimeout(() => {
      setDuringCarousel(false)
    }, 12000)
  }

  // Ставим троеточие для названия скина если ширина пользователя меньше 415px
  const adaptiveWord = (word, maxLength) => {
    if (String(word).length > maxLength && word) {
      return String(word).slice(0, maxLength) + '...'
    } else {
      return String(word)
    }
  }

  const listRandomSkinCarousel = () => {
    let fullObjSkins = []
    // массив случайных скинов
    for (let i = 0; i < caseData.skins.length * 2 - 2; i++) {
      let random = Math.random()
      let randomCaseData = caseData.skins[Math.round(random * (caseData.skins.length - 6))]
      let randomSkins = {
        skinTitle: randomCaseData.skinTitle,
        imageUrl: randomCaseData.skinItems[0].image,
        color: randomCaseData.color
      }

      if (i === 43) {
        fullObjSkins.push(skinItem)
      } else {
        fullObjSkins.push(randomSkins)
      }
    }

    return (
      <Carousel fullObjSkins={fullObjSkins} skinsLength={caseData.skins.length} /> 
    )
  }

  if (loading || caseData.length === 0) {
    return <img src={loadingIcon} className={'loading'} alt='' />
  }

  return (
    <div>
      <div className={'container container-transparent'}>
        <div className={'info'}>
          <h1>{caseData.title}</h1>
          {isCarousel && !dropItem && listRandomSkinCarousel()}
          {!isCarousel && <div className={'case-form'}><img src={caseData.imageUrl} alt='' /></div>}
          
          {isCarousel && <CompletedSkin skinItem={skinItem} />}
        </div>
        <ControlBtn
          isAuth={isAuth} 
          allowBuy={allowBuy} 
          duringCarousel={duringCarousel} 
          leaveSkin={leaveSkin} 
          openCase={openCase} 
          price={caseData.price}
          dropItem={dropItem}
          sellItem={sellItem}
          leaveSkinInProfile={leaveSkinInProfile}
          dropPrice={dropPrice}
          skinItem={skinItem} />
      </div>
      <div className={'container container-transparent container-black'}>
        <h2>Содержимое кейса</h2>
        <div className={'skins'}>
          {caseData &&
            caseData.skins.map(skin => (
              <div key={skin.skinId} className={`skin ${skin.color}`}>
                <img src={skin.skinItems[0].image} alt='' />
                <div className={'skin-title'}>
                  {clientWidth > 415 ? skin.skinTitle : adaptiveWord(skin.skinTitle, 14)}
                </div>
                <div className={'skin-type'}>{skin.type}</div>
              </div>
            ))}
        </div>
      </div>
    </div>

  )
}

export default CaseItemData