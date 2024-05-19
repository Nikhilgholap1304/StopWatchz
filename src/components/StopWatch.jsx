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
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <>
      <section className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center justify-center flex-col bg-gray-900 text-white gap-5 rounded-md p-10 shadow-xl 2xs:p-5">
          <h1 className="text-3xl font-bold 2xs:text-2xl">Stopwatch</h1>
          <div className="text-center">
            <h1 className="text-4xl mb-3 2xs:text-3xl">{formatTime(time)}</h1>
            <div className="flex gap-4 *:bg-blue-500 *:px-2 *:py-1 *:rounded-sm 2xs:flex-wrap 2xs:justify-center 2xs:*:text-sm">
              <button
                onClick={start}
                className="hover:scale-[0.95] transition-all "
              >
                Start
              </button>
              <button
                onClick={stop}
                className="hover:scale-[0.95] transition-all"
              >
                Stop/Resume
              </button>
              <button
                onClick={reset}
                className="hover:scale-[0.95] transition-all"
              >
                Reset
              </button>
              <button
                onClick={lap}
                className="hover:scale-[0.95] transition-all"
              >
                Lap
              </button>
            </div>
          </div>
          <div className="text-center mt-5 w-full">
            <h2 className="text-2xl mb-3 font-bold bg-slate-700 rounded-sm p-1 2xs:text-xl">
              Laps
            </h2>
            {laps.length!= 0 ? (
              <div className="w-full flex justify-between items-center">
                <div>
                  <p className="underline mb-2">Lap</p>
                  {laps.map((lap, index) => (
                    <p>{lap.lapNumber}</p>
                  ))}
                </div>
                <div>
                  <p className="underline mb-2">Time</p>
                  {laps.map((lap, index) => (
                    <p>{formatTime(lap.lapTime)}</p>
                  ))}
                </div>
                <div>
                  <p className="underline mb-2">Total</p>
                  {laps.map((lap, index) => (
                    <p>{formatTime(lap.totalTime)}</p>
                  ))}
                </div>
              </div>
            ):(<h5>Laps is empty !</h5>)}
          </div>
        </div>
      </section>
    </>
  );
};

export default StopWatch;
