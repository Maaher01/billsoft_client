import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Formik } from 'formik'
import CustomInput from '../../../components/CustomInput/CustomInput'
import AuthContext from '../../../context/AuthContext'
import { baseUrl } from '../../../api/api'
import { loginFormSchema } from '../../../schema'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, values)
      const { token } = response.data
      login(token)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error.response.data.message)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{
                      fullname: '',
                      password: '',
                    }}
                    validationSchema={loginFormSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CustomInput type="text" placeholder="Full Name" name="fullname" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CustomInput type="password" name="password" placeholder="Password" />
                      </CInputGroup>
                      {error && <CAlert color="danger">{error}</CAlert>}
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" type="submit">
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </Form>
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Don't have an account?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
