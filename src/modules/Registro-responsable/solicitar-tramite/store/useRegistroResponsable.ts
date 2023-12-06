import create from 'zustand'

import { registroResponsable } from '../data/registroResponsable'

import {
  DatosGenerales,
  RegistroResponsableState,
  InformacionResponsable,
  Conocimiento
} from '../interfaces/index'

interface State {
  state: RegistroResponsableState
  loadDatosGenerales: (values: DatosGenerales) => void

  loadInformacionResponsable: (values: InformacionResponsable) => void

   addConocimiento: (conocimiento: Conocimiento) => void
   updateConocimiento: (exp: Conocimiento) => void
   deleteConocimiento: (id: string) => void

  clearStore: () => void
}

export const useRegistroResponsable = create<State>((set, get) => ({
  state: registroResponsable,
  // loadProfesional: (profesional) =>
  //   set(({ state }) => ({ state: { ...state, profesional } })),
  loadDatosGenerales: (datosGenerales) => {
    set(({ state }) => ({ state: { ...state, datosGenerales } }))
  },
  loadInformacionResponsable: (informacionResponsable) => {
    set(({ state }) => ({ state: { ...state, informacionResponsable } }))
  },

  addConocimiento: (esp) => {
      set(({ state }) => ({
        state: { ...state, conocimiento: [...state.conocimiento, esp] }
      }))
    },
  updateConocimiento: (exp) => {
        const index = get().state.conocimiento.findIndex(
          (item) => item.ind === exp.ind
        )
        const prevInfo = get().state.conocimiento
        prevInfo[index] = exp
        set(({ state }) => ({
          state: {
            ...state,
            experiencia: [...prevInfo]
          }
        }))
      },
  deleteConocimiento: (id) => {
        set(({ state }) => ({
          state: {
            ...state,
            experiencia: state.conocimiento.filter((exp) => exp.ind !== id)
          }
        }))
      },
  clearStore: () => set({ state: registroResponsable })
}))
