import React from 'react'

type Props = {
    low: number,
    high: number
}

const LowHignStats = ({low, high}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={4} className="p-2 font-bold text-lg" style={{ color: '#fff' }}>LOW /HIGH (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>LOW</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center" style={{ color: '#fff' }}>{low}</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>HIGH</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center" style={{ color: '#fff' }}>{high}</td>
        </tr>
    </table>
  )
}

export default LowHignStats