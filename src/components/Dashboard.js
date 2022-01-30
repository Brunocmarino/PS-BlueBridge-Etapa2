import { updateCurrentUser } from '@firebase/auth';
import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts';
import { Link, useNavigate } from "react-router-dom"

const Dashboard = () => {

    const [error, setError] = useState(""); // Utilizado para emitir uma mensagem de erro
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate();

    async function handleLogout(){
        setError('')
        try{
            await logout()
            navigate("/login")
        } catch{
            setError('Erro ao sair')
        }

    }

    return(
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">
                    Perfil 
                </h2>
                {error && <Alert variant="danger"> {error} </Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                    Atualizar Perfil
                </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Sair</Button>
            </div>
        </>
    );
}
export default Dashboard;