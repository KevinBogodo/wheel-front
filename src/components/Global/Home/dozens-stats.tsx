import React from 'react'

type Props = {
    first: number,
    second: number,
    third: number
}

const DozensStats = ({first, second, third}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={6} className="p-2 font-semibold">DOZENS (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center bg-gray-300 text-black">1-12</td>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center">{first}</td>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center bg-gray-300 text-black"> 13-24</td>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center">{second}</td>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center bg-gray-300 text-black">25-36</td>
            <td className="border border-gray-400 p-1 w-1/6 font-semibold text-center">{third}</td>
        </tr>
    </table>
  )
}

export default DozensStats