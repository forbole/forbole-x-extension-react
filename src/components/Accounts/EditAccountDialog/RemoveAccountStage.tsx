import Button from '../../Element/button'

interface Props {
  onCancel: () => void
  onDelete: () => void
}

const RemoveAccountStage = ({ onCancel, onDelete }: Props) => {
  return (
    <div className="flex flex-col items-center pt-28">
      <h2 className="text-center">Remove Account</h2>
      <p className="max-w-sm text-center mt-8 mb-12">
        Are you sure you would like to remove this account?
      </p>
      <div className="flex w-full">
        <div className="ml-8 mr-4 flex-1">
          <Button onClick={onCancel} text="Cancel" secondary />
        </div>
        <div className="mr-8 ml-4 flex-1">
          <Button onClick={onDelete} text="Yes" />
        </div>
      </div>
    </div>
  )
}

export default RemoveAccountStage
