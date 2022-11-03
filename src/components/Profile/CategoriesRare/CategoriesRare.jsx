import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../../redux/slices/filterSlice'
import './CategoriesRare.scss'

const CategoriesRare = () => {
  const dispatch = useDispatch()

  const [mysteryRare, setMysteryRare] = useState(false)
  const [covertRare, setCovertRare] = useState(false)
  const [classifiedRare, setClassifiedRare] = useState(false)
  const [restrictedRare, setRestrictedRare] = useState(false)
  const [milSpecGradeRare, setMilSpecGradeRare] = useState(false)

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


  return (
    <div className={'categories-rare'}>
      <span className={'rare-title'}>Редкость</span>
      <span className={'rare-item'}>
        <button className={'square square-mystery'} onClick={() => setMysteryRare(!mysteryRare)}>square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-covert'} onClick={() => setCovertRare(!covertRare)}>square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-classified'} onClick={() => setClassifiedRare(!classifiedRare)}>square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-restricted'} onClick={() => setRestrictedRare(!restrictedRare)}>square</button>
        <span className={'number'}>0</span>
      </span>
      <span className={'rare-item'}>
        <button className={'square square-mil-spec-grade'} onClick={() => setMilSpecGradeRare(!milSpecGradeRare)}>square</button>
        <span className={'number'}>0</span>
      </span>
    </div>
  )
}

export default CategoriesRare