import moment from 'moment'

import Modal from '@components/shared/Modal'
import ModalHeader from '@components/shared/ModalHeader'
import Table from '@components/shared/Table'

import { EstadosExpedientes, TipoSolicitudExpedientes } from '@generated/graphql'
import { classNames } from '@utils/classNames'

interface Props {
  data: any
  isOpen: boolean
  onClose: () => void
}

function setColorEstado (val: string) {
  if (val === EstadosExpedientes.ObservadoEspecialista) return 'text-orange-500 bg-orange-200'
  if (val === EstadosExpedientes.CierreEspecialista) return 'text-green-600 bg-green-200'
  if (val === 'PROCESO') return 'text-blue-600 bg-blue-200'
  return 'text-green-600 bg-green-200'
}

function estadoDoc (est: string): string {
  if (est === EstadosExpedientes.CierreEspecialista) return 'CIERRE ESPECIALISTA'
  if (est === EstadosExpedientes.CierreJefearea) return 'CIERRE JEFE DE AREA'
  if (est === EstadosExpedientes.ObservadoEspecialista) return 'OBSERVADO ESPECIALISTA'
  if (est === EstadosExpedientes.ObservadoJefearea) return 'OBSERVADO JEFE DE AREA'
  if (est === EstadosExpedientes.PasoEspecialista) return 'PASO ESPECIALISTA'
  if (est === EstadosExpedientes.PasoJefearea) return 'PASO JEFE DE AREA'
  return est
}

const EstadoTramiteInfoModal = ({ data, isOpen, onClose }: Props) => {
  const tipoDoc = (tipo: string): string => {
    if (tipo === TipoSolicitudExpedientes.RegistroProductor) {
      return 'REGISTRO PRODUCTOR'
    }
    if (tipo === TipoSolicitudExpedientes.DeclaracionSemilla) {
      return 'DECLARACION DE SEMILLAS'
    }
    if (tipo === TipoSolicitudExpedientes.RegistroCultivarComercial) {
      return 'CULTIVARES COMERCIALES DE SEMILLAS'
    }
    return ''
  }

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
                  <th className="text-center">Tipo de Tramite</th>
                  <th className="text-center">Sede</th>
                  <th className="text-center">Estado de Tramite</th>
                  <th className="text-center">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="dark:bg-transparent dark:text-slate-50 dark:hover:bg-slate-900 dark:border-b-slate-700">
                  <td>{data.NUMERO_EXPEDIENTE}</td>
                  <td className="text-center min-w-[130px]" >{tipoDoc(data.TIPO_SOLICITUD)}</td>
                  <td className="text-center min-w-[130px]" >{data.SEDE.NOMBRE_SEDE}</td>
                  <td className={classNames(['text-center min-w-[130px]', setColorEstado(data.ESTADO)])} ><b>{estadoDoc(data.ESTADO)}</b></td>
                  <td className="text-center min-w-[130px]" >{moment(data.FECHA_REGISTRO).format('DD-MM-YYYY')}</td>
                </tr>
              </tbody>
            </Table>
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

export default EstadoTramiteInfoModal
