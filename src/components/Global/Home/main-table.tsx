import { useEffect, useState } from 'react'
import LowHignStats from './low-hign-stats'
import OddEvenStats from './odd-even-stats'
import ColorStats from './color-stats'
import DozensStats from './dozens-stats'
import MainNumberStats from './main-number-stats'

type Props = {
  lastUndredDraw: any,
  lastDraw: any
}

const MainTable = ({lastUndredDraw, lastDraw}: Props) => {
  const [first, setFirst] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [third, setThird] = useState<number>(0);
  const [black, setBlack] = useState<number>(0);
  const [red, setRed] = useState<number>(0);
  const [green, setGreen] = useState<number>(0);
  const [odd, setOdd] = useState<number>(0);
  const [even, setEven] = useState<number>(0);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);
  const [numbers, setNumbers] = useState<any>([]);

  useEffect(() => {
    sortStatistics()
  },[lastUndredDraw]);

  const sortStatistics = () => {
    let first = 0;
    let second = 0;
    let third = 0;
    let black = 0;
    let red = 0;
    let green = 0;
    let odd = 0;
    let even = 0;
    let low = 0;
    let high = 0;
    let numberStats: { number: number; value: number }[] = Array.from({ length: 37 }, (_, i) => ({ number: i, value: 0 }));
  
    const redNumbers = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
    const blackNumbers = new Set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);
  
    lastUndredDraw.forEach((draw: {numbers: any, no1: number}) => {
      const number = draw.no1;
  
      // Douzaines
      if (number >= 1 && number <= 12) {
        first++;
      } else if (number >= 13 && number <= 24) {
        second++;
      } else if (number >= 25 && number <= 36) {
        third++;
      }
  
      // Couleurs
      if (redNumbers.has(number)) {
        red++;
      } else if (blackNumbers.has(number)) {
        black++;
      } else {
        green++; // Pour le 0
      }
  
      // Pair et impair
      if (number !== 0) {
        if (number % 2 === 0) {
          even++;
        } else {
          odd++;
        }
      }
  
      // Manque (1-18) et Passe (19-36)
      if (number >= 1 && number <= 18) {
        low++;
      } else if (number >= 19 && number <= 36) {
        high++;
      }
  
      // Comptage des occurrences de chaque numéro
      if(numberStats[number]) numberStats[number].value++;
      // console.log(numberStats[number]);
      
    });
  
    setFirst(first);
    setSecond(second);
    setThird(third);
    setBlack(black);
    setRed(red);
    setGreen(green);
    setOdd(odd);
    setEven(even);
    setLow(low);
    setHigh(high);
    setNumbers(numberStats);
  };

  useEffect(() =>{
    console.log("numbers: ", numbers);
    
  },[numbers]);

  
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-row w-full h-full gap-5 pt-[5%] px-1 font-bold">
        <div className="flex-[2] w-full h-full">
          <table className=" w-full h-full px-2">
            <thead>
              <tr>
                <td colSpan={2} className="font-bold text-lg" style={{ color: '#fff' }}>
                    PAY TABLE
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={3} className="border border-gray-400 w-3/4 font-bold text-lg text-center" style={{ color: '#fff' }}>COLOR</td>
                <td className="border border-gray-400 w-1/4 bg-black  font-bold text-lg text-center" style={{ color: '#fff' }}>2</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-1/4 bg-red-600 font-bold text-lg text-center" style={{ color: '#fff' }}>2</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-1/4 bg-green-600 font-bold text-lg text-center" style={{ color: '#fff' }}>36</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-3/4 font-bold text-lg text-center" style={{ color: '#fff' }}>DOZENS</td>
                <td className="border border-gray-400 w-1/4 font-bold text-lg  text-center bg-gray-300" style={{ color: '#000' }}>3</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-3/4 font-bold text-lg  text-center" style={{ color: '#fff' }}>EVEN / ODD</td>
                <td className="border border-gray-400 w-1/4 font-bold text-lg  text-center bg-gray-300" style={{ color: '#000' }}>2</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-3/4 font-bold text-lg text-center" style={{ color: '#fff' }}>LOW / HIGH</td>
                <td className="border border-gray-400 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>2</td>
              </tr>
              <tr>
                <td className="border border-gray-400 w-3/4 font-bold text-lg text-center" style={{ color: '#fff' }}>NUMBER</td>
                <td className="border border-gray-400 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>36</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-[1] w-full h-full">
          <table className="w-full h-full px-2">
            <thead>
              <tr>
                <td colSpan={2} className="font-bold text-lg" style={{ color: '#fff' }}>
                    LATEST GAMES
                </td>
              </tr>
            </thead>
            <tbody>
              {lastDraw && lastDraw.map((row: any, index: number) => {
                // Fonction pour déterminer la couleur du fond selon les règles de la roulette
                const getBackgroundColor = (number: number) => {
                  if (number === 0) {
                    return 'bg-green-500'; // Le 0 est vert
                  }
                  // Vérifier si le numéro est rouge ou noir
                  const isRed = [
                    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
                  ].includes(number);
                  return isRed ? 'bg-red-600' : 'bg-black'; // Rouge ou noir
                };

                return (
                  <tr key={index}>
                    <td className="border border-gray-400 w-3/4 font-bold text-lg text-center" style={{ color: '#fff' }}>
                      #{row.numbers}
                    </td>
                    <td className={`border border-gray-400 w-1/4 font-bold text-lg text-center ${getBackgroundColor(row.no1)}`} style={{ color: '#fff' }}>
                      {row.no1}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col w-full h-full p-[1%] items-center">
        <p className="font-bold py-1 text-lg" style={{ color: '#fff' }}>STATISTICS</p>
        <div className="border border-gray-400 w-full h-full p-3">
        
            {/*  Number stat */}
            <MainNumberStats numbers={numbers} />
        
            {/* Dozens stat */}
            <DozensStats first={first} second={second} third={third}/>
        
            {/* Color stat */}
            <ColorStats black={black} red={red} green={green} />

            {/* Odd / even stat */}
            <OddEvenStats odd={odd} even={even} />

            {/* low / high stat */}
            <LowHignStats low={low} high={high} />
        </div>
      </div>
    </div>
  )
}

export default MainTable;