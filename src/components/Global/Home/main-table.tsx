import React from 'react'
import LowHignStats from './low-hign-stats'
import OddEvenStats from './odd-even-stats'
import ColorStats from './color-stats'
import DozensStats from './dozens-stats'

type Props = {}

const MainTable = (props: Props) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-row w-full h-full gap-5 p-5">
            <div className="flex-[2] w-full h-full">
              <table className=" w-full h-full p-2">
                <thead>
                  <tr>
                    <th colSpan={2} className="font-semibold">
                        PAY TABLE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={3} className="border border-gray-400 w-3/4 p-1 font-semibold text-center">COLOR</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-black text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-1/4 p-1 bg-red-600 text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-1/4 p-1 bg-green-600 text-center">36</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">DOZENS</td>
                    <td className="border border-gray-400 w-1/4 p-1 text-center bg-gray-300 text-black">3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">EVEN / ODD</td>
                    <td className="border border-gray-400 w-1/4 p-1 text-center bg-gray-300 text-black">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">LOW / HIGH</td>
                    <td className="border border-gray-400 w-1/4 p-1 text-center bg-gray-300 text-black">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">NUMBER</td>
                    <td className="border border-gray-400 w-1/4 p-1 text-center bg-gray-300 text-black">36</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex-[1] w-full h-full">
              <table className="w-full h-full p-2">
                <thead>
                  <tr>
                    <th colSpan={2} className="font-semibold">
                        LATEST GAMES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-red-600 text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-black text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-black text-center">31</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-red-600 text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-black text-center">16</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-black text-center">2</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 w-3/4 p-1 font-semibold text-center">#123456789</td>
                    <td className="border border-gray-400 w-1/4 p-1 bg-green-600 text-center">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full h-full p-5 items-center">
            <p className="font-semibold py-1">STATISTICS</p>
            <div className="border-2 border-gray-400 w-full h-full p-3">
            
                {/*  Number stat */}
                <table className=" w-full p-2">
                <thead>
                    <tr>
                    <td colSpan={6} className="p-2 font-semibold">
                        NUMBERS (LASTEST 120 DRAWS)
                    </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">1</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">13</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">25</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">2</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">40</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">14</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">1</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">26</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">30</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">3</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">15</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">27</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">4</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">16</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">28</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">5</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">17</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">29</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">6</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">18</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">30</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">7</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">19</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">31</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">8</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">20</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">32</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">9</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">21</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">33</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">10</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">22</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">34</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">11</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">22</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">35</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    <tr>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">12</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">4</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-black">23</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">12</td>
                    <td className="border border-gray-400 p-1 w-1/12 font-semibold text-center bg-red-600">36</td>
                    <td className="border border-gray-400 p-1 w-2/12 px-2 font-semibold text-center">13</td>
                    </tr>
                    
                </tbody>
                </table>
                <table className="w-full">
                <tr>
                    <td className="border border-gray-400 p-1 w-1/2 font-semibold text-center bg-green-600">0</td>
                    <td className="border border-gray-400 p-1 w-1/2 font-semibold text-center">1</td>
                </tr>
                </table>
            
                {/* Dozens stat */}
                <DozensStats first={12} second={23} third={32}/>
            
                {/* Color stat */}
                <ColorStats black={24} red={100} green={0} />

                {/* Odd / even stat */}
                <OddEvenStats odd={10} even={12} />

                {/* low / high stat */}
                <LowHignStats low={12} high={10} />
            </div>
          </div>
        </div>
  )
}

export default MainTable