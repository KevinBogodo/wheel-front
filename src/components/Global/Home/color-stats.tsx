import React from 'react'

type Props = {
    black: number,
    red: number,
    green: number
}

const ColorStats = ({black, red, green}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={3} className="p-2 font-semibold">COLOR (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/3 font-semibold text-center bg-black">{black}</td>
            <td className="border border-gray-400 p-1 w-1/3 font-semibold text-center bg-red-600">{red}</td>
            <td className="border border-gray-400 p-1 w-1/3 font-semibold text-center bg-green-600">{green}</td>
        </tr>
    </table>
  )
}

export default ColorStats