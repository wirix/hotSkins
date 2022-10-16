import React, { useEffect, useState } from 'react'
import './SignIn.scss'
import login from '../../assets/img/login.png'
import {Formik} from 'formik'
import { funSignInWithEmailAndPassword } from '../../firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import GetAuth from '../../utils/GetAuth'
import * as Yup from 'yup';

const SighIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = GetAuth()

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
    password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов')
  });
  
  // после входа перекидывает на главную
  useEffect(() => {
    if (location.pathname !== '/home' && isAuth) {
      navigate('/home')
    }
  }, [isAuth, navigate, location.pathname])

  const [reasonsError, setReasonsError] = useState('')

  return (
    <div className={'container-transparent align-center'}>
      <div className={'login'}>
        <div className={'img'}>
          <img src={login} alt="" />
        </div>
        <div className={'form'}>
          <h1>HotSkins</h1>
          <Formik
            initialValues={{email: '', password: '' }}
            validateOnBlur
            validationSchema={SignupSchema}
            onSubmit={ async (values) => {
              let response = funSignInWithEmailAndPassword(values.email, values.password)
              // ответ промисом
              response.then(e => {
                if (e === 'Firebase: Error (auth/user-not-found).') {
                  setReasonsError('Такого пользователя не существует')
                }
              })
            }}>
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
              <form onSubmit={handleSubmit} className={'formik'}>
                
                <div className={'formik-item'}>
                  <input 
                  type="text" 
                  name='email' 
                  onChange={handleChange} 
                  value={values.email} 
                  onBlur={handleBlur}
                  placeholder={'Ваш email'}/>
                  {errors.email || isValid.email ? (
                    <div className={'error'}><i className="ri-error-warning-line"></i> {errors.email}</div>
                  ) : null}
                </div>
                
                <div className={'formik-item'}>
                  <input 
                    type="password" 
                    name='password' 
                    onChange={handleChange} 
                    value={values.password} 
                    onBlur={handleBlur}
                    placeholder={'Пароль'}/>
                  {errors.password || isValid.password ? (
                    <div className={`error ${reasonsError && 'error-mb'}`}><i className="ri-error-warning-line"></i> {errors.password}</div>
                  ) : null}
                </div>
                
                {reasonsError && 
                <div className={'error'}><i className="ri-error-warning-line"></i> {reasonsError}</div>}

                <button className={`btn ${reasonsError && errors.password && 'btn-mb'}`} disabled={errors.email || errors.password} onSubmit={handleSubmit}>Войти</button>

              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SighIn