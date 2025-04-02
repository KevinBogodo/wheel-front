import React from 'react';

type Props = {
  numbers: { number: number; value: number }[];
};

const MainNumberStats = ({ numbers }: Props) => {
  // Convertir numbers en un objet clé-valeur pour un accès rapide
  const numberStatsMap = new Map(numbers.map(({ number, value }) => [number, value]));

  // Tableau des numéros de la roulette européenne avec leur couleur associée
  const tableNumbers: [number, string][] = [
    [1, 'red'], [13, 'black'], [25, 'red'],
    [2, 'black'], [14, 'red'], [26, 'black'],
    [3, 'red'], [15, 'black'], [27, 'red'],
    [4, 'black'], [16, 'red'], [28, 'black'],
    [5, 'red'], [17, 'black'], [29, 'black'],
    [6, 'black'], [18, 'red'], [30, 'red'],
    [7, 'red'], [19, 'red'], [31, 'black'],
    [8, 'black'], [20, 'black'], [32, 'red'],
    [9, 'red'], [21, 'red'], [33, 'black'],
    [10, 'black'], [22, 'red'], [34, 'red'],
    [11, 'black'], [23, 'black'], [35, 'black'],
    [12, 'red'], [24, 'red'], [36, 'red'],
  ];

  return (
    <>
      <table className="w-full p-2">
        <thead>
          <tr>
            <td colSpan={6} className="p-2 font-semibold">
              NUMBERS (LASTEST 120 DRAWS)
            </td>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 3 }, (_, colIndex) => {
                const [number, color] = tableNumbers[rowIndex + colIndex * 12];
                const statValue = numberStatsMap.get(number) || 0;
                return (
                  <React.Fragment key={number}>
                    <td className={`border border-gray-400 p-1 w-1/12 font-semibold text-center ${color === 'red' ? 'bg-red-600' : 'bg-black'}`}>
                      {number}
                    </td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">
                      {statValue}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="border border-gray-400 p-1 w-1/2 font-semibold text-center bg-green-600">0</td>
            <td className="border border-gray-400 p-1 w-1/2 font-semibold text-center">{numberStatsMap.get(0) || 0}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MainNumberStats;
