import './Contacts.scss'
import imgContact from '../../assets/img/imgContact.jpg'

const Contacts = () => {
  return (
    <div className={"container container-transparent"}>
      <div className={'contacts'}>
        <div>Делали:</div>
        <div className={'fffff'}>
          <img src={imgContact} alt="" />
          <div className={'username'}>Я</div>
          <div className={'link'}>Telegram: @offnik228420</div>
        </div>
      </div>
    </div>
  )
}

export default Contacts