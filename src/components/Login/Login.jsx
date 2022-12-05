import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import '../Login/Login.scss'
import login from '../../assets/img/login.png'
import { registerWithEmailAndPassword } from '../../firebase'
import * as Yup from 'yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GetAuth from '../../utils/GetAuth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuth = GetAuth()

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(`Неверно указан email`).required('Поле обязательно!'),
    password: Yup.string().required('Поле обязательно!').min(8, 'Минимум 8 символов'),
    name: Yup.string().required('Поле обязательно!').min(5, 'Минимум 5 символов').max(15, 'Максимум 15 символов')
  });

  // отображает причину ошибки внизу
  const [reasonsError, setReasonsError] = useState('')

  useEffect(() => {
    if (location.pathname !== '/home' && isAuth) {
      navigate('/home')
    }
  }, [isAuth, navigate, location.pathname])

  return (
    <div className={'container-transparent align-center'}>
      <div className={'login'}>
        <div className={'img'}>
          <img src={login} alt="" />
        </div>
        <div className={'form'}>
          <h1>HotSkins</h1>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validateOnBlur
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              let response = await registerWithEmailAndPassword(values.name, values.email, values.password)
              if (response === 'auth/email-already-in-use') {
                setReasonsError(`Этот email уже используется`)
              }
            }}>
            {({ values, errors, handleChange, handleBlur, handleSubmit, isValid }) => (
              <form onSubmit={handleSubmit} className={'formik'}>
                <div className={'formik-item'}>
                  <input
                    type="text"
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    placeholder={'Имя'} />
                  {errors.name || isValid.name ? (
                    <div className={'error'}><i className="ri-error-warning-line"></i> {errors.name}</div>
                  ) : null}
                </div>

                <div className={'formik-item'}>
                  <input
                    type="text"
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    placeholder={'Ваш email'} />
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
                    placeholder={'Пароль'} />
                  {errors.password || isValid.password ? (
                    <div className={'error'}><i className="ri-error-warning-line"></i> {errors.password}</div>
                  ) : null}
                </div>

                {reasonsError &&
                  <div className={'reasons-error'}><i className="ri-error-warning-line"></i> {reasonsError} <Link className={'signin'} to='/signin'> Войти</Link></div>}

                <button className={`btn ${reasonsError && errors.password && 'btn-mb'}`} disabled={errors.email || errors.password || errors.name} onSubmit={handleSubmit}>Регистрация</button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login