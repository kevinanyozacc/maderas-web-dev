import Modal from '@components/shared/Modal'
import ModalHeader from '@components/shared/ModalHeader'
import Table from '@components/shared/Table'
import moment from 'moment'

// import { TipoSolicitudExpedientes } from '@generated/graphql'
import { classNames } from '@utils/classNames'
import Input from '@components/shared/Input'

interface Props {
  data: any
  isOpen: boolean
  onClose: () => void
}

function setColorEstado (est: string) {
  if (est === '3') return 'text-orange-500 bg-orange-200'
  if (est === '2') return 'text-green-600 bg-green-200'
  if (est === '1') return 'text-blue-600 bg-blue-200'
  if (est === '4') return 'text-red-600 bg-red-200'
  return 'text-green-600 bg-green-200'
}

function estadoDoc (est: string): string {
  if (est === '1') return 'EN TRAMITE'
  if (est === '2') return 'AUTORIZADO'
  if (est === '3') return 'DENEGADO'
  if (est === '4') return 'OBSERVADO'
  return est
}

const EstadoResponsableInfoModal = ({ data, isOpen, onClose }: Props) => {
  // const tipoDoc = (tipo: string): string => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} hasOverlay>
      <div className="flex z-[70] w-[100vw] h-full sm:h-max sm:w-[90%] max-w-[770px] sm:rounded-xl shadow-lg bg-white dark:bg-slate-800">
        <div className="flex flex-col gap-5 flex-1 px-5 py-3 md:p-10 max-w-full">
          <ModalHeader
            closeBtn={onClose}
            title="Informacion de Estado De tramite"
          />
          <div className="min-h-50">
            <Table className="overflow-x-auto">
              <thead>
                <tr className="dark:border-b-slate-700">
                  <th>Numero de Expediente</th>
                  <th className="text-center">Estado de Tramite</th>
                  <th className="text-center">Fecha de Registro</th>
                  <th className="text-center">Fecha de Revisión</th>
                </tr>
              </thead>
              <tbody>
                <tr className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                  <td>{data.EXPEDIENTE}</td>
                  <td className="text-center min-w-[130px]" >

                    <div
                      className={classNames([
                        setColorEstado(data.ESTADO!),
                        'text-center font-semibold py-1 px-4 rounded-full whitespace-nowrap'
                      ])}
                    >
                      {estadoDoc(data.ESTADO)}
                    </div>
                  </td>
                  <td className={classNames(['text-center min-w-[130px]'])} >{ moment(data.FECHA_REGISTRO).format('DD-MM-YYYY')}</td>
                  <td className="text-center min-w-[130px]" >{ moment(data.FECHA_REVISION).format('DD-MM-YYYY')}
                 
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">

            <Input
              readOnly
              label="Observacion del inspector"
              value={ data?.OBSERVACION! }

            />
          </div>

          <div className="">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost-red ml-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EstadoResponsableInfoModal
