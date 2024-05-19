import React, { useState, useRef } from "react";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (isRunning) {
      const lapTime =
        time - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
      const lapData = {
        lapNumber: laps.length + 1,
        lapTime: lapTime,
        totalTime: time,
      };
      setLaps([...laps, lapData]);
    }
  };

  const formatTime = (time) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <>
      <h1>{formatTime(time)}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop/Resume</button>
      <button onClick={reset}>Reset</button>
      <button onClick={lap}>Lap</button>
      <div>
        <h2>Laps</h2>
        <table>
          <tr>
            <td>Lap</td>
            <td>Time</td>
            <td>Total</td>
          </tr>
          {laps.map((lap, index) => (
            <tr key={index}>
              <td>{lap.lapNumber}</td>
              <td>{formatTime(lap.lapTime)}</td>
              <td>{formatTime(lap.totalTime)}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default StopWatch;
