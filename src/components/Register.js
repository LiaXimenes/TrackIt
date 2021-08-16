import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const [charging, setCharging] = useState(false);

    const history = useHistory();


    function onRegister() {
        setCharging(true);

        const body = {
            email,
            name,
            image,
            password
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
        request.then(goToHabits);
        request.catch(() => { alert("Ocorreu um Erro!"); setCharging(false); setEmail(""); setPassword(""); setName(""); setImage("") });

        function goToHabits() {
            history.push("/");
        }
    }


    return (
        <Whitebody>
            <Top>
                <Growth src="plant-growth.jpg" />
                <div>
                    <Logo>TrackIt</Logo>
                </div>
            </Top>

            <Inputs>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={charging} />
                <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} value={password} disabled={charging} />
                <input type="text" placeholder="nome" onChange={(e) => setName(e.target.value)} value={name} disabled={charging} />
                <input type="text" placeholder="foto" onChange={(e) => setImage(e.target.value)} value={image} disabled={charging} />

                <button onClick={onRegister}> {charging === true ? <Loader type="ThreeDots" color="#fff" height={45} width={60} /> : "Cadastrar"}</button>

                <Link to="/">
                    <p>Já tem Cadastro? Faça o login!</p>
                </Link>

            </Inputs>
        </Whitebody>
    )

}

const Whitebody = styled.div`
    width: 100%;
    height: 700px;
    background: #ffffff;
`;

const Top = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 68px;
    margin-bottom: 32px;
`;

const Growth = styled.img`
    width: 200px;
    height: 120px; 
`;

const Logo = styled.p`
    font-size: 70px;
    font-family: 'Playball', cursive;
    color: #126BA5;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        margin-bottom: 6px;
        padding-left: 10px;
        font-size: 18px;
        color:black;
        :disabled{
            background-color: #f2f2f2 ;
        }
    }

    button{
        width: 315px;
        height: 45px;
        border-radius: 5px;
        background: #52B6FF;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 25px;
        font-family: 'Lexend Deca', sans-serif;
    }

    p{
        color: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
    }
`;