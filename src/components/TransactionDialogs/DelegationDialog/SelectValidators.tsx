import React from 'react'
import keyBy from 'lodash/keyBy'
import shuffle from 'lodash/shuffle'
import { Combobox, Transition } from '@headlessui/react'
import { Loadable, useRecoilValueLoadable } from 'recoil'
import {
  validatorsState,
  randomizedValidatorsState,
  filteredValidatorsState,
} from '../../../recoil/validators'

interface SelectValidatorsProps {
  onConfirm(delegations: Array<{ amount: number; validator: Validator }>, memo: string): void
  delegations: Array<{ amount: number; validator: Validator }>
  //   price: number
  validators: Loadable<Validator[]>
  amount: number
  denom: string
  loading: boolean
  account: AccountDetail
}

const SelectValidators = ({
  account,
  onConfirm,
  delegations: defaultDelegations,
  //   price,
  validators,
  amount,
  denom,
  loading,
}: SelectValidatorsProps) => {
  const [load, setLoading] = React.useState(true)
  const [memo, setMemo] = React.useState('')
  // const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: string; validator: any; percentage: string; showSlider: boolean }>
  >(
    defaultDelegations
      ? defaultDelegations.map((d) => ({
          amount: d.amount.toString(),
          validator: d.validator,
          percentage: ((100 * d.amount) / amount).toFixed(2),
          showSlider: false,
        }))
      : [{ amount: amount.toString(), validator: {}, percentage: '100', showSlider: false }]
  )
  //   console.log(delegations)
  const validatorsMap = keyBy(validators.contents, 'address')
  const [query, setQuery] = React.useState('')
  //   const randomizedValidators = React.useMemo(() => shuffle(validators), [])
  //   const randomizedValidators = useRecoilValueLoadable(
  //     randomizedValidatorsState({
  //       chainId: account.state === 'hasValue' ? account.contents.chain : '',
  //     })
  //   )
  const randomizedValidators = useRecoilValueLoadable(
    randomizedValidatorsState({
      chainId: account.chain,
    })
  )
  //   const filteredValidators =
  //     query === ''
  //       ? validators
  //       : validators.contents.filter((o) => {
  //           return (validatorsMap[o].name || '').toLowerCase().includes(query.toLowerCase())
  //         })

  const filteredValidators = useRecoilValueLoadable(
    query === ''
      ? validatorsState({ chainId: account.chain })
      : filteredValidatorsState({
          chainId: account.chain,
          query: query,
        })
  )

  React.useMemo(() => {
    setDelegations((d) =>
      d.map((a, j) =>
        j < delegations.length - 1
          ? {
              ...a,
              percentage: String(((1 / delegations.length) * 100).toFixed(2)) || '',
              amount: String(amount * (1 / delegations.length)),
            }
          : {
              ...a,
              percentage:
                String(
                  (100 - (1 / delegations.length) * (delegations.length - 1) * 100).toFixed(2)
                ) || '',
              amount: String(amount * (1 - (1 / delegations.length) * (delegations.length - 1))),
            }
      )
    )
  }, [delegations.length])

  const [selectedPerson, setSelectedPerson] = React.useState(['test'])

  const totalAmount = React.useMemo(
    () => delegations.map((v) => Number(v.amount)).reduce((a, b) => a + b, 0),
    [delegations]
  )

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(
          delegations
            .filter((v) => v.validator.name && Number(v.amount))
            .map((v) => ({
              validator: v.validator,
              amount: Number(v.amount),
            })),
          memo
        )
      }}
    >
      <div className="px-5 flex flex-col items-start">
        <div className="px-5 flex flex-row items-start">
          <p>Target delegation amount</p>
          <p className="font-bold pl-2">{amount}</p>
        </div>
      </div>
      {/* {delegations.map((v, i) => ( */}
      {/* {load && ( */}
      <Combobox
        value={delegations}
        onChange={
          //   e.preventDefault
          // setDelegations((d) =>
          //   d.map((a, j) => (j === delegations.length ? { ...a, validator: delegations || {} } : a))
          // )
          setDelegations
        }
        // onChange={setSelectedPerson}
        //   multiple
      >
        <>
          {randomizedValidators.state === 'hasValue' && randomizedValidators.contents.length > 0 && (
            <ul>
              {randomizedValidators.contents.map((validator) => (
                <li key={validator.address}>{validator.name}</li>
              ))}
            </ul>
          )}
          <Combobox.Input
            onChange={(e) => {
              setDelegations((d) =>
                d.map((a, j) =>
                  j === delegations.length ? { ...a, validator: e.target.value || {} } : a
                )
              )
            }}
            displayValue={(v: Validator) => v.name}
          />
          <Combobox.Options>
            {filteredValidators.state === 'hasValue' &&
              filteredValidators.contents.map((validator) => (
                <Combobox.Option key={validator.address} value={validator}>
                  {validator.name}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </>
      </Combobox>
      {/* )} */}
      {/* ))} */}
    </form>
  )
}

export default SelectValidators
