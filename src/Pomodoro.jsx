import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Settings } from "./components/Settings";
import { CustomTimer } from "./components/testingTimer";

export function Pomodoro() {
  const [mode, setMode] = useState("pomodoro"); //отвечает за режим таймера breaks (short long)
  const [showSettings, setShowSettings] = useState(false); //отвечает за отображение модалки настроек
  const [isRunning, setIsRunning] = useState(false); //отвечает за запуск таймера false означает что таймер стоит
  const [timerKey, setTimerKey] = useState(0); //отвечает за перезапуск таймера в случае изменения таймера в настройках
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);

  const [modeTimes, setModeTimes] = useState({
    pomodoro: 2,
    short: 5 * 60,
    long: 15 * 60,
  });
  const [currentTime, setCurrentTime] = useState(modeTimes[mode]);
  const [timeLeft, setTimeLeft] = useState(modeTimes[mode]);
  const progress = ((modeTimes[mode] - timeLeft) / modeTimes[mode]) * 100;

  const audioRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  }, [isRunning]);

  const clickRef = useRef(
    new Audio("/knopka-vyiklyucheniya-na-nastolnoy-lampe1.mp3")
  );
  const alarmSoundRef = useRef(new Audio("/budilnik1.mp3"));

  const handleStartPause = () => {
    // проигрываем звук
    clickRef.current.currentTime = 0;
    clickRef.current.play();

    // переключаем состояние
    setIsRunning((prev) => !prev);
  };

  const handleTimerComplete = () => {
    // останавливаем звук таймера (если он играет)
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // проигрываем звук будильника (окончание таймера)
    alarmSoundRef.current.currentTime = 0;
    alarmSoundRef.current.play();
    if (mode === "pomodoro") {
      // увеличиваем счётчик завершённых pomodoro
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);

      if (newCount % longBreakInterval === 0) {
        // если пришло время длинного перерыва
        setMode("long");
        setCurrentTime(modeTimes.long);
      } else {
        // иначе короткий перерыв
        setMode("short");
        setCurrentTime(modeTimes.short);
      }

      // автозапуск перерыва если нужно
      if (autoStartBreaks) setIsRunning(true);
      else setIsRunning(false);
    } else {
      // если сейчас на перерыве (короткий или длинный)
      // после перерыва начинаем Pomodoro заново и сбрасываем счётчик, если это long break
      if (mode === "long") {
        setPomodoroCount(0);
      }
      setMode("pomodoro");
      setCurrentTime(modeTimes.pomodoro);
      if (autoStartPomodoros) setIsRunning(true);
      else setIsRunning(false);
    }

    setTimerKey((k) => k + 1);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setCurrentTime(modeTimes[newMode]);
    setIsRunning(false);
    setTimerKey((prev) => prev + 1);

    if (newMode === "pomodoro") {
      setPomodoroCount(0);
    }
  };

  const timeToFocus = () => {
    return mode === "pomodoro" ? "Time to focus!" : "Time for a break!";
  };
  useEffect(() => {
    setCurrentTime(modeTimes[mode]);
  }, [modeTimes, mode]);

  return (
    <>
      <PomodoroForm mode={mode}>
        <Header>
          <HeaderChange>
            <Title>
              <StyledImage
                src="https://pomofocus.io/images/icon-white2.png"
                alt=""
              />
              Pomofocus
            </Title>
            <HeaderButton>
              <StyledButton onClick={() => setShowSettings(true)}>
                <SettingsImg
                  src="https://pomofocus.io/icons/config-white.png"
                  alt=""
                />
                Setting
              </StyledButton>
              <StyledButtonI>︙</StyledButtonI>
            </HeaderButton>
          </HeaderChange>
          <Snake>
            <SnakeFill $progress={progress} />
          </Snake>
        </Header>
        <Main>
          <div>
            <MainContent>
              <BreakButtonContainer>
                <BreakButton
                  mode={mode}
                  selected="pomodoro"
                  onClick={() => handleModeChange("pomodoro")}
                >
                  Pomodoro
                </BreakButton>
                <BreakButton
                  mode={mode}
                  selected="short"
                  onClick={() => handleModeChange("short")}
                >
                  Short Break
                </BreakButton>
                <BreakButton
                  mode={mode}
                  selected="long"
                  onClick={() => handleModeChange("long")}
                >
                  Long Break
                </BreakButton>
              </BreakButtonContainer>
              <Timer>
                <CustomTimer
                  key={timerKey} //чтобы обновлялся при изменении в настройках
                  initialTime={currentTime}
                  isRunning={isRunning}
                  onComplete={handleTimerComplete}
                  onTick={setTimeLeft}
                />
              </Timer>
              <StartContainer>
                <StartButton onClick={handleStartPause} mode={mode}>
                  {isRunning ? "PAUSE" : "START"}
                </StartButton>
              </StartContainer>
            </MainContent>
            <Footer>
              <FooterP>#7</FooterP>
              <FooterP2>{timeToFocus()}</FooterP2>
            </Footer>
          </div>
        </Main>
      </PomodoroForm>

      {showSettings && (
        <Settings
          OnClose={() => setShowSettings(false)}
          modeTimes={modeTimes}
          setModeTimes={setModeTimes}
          autoStartPomodoros={autoStartPomodoros}
          setAutoStartPomodoros={setAutoStartPomodoros}
          autoStartBreaks={autoStartBreaks}
          setAutoStartBreaks={setAutoStartBreaks}
          longBreakInterval={longBreakInterval}
          setLongBreakInterval={setLongBreakInterval}
        />
      )}
      <audio
        ref={audioRef}
        src="/clock-clock-sound-clock-clock-time-10343.mp3" // укажи путь к своему аудио
        loop // зациклить звук
        preload="auto"
      />
    </>
  );
}

// Все стили остаются без изменений

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
  color: ${(props) => {
    if (props.mode === "short") return "#38868a";
    {
      if (props.mode === "long") return "#397097";
      return "#ba4a49";
    }
  }};
  transition: color 0.6s ease;
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

const Timer = styled.h1`
  font-size: 70px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 5px 10px;
  background-color: ${(props) =>
    props.mode === props.selected ? "rgba(0, 0, 0, 0.2)" : "transparent"};
  transition: background-color 0.3s ease;
  font-size: 17px;
  margin-top: 30px;
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
  background-color: rgba(255, 255, 255, 0.1);
`;

const PomodoroForm = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => {
    if (props.mode === "short") return "#38868a";
    {
      if (props.mode === "long") return "#397097";
      return "#ba4a49";
    }
  }};
  transition: background-color 0.6s ease;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
`;
const HeaderChange = styled.div`
  width: 620px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 100px;
  padding: 0px;
  margin: 0px;
`;
const Snake = styled.div`
  position: absolute;
  left: 458px;
  top:46px;            
  width: 620px;          
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);  
`;

/* белая «заливка», ширина = процент прогресса */
const SnakeFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  border-radius: 5px;
  width: ${({ $progress }) => `${$progress}%`};
  background: rgba(255, 255, 255, 0.9);
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
