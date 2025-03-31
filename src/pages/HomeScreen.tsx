import io from "socket.io-client";
import Section from "@/components/Global/Section"
import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
const socket = io(`${api.SOCKET_URL}`);

import voiture from '@/assets/images/voiture.png';
import moto  from '@/assets/images/mt.png';
import fera from '@/assets/images/FER.png';
import pwbank from '@/assets/images/PB.png';
import k5 from '@/assets/images/5k.png';
import casque from '@/assets/images/CS.png';

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}

import { useEffect, useState } from "react";
import ScrollTitle from "@/components/Global/Home/ScrollTitle";
import { getDrawData } from "@/helper/backend_helper";
import { api } from "@/config";
import { formatNumberWithComma } from "@/helper/globalFunction";
import CardLot from "@/components/Global/card-lot";
import Confetti from "@/components/Global/confetti";
import FloatingImage from "@/components/Global/floating-image";
import FallingMoney from "@/components/Global/floating-money";
import BillAnimation from "@/components/Global/bill-animation";
import MainTimer from "@/components/Global/Home/main-timer";
import MainDrawNumber from "@/components/Global/Home/main-draw-number";

const imagesMap: Record<string, string> = {
  voiture: voiture,
  moto: moto,
  fera: fera,
  pwbank: pwbank,
  k5: k5,
  casque: casque,
};

const HomeScreen = () => {
  const startingMinutes = 2;
  const startingSeconds = startingMinutes * 60;
  // const images = import.meta.glob('@/assets/images/*.png', { eager: true });
  const [time, setTime] = useState(startingSeconds);
  const [drawNumber, setDrawNumber] = useState(0);
  const [results, setResults] = useState<Array<number>>([0,0,0,0,0]);
  const [lastFiveDraw, setLastFiveDraw] = useState([]);
  const [scale, setScale] = useState(1);
  const [jackpot, setJackpot] = useState<{amount: number, betNumber: string, status: number }>();
  const [lot, setLot] = useState<any>();
  const [isJackpot, setIsJackpot] = useState(false);

  useEffect(() => {
    socket.on("new_draw", (data: []) => {
      data.forEach((draw, index) => {
        startLottery(draw, 5000 + (4000 * index), index);
      });
    });

    return () => {
      socket.off('new_draw'); 
    };
  },[]);

  useEffect(() => {
    const handleJackpot = (response: any) => {
      setJackpot(response);
    };

    socket.on("jackpot", handleJackpot);

    return () => {
      socket.off('jackpot');
    };
  },[]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
  
    const handleLot = (response: any) => {
      setLot(response.data);
      timeoutId = setTimeout(() => {
        setLot({});
      }, 35000);
    };
  
    socket.on("lot", handleLot);
  
    return () => {
      socket.off("lot", handleLot);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if(time === 120) {
      getInitData();
    }
  }, [time]);

  useEffect(() => {
    if (jackpot && jackpot.betNumber) {
      setIsJackpot(true);
      const interval = setInterval(() => {
        setScale((prev) => (prev === 1 ? 1.1 : 1));
      }, 1000);
  
      return () => clearInterval(interval);
    }
  },[jackpot]);

  useEffect(() => {
      console.log(isJackpot);
  }, [isJackpot]);

  useEffect(() => {
    if (lot&& lot.betNumber) {
      const interval = setInterval(() => {
        setScale((prev) => (prev === 1 ? 1.1 : 1));
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [lot]);

  const getInitData = async () => {
    try {
      const data:any = await getDrawData();
      if (data) {
        const row = data?.data?.lastDraw[0];
        setResults([row.no1, row.no2, row.no3, row.no4, row.no5]);
        setDrawNumber(row.numbers);
        setLastFiveDraw(data?.data?.lastDraws);
        setJackpot(data?.data?.currentJackpot)
      }
    } catch (error) {
      console.error("Error fetching draw data:", error);
    }
  };



  const startLottery = (draw: number, time: number, index: number) => {
    let interval: NodeJS.Timeout;

    // Commencer la loterie pour cet index
    interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 90) + 1; // Générer un nombre aléatoire entre 1 et 90
      setResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[index] = randomNum; // Mettre à jour seulement le résultat à cet index
        return newResults;
      });
    }, 50);

    // Arrêter la loterie après `time` millisecondes
    setTimeout(() => {
      clearInterval(interval);
      setResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[index] = draw; // Réinitialiser à la valeur finale pour cet index
        return newResults;
      });
      if (index === 4) {
        // setDrawing(prev => !prev)
        setTimeout(() => {
          setTime(startingSeconds)
        },2000)
      }
    }, time);

  };


  return (
    <main className="h-full w-full overflow-hidden">
      {/* Animation */}
      {(lot && lot.name) && <>
          <Confetti />
          <FloatingImage src={imagesMap[lot.code] || ''} size={300} animationSpeed={1000} />
        </>}

      {(isJackpot)  &&
        <>
          <FallingMoney />
          <BillAnimation setIsJackpot={setIsJackpot} />
        </>
      }

      {/* body */}
      
      <Section  className="flex flex-col w-full h-full bg-gradient-to-r from-green-200 to-blue-500">

        <Section id="home-header" className="flex items-start w-full h-20 bg-gradient-to-r from-green-400 to-blue-500 p-0 m-0 shadow-md">
          <div className="flex-[1] w-full inline-flex flex-nowrap overflow-hidden my-auto text-center text-xl font-semibold font-style: italic">
            <ScrollTitle title="LOTO" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-in" />
            <ScrollTitle title="LOTO" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-in" />
          </div>
          <div
            className="flex-[1] w-full my-auto text-center text-6xl font-bold p-0
            bg-gradient-to-r bg-clip-text  text-transparent from-red-700  to-yellow-400 animate-text max-w-xl:text-2xl"
          >
            <h1 className="shadow-xl">LOTO VOITURE</h1>
          </div>
          <div className="flex-[1] w-full inline-flex flex-nowrap overflow-hidden my-auto text-center text-xl font-semibold font-style: italic">
            <ScrollTitle title="VOITURE" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-out" />
            <ScrollTitle title="VOITURE" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-out" />
          </div>
        </Section>

        <Section id="home-main" className="flex flex-row items-start text-black w-full h-full mt-0 bg-[url('/bgb03.png')] bg-no-repeat bg-left overflow-hidden">
          {/* Left */}
          <div className="flex-[4] flex-col w-full h-full my-auto place-content-center pt-5">
              <div className="flex flex-col w-full h-full my-auto place-content-center items-center pt-5">

                {/* Timer */}
                <MainTimer time={time} setTime={setTime}/>
                
                {/* Num Tirage */}
                <MainDrawNumber drawNumber={drawNumber} setDrawNumber={setDrawNumber}/>

                {/* Tirage */}
                <div className="flex items-center place-content-center w-full h-[30%] p-0 ">
                  <div className="flex h-full w-4/5 text-2xl items-center place-content-center m-0 p-0 gap-4">
                    {results.map((draw, index) => (
                        <p
                          key={index}
                          className={"w-36 h-36 rounded-full bg-black text-8xl text-yellow-400 place-content-center text-center shadow-xl"
                            +(isJackpot ? "border-4 border-blue-500 animate-blink" : "")}>
                          {draw}
                      </p>
                    ))
                    }
                  </div>
                </div>

                {/* Cagnote */}
                {lot && lot.code ?
                  <div
                    className={`flex rounded-xl items-center justify-center w-full h-[35%] transition-transform duration-500 ease-in-out 
                      relative`}
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  >
                    <div 
                      className={`flex rounded-xl bg-yellow-400  h-2/3 w-4/5 text-2xl items-center place-content-center m-0 p-0 gap-4 px-2
                        ${lot && lot.betNumber ? 'border-4 border-blue-500 animate-blink' : 'border-0'}`}
                    >
                      <div className="flex-[2] flex-col h-full p-2">
                        <p className="text-xl font-semibold text-start pb-2">Num ticket:</p>
                        <p className="text-4xl font-bold  mx-auto p-2 text-start place-content-center w-full h-[60%] 2xl:text-5xl">{lot && lot.betNumber || '' }</p>
                      </div>
                    </div>
                  </div>
                  :
                  <div
                    className={`flex rounded-xl items-center justify-center w-full h-[35%] transition-transform duration-500 ease-in-out 
                      relative`}
                    style={{
                      transform: `scale(${scale})`,
                    }}
                  >
                    <div 
                      className={`flex rounded-xl border bg-yellow-400 h-2/3 w-4/5 text-2xl items-center place-content-center m-0 p-0 gap-4 px-2
                        ${isJackpot ? 'z-[50] border-4 border-blue-500 animate-blink' : 'border-0 z-[50]'}`
                      }
                    >
                      <div className="flex-[2] flex-col h-full p-2">
                          <p className="text-xl font-semibold text-start border-b-2 border-gray-300 pb-2">Cagnotte:</p>
                          <p className="text-4xl font-bold p-2 text-start w-full h-[60%] place-content-center 2xl:text-6xl">{jackpot && `${formatNumberWithComma(jackpot.amount)} FCFA` || '' } </p>
                      </div>
                      <div className="flex-[2] border-l-2 border-gray-300 flex-col h-full p-2">
                        <p className="text-xl font-semibold text-start border-b-2 border-gray-300 pb-2">Num ticket:</p>
                        <p className="text-4xl font-bold  mx-auto p-2 text-start place-content-center w-full h-[60%] 2xl:text-5xl">{jackpot && jackpot.betNumber || '' }</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
          </div>

          {/* Right */}
          <div className="flex-[1] w-1/2 h-full mb-5 bg-gradient-to-r from-slate-900 to-slate-700 overflow-hidden mx-1">
              <div className="flex flex-col w-full">
                <p className="text-sm text-white m-2">Dernier tirages</p>
                  {lastFiveDraw && lastFiveDraw.map((row:any, index) => {
                    return <div key={index} className="flex flex-col rounded-xl gap-1 shadow-md m-0.5 bg-gradient-to-r from-blue-500 to-teal-400">
                      <div className="inline-flex gap-2 p-1 w-full text-sm">
                        <div className="flex gap-1 p-1 text-md border-b border-gray-300 W-1/3">
                          <p className="text-xs place-content-center"> Tirage No: </p>
                          <p className="font-semibold">{row.numbers}</p>
                        </div>
                      </div>
                        <div className="flex-[1] inline-flex place-content-end gap-2 pr-2 pb-2">
                          <p className="bg-black text-yellow-400 text-md w-7 h-7 text-center place-content-center rounded-full">{row.no1}</p>
                          <p className="bg-black text-yellow-400 text-md w-7 h-7 text-center place-content-center rounded-full">{row.no2}</p>
                          <p className="bg-black text-yellow-400 text-md w-7 h-7 text-center place-content-center rounded-full">{row.no3}</p>
                          <p className="bg-black text-yellow-400 text-md w-7 h-7 text-center place-content-center rounded-full">{row.no4}</p>
                          <p className="bg-black text-yellow-400 text-md w-7 h-7 text-center place-content-center rounded-full">{row.no5}</p>
                        </div>
                    </div>
                  })}
              </div>
          </div>
        </Section>

        {/* fotter */}
        <div className="inline-flex items-start bg-yellow-300 w-full h-[20%] p-2 pb-3 gap-1">
            <CardLot lot= {voiture} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl" className="w-full h-full" />
            <CardLot lot= {moto} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl" className="w-full h-full" />
            <CardLot lot= {fera} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl" className="w-full h-full" />
            <CardLot lot= {pwbank} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl" className="w-full h-full" />
            <CardLot lot= {casque} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl" className="w-full h-full" />
            <CardLot lot= {k5} cardClassName="w-1/6 h-full bg-white border-0 shadow-xl overflow-hidden" className="w-[80%] h-[70%]" />
        </div>
      </Section>
    </main>
  )
}

export default HomeScreen