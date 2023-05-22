import React, {useContext, useEffect, useState} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom';
import {AppContext} from "./context/appcontext";
import { Text,Input, Button, ButtonGroup} from '@chakra-ui/react'
import './App.css';



export default function Login2() {

    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const [user, setUser] = useState({
            username: '',
            password: ''
        }
    );

    const [errorMessage, setErrorMessage] = useState('');


    const showError = (message) => {
        setErrorMessage(message);
    }

    useEffect(() => {

        if (appContext.currentUser) {
            console.log(appContext.currentUser)
            navigate('/home')
        }

    }, [appContext.currentUser])

    const onSubmit = async e => {
        e.preventDefault();
        //verifications
        if (user.username === '' || user.password === '') {
            showError('Veuillez remplir tous les champs')
            //localStorage.setItem('token', JSON.stringify(user))

            return
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(user)
        };
        const response = await fetch(`http://localhost:3001/signin?username=${user.username}&password=${user.password}`, requestOptions);

        const data = await response.json();


        console.log(data)

        //verifier si le user existe
        if (data) {
            appContext.setCurrentUser(data)
            appContext.user.loggedIn = true;
            navigate('/tarifs')
        }else {
            showError('Utilisateur ou mot de passe incorrect')

        }
    }












        return (

            <div className="container_login">
                <body className="body_login">



                <form className="login" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">

                        <Text fontSize='3xl'>Connexion</Text>
                            <div className="form-group">

                                <input className={"input"}   onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="text" value={user.username} name='username'/>
                                <p>{errorMessage}</p>


                            </div>
                            <div className="form-group">

                                <input className={"input"}  onChange={e => setUser({...user, [e.target.name]: e.target.value})} type="password" value={user.password} name='password'/>
                            </div>


                        <Button className={"btn_login"} type="submit" colorScheme='blue'>Connexion</Button>



                    </div>
                    <Link className="nouveau" to={'/signup'}>Nouveau ?</Link>
                </div>
                </form>



                </body>


            </div>

        );
    }

