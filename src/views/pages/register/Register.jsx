import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../api/api'
import axios from 'axios'
import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import CustomInput from '../../../components/CustomInput/CustomInput'
import { registerFormSchema } from '../../../schema'
import { Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (values) => {
    try {
      await axios.post(`${baseUrl}/auth/signup`, values)
      navigate('/login')
    } catch (error) {
      console.error('Registrtation Failed:', error.response.data.error)
      setError(error.response.data.error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={{
                    fullname: '',
                    password: '',
                    confirmPassword: '',
                    role: '',
                  }}
                  validationSchema={registerFormSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <h1>Register</h1>
                    <p className="text-body-secondary">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CustomInput placeholder="Full Name" type="text" name="fullname" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CustomInput type="password" placeholder="Password" name="password" />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CustomInput
                        type="password"
                        placeholder="Repeat password"
                        name="confirmPassword"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <Field as={CFormSelect} name="role">
                        <option>Select your role</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Viewer">Viewer</option>
                      </Field>
                    </CInputGroup>

                    {error && <CAlert color="danger">{error}</CAlert>}
                    <div className="d-grid">
                      <CButton color="success" type="submit">
                        Create Account
                      </CButton>
                    </div>
                    <p className="text-body-secondary text-center mt-3">
                      Already have an account?{' '}
                      <span>
                        <Link to="/login" className="px-0">
                          Login
                        </Link>
                      </span>{' '}
                      Now
                    </p>
                  </Form>
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
