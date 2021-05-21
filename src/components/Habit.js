import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import UserContext from '../context/UserContext';
import ProgressContext from '../context/ProgressContext';

export default function Habit(){
    const {user} = useContext(UserContext);
    const {progress} = useContext(ProgressContext);

    const [selectedDays, setSelectedDays] = useState([]);
    const [nameOfTheHabit, setNameOfTheHabit] = useState("")
    const [arrayOfHabits, setArrayOfHabits] = useState([]);
    const [arrayFromServer, setArrayFromServer ] = useState([]);

    const [charging, setCharging] = useState(false);

    const [isSelected, setIsSelecte] = useState(false);

    const body = {
        name: nameOfTheHabit,
        days: selectedDays
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    
    useEffect(() => {
        const req = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        req.then((response) => setArrayFromServer(response.data));
        req.catch();
    }, [])

    function GetHabitArray(){
        const req = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        req.then((response) => setArrayFromServer(response.data));
        req.catch();
        
    }       
    
    function PostNewHabit(){
        setCharging(true);

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        request.then(() => {setArrayOfHabits([...arrayOfHabits, nameOfTheHabit]); setIsSelecte(false); setNameOfTheHabit(""); setSelectedDays([]); GetHabitArray(); setCharging(false)});
        request.catch(() => alert("Ocorreu um erro!"));

    }

    function DeleteHabit(id){
        const ask = window.confirm("Deseja deletar permanentemente esse Habito?");
        if(ask) {
            const reqDelete = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            reqDelete.then(() => {GetHabitArray()})
        }
        
    }

    function AddDays(day){
        if(selectedDays.includes(day)){
            const newSelectedDays = selectedDays.filter(item => item !== day)
            setSelectedDays([...newSelectedDays]);
        } else{
            setSelectedDays([...selectedDays,day])
        }
    }
    
    return(
        <>
            <Navbar>
                <p>TrackIt</p>
                <img src={user.image} alt=""/>
            </Navbar>

            <AddHabits>
                <p>Meus Hábitos</p>
                <button onClick={() => setIsSelecte(true)}>+</button>
            </AddHabits>

          
            <Habits>
                <NewHabits show = {isSelected}>
                    <input type="text" placeholder="Nome do Hábito" onChange = {(e) => setNameOfTheHabit(e.target.value)} value={nameOfTheHabit} disabled = {charging}/>

                    <Week>
                        <li className={selectedDays.includes(7) ? "changeColor" : ""} onClick={() => AddDays(7)} id={7} disabled = {charging}>D</li>
                        <li className={selectedDays.includes(1) ? "changeColor" : ""} onClick={() => AddDays(1)} id={1} disabled = {charging}>S</li>
                        <li className={selectedDays.includes(2) ? "changeColor" : ""} onClick={() => AddDays(2)} id={2} disabled = {charging}>T</li>
                        <li className={selectedDays.includes(3) ? "changeColor" : ""} onClick={() => AddDays(3)} id={3} disabled = {charging}>Q</li>
                        <li className={selectedDays.includes(4) ? "changeColor" : ""} onClick={() => AddDays(4)} id={4} disabled = {charging}>Q</li>
                        <li className={selectedDays.includes(5) ? "changeColor" : ""} onClick={() => AddDays(5)} id={5} disabled = {charging}>S</li>
                        <li className={selectedDays.includes(6) ? "changeColor" : ""} onClick={() => AddDays(6)} id={6} disabled = {charging}>S</li>
                    </Week>

                    <div class="save-cancel-button">
                        <CancelButton onClick={() => {setIsSelecte(false)}}>Cancelar</CancelButton>
                        <SaveButton onClick={PostNewHabit}>{charging === true ? <Loader type="ThreeDots" color="#fff" height={45} width={60} /> : "Salvar"}</SaveButton>
                    </div>
                </NewHabits>
            </Habits>

            <Habits>
                {arrayFromServer.map(item => 
                    <EachHabit>
                        <NameAndTrash>
                        <p key={item.id}>{item.name}</p>
                        <button onClick = {() => DeleteHabit(item.id)}><img src="trash-bin.png" alt=""/></button>
                        </NameAndTrash>
                        <Week>
                            <li className={item.days.includes(7) ? "changeColor" : ""} id={7}>D</li>
                            <li className={item.days.includes(1) ? "changeColor" : ""} id={1}>S</li>
                            <li className={item.days.includes(2) ? "changeColor" : ""} id={2}>T</li>
                            <li className={item.days.includes(3) ? "changeColor" : ""} id={3}>Q</li>
                            <li className={item.days.includes(4) ? "changeColor" : ""} id={4}>Q</li>
                            <li className={item.days.includes(5) ? "changeColor" : ""} id={5}>S</li>
                            <li className={item.days.includes(6) ? "changeColor" : ""} id={6}>S</li>
                        </Week>
                    </EachHabit>  
                )}
            </Habits>

            <NoHabistMessage show = {isSelected} arrayFromServer = {arrayFromServer.length}>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </NoHabistMessage>

            <Footer>
                <p>Hábitos</p>

                <Link to="/Today">         
                <Circle>            
                    <CircularProgressbar strokeWidth={10} value={(progress.length*100)/arrayFromServer.length} text={"Hoje"} background={true} backgroundPadding={5} styles={buildStyles({
                            textColor: '#fff',
                            trailColor: '#52B6FF',
                            backgroundColor: '#52B6FF',
                            pathColor: '#fff',
                        })} />
                </Circle> 
                </Link>
                
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
        color:black;
        :disabled{
            background-color: #f2f2f2 ;
        }
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

const NoHabistMessage = styled.div`
    display: ${props => (props.show === true ? "none" : (props.arrayFromServer === 0 ? "flex" : "none"))};
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

const NameAndTrash = styled.div`
    display: flex;

    button{
        margin-right: 10px;
        margin-top: 10px;
        background: #fff;
    }

    img{
        width: 15px;
        height: 15px;
    }


`

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
        &.changeColor{
            background: #cfcfcf;
            color: #fff
        }

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
    margin-top: 50px;

    a{ 
        text-decoration: none;
        color: #52B6FF;
   
    }
`;

const Circle = styled.div`
    width: 90px;
    height: 90px;
`;