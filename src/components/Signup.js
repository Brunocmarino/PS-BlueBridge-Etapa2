import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState(""); // Utilizado para emitir uma mensagem de erro
    const [loading, setLoading] = useState(false); // Utilizado para evitar que o usuário clique várias vezes no botão e cadastre vários usuários

    async function handleSubmit(e){
        e.preventDefault()
        //Validações antes de fazer o cadastro
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('As senha e a confirmação de senha são diferentes')
        }

        try{
            setError("")
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch{
            setError("Houve falha ao cadastrar uma conta")
        }
        setLoading(false)
    }

    return( 
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">
                    Cadastro 
                </h2>
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type="email" ref={emailRef}required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label> Senha </Form.Label>
                        <Form.Control type="password" ref={passwordRef}required />
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label> Confirmação de Senha </Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef}required />
                    </Form.Group>

                    <Button disabled={loading} className="w-100" type="submit">
                        Cadastrar
                    </Button>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? Log In
        </div>
    </> 
    );
}
export default Signup;