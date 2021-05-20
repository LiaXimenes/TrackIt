import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';

import UserContext from '../context/UserContext';

export default function Habit(){
    const {user} = useContext(UserContext);
    const [selectedDays, setSelectedDays] = useState([]);

    const [isSelected, setIsSelecte] = useState(false);

    console.log(user)
    

    const body = {
        // name: "Nome do hábito",
        // days: [1, 3, 5] // segunda, quarta e sexta
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    function DeusMeSalva(){
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        request.then(() => console.log("deu bom"))
        request.catch(() => console.log("deu ruim"))

    }

    function AddDays(day){
        if(selectedDays.includes(day)){
            const newSelectedDays = selectedDays.filter(item => item !== day)
            setSelectedDays([...newSelectedDays]);
        } else{
            setSelectedDays([...selectedDays,day])
        }
    }
    console.log(selectedDays)

    
    return(
        <>
            <Navbar>
                <p>TrackIt</p>
                <img src={user.image} />
            </Navbar>

            <AddHabits>
                <p>Meus Hábitos</p>
                <button onClick={() => setIsSelecte(true)}>+</button>
            </AddHabits>

          
            <Habits>
                <NewHabits show = {isSelected}>
                    <input type="text" placeholder="Nome do Hábito" />

                    <Week>
                        <li onClick={() => AddDays(7)} id={7}>D</li>
                        <li onClick={() => AddDays(1)} id={1}>S</li>
                        <li onClick={() => AddDays(2)} id={2}>T</li>
                        <li onClick={() => AddDays(3)} id={3}>Q</li>
                        <li onClick={() => AddDays(4)} id={4}>Q</li>
                        <li onClick={() => AddDays(5)} id={5}>S</li>
                        <li onClick={() => AddDays(6)} id={6}>S</li>
                    </Week>

                    <div class="save-cancel-button">
                        <CancelButton onClick={() => setIsSelecte(false)}>Cancelar</CancelButton>
                        <SaveButton onClick={DeusMeSalva}>Salvar</SaveButton>
                    </div>
                </NewHabits>
            </Habits>

            <Habits>
                <EachHabit>
                    <p>Nome do Habito</p>
                    <Week>
                        <li id={7}>D</li>
                        <li id={1}>S</li>
                        <li id={2}>T</li>
                        <li id={3}>Q</li>
                        <li id={4}>Q</li>
                        <li id={5}>S</li>
                        <li id={6}>S</li>
                    </Week>
                </EachHabit>  
            </Habits>

            <Habits>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Habits>

            <Footer>
                <Link to="/Habits">
                    <p>Hábitos</p>
                </Link>
                
                <Circle>
                <p>Hoje</p>
                </Circle>
                
                <Link to="/History">
                    <p>Histórico</p>
                </Link>
            </Footer>
      </>
    )
}

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    background:#126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow:  4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;

    p{
        font-size: 38px;
        font-family: 'Playball', cursive;
        color: #ffffff;
        margin-left: 16px;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50px;
        margin-right: 18px;
    }
`;

const AddHabits = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 90px;

    p{
        margin-left: 18px;
        font-size: 23px;
        font-family: 'Lexend Deca', sans-serif;
        color:#126BA5;
    }

    button{
        width: 40px;
        height: 35px;
        background:#52B6FF;
        margin-right: 18px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 27px;
    }
`;

const NewHabits = styled.div`
    width: 340px;
    height: 180px;
    border-radius: 5px;
    background: #ffffff;
    padding-top: 20px;
    padding-left: 18px;
    margin-bottom: 30px;
    display: ${props => (props.show === true ? "flex" : "none")};
    flex-direction: column;

    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        margin-bottom: 6px;
        padding-left: 10px;
        font-size: 18px;
        color:black
    }
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background:#52B6FF;
    border-radius: 5px;
    color: #ffffff;
    font-size: 16px;
    font-family: 'Lexend Deca', sans-serif;
`;

const CancelButton = styled.button`
    width: 84px;
    height: 35px;
    color:#52B6FF;
    border-radius: 5px;
    background: #ffffff;
    font-size: 16px;
    margin-right: 16px;
    margin-left: 130px;
    font-family: 'Lexend Deca', sans-serif;
`;

const Habits = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    p{
        width: 340px;
        font-size: 18px;
        font-family: 'Lexend Deca', sans-serif;
        line-height: 22px;
        margin-left: 18px;
        margin-right: 20px;
        color: #666666; 
    }
`;

const EachHabit = styled.div`
    width: 340px;
    height: 90px;
    background: #ffffff;
    padding-left: 15px;
    border-radius: 5px;
    margin-bottom: 10px;

    p{
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
        font-size: 20px;
        padding-top: 13px;
        padding-bottom: 10px;
    }
`;


const Week = styled.ul`
    display: flex;
    padding-bottom: 40px;

    li{
        width: 30px;
        height: 30px;
        border-radius: 5px;
        margin-right: 2px;
        border: solid 1px #DBDBDB;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Lexend Deca', sans-serif;
        color: #DBDBDB;

    }
`;

const Footer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #ffffff;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #52B6FF;
`;

const Circle = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50px;
    background: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    margin-bottom: 30px;
`;