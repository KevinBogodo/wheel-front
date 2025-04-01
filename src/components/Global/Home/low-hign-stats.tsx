import React from 'react'

type Props = {
    low: number,
    high: number
}

const LowHignStats = ({low, high}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={4} className="p-2 font-semibold">LOW /HIGH (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center bg-gray-300 text-black">LOW</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center">{low}</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center bg-gray-300 text-black">HIGH</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center">{high}</td>
        </tr>
    </table>
  )
}

export default LowHignStats