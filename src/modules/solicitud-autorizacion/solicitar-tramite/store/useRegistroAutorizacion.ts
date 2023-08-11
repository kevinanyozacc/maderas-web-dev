
import create from 'zustand'
import { registroSolicitud } from '../data/solicitudAutorizacion'

import {
  DatosGenerales,
  SolicitudAutorizacionState,
  InformacionSolicitud
} from '../interfaces/index'

interface State {
  state: SolicitudAutorizacionState
  loadDatosGenerales: (values: DatosGenerales) => void

  loadInformacionSolicitud: (values: InformacionSolicitud) => void

  clearStore: () => void
}

export const useRegistroSolicitud = create<State>((set, get) => ({
  state: registroSolicitud,
  loadDatosGenerales: (datosGenerales) => {
    set(({ state }) => ({ state: { ...state, datosGenerales } }))
  },
  loadInformacionSolicitud: (informacionSolicitud) => {
    set(({ state }) => ({ state: { ...state, informacionSolicitud } }))
  },

  clearStore: () => set({ state: registroSolicitud })
}))
