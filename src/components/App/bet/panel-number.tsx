import { CircleChevronDown, CircleChevronLeft, CircleChevronRight, CircleChevronUp } from 'lucide-react';
import NumberBord from './number-bord';

const initialBord = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
];

type Props = {
  isDisabled: boolean,
  disableAdd: boolean,
  editBet: (number: number, action: 'add' | 'sub') => void,
  selectFiveNumbers: (numbers: number[]) => void,
}

const PanelNumber = ({ disableAdd, editBet, isDisabled, selectFiveNumbers }: Props) => {
  const handleSelectColumnTop = (colIndex: number) => {
    let fiveNumbers = [];
    for (let i = 0; i < 5; i++) {
      fiveNumbers.push(initialBord[i][colIndex]);
    }
    selectFiveNumbers(fiveNumbers);
  };

  const handleSelectColumnBottom = (colIndex: number) => {
    let fiveNumbers = [];
    for (let i = 4; i < 9; i++) {
      fiveNumbers.push(initialBord[i][colIndex]);
    }
    selectFiveNumbers(fiveNumbers);
  };
  const handleSelectColumnLeft = (rowIndex: number) => {
    const fiveNumbers = initialBord[rowIndex].slice(0, 5);
    fiveNumbers.forEach(number => editBet(number, 'add'));
    selectFiveNumbers(fiveNumbers);
  };

  const handleSelectColumnRight = (rowIndex: number) => {
    const fiveNumbers = initialBord[rowIndex].slice(5, 10);
    fiveNumbers.forEach(number => editBet(number, 'add'));
    selectFiveNumbers(fiveNumbers);
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      {/* Ligne au-dessus */}
      <div className='flex justify-center items-center h-9 w-full px-[2%] bg-inherit'>
        {initialBord[0].map((_, colIndex) => (
          <button
            key={`top-${colIndex}`}
            onClick={() => handleSelectColumnTop(colIndex)}
            disabled={isDisabled || disableAdd}
            className='w-full h-full flex justify-center items-center text-white'>
            <CircleChevronDown className='text-primary' />
          </button>
        ))}
      </div>

      <div className='inline-flex h-full w-full justify-center items-center'>
        {/* Left action */}
        <div className='w-9 flex flex-col justify-between h-full bg-inherit'>
          {initialBord.map((_, rowIndex) => (
            <button
              key={`left-${rowIndex}`}
              onClick={() => handleSelectColumnLeft(rowIndex)}
              disabled={isDisabled || disableAdd}
              className='w-full h-full flex justify-center items-center text-white'>
              <CircleChevronRight className='text-primary' />
            </button>
          ))}
        </div>

        <div className='bg-accent grid grid-cols-10 grid-rows-9 w-full h-full gap-0'>
          {/* Tableau des numéros */}
          {initialBord.map((row, rowIndex) => (
            row.map((col, colIndex) => (
              <NumberBord
                key={`${rowIndex}-${colIndex}`}
                isDisabled={isDisabled || disableAdd}
                onClick={() => editBet(col, 'add')}
                className='text-2xl font-semibold w-full h-full flex items-center justify-center border'
              >
                {col}
              </NumberBord>
            ))
          ))}
        </div>

        {/* Right action */}
        <div className='w-9 flex flex-col justify-between h-full bg-inherit'>
          {initialBord.map((_, rowIndex) => (
            <button
              key={`right-${rowIndex}`}
              onClick={() => handleSelectColumnRight(rowIndex)}
              disabled={isDisabled || disableAdd}
              className='w-full h-full flex justify-center items-center text-white'>
              <CircleChevronLeft className='text-primary'/>
            </button>
          ))}
        </div>
      </div>

      {/* Ligne en-dessous */}
      <div className='flex justify-center items-center bg-inherit h-9 w-full px-[2%]'>
        {initialBord[0].map((_, colIndex) => (
          <button
            key={`bottom-${colIndex}`}
            onClick={() => handleSelectColumnBottom(colIndex)}
            disabled={isDisabled || disableAdd}
            className='w-full h-full flex justify-center items-center text-white'>
            <CircleChevronUp className='text-primary'/>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PanelNumber;
