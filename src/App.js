import logo from './logo.svg';
import './App.css';
import React from "react";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "./context/appcontext";
import styled from "@emotion/styled";




export default function App() {
    const appContext = useContext(AppContext)
    const navigate = useNavigate();


    const [user, setUser] = useState(
        {
            username: 'admin',
            email: ''
        }
    );

    const [file, setFile] = useState(null);

    useEffect(() => {
            if (appContext.currentUser) {
                setUser(appContext.currentUser)
            }
        }
        , [appContext.currentUser])



    const StyledMenu = styled.nav`
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #242423;
      transform: ${({open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
      height: 100vh;
      text-align: left;
      padding: 2rem;
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;

      @media (max-width: 576px) {
        width: 100%;
      }

      a {
        font-size: 1rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: white;
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: 576px) {
          font-size: 1.5rem;
          text-align: center;
        }

        &:hover {
          color: #343078;
        }
      }
    `

    const Menu = ({open}) => {
        return (
            <StyledMenu open={open}>
                <a href="">
                    Accueil
                </a>
                <a href="">
                    Nous connaître
                </a>

                <Link to={'/tarifs'}>
                    Tarifs
                </Link>


                <a className="btn btn-primary" onClick={logout}>
                    Déconnexion
                </a>
            </StyledMenu>
        )
    }

    const StyledBurger = styled.button`
      position: absolute;
      top: 5%;
      left: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 10;

      &:focus {
        outline: none;
      }

      div {
      
        width: 2rem;
        height: 0.25rem;
        background: ${({open}) => open ? '#7421fc' : '#7421fc'};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;

        :first-child {
          transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
        }

        :nth-child(2) {
          opacity: ${({open}) => open ? '0' : '1'};
          transform: ${({open}) => open ? 'translateX(20px)' : 'translateX(0)'};
        }

        :nth-child(3) {
          transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        }
      }
    `

    const Burger = ({open, setOpen}) => {
        return (
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
        )
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        appContext.setCurrentUser(null)
        navigate('/login')
    }
    //commande en cours


    const data = [{nom: 'montage',
        date: '21/05/2023',
        etat: 'en cours',
        image: 'src/image/Capture d\'écran 2023-04-11 215222.png'},
        {nom: 'montage2',
            date: '08/07/2023',
            etat: 'en cours',
            image: 'src/image/Capture d\'écran 2023-04-11 215222.png'}]







    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:30001/upload', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
    };

    const [open, setOpen] = React.useState(false);
    const node = React.useRef();
    return (
        <div>
            <div>

            </div>

                <header className="header">
                    <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>

                        <Burger open={open} setOpen={setOpen}/>
                        <Menu open={open} setOpen={setOpen}/>

                </header>


            <div className="body">






                                <h5 className="user">Bienvenue {user.username}</h5>
                                <h6 className="user">Vos commandes</h6>
                <form className="upload" onSubmit={handleSubmit}>
                    <input className="input_upload" type="file" id="myFileInput" onChange={handleFileChange} />
                    <button className="btn_upload" type="submit">Télécharger</button>
                </form>

                                {data.map((commande) => (
                                    <div className="commande_en_cours">

                                            <h6 className="commande_en_cours_nom_titre">Nom de la commande</h6>
                                            <p className="commande_en_cours_nom_texte">{commande.nom}</p>


                                            <h6 className="commande_en_cours_date_titre">Date de la commande</h6>
                                            <p className="commande_en_cours_date_texte">{commande.date}</p>

                                            <h6 className="commande_en_cours_etat_titre">Etat de la commande</h6>
                                            <p className="commande_en_cours_etat_texte">{commande.etat}</p>


                                    </div>





                                ))}







                            </div>
                        </div>


    )
}


