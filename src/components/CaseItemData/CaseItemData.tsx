import { useEffect, useState, FC, memo } from 'react'
import './CaseItemData.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchDataCase, ISkin, ISkinItems } from '../../redux/slices/caseDataSlice'
import GetAuth from '../../utils/GetAuth'
import loadingIcon from '../../assets/img/loading.svg'
import CompletedSkin from './CompletedSkin/CompletedSkin'
import { updateBalanceUser, updateInventoryUser } from '../../firebase'
import Carousel from './Carousel/Carousel'
import ControlBtn from './ControlBtn/ControlBtn'
import { RootState, useAppDispatch } from '../../redux/store'
import { IInventoryInner } from '../../@types/interfaces'

export interface IRandomSkins {
  color: string,
  imageUrl: string,
  skinTitle: string
}

const CaseItemData: FC = memo(() => {
  const params = useParams()
  const id: string = params.id
  const dispatch = useAppDispatch()
  const isAuth = GetAuth()

  let clientWidth: number = document.body.clientWidth
  const random: number = Math.random()

  const { caseData, loading } = useSelector((state: RootState) => state.caseData)
  const { balance, uid, luckyChance, inventory } = useSelector((state: RootState) => state.login)
  const [isCarousel, setIsCarousel] = useState<boolean>(false);
  const [skinItem, setSkinItem] = useState<null | IInventoryInner>(null)
  const [allowBuy, setAllowBuy] = useState<boolean>(false)
  const [dropItem, setDropItem] = useState<boolean>(false)
  const [dropPrice, setDropPrice] = useState<number>(0)
  const [duringCarousel, setDuringCarousel] = useState<boolean>(false)
  const [leaveSkin, setLeaveSkin] = useState<boolean>(false)
  // загрузка подробностей кейса
  useEffect(() => {
    dispatch(fetchDataCase({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (!Array.isArray(caseData)) {
      if (balance - caseData.price >= 0) {
        setAllowBuy(true)
      } else {
        setAllowBuy(false)
      }
    }
  }, [balance, caseData])

  // Расчитывание шанса на редкость айтема
  const randomRareItem = (): number => {
    let quantitySingleRareSkins: number = 0
    if (!Array.isArray(caseData)) {
      quantitySingleRareSkins = caseData.skins.length / 5 - 1
    }
    const randomItem: number = Math.round(Math.random() * quantitySingleRareSkins)
    let randomPlusLucky: number = random - luckyChance
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
  const sellItem = (price: number): void => {
    setIsCarousel(false)
    setDropItem(false)
    setLeaveSkin(false)
    let arr: IInventoryInner[] = inventory.filter((_, i) => i !== inventory.length - 1)
    updateInventoryUser(uid, arr)
    updateBalanceUser(uid, balance + price)
  }

  const updateInvetory = (item: IInventoryInner): void => {
    if (!inventory) {
      updateInventoryUser(uid, [item])
    } else {
      let arrayDataItems = [...inventory, item]
      updateInventoryUser(uid, arrayDataItems)
    }
  }

  const leaveSkinInProfile = (): void => {
    setLeaveSkin(false)
    setIsCarousel(false)
    setDropItem(false)
  }

  const openCase = (): void => {
    const item: number = randomRareItem()
    let indexSkinItems: number = 0
    let dataSkinData: ISkin
    if (!Array.isArray(caseData)) {
      indexSkinItems = caseData.skins[item].skinItems.length / 2 - 1
      dataSkinData = caseData.skins[item]
    }

    const setStatTrak = (): number => {
      if (Math.random() <= 0.1) {
        return indexSkinItems + 1
      } else {
        return 0
      }
    }

    let fullDataSkinData: ISkinItems = dataSkinData.skinItems[Math.round(Math.random() * indexSkinItems) + setStatTrak()]

    const skinItem: IInventoryInner = {
      skinId: dataSkinData.skinId,
      skinTitle: dataSkinData.skinTitle,
      type: dataSkinData.type,
      color: dataSkinData.color,
      imageUrl: fullDataSkinData.image,
      price: fullDataSkinData.price,
      StatTrak: fullDataSkinData.StatTrak,
      property: fullDataSkinData.property,
    }
    updateInvetory(skinItem)
    setIsCarousel(true)
    if (!Array.isArray(caseData)) {
      updateBalanceUser(uid, balance - caseData.price)
    }
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
  const adaptiveWord = (word: string, maxLength: number): string => {
    if (word.length > maxLength && word) {
      return word.slice(0, maxLength) + '...'
    } else {
      return word
    }
  }

  const listRandomSkinCarousel = () => {
    let fullObjSkins: (IInventoryInner | IRandomSkins)[] = []
    // массив случайных скинов
    if (!Array.isArray(caseData)) {
      for (let i = 0; i < caseData.skins.length * 2 - 2; i++) {
        let random: number = Math.random()
        let randomCaseData: ISkin = caseData.skins[Math.round(random * (caseData.skins.length - 6))]
        let randomSkins: IRandomSkins = {
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
    }

    return (
      <Carousel fullObjSkins={fullObjSkins} skinsLength={!Array.isArray(caseData) && caseData.skins.length} />
    )
  }

  if (loading || Array.isArray(caseData)) {
    return <img src={loadingIcon} className={'loading'} alt='' />
  }

  return (
    <>
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
          dropPrice={dropPrice} />
      </div>
      <div className={'container container-transparent container-black'}>
        <h2>Содержимое кейса</h2>
        <div className={'skins'}>
          {caseData &&
            caseData.skins.map((skin: ISkin) => (
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
    </>
  )
})

export default CaseItemData