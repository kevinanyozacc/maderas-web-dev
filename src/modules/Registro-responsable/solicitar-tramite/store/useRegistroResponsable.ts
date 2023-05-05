
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

  // addInfoCultivo: (values: InformacionCultivoItem) => void
  // updateInfoCultivo: (values: InformacionCultivoItem, id: string) => void
  // deleteInfoCultivo: (id: string) => void

  // loadProfesional: (profesional: Profesional) => void

   addConocimiento: (conocimiento: Conocimiento) => void
   updateConocimiento: (exp: Conocimiento) => void
   deleteConocimiento: (id: string) => void

  // addExperiencia: (experiencia: Experiencia) => void
  // updateExperiencia: (exp: Experiencia) => void
  // deleteExperiencia: (id: string) => void

  // addTierraCultivo: (tierra: TierraCultivo) => void
  // updateTierraCultivo: (values: TierraCultivo) => void
  // deleteTierraCultivo: (id: string) => void

  // addAcondicionamiento: (data: Acondicionamiento) => void

  // loadAnalisisCalidad: (data: AnalisisCalidad) => void

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
  // INFORMACION DE CULTIVARES
  // addInfoCultivo: (values) => {
  //   const prevInfo = get().state.informacionCultivos
  //   const prevValues = prevInfo.filter((i) => i.ESPECIE_ID !== 0)

  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       informacionCultivos: [...prevValues, { ...values }]
  //     }
  //   }))
  // },
  // updateInfoCultivo: (values, id) => {
  //   const infoCult = get().state.informacionCultivos.findIndex(
  //     (item) => item.id === id
  //   )
  //   const prevInfo = get().state.informacionCultivos
  //   const valuesData = prevInfo.filter((i) => i.ESPECIE_ID !== 0)
  //   valuesData[infoCult] = values
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       informacionCultivos: [...valuesData]
  //     }
  //   }))
  // },
  // deleteInfoCultivo: (id) => {
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       informacionCultivos: state.informacionCultivos.filter((i) => {
  //         return i.id !== id
  //       })
  //     }
  //   }))
  // },
  // INFORMACION DE ESPECIALIZACION
  // addEspecializacion: (esp) => {
  //   set(({ state }) => ({
  //     state: { ...state, especializacion: [...state.especializacion, esp] }
  //   }))
  // },
  // updateEspecializacion: (values) => {
  //   const index = get().state.especializacion.findIndex(
  //     (item) => item.id === values.id
  //   )
  //   const prevInfo = get().state.especializacion
  //   prevInfo[index] = values
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       especializacion: [...prevInfo]
  //     }
  //   }))
  // },
  // deleteEspecializacion: (id) => {
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       especializacion: state.especializacion.filter((esp) => esp.id !== id)
  //     }
  //   }))
  // },
  // INFORMACION DE EXPERIENCIA
  // addExperiencia: (exp) => {
  //   set(({ state }) => ({
  //     state: { ...state, experiencia: [...state.experiencia, exp] }
  //   }))
  // },
  // updateExperiencia: (exp) => {
  //   const index = get().state.experiencia.findIndex(
  //     (item) => item.id === exp.id
  //   )
  //   const prevInfo = get().state.experiencia
  //   prevInfo[index] = exp
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       experiencia: [...prevInfo]
  //     }
  //   }))
  // },
  // deleteExperiencia: (id) => {
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       experiencia: state.experiencia.filter((exp) => exp.id !== id)
  //     }
  //   }))
  // },
  // INFORMACION DE TIEERRAS DE CULTIVO
  // addTierraCultivo: (tierra) => {
  //   set(({ state }) => ({
  //     state: { ...state, tierrasCultivo: [...state.tierrasCultivo, tierra] }
  //   }))
  // },
  // updateTierraCultivo: (values) => {
  //   const index = get().state.tierrasCultivo.findIndex(
  //     (item) => item.id === values.id
  //   )
  //   const prevInfo = get().state.tierrasCultivo
  //   prevInfo[index] = values
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       tierrasCultivo: [...prevInfo]
  //     }
  //   }))
  // },
  // deleteTierraCultivo: (id) => {
  //   set(({ state }) => ({
  //     state: {
  //       ...state,
  //       tierrasCultivo: state.tierrasCultivo.filter((tierra) => {
  //         return tierra.id !== id
  //       })
  //     }
  //   }))
  // },
  // addAcondicionamiento: (data) => {
  //   set(({ state }) => ({ state: { ...state, acondicionamiento: data } }))
  // },
  // loadAnalisisCalidad: (data) => {
  //   set(({ state }) => ({ state: { ...state, analisisCalidad: data } }))
  // },
  clearStore: () => set({ state: registroResponsable })
}))
