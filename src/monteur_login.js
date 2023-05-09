

import React, {useContext, useEffect, useState} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom';
import {AppContext} from "./context/appcontext";
import { Text,Input, Button, ButtonGroup} from '@chakra-ui/react'
import './App.css';
export default function Monteurlogin(){

    const [user2, setUser2] = useState(
        {
            username: '',
            password: ''
        }
    );



    return(
        <div className="container_login">
            <body className="body_login">
            <form className="login2" >
                    <div className="row">
                        <Text fontSize='5xl'>Monteur</Text>
                        <div className="col-md-6 mt-5 mx-auto">

                            <Text fontSize='medium'>Connexion</Text>
                            <div className="form-group">

                                <Input className={"input"}  onChange={e => setUser2({...user2, [e.target.name]: e.target.value})} placeholder="identifiant" type="text" value={user2.username} name='username'/>



                            </div>
                            <div className="form-group">

                                <Input className={"input"}  onChange={e => setUser2({...user2, [e.target.name]: e.target.value})} type="text" value={user2.password} name='password'/>
                            </div>


                            <Button className={"btn_login"} type="submit" colorScheme='blue'>Connexion</Button>


                        </div>
                    </div>
                </form>
            </body>
        </div>
    )
}