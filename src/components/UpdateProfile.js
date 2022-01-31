import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import { Link, useNavigate } from "react-router-dom"

const UpdateProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState(""); // Utilizado para emitir uma mensagem de erro
    const [loading, setLoading] = useState(false); // Utilizado para evitar que o usuário clique várias vezes no botão 
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        //Validações antes de atualizar o perfil
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            // Os campos de senha são idênticos
            return setError('As senha e a confirmação de senha são diferentes')
        }
        const promises = []
        setLoading(true)
        setError("")
        if(emailRef.current.value !== currentUser.email){
            // O Email foi modificado
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            // A senha foi modificada
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() =>{
            setLoading(true)
            navigate("/")
        }).catch(() => {
            setLoading(true)
            setError("Houve falha ao atualizar os dados da conta")
            })        
    }

    return( 
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">
                    Atualizar Perfil 
                </h2>
                {/*Adiciona Erro, caso algo dê errado*/}
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label className="mt-2"> Email </Form.Label>
                        <Form.Control type="email" ref={emailRef}required 
                                      defaultValue={currentUser.email}/>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label className="mt-2"> Senha </Form.Label>
                        <Form.Control type="password" ref={passwordRef} 
                                      placeholder="Deixe em branco para manter a atual"/>
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label className="mt-2"> Confirmação de Senha </Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef}  
                                      placeholder="Deixe em branco para manter a atual"/>
                    </Form.Group>

                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Atualizar
                    </Button>

                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/"> Cancelar </Link>
        </div>
    </> 
    );
}
export default UpdateProfile;