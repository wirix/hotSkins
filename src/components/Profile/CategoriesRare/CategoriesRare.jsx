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
    for (let i = 0; i < inventory.length; i++) {
      debugger
      if (inventory[i].color === 'Covert Mystery') {
        debugger
        setMysteryLength(mysteryLength + 1)
      }
    }
  }, [inventory])
  // mysteryRare: 'Covert Mystery',
  //   covertRare: 'Covert',
  //     classifiedRare: 'Classified',
  //       restrictedRare: 'Restricted',
  //         milSpecGradeRare: 'Mil-Spec-Grade',
  return (
    <div className={'categories-rare'}>
      <span className={'rare-title'}>Редкость</span>
      <span className={'rare-item'}>
        <button className={`square square-mystery ${mysteryRare && 'square-mystery-active'}`} onClick={() => setMysteryRare(!mysteryRare)}>square</button>
        <span className={'number'}>{mysteryLength}</span>
      </span>
      <span className={'rare-item'}>
        <button className={`square square-covert ${covertRare && 'square-covert-active'}`} onClick={() => setCovertRare(!covertRare)}>square</button>
        <span className={'number'}>{covertLength}</span>
      </span>
      <span className={'rare-item'}>
        <button className={`square square-classified ${classifiedRare && 'square-classified-active'}`} onClick={() => setClassifiedRare(!classifiedRare)}>square</button>
        <span className={'number'}>{classifiedLength}</span>
      </span>
      <span className={'rare-item'}>
        <button className={`square square-restricted ${restrictedRare && 'square-restricted-active'}`} onClick={() => setRestrictedRare(!restrictedRare)}>square</button>
        <span className={'number'}>{restrictedLength}</span>
      </span>
      <span className={'rare-item'}>
        <button className={`square square-mil-spec-grade ${milSpecGradeRare && 'square-mil-spec-grade-active'}`} onClick={() => setMilSpecGradeRare(!milSpecGradeRare)}>square</button>
        <span className={'number'}>{milSpecGradeLength}</span>
      </span>
    </div>
  )
}

export default CategoriesRare