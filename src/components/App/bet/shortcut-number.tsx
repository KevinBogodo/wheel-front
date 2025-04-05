import { Button } from '@/components/ui/button';

type Props = {
    setBetNumber : (numbers: number[]) => void,
    setOdds : (numbers: number[]) => void
}

const ShortcutNumber = ({ setBetNumber, setOdds}: Props) => {

    function generateRandomNumbers(n: number): void {
        const numbers: number[] = [];
        const odds: number[] = [];
        
        // Générer un tableau avec n fois 1
        for (let i = 0; i < n; i++) {
            odds.push(1);
        }
        // Générer n numéros uniques
        while (numbers.length < n) {
          const randomNumber = Math.floor(Math.random() * 90) + 1;
          if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
          }
        }
        setBetNumber(numbers);
        setOdds(odds);
      }
      
  return (
    <>
      {/* aléatoire */}
      <div className='flex-[1] flex-col gap-3 px-5 pt-3 align-middle items-center h-full w-full bg-gray-300'>
        <p className='text-center p-1 font-bold text-xl'>Aléatoire</p>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(1)}>1</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(2)}>2</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(3)}>3</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(4)}>4</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(5)}>5</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(6)}>6</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(7)}>7</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(8)}>8</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(9)}>9</Button>
        <Button className='w-full h-[8%] scroll-m-20 border-gray-400 shadow-inner shadow-gray-200 border-4 tracking-tight px-auto mb-[3%] bg-gray-400 font-bold text-xl' onClick={() => generateRandomNumbers(10)}>10</Button>
      </div>
    </>
  )
}

export default ShortcutNumber