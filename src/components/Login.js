import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState(""); // Utilizado para emitir uma mensagem de erro
    const [loading, setLoading] = useState(false); // Utilizado para evitar que o usuário clique várias vezes no botão e cadastre vários usuários
    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch{
            console.log(passwordRef.current.value)
            setError("Houve falha ao acessar a conta")
        }
        setLoading(false)
    }

    return( 
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">
                    Log In 
                </h2>
                {/*Adiciona Erro, caso algo dê errado*/}
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label className="mt-2"> Email </Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label className="mt-2"> Senha </Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Entrar
                    </Button>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Não possui cadastro? <Link to="/Signup">Cadastrar</Link>
        </div>
    </> 
    );
}
export default Login;