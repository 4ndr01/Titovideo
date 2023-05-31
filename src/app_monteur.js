import logo from './logo.svg';
import './App.css';
import React from "react";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "./context/appcontext";
import styled from "@emotion/styled";
import Login from "./login";
import {navigate} from "@reach/router";
import axios from "axios";
import monteur_command from "./monteur_command";

export default function App_monteur(){

    const appContext = useContext(AppContext)
    const navigate = useNavigate();


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
                <Link to={"/app_monteur"}>
                    Mes commandes
                </Link>
                <a href="">
                    Commandes en cours
                </a>

                <Link to={'/home'}>
                    Commandes terminées
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

     //aficher les commande en cours
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.airtable.com/v0/appJkUabioFFbqFYY/tblalAaM1SOVl9WiS',
                    {
                        headers: {
                            Authorization: `Bearer keyhB7TwnkZ7VZWDI`,
                        },
                    }
                );
                setData(response.data.records);
            }catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);















    const [open, setOpen] = React.useState(false);

    return(

        <div>
            <div>

            </div>

            <header className="header">
                <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>

                <Burger open={open} setOpen={setOpen}/>
                <Menu open={open} setOpen={setOpen}/>

            </header>


            <div className="body">







                <h6 className="user">Bonjour {appContext.currentUser?.username}</h6>
                <h6 className="user">Vos commandes</h6>


                <div>
                    {data.map((record) => (
                        <div className="commande_en_cours" key={record.id}>
                            <p>{record.fields["Nom prénom"]}</p>
                            <p>{record.fields["Ajout de décors en fond (Fond vert)"]}</p>
                            Images additionnelles (Banque image, vidéo, gifs, animation…)


                        </div>
                    ))}
                </div>




            </div>
        </div>
    )
    }
