import axios from 'axios';
import styled from 'styled-components';

export default function Today(){
    return(
        <>
            <Navbar >
                <p>TrackIt</p>
                <img src="catioro.jpg" />
            </Navbar>

            <Presentday>
                <h1>Segunda, 17/5</h1>
                <p>Nenhum hábito concluido ainda</p>
            </Presentday>

            <TodaysHabits>
                <Habit >
                <div>
                    <h1>Nome do hábito</h1>
                    <p>Sequência atual: add número</p>
                    <p>Seu recorde: add número</p>
                </div>

                <Checkbox></Checkbox>
                </Habit>

                <Habit >
                <div>
                    <h1>Nome do hábito</h1>
                    <p>Sequência atual: add número</p>
                    <p>Seu recorde: add número</p>
                </div>

                <Checkbox></Checkbox>
                </Habit>
            </TodaysHabits> 

            <Footer>
                <p>Hábitos</p>
                <Circle>
                <p>Hoje</p>
                </Circle>
                <p>Histórico</p>
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

const Presentday = styled.div`
    padding-top: 28px;
    margin-left: 18px;
    padding-bottom: 28px;

    h1{
        font-size: 23px;
        font-family: 'Lexend Deca', sans-serif;
        color:#126BA5;
    }
    
    p{
        font-size: 18px;
        color: #bababa;
        font-family: 'Lexend Deca', sans-serif;
    }
`;

const TodaysHabits = styled.ul`
    margin-left: 20px;
    margin-bottom: 10px;
`;

const Habit = styled.li`
    width: 340px;
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;

    h1{
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
        font-size: 20px;
        padding-top: 13px;
        padding-bottom: 10px;
    }

    p{
        font-size: 12px;
        font-family: 'Lexend Deca', sans-serif;
        color: #666666;
    }
`;

const Checkbox = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    background: #EBEBEB;
    box-shadow: solid 1px #E7E7E7;
    margin-right: 25px;
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