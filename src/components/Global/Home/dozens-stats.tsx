
type Props = {
    first: number,
    second: number,
    third: number
}

const DozensStats = ({first, second, third}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={6} className="p-2 font-bold text-lg" style={{ color: '#fff' }}>DOZENS (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>1-12</td>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center" style={{ color: '#fff' }}>{first}</td>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}> 13-24</td>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center" style={{ color: '#fff' }}>{second}</td>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center bg-gray-300" style={{ color: '#000' }}>25-36</td>
            <td className="border border-gray-400 p-[0] w-1/6 font-bold text-lg text-center" style={{ color: '#fff' }}>{third}</td>
        </tr>
    </table>
  )
}

export default DozensStats