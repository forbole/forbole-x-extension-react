import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import {ReactComponent as ArrowDownIcon} from '../../assets/images/icons/icon_arrow_down.svg'

type Props = {}

const BalanceCard = (props: Props) => {
  const data = [
    { name: 'Available', value: 221, color:'#007FFF' },
    { name: 'Delegated', value: 121, color:'#6ED588'},
    { name: 'Unbonding', value: 0 , color:'#F4B65A'},
    { name: 'Rewards', value: 225 , color:'#DB39F5'},
    { name: 'Commissions', value: 0.1, color:'#FF7448' },
  ]

  return (
    <div className="mx-5 p-6 rounded-xl bg-popup-100">
      <div className="flex justify-between items-end">
        <h3>Balance</h3>
        <div className="flex text-icon-light dark:text-icon-dark space-x-1">
          <p>Vesting</p><ArrowDownIcon />
        </div>
      </div>
      <div className="flex space-x-3 py-6">
        <PieChart width={144} height={144}>
          <Pie
             data={data.filter((d) => !!d.value)}
            innerRadius={60}
            outerRadius={60}
            paddingAngle={12}
            dataKey="value"
          >
            {data.filter((d) => !!d.value).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={entry.color}
                strokeLinejoin="round"
                strokeWidth={10}
              />
            ))}
          </Pie>
        </PieChart>
        <div className='w-full space-y-1'>
          {data.map((e,index) => (
            <div className='flex w-full justify-between items-center'>
            <div className='flex items-center space-x-2'>
            <div className={`rounded-sm h-3 w-3`} style={{backgroundColor: e.color}}/>
                <p>{e.name}</p>
            </div>
            <p className='self-end'>{e.value} DSM</p>
          </div>
          ))}
        </div>
      </div>
      <div>
        <div className='w-full h-px bg-black bg-opacity-20 mb-6' />
      <div className='flex justify-between'>
        <h2>Total balance</h2>
        <h2>121,211,614.46896 DSM</h2>
      </div>
      <div className='flex justify-between'>
        <p>$26.5 / DSM</p>
        <p>$16,313,9 USD</p>
      </div>
      </div>
    </div>
  )
}

export default BalanceCard
