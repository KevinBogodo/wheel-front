import React from 'react'

type Props = {
    odd: number,
    even: number
}

const OddEvenStats = ({odd, even}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={4} className="p-2 font-semibold">ODD / EVEN (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center bg-gray-300 text-black">ODD</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center">{odd}</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center bg-gray-300 text-black">EVENT</td>
            <td className="border border-gray-400 p-1 w-1/4 font-semibold text-center">{even}</td>
        </tr>
    </table>
  )
}

export default OddEvenStats