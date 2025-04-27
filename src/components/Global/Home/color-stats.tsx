
type Props = {
    black: number,
    red: number,
    green: number
}

const ColorStats = ({black, red, green}: Props) => {
  return (
    <table className=" w-full p-2">
        <thead>
            <td colSpan={3} className="p-2 font-bold text-lg" style={{ color: '#fff' }}>COLOR (LASTEST 120 DRAWS)</td>
        </thead>
        <tr>
            <td className=" p-1 w-1/3 font-bold text-lg text-center bg-black" style={{ color: '#fff' }}>{black}</td>
            <td className=" p-1 w-1/3 font-bold text-lg text-center bg-red-600" style={{ color: '#fff' }}>{red}</td>
            <td className=" p-1 w-1/3 font-bold text-lg text-center bg-green-600" style={{ color: '#fff' }}>{green}</td>
        </tr>
    </table>
  )
}

export default ColorStats