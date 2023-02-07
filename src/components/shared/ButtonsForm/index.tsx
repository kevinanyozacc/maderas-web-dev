import Spinner from '../Spinner'

interface Props {
  back?: () => void
  next?: () => void
  isLoading?: boolean
  onEnd?: () => void
  isFirst?: boolean
  isLast?: boolean
  handleDisable?: boolean
  onSubmitSave?: (e?: any) => void
}

const ButtonsForm = ({
  back,
  next,
  onEnd,
  isLoading,
  isFirst = false,
  isLast = false,
  handleDisable = false,
  onSubmitSave
}: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-center justify-between mt-auto w-full">
      {!isFirst && (
        <button
          type="button"
          onClick={back}
          className="w-full lg:w-max self-end btn btn-outline-primary"
        >
          Regresar
        </button>
      )}
      <button
        type="submit"
        onClick={() => onSubmitSave?.()}
        className="w-full lg:w-max self-end ml-auto btn btn-outline-primary"
        disabled={handleDisable}
      >
        Guardar
      </button>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          !isLast ? next?.() : onEnd?.()
        }}
        className="w-full lg:w-max self-end btn btn-solid-primary"
      >
        {isLast ? 'Finalizar' : 'Siguiente'}
        {isLoading && <Spinner />}
      </button>
    </div>
  )
}

export default ButtonsForm
