
type Props = {
    odd: number,
    even: number
}

const OddEvenStats = ({odd, even}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={4} className="p-2 font-bold text-lg" style={{ color: '#fff' }}>ODD / EVEN (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>ODD</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center" style={{ color: '#fff' }}>{odd}</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>EVENT</td>
            <td className="border border-gray-400 p-1 w-1/4 font-bold text-lg text-center" style={{ color: '#fff' }}>{even}</td>
        </tr>
    </table>
  )
}

export default OddEvenStats