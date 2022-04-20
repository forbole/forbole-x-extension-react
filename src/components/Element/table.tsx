import React from 'react'

interface Props {
  striped?: boolean
  head: React.ReactChild[]
  rows: React.ReactChild[][]
}

const Table: React.FC<Props> = ({ striped, head, rows }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className={striped ? 'border' : 'border-b'}>
          {head.map((h, i) => (
            <td className="p-4 text-left" key={String(i)}>
              {h}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr className={striped ? 'border odd:bg-surface-100' : 'border-b'} key={String(i)}>
            {r.map((c, j) => (
              <td className="p-4 text-left" key={String(j)}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
