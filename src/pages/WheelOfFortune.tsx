import { useState, useRef, useEffect } from "react";
import MainTimer from "@/components/Global/Home/main-timer";
import SpinWheel from "@/components/spin-wheel";
import { api } from "@/config";
import io from "socket.io-client";

const socket = io(`${api.SOCKET_URL}`);
import { getDrawData } from "@/helper/backend_helper";
import MainDrawNumber from "@/components/Global/Home/main-draw-number";


// import logo from '../assets/images/logo.png';

const WheelOfFortune = () => {

  const startingMinutes = 2;
  const startingSeconds = startingMinutes * 60;
  const winningNumber = 2;
  const [time, setTime] = useState(startingSeconds);
  const [start, setStart] = useState(false);
  const [drawNumber, setDrawNumber] = useState(0);
  const [results, setResults] = useState<number>(0);
  const [lastFiveDraw, setLastFiveDraw] = useState([]);

  useEffect(() => {
    socket.on("new_draw", (data: any) => {
      console.log("data: ", data);
      setResults(data);
      setStart(true);
      
        // startLottery(data, 5000);
    });

    return () => {
      socket.off('new_draw'); 
    };
  },[]);
  
  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if(time === 120) {
      getInitData();
    }
  }, [time]);

  useEffect(() => {
    console.log(results);
  },[results]);

  const getInitData = async () => {
      try {
        const data:any = await getDrawData();
        if (data) {
          const row = data?.data?.lastDraw[0];
          console.log("row", row);
          
          setResults(row.no1);
          setDrawNumber(row.numbers);
          setLastFiveDraw(data?.data?.lastDraws);
          // setJackpot(data?.data?.currentJackpot)
        }
      } catch (error) {
        console.error("Error fetching draw data:", error);
      }
  };

  // const startLottery = (draw: number, time: number, index: number) => {
  //   let interval: NodeJS.Timeout;

  //   // Commencer la loterie pour cet index
  //   interval = setInterval(() => {
  //     const randomNum = Math.floor(Math.random() * 90) + 1; // Générer un nombre aléatoire entre 1 et 90
  //     setResults((prevResults) => {
  //       const newResults = [...prevResults];
  //       newResults[index] = randomNum; // Mettre à jour seulement le résultat à cet index
  //       return newResults;
  //     });
  //   }, 50);

  //   // Arrêter la loterie après `time` millisecondes
  //   setTimeout(() => {
  //     clearInterval(interval);
  //     setResults((prevResults) => {
  //       const newResults = [...prevResults];
  //       newResults[index] = draw; // Réinitialiser à la valeur finale pour cet index
  //       return newResults;
  //     });
  //     if (index === 4) {
  //       // setDrawing(prev => !prev)
  //       setTimeout(() => {
  //         setTime(startingSeconds)
  //       },2000)
  //     }
  //   }, time);

  // };
  

  return (
    <div className="flex flex-row w-full h-full bg-[url('/red.jpg')] overflow-hidden">

      {/* left */}
      <div className="flex-[15%] flex-row">
        <div className=" flex flex-col w-full h-1/4 m-auto">
          <MainTimer time={time} setTime={setTime}/>
        </div>
        <div className=" flex w-full h-2/4 m-auto">
          {/* <img src={logo} className="m-auto px-[5%] w-auto h-auto" /> */}
        </div>
        <div className=" flex flex-col w-full h-1/4 m-auto">
          <MainDrawNumber drawNumber={drawNumber} setDrawNumber={setDrawNumber}/>
        </div>
      </div>

      {/* middle */}
      <div className="flex-[60%] flex-col items-center relative m-auto">
        <div className="flex flex-col items-center relative">
          <SpinWheel winningNumber={results} start={start} setStart={setStart}/>
        </div>
      </div>

      {/* Right */}
      <div className="flex-[20%]">Hell</div>
    </div>
  );
};

export default WheelOfFortune;
