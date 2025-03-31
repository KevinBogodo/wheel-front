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
        <Button variant='outline' onClick={() => generateRandomNumbers(2)}>aléatoire (2)</Button>
        <Button variant='outline' onClick={() => generateRandomNumbers(3)}>aléatoire (3)</Button>
        <Button variant='outline' onClick={() => generateRandomNumbers(4)}>aléatoire (4)</Button>
        <Button variant='outline' onClick={() => generateRandomNumbers(5)}>aléatoire (5)</Button>
    </>
  )
}

export default ShortcutNumber