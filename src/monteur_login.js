

import React, {useContext, useEffect, useState} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom';
import {AppContext} from "./context/appcontext";
import { Text,Input, Button, ButtonGroup} from '@chakra-ui/react'
import './App.css';
export default function Monteurlogin(){

    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const [user2, setUser2] = useState(
        {
            username: '',
            password: ''
        }
    );


    useEffect(() => {

        if (appContext.currentUser) {
            console.log(appContext.currentUser)
            navigate('/tarifs')
        }

    }, [appContext.currentUser])

    const onSubmit2 = async e => {
        e.preventDefault();
        //verifications
        if (user2.username === '' || user2.password === '') {
            localStorage.setItem('token', JSON.stringify(user2))

            return
        }

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        const response = await fetch(`http://localhost:3001/signin2?username=${user2.username}&password=${user2.password}`, requestOptions);
        const data = await response.json();
        console.log(data)

        if (data) {
            appContext.setCurrentUser(data)
            appContext.user.loggedIn = true;
            //diriger vers tarifs
            navigate('/')
        } else {
            //afficher erreur
            console.log('erreur')
        }
    }




    return(
        <div className="container_login">
            <body className="body_login">
            <form className="login2" onSubmit={onSubmit2} >
                    <div className="row">
                        <Text fontSize='5xl'>Monteur</Text>
                        <div className="col-md-6 mt-5 mx-auto">

                            <Text fontSize='medium'>Connexion</Text>
                            <div className="form-group">

                                <Input className={"input"}  onChange={e => setUser2({...user2, [e.target.name]: e.target.value})} placeholder="identifiant" type="text" value={user2.username} name='username'/>



                            </div>
                            <div className="form-group">

                                <Input className={"input"}  onChange={e => setUser2({...user2, [e.target.name]: e.target.value})} type="password" value={user2.password} name='password'/>
                            </div>


                            <Button className={"btn_login"} type="submit" colorScheme='blue'>Connexion</Button>


                        </div>
                    </div>
                </form>
            </body>
        </div>
    )
}