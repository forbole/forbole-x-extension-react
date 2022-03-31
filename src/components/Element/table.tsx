import React from 'react'

interface Props {
  head: React.ReactChild[]
  rows: React.ReactChild[][]
}

const Table: React.FC<Props> = ({ head, rows }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          {head.map((h, i) => (
            <th className="p-2 text-left" key={String(i)}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr className="border-b" key={String(i)}>
            {r.map((c, j) => (
              <td className="p-2 text-left" key={String(j)}>
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
