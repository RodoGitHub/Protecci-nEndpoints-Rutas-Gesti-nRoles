import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import { Card } from "primereact/card"
import { Button } from "primereact/button"
        
const LoginForm = () =>{

    const {login} = useContext(AuthContext)

    const initialValuesUser = {
        email:'',
        password:''
    }

    const validationSchemaUser = Yup.object({
        email: Yup.string().email('Email invalido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido')
    }) 

    const onSubmitLogin = async (values) =>{
        await login(values)
    }

    return(
        <Card title='Iniciar sesion'>
            <Formik initialValues={initialValuesUser} validationSchema={validationSchemaUser} onSubmit={onSubmitLogin}>
            {({handleChange, values})=>(
                <Form>
                    <label>Email</label>
                    <InputText name='email' value={values.email} onChange={handleChange}/>
                    <span className="text-danger"> <ErrorMessage name='email' /> </span>
                    
                    <label>Contraseña</label> 
                    <Password name='password' value={values.password} onChange={handleChange}/>
                    <span className="text-danger"> <ErrorMessage name='password' /> </span>
                    
                    <Button label='Iniciar sesion' type='submit'/>

                </Form>
            )}
            </Formik>
        </Card>
    )

}

export default LoginForm