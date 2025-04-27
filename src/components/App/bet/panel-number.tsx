import NumberBord from './number-bord';

const rouletteNumbers = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36]
];

const numberColors = {
  1: 'bg-red-600', 3: 'bg-red-600', 5: 'bg-red-600', 7: 'bg-red-600', 9: 'bg-red-600',
  12: 'bg-red-600', 14: 'bg-red-600', 16: 'bg-red-600', 18: 'bg-red-600', 19: 'bg-red-600',
  21: 'bg-red-600', 23: 'bg-red-600', 25: 'bg-red-600', 27: 'bg-red-600', 30: 'bg-red-600',
  32: 'bg-red-600', 34: 'bg-red-600', 36: 'bg-red-600',
  2: 'bg-black', 4: 'bg-black', 6: 'bg-black', 8: 'bg-black', 10: 'bg-black',
  11: 'bg-black', 13: 'bg-black', 15: 'bg-black', 17: 'bg-black', 20: 'bg-black',
  22: 'bg-black', 24: 'bg-black', 26: 'bg-black', 28: 'bg-black', 29: 'bg-black',
  31: 'bg-black', 33: 'bg-black', 35: 'bg-black',
  0: 'bg-green-600'
};

type Props = {
  isDisabled: boolean,
  disableAdd: boolean,
  editBet: (number: number, action: 'add' | 'sub') => void
}

const RouletteBoard = ({ disableAdd, editBet, isDisabled }: Props) => {
  return (
    <div className='flex-[6] flex-col w-full h-full justify-center items-center'>
      <div className='grid grid-cols-6 gap-[1%] w-full h-[85%]'>
        {rouletteNumbers.map((row) => (
          row.map((num) => (
            <NumberBord
              key={num}
              isDisabled={isDisabled || disableAdd}
              onClick={() => editBet(num, 'add')}
              className={`text-xl font-semibold w-full h-full flex items-center text-white justify-center border-gray-400 shadow-inner shadow-gray-200 ${numberColors[num as keyof typeof numberColors]}`}
            >
              {num}
            </NumberBord>
          ))
        ))}
      </div>
      <div className='grid grid-cols-1 mt-[1%] w-full h-[9%] bg-gre'>
        <NumberBord
          isDisabled={isDisabled || disableAdd}
          onClick={() => editBet(0, 'add')}
          className={`text-2xl font-semibold w-full h-full flex items-center text-white justify-center  border-gray-800 shadow-inner shadow-gray-800 ${numberColors[0]}`}
        >
          0
        </NumberBord>
      </div>
    </div>
  );
};

export default RouletteBoard;
