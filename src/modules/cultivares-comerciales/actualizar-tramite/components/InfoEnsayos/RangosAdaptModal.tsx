import { nanoid } from 'nanoid'

import Modal from '@components/shared/Modal'
import Input from '@components/shared/Input'
import ModalHeader from '@components/shared/ModalHeader'

import useForm, { FormError } from '@hooks/useForm'
import isEmpty from 'validator/lib/isEmpty'
import { ErrorMessages } from '@validation/messages'
import { RangosAdaptacionInput } from '@modules/cultivares-comerciales/solicitar-tramite/interfaces/cultivaresComerciales'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  setRangosAdap: Dispatch<SetStateAction<RangosAdaptacionInput[]>>
}

const initialState: RangosAdaptacionInput = {
  MIN: '',
  MAX: '',
  id: ''
}

const RangosAdaptModal = ({ isOpen, onClose, setRangosAdap }: Props) => {
  const { values, ...form } = useForm({
    initialValues: initialState,
    validate: (values) => {
      const errors: FormError<typeof values> = {}
      if (isEmpty(values.MIN)) errors.MIN = ErrorMessages.empty
      if (isEmpty(values.MAX)) errors.MAX = ErrorMessages.empty
      return errors
    }
  })

  const clearForm = () => {
    form.clear()
    onClose?.()
  }

  const handleSubmit = () => {
    setRangosAdap((prev) => [...prev, { ...values, id: nanoid() }])
    clearForm()
  }

  return (
    <Modal hasOverlay isOpen={isOpen} onClose={clearForm}>
      <div className="flex z-[70] w-full min-h-screen sm:min-h-max sm:w-[90%] max-w-[550px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10">
          <ModalHeader
            closeBtn={clearForm}
            title="Rangos de Adaptación (Altitud)"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label="MÍNIMO"
              value={values.MIN}
              pattern="^[0-9,+.:]+([,][0-9]+)?$"
              onChange={(e) => {
                e.target.validity.valid && form.setField('MIN', e.target.value)
              }}
              error={form.errors.MIN}
            />
            <Input
              label="MÁXIMO"
              value={values.MAX}
              pattern="^[0-9,+.:]+([,][0-9]+)?$"
              onChange={(e) => {
                e.target.validity.valid && form.setField('MAX', e.target.value)
              }}
              error={form.errors.MAX}
            />
          </div>

          <div className="flex w-full justify-between mt-auto">
            <button
              type="button"
              onClick={clearForm}
              className="btn btn-ghost-red"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => form.onSubmit(handleSubmit)()}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default RangosAdaptModal
