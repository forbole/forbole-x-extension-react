import { useForm } from 'react-hook-form'
import Button from '../../Element/button'

type Props = {
  onSubmit: (name: string) => void
  account: Account
}

type Input = {
  name: string
}

const ChangeMonikerStage = ({ onSubmit, account }: Props) => {
  const { register, handleSubmit, watch } = useForm<Input>()

  const onFormSubmit = (data) => {
    onSubmit(data.name)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="flex flex-col mt-5 px-4">
        <p className="max-w-sm mb-2">Account moniker</p>
        <input
          key="name"
          defaultValue={account.name}
          {...register('name', { required: true })}
          className="form-input shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Button disabled={!watch('name')} text="Save" type="submit" />
      </div>
    </form>
  )
}

export default ChangeMonikerStage
