import create from 'zustand'
import { registroReporte } from '../data/registroreporte'

import {
    DatosGenerales,
    RegistroFormato,
    RegistroReporteState
} from '../interfaces/index'

interface State {
    state: RegistroReporteState
    loadDatosGenerales: (values: DatosGenerales) => void

    addreporte: (reporte: RegistroFormato) => void
    updatereporte: (exp: RegistroFormato) => void
    deletereporte: (id: string) => void

    clearStore: () => void
}

export const useRegistroReporte = create<State>((set, get) => ({
    state: registroReporte,
    loadDatosGenerales: (datosGenerales) => {
        set(({ state }) => ({ state: { ...state, datosGenerales } }))
    },

    addreporte: (esp) => {
        set(({ state }) => ({
          state: { ...state, registroFormato: [...state.registroFormato, esp] }
        }))
      },
      updatereporte: (exp) => {
          const index = get().state.registroFormato.findIndex(
            (item) => item.ind === exp.ind
          )
          const prevInfo = get().state.registroFormato
          prevInfo[index] = exp
          set(({ state }) => ({
            state: {
              ...state,
              experiencia: [...prevInfo]
            }
          }))
        },
        deletereporte: (id) => {
          set(({ state }) => ({
            state: {
              ...state,
              experiencia: state.registroFormato.filter((exp) => exp.ind !== id)
            }
          }))
        },
    clearStore: () => set({ state: registroReporte })
}))
