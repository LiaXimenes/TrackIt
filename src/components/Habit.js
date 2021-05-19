export default function Habit(){
    return(
        <>
            <div class="topbar">
                <p class="logo-name">TrackIt</p>
                <img class="personal-picture" src="catioro.jpg" />
            </div>

            <div class="add-habits-bar">
                <p>Meus Hábitos</p>
                <button class="add-button">+</button>
            </div>

            <div class="habits">
                <ul class="all-habits">
                <li class="each-habit">
                    <p>Nome do Habito</p>
                    <ul class="week">
                    <li class="week-day">D</li>
                    <li class="week-day">S</li>
                    <li class="week-day">T</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">S</li>
                    <li class="week-day">S</li>
                    </ul>
                </li>
                </ul>

                <ul class="all-habits">
                <li class="each-habit">
                    <p>Nome do Habito</p>
                    <ul class="week">
                    <li class="week-day">D</li>
                    <li class="week-day">S</li>
                    <li class="week-day">T</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">S</li>
                    <li class="week-day">S</li>
                    </ul>
                </li>
                </ul>

                <ul class="all-habits">
                <li class="each-habit">
                    <p>Nome do Habito</p>
                    <ul class="week">
                    <li class="week-day">D</li>
                    <li class="week-day">S</li>
                    <li class="week-day">T</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">Q</li>
                    <li class="week-day">S</li>
                    <li class="week-day">S</li>
                    </ul>
                </li>
                </ul>
            </div>

            <div class="bottombar">
                <p>Hábitos</p>
                <div class="ball">
                <p>Hoje</p>
                </div>
                <p>Histórico</p>
            </div>
      </>
    )
}