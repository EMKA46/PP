import { useState, useEffect } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { LuClock9 } from "react-icons/lu";
import ToggleSwitch from "./Swich";

export function Settings({
  OnClose,
  modeTimes,
  setModeTimes,
  setIsRunning,
  autoStartPomodoros,
  setAutoStartPomodoros,
  autoStartBreaks,
  setAutoStartBreaks,
  longBreakInterval,
  setLongBreakInterval
}) {
  const [pomodoroInput, setPomodoroInput] = useState("");
  const [shortInput, setShortInput] = useState("");
  const [longInput, setLongInput] = useState("");
  const [longIntervalInput, setLongIntervalInput] = useState("");

  // Заполняем инпуты при открытии

  const AutoStart = () => {
    setIsRunning(true);
  };
  useEffect(() => {
    setPomodoroInput(String(modeTimes.pomodoro / 60));
    setShortInput(String(modeTimes.short / 60));
    setLongInput(String(modeTimes.long / 60));
    setLongIntervalInput(String(longBreakInterval));
  }, [modeTimes, longBreakInterval]);
  return (
    <Overlay>
      <SettingsForm>
        <SettingsHeader>
          <SettingsTitle>SETTINGS</SettingsTitle>
          <SettingsButton type="button" onClick={OnClose}>
            <Cross />
          </SettingsButton>
        </SettingsHeader>
        <SettingTimer>
          <SettingsTitleTime>
            <Clock />
            TIMER
          </SettingsTitleTime>
          <SettingTexting>Time (minutes)</SettingTexting>
          <SettingsBreakContainer>
            <SettingsBreakContent>
              <SettigsBreakType>Pomodoro</SettigsBreakType>
              <SettingsInput
                value={pomodoroInput}
                onChange={(e) => {
                  // меняем запятую на точку, чтобы и "1,5" и "1.5" работали
                  const raw = e.target.value.replace(",", ".");
                  if (/^\d*\.?\d*$/.test(raw)) {
                    setPomodoroInput(raw);
                  }
                }}
              />
            </SettingsBreakContent>
            <SettingsBreakContent>
              <SettigsBreakType>Short Break</SettigsBreakType>
              <SettingsInput
                value={shortInput}
                onChange={(e) => {
                  // меняем запятую на точку, чтобы и "1,5" и "1.5" работали
                  const raw = e.target.value.replace(",", ".");
                  if (/^\d*\.?\d*$/.test(raw)) {
                    setShortInput(raw);
                  }
                }}
              />
            </SettingsBreakContent>
            <SettingsBreakContent>
              <SettigsBreakType>Long Break</SettigsBreakType>
              <SettingsInput
                value={longInput}
                onChange={(e) => {
                  // меняем запятую на точку, чтобы и "1,5" и "1.5" работали
                  const raw = e.target.value.replace(",", ".");
                  if (/^\d*\.?\d*$/.test(raw)) {
                    setLongInput(raw);
                  }
                }}
              />
            </SettingsBreakContent>
          </SettingsBreakContainer>
          <SettingChekContainer>
            <SettingText>Auto Start Breaks</SettingText>
            <ToggleSwitch
              checked={autoStartBreaks}
              onToggle={setAutoStartBreaks}
            />
          </SettingChekContainer>

          <SettingChekContainer>
            <SettingText>Auto Start Pomodoros</SettingText>
            <ToggleSwitch
              checked={autoStartPomodoros}
              onToggle={setAutoStartPomodoros}
            />
          </SettingChekContainer>

          <SettingChekContainer>
            <SettingText>Long Break interval</SettingText>
            <SettingsInputs
              value={longIntervalInput}
              onChange={(e) => {
                const raw = e.target.value.replace(",", ".");
                if (/^\d*\.?\d*$/.test(raw)) {
                  setLongIntervalInput(raw);
                }
              }}
            />
          </SettingChekContainer>
        </SettingTimer>
        <SettingEnd>
          <SettingOkButton
            type="button"
            onClick={() => {
              setModeTimes((prev) => ({
                ...prev,
                pomodoro: pomodoroInput
                  ? Math.round(
                      parseFloat(String(pomodoroInput).replace(",", ".")) * 60
                    )
                  : prev.pomodoro,
                short: shortInput
                  ? Math.round(
                      parseFloat(String(shortInput).replace(",", ".")) * 60
                    )
                  : prev.short,
                long: longInput
                  ? Math.round(
                      parseFloat(String(longInput).replace(",", ".")) * 60
                    )
                  : prev.long,
              }));
              setLongBreakInterval(
                longIntervalInput
                  ? parseInt(longIntervalInput, 10)
                  : longBreakInterval
              );
              OnClose();
            }} //для того чтобы все единичные значения в инпутах настройки превращать в минуты
          >
            OK
          </SettingOkButton>
        </SettingEnd>
      </SettingsForm>
    </Overlay>
  );
}

const SettingOkButton = styled.button`
  width: 70px;
  height: 35px;
  background-color: #363636;
  border-radius: 5px;
  border: none;
  color: white;
  margin-right: 20px;
`;

const SettingEnd = styled.div`
  width: 400px;
  height: 73px;
  background-color: #efefef;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const SettingChekContainer = styled.div`
  width: 360px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsInput = styled.input.attrs({ type: "number", min: 0, step: 0.1 })`
  width: 98px;
  height: 30px;
  background-color: #efefef;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
`;
const SettingsInputs = styled.input.attrs({ type: "number", min: 0, step: 1 })`
  width: 68px;
  height: 30px;
  background-color: #efefef;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
`;

const SettigsBreakType = styled.h5`
  color: gray;
`;

const SettingsBreakContent = styled.div`
  width: 98px;
  display: flex;
  flex-direction: column;
`;

const SettingsBreakContainer = styled.div`
  width: 360px;
  height: 60px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 10px;
`;

const SettingTexting = styled.h4`
  margin-top: 20px;
`;
const SettingText = styled.h4``;
const SettingsForm = styled.form`
  width: 400px;
  height: 450px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const SettingsHeader = styled.div`
  width: 400px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const SettingsTitle = styled.h4`
  color: gray;
  margin-left: 150px;
  margin-right: 140px;
`;
const SettingsTitleTime = styled.h4`
  color: gray;
  display: flex;
  gap: 5px;
`;
const SettingsButton = styled.button`
  width: 15px;
  height: 15px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

const Cross = styled(ImCross)`
  width: 14px;
  height: 14px;
  color: gray;
  cursor: pointer;
  &:hover {
    color: #655e5e;
  }
`;
const Clock = styled(LuClock9)`
  width: 16px;
  height: 16px;
  color: gray;
  font-weight: 900;
`;
const SettingTimer = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 400px;
  margin-top: 30px;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
