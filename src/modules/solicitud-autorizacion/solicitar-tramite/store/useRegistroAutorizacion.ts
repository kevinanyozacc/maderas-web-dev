
import create from 'zustand'
import { registroSolicitud } from '../data/solicitudAutorizacion'

import {
  DatosGenerales,
  SolicitudAutorizacionState,
  InformacionSolicitud,
  Sensores
} from '../interfaces/index'

interface State {
  state: SolicitudAutorizacionState
  loadDatosGenerales: (values: DatosGenerales) => void

  loadInformacionSolicitud: (values: InformacionSolicitud) => void

  addSensores: (sensores: Sensores) => void
  updateSensores: (exp: Sensores) => void
  deleteSensores: (id: string) => void

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
  addSensores: (esp) => {
    set(({ state }) => ({
      state: { ...state, sensores: [...state.sensores, esp] }
    }))
  },
updateSensores: (exp) => {
      const index = get().state.sensores.findIndex(
        (item) => item.ind === exp.ind
      )
      const prevInfo = get().state.sensores
      prevInfo[index] = exp
      set(({ state }) => ({
        state: {
          ...state,
          experiencia: [...prevInfo]
        }
      }))
    },
deleteSensores: (id) => {
      set(({ state }) => ({
        state: {
          ...state,
          experiencia: state.sensores.filter((exp) => exp.ind !== id)
        }
      }))
    },

  clearStore: () => set({ state: registroSolicitud })
}))
