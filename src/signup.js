import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "./context/appcontext";
import {useNavigate} from "react-router-dom";



export default function Signup() {


    //method Post
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const appContext = useContext(AppContext)
    const navigate = useNavigate();

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});
    const [errorMessage, setErrorMessage] = useState('');


    const ShowError = (message) => {
        setErrorMessage(message);
    }


    const onSubmit = async e => {
        e.preventDefault();

        if (user.password !== user.password2 ) {
            ShowError('Les mots de passe ne correspondent pas')
            console.log('Les mots de passe ne correspondent pas')
            return(
                <section>
                    <input type="password" name="password2" value={user.password2} onChange={onChange} placeholder="Confirmer le mot de passe" required/>
                    <p>{errorMessage}</p>

                </section>
            )

        }

        if (user.username==='' || user.email==='' || user.password==='' || user.password2==='') {
            ShowError('Veuillez remplir tous les champs')
            console.log('Veuillez remplir tous les champs')



        }else {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        const response = await fetch('http://localhost:3001/signup', requestOptions);
        const data = await response.json();
        console.log(data)
            if (data === true) {
                alert('vous avez déjà un compte')
            }

            if (appContext.user.loggedIn === false) {
                navigate('/tarifs')
            }
    }
    };

    return (
        <div className="signup">
            <h1>Créer un compte</h1>
            <form className="sign_form" onSubmit={onSubmit}>
                <section className="section_form">
                    <input  className="input_form" type="text" name="username" value={user.username} onChange={onChange} placeholder="Nom d'utilisateur" required/>
                </section>
                <section className="section_form">
                    <input className="input_form" type="email" name="email" value={user.email} onChange={onChange} placeholder="Email" required/>
                </section>
                <section className="section_form">
                    <input  className="input_form" type="password" name="password" value={user.password} onChange={onChange} placeholder="Mot de passe" required/>
                </section>
                <section className="section_form">
                    <input  className="input_form" type="password" name="password2" value={user.password2} onChange={onChange} placeholder="Confirmer le mot de passe" required/>
                    <p>{errorMessage}</p>

                </section>
                <button className="btn_form" type="submit" value="S'inscrire">S'inscrire</button>
            </form>
        </div>
    )

}