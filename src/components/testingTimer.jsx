import React, { useState, useEffect } from "react";
export function CustomTimer({
  initialTime,
  isRunning,
  onComplete,
  onTick = () => {},
}) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => setTime(initialTime), [initialTime]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTime((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        onTick?.(next); // сообщаем вверх
        if (next === 0) onComplete?.();
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, onComplete, onTick]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <h1>{formatTime(time)}</h1>;
}
