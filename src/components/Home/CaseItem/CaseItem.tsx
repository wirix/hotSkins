import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ICasesData } from '../../../redux/slices/casesSlice'
import './CaseItem.scss'

const CaseItem: FC<ICasesData> = ({ imageUrl, title, price, id }) => {
  const maxLength: number = 22

  return (
    <Link to={`/cases/${id}`} className={'case-container'}>
      <div className={'cases-item'}>
        <img src={imageUrl} alt="" />
        <div className={'subtitle'}>{title.slice(0, maxLength)}{title.length > 22 ? '...' : null}</div>
        <button className={'btn'}>{price}₽</button>
      </div>
    </Link>
  )
}

export default CaseItem