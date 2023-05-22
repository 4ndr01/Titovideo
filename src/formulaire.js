import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Link,useNavigate} from "react-router-dom";
import tarifs from "./tarifs";
import {background, Box} from "@chakra-ui/react";
import {color} from "framer-motion";
import {AppContext} from "./context/appcontext";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'

import { Checkbox, CheckboxGroup } from '@chakra-ui/react'







export default function Formulaire(){

    const [open, setOpen] = useState(false);
    const node = React.useRef();
    const appContext = React.useContext(AppContext);
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        appContext.setCurrentUser(null)
        navigate('/login')
    }

    const [user, setUser] = useState(
        {
            username: '',
            password: '',
            commande: '',
            email: '',
        }
    );

    //afficher

    useEffect(() => {

            if (appContext.currentUser) {
                setUser(appContext.currentUser)
                console.log(appContext.currentUser)
            }

        }
        , [appContext.currentUser, appContext])




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
                <Link to={"/tarifs"}>
                    Accueil
                </Link>
                <a href="titovideo/src/tarifs">
                    Nous connaître
                </a>
                <Link to="/home">
                    Mes commandes
                </Link>

                <a  onClick={logout} className="btn btn-primary">
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


        const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);
    const [showPopup7, setShowPopup7] = useState(false);

        const togglePopup = () => {
            setShowPopup1(!showPopup1);
            //seule la premiere popup marche


        }

    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
        //seule la premiere popup marche


    }

    const togglePopup3 = () => {
        setShowPopup3(!showPopup3);
        //seule la premiere popup marche


    }

    const togglePopup4 = () => {
        setShowPopup4(!showPopup4);
        //seule la premiere popup marche


    }

    const togglePopup5 = () => {
        setShowPopup5(!showPopup5);
        //seule la premiere popup marche


    }

    const togglePopup6 = () => {
        setShowPopup6(!showPopup6);
        //seule la premiere popup marche
    }

    const togglePopup7 = () => {
        setShowPopup7(!showPopup7);
        //seule la premiere popup marche
    }

    const [sliderValue, setSliderValue] = useState(null)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',

        fontSize: 'sm',
    }



    const [clickedButtons, setClickedButtons] = useState([]);

    const handleButtonClick = async (button) => {
        setClickedButtons([...clickedButtons, button]);






    };


    const submit = async (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({clickedButtons})
        };
        console.log("request sent1", requestOptions);
        console.log(user.username, user.password);
        const response = await fetch(`http://localhost:3001/boutons?username=${user.username}&password=${user.password}`, requestOptions);
        console.log("request sent2");
        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
            console.log("ok")

        } else {
            console.log("error")
        }
    }

    //recupère le local storage

    const info = JSON.parse(localStorage.getItem('user'));




    console.log(clickedButtons);
//recupère le local storage
    const User = JSON.parse(localStorage.getItem('user'));


    return(
        <form onSubmit={submit}>
        <body className="body_form">
        <div className="div_form">



            <header className="header">
                <h1 className="header__title">Tito</h1><h1 className="header__title2">video</h1>
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen}/>
                    <Menu open={open} setOpen={setOpen}/>
                </div>
            </header>
        <div className="form__container">
            <h1 className="form__title">Choisissez ce que vous voulez avoir </h1>
        </div>

            <div className="form__video">

                <div id="button1"
                        onClick={() => handleButtonClick("vlog/irl")}
                        className={"button1"}>
                    <p className="p__form">Vlog/irl</p>
                    {showPopup1 &&(


                        <p className="popup__text">Ajouté</p>



                    )
                    }
                </div>

                <div id="button2"
                         onClick={() => handleButtonClick("gaming")}
                         className={"button2"}>
                    <p className="p__form">Gaming</p>
                    {showPopup2 &&(


                        <p className="popup__text">Ajouté</p>



                    )
                    }

                </div>
                <div id="button3"
                        onClick={() => handleButtonClick("cuisine")} className="form__video__3">
                    <p className="p__form">Cuisine</p>
                    {showPopup3 &&(

                            <p className="popup__text">Ajouté</p>


                                )
                    }
                </div>
                <div id="button4"
                         onClick={() => handleButtonClick("evenement")}
                         className={"button1"}>
                    <p className="p__form">Evènement</p>
                    {showPopup4 &&(

                            <p className="popup__text">Ajouté</p>


                                )
                    }
                </div>

            </div>
            <div className={"form__video2"}>
                <div onClick={()=> handleButtonClick("9/16")} className="form__video__5">

                    <p className={"p__form"}>9/16</p>
                    {showPopup5 &&(

                            <p className="popup__text">Ajouté</p>
                        )
                    }
                </div>

                <div onClick={()=>handleButtonClick("1/1")} className="form__video__6">

                    <p className={"p__form"}>1/1</p>
                    {showPopup6 &&(

                        <p className="popup__text">Ajouté</p>
                    )
                    }
                </div>

                <div onClick={()=>handleButtonClick("19/80")} className="form__video__7">

                    <p className={"p__form"}>19/80</p>
                    {showPopup7 &&(

                        <p className="popup__text">Ajouté</p>
                    )
                    }
                </div>

            </div>

            <div  className="form__video3">
                <h2 className="form__title2">Nombre de point de vue (20€ par point de vue 1 inclus)</h2>
                <Box pt={6} pb={2}>
                    <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
                        <SliderMark value={0} {...labelStyles}>
                            0
                        </SliderMark>
                        <SliderMark value={50} {...labelStyles}>
                            50
                        </SliderMark>
                        <SliderMark value={100} {...labelStyles}>
                            100
                        </SliderMark>
                        <SliderMark
                            value={sliderValue}
                            textAlign='center'
                            bg=' #7421fc'
                            color='white'
                            mt='-10'
                            ml='-5'
                            w='12'
                        >
                            {sliderValue}
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>

                <Checkbox defaultChecked>Sous titres</Checkbox>
                <Checkbox defaultCheked>Fond vert</Checkbox>
                <input type={"file"}></input>
            </div>



            <button id="btn_form" onClick={submit} className="form__btn" type="button">Valider</button>



        </div>
        </body>
        </form>
    )
}
