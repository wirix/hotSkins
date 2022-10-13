import React from 'react'
import { Formik } from 'formik'
import '../SignIn/SignIn.scss'
import login from '../../assets/img/login.png'
import { registerWithEmailAndPassword } from '../../firebase'

const Login = () => {
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
            onSubmit={(values) => {
              registerWithEmailAndPassword(values.name, values.email, values.password)
            }}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
              <form onSubmit={handleSubmit} className={'formik'}>
                <input
                  type="text"
                  name='name'
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                  placeholder={'Имя'} />
                <input
                  type="text"
                  name='email'
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  placeholder={'Ваш email'} />
                <input
                  type="password"
                  name='password'
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  placeholder={'Пароль'} />
                <button className={'btn'} onSubmit={handleSubmit}>Регистарция</button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Login