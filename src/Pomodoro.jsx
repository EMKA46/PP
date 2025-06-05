import { useState, useRef } from "react";
import styled from "styled-components";

export function Pomodoro() {
  const [count, setCount] = useState(12);
  const [isRunning, setIsRunning] = useState(false); // ← добавляем флаг
  const timerRef = useRef(null);

  function handleStartPause() {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      timerRef.current = setInterval(() => {
        setCount(prev => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);//говорим чтоб кнопка после окончание таймера была в изначальном состоянии start
            return 12; // Сброс таймера на 12 секунд после завершения счетчика
          }
          return prev - 1;
        });
      }, 1000);
      setIsRunning(true); //говорим чтоб кнопка была в состоянии pause пока идет таймер
    }
  }

  return (
    <PomodoroForm>
      <Header>
        <HeaderChange>
          <div>
            <Title>
              <StyledImage
                src="https://pomofocus.io/images/icon-white2.png"
                alt=""
              />
              Pomofocus
            </Title>
          </div>
          <HeaderButton>
            <StyledButton>
              <SettingsImg
                src="https://pomofocus.io/icons/config-white.png"
                alt=""
              />
              Setting
            </StyledButton>
            <StyledButtonI>︙</StyledButtonI>
          </HeaderButton>
        </HeaderChange>
      </Header>
      <Main>
        <div>
          <MainContent>
            <BreakButtonContainer>
              <BreakButton>Pomodoro</BreakButton>
              <BreakButton>Short Break</BreakButton>
              <BreakButton>Long Break</BreakButton>
            </BreakButtonContainer>
            <TimerContainer>
              <Timer>00:{count.toString().padStart(2, "0")}</Timer> {/* тут я делаю так чтобы добавлялся ноль если число по длине меньше 2 значений */}
            </TimerContainer>
            <StartContainer>
              <StartButton onClick={handleStartPause}>
                {isRunning ? "PAUSE" : "START"}
              </StartButton>
            </StartContainer>
          </MainContent>
          <Footer>
            <FooterP>#7</FooterP>
            <FooterP2>Time to focus!</FooterP2>
          </Footer>
        </div>
      </Main>
    </PomodoroForm>
  );
}
const FooterP = styled.p`
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
`;
const FooterP2 = styled.p`
  font-size: 18px;
  color: white;
  margin-top: 5px;
`;

const Footer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StartButton = styled.button`
  width: 200px;
  height: 55px;
  color: #ba4a49;
  border: none;
  border-radius: 5px;
  font-size: 21px;
  background-color: white;
  font-weight: 700;
  border-bottom: 7px solid #eaebeb;
  cursor: pointer;
`;

const StartContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TimerContainer = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Timer = styled.h1`
  font-size: 130px;
  color: white;
`;

const BreakButtonContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const BreakButton = styled.button`
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0);
  font-size: 17px;
`;

const Main = styled.div`
  width: 100%;
  height: 566px;
  display: flex;
  margin-top: 60px;
  justify-content: center;
`;

const MainContent = styled.div`
  width: 480px;
  height: 350px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const PomodoroForm = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ba4a49;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const HeaderChange = styled.div`
  width: 620px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 100px;
  border-bottom: 1px solid rgba(000, 0, 0, 0.1);
`;
const HeaderButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Title = styled.h2`
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
`;
const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
`;
const StyledButton = styled.button`
  width: 85px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  gap: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 2px;
  }
`;
const StyledButtonI = styled.button`
  width: 34px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 900;
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.4);
    margin-top: 2px;
  }
`;
const SettingsImg = styled.img`
  width: 16px;
  height: 16px;
`;
