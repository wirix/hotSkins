import { useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { IInventoryInner } from '../../../@types/interfaces'
import { setFilters } from '../../../redux/slices/filterSlice'
import './CategoriesRare.scss'

interface ICategoriesRareProps {
  inventory: [] | IInventoryInner[]
}

const CategoriesRare: FC<ICategoriesRareProps> = ({ inventory }) => {
  const dispatch = useDispatch()

  const [mysteryRare, setMysteryRare] = useState<boolean>(false)
  const [covertRare, setCovertRare] = useState<boolean>(false)
  const [classifiedRare, setClassifiedRare] = useState<boolean>(false)
  const [restrictedRare, setRestrictedRare] = useState<boolean>(false)
  const [milSpecGradeRare, setMilSpecGradeRare] = useState<boolean>(false)

  const [mysteryLength, setMysteryLength] = useState<number>(0)
  const [covertLength, setCovertLength] = useState<number>(0)
  const [classifiedLength, setClassifiedLength] = useState<number>(0)
  const [restrictedLength, setRestrictedLength] = useState<number>(0)
  const [milSpecGradeLength, setMilSpecGradeLength] = useState<number>(0)

  useEffect(() => {
    let filter = {
      mysteryRare,
      covertRare,
      classifiedRare,
      restrictedRare,
      milSpecGradeRare,
    }
    dispatch(setFilters(filter))
  }, [mysteryRare, covertRare, classifiedRare, restrictedRare, milSpecGradeRare, dispatch])

  useEffect(() => {
    let mysteryLength: number = 0
    let covertLength: number = 0
    let classifiedLength: number = 0
    let restrictedLength: number = 0
    let milSpecGradeLength: number = 0
    for (let i = 0; i < inventory.length; i++) {
      switch (inventory[i].color) {
        case 'Covert Mystery':
          mysteryLength += 1
          break
        case 'Covert':
          covertLength += 1
          break
        case 'Classified':
          classifiedLength += 1
          break
        case 'Restricted':
          restrictedLength += 1
          break
        case 'Mil-Spec-Grade':
          milSpecGradeLength += 1
          break
        default:
          console.error(`Нет подходящей редкости для ${inventory[i].color}`)
      }
    }
    setMysteryLength(mysteryLength)
    setCovertLength(covertLength)
    setClassifiedLength(classifiedLength)
    setRestrictedLength(restrictedLength)
    setMilSpecGradeLength(milSpecGradeLength)
  }, [inventory])

  return (
    <div className={'categories-rare'}>
      <span className={'rare-title'}>Редкость</span>
      <span className={'rare-item'}>
        <button
          className={`square square-mystery ${mysteryRare && 'square-mystery-active'}`}
          onClick={() => setMysteryRare(!mysteryRare)}>
          {mysteryRare && <i className={'ri-check-line'}></i>}
        </button>
        <span className={'number'}>{mysteryLength}</span>
      </span>
      <span className={'rare-item'}>
        <button
          className={`square square-covert ${covertRare && 'square-covert-active'}`}
          onClick={() => setCovertRare(!covertRare)}>
          {covertRare && <i className={'ri-check-line'}></i>}
        </button>
        <span className={'number'}>{covertLength}</span>
      </span>
      <span className={'rare-item'}>
        <button
          className={`square square-classified ${classifiedRare && 'square-classified-active'}`}
          onClick={() => setClassifiedRare(!classifiedRare)}>
          {classifiedRare && <i className={'ri-check-line'}></i>}
        </button>
        <span className={'number'}>{classifiedLength}</span>
      </span>
      <span className={'rare-item'}>
        <button
          className={`square square-restricted ${restrictedRare && 'square-restricted-active'}`}
          onClick={() => setRestrictedRare(!restrictedRare)}>
          {restrictedRare && <i className={'ri-check-line'}></i>}
        </button>
        <span className={'number'}>{restrictedLength}</span>
      </span>
      <span className={'rare-item'}>
        <button
          className={`square square-mil-spec-grade ${milSpecGradeRare && 'square-mil-spec-grade-active'}`}
          onClick={() => setMilSpecGradeRare(!milSpecGradeRare)}>
          {milSpecGradeRare && <i className={'ri-check-line'}></i>}
        </button>
        <span className={'number'}>{milSpecGradeLength}</span>
      </span>
    </div>
  )
}

export default CategoriesRare