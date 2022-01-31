import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState(""); // Utilizado para emitir uma mensagem de erro
    const [loading, setLoading] = useState(false); // Utilizado para evitar que o usuário clique várias vezes no botão
    const [message, setMessage] = useState(""); 

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage("Por favor, cheque o seu email")
        } catch{
            setError("Este endereço de email não está cadastrado")
        }
        setLoading(false)
    }

    return( 
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">
                    Rescuperar Senha 
                </h2>
                {/*Adiciona Erro*/}
                {error && <Alert variant="danger"> {error} </Alert>}
                {/*Adiciona a mensagem de sucesso*/}
                {message && <Alert variant="success"> {message} </Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label className="mt-2"> Email </Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Entrar
                    </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/login"> 
                        Ir para Login
                    </Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Não possui cadastro? <Link to="/Signup">Cadastrar</Link>
        </div>
    </> 
    );
}
export default ForgotPassword;