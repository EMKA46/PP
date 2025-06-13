// CustomTimer.jsx  (или testingTimer.jsx — выбери один)
export function CustomTimer({ initialTime, isRunning, onComplete, onTick }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => setTime(initialTime), [initialTime]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTime((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        onTick?.(next);         // ⚡️ сообщаем наверх каждую секунду
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, onTick]);

  useEffect(() => {
    if (time === 0 && isRunning) onComplete?.();
  }, [time, isRunning, onComplete]);

  /* ...formatTime... */
}
