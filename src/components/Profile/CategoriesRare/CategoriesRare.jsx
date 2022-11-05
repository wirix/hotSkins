import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../../redux/slices/filterSlice'
import './CategoriesRare.scss'

const CategoriesRare = ({ inventory }) => {
  const dispatch = useDispatch()

  const [mysteryRare, setMysteryRare] = useState(false)
  const [covertRare, setCovertRare] = useState(false)
  const [classifiedRare, setClassifiedRare] = useState(false)
  const [restrictedRare, setRestrictedRare] = useState(false)
  const [milSpecGradeRare, setMilSpecGradeRare] = useState(false)

  const [mysteryLength, setMysteryLength] = useState(0)
  const [covertLength, setCovertLength] = useState(0)
  const [classifiedLength, setClassifiedLength] = useState(0)
  const [restrictedLength, setRestrictedLength] = useState(0)
  const [milSpecGradeLength, setMilSpecGradeLength] = useState(0)

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
    let mysteryLength = 0
    let covertLength = 0
    let classifiedLength = 0
    let restrictedLength = 0
    let milSpecGradeLength = 0
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