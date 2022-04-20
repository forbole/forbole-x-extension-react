import React, { useEffect } from 'react'
import flatten from 'lodash/flatten'
import { formatCoins, sumCoins } from '../../../misc/utils'
import format from 'date-fns/format'
import Dialog from '../../Element/dialog'
import Table from '../../Element/table'

interface Props {
  open: boolean
  onClose: () => void
  vestings: Vesting[]
  chainId: string
}

const VestingDialog = ({ open, onClose, vestings, chainId }: Props) => {
  return (
    <Dialog title="Vesting" open={open} onClose={onClose}>
      <div className="relative h-[500px] overflow-auto px-8 mt-2">
        <h4>Total Vesting</h4>
        <h2 className="mb-4">
          {formatCoins(chainId, sumCoins(flatten(vestings.map((v) => v.amount))))}
        </h2>
        <Table
          striped
          head={['Amount', <p className="text-right">Vesting Period Date</p>]}
          rows={vestings.map((v, i) => [
            formatCoins(chainId, v.amount),
            <p className="text-right">{format(v.date, 'dd MMM, yyyy HH:mm')}</p>,
          ])}
        />
        <div className="h-8" />
      </div>
    </Dialog>
  )
}

export default VestingDialog
