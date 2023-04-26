import './App.css';
import React from "react";
import {useContext, useEffect, useState} from "react";

import {AppContext} from "./context/appcontext";
import styled from "@emotion/styled";
import {Link, useNavigate} from "react-router-dom";


export default function Tarifs() {

    const [open, setOpen] = useState(false);
    const node = React.useRef();
    const navigate = useNavigate();




    const StyledMenu = styled.nav`
      display: flex;
      flex-direction: column;
      justify-content: center;
      background:#242423 ;
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
                <Link to="/home">
                    Accueil
                </Link>
                <a href="titovideo/src/tarifs">
                    Nous connaître
                </a>
                <Link to="/tarifs">
                    Tarifs
                </Link>

                <a className="btn btn-primary">
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

    const btn_click = () => {
        console.log("click")
        navigate("/formulaire")
    }
    return (
        <div>
            <div>

            </div>

            <header className="header">
                <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>
                <div className={"burger"} ref={node}>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen}/>
                </div>
            </header>
            <h2 className={"tarifs_title"}>Les tarifs</h2>

            <div className={"body2"}>
                <div className={"tarifs"}>



                <div className={"tarifs_div1"}>
                    <div className={"tarifs_div2"}>
                        <h3 className={"tarifs_title2"}>Tarifs de base</h3>
                        <p className={"prix"}> € 120,00 EUR</p>
                    </div>
                    <div className={"info"}>
                        <p className={"info_titre"}>Livraison en 24h</p>
                        <p className={"info_p1"}>Transfert de vos vidéos</p>
                    <p className={"info_p2"}>Rendu 5minutes maximum</p>
                    <p className={"info_p3"}>Conception sonore et mixage</p>
                    <p className={"info_p4"}>Habillage vidéo</p>
                    <p className={"info_p5"}>Sous-titres</p>
                        <button className={"btn_tarifs"} onClick={btn_click}>Commander</button>
                    </div>
                </div>



                <div className={"tarifs_div1"}>
                    <div className={"tarifs_div2"}>
                        <h3 className={"tarifs_title2"}>Montage Youtube</h3>
                        <p className={"prix"}> € 250,00 EUR</p>
                    </div>
                    <div className={"info"}>
                        <p className={"info_titre"}>Livraison en 72h</p>
                        <p className={"info__p1"}>Transfert de vos vidéos</p>
                        <p className={"info__p2"}>Rendu 20minutes maximum</p>
                        <p className={"info__p3"}>Graphiques animés</p>
                        <p className={"info__p4"}>Conception sonore et mixage</p>
                        <p className={"info__p5"}>Etalonnage des couleurs</p>
                        <p className={"info__p6"}>Sous-titres</p>
                        <button className={"btn_tarifs"} onClick={btn_click}>Commander</button>
                    </div>
                </div>
                </div>

            </div>

        </div>
    );
}



