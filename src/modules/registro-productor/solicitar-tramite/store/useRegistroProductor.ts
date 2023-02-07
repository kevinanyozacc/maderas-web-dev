import create from 'zustand'

import { registroProductor } from '../data/registroProductor'

import {
  Profesional,
  Experiencia,
  Especialidad,
  TierraCultivo,
  DatosGenerales,
  Acondicionamiento,
  InformacionCultivoItem,
  RegistroProductorState,
  AnalisisCalidad
} from '../interfaces/index'

interface State {
  state: RegistroProductorState
  loadDatosGenerales: (values: DatosGenerales) => void

  addInfoCultivo: (values: InformacionCultivoItem) => void
  updateInfoCultivo: (values: InformacionCultivoItem, id: string) => void
  deleteInfoCultivo: (id: string) => void

  loadProfesional: (profesional: Profesional) => void

  addEspecializacion: (especializacion: Especialidad) => void
  updateEspecializacion: (values: Especialidad) => void
  deleteEspecializacion: (id: string) => void

  addExperiencia: (experiencia: Experiencia) => void
  updateExperiencia: (exp: Experiencia) => void
  deleteExperiencia: (id: string) => void

  addTierraCultivo: (tierra: TierraCultivo) => void
  updateTierraCultivo: (values: TierraCultivo) => void
  deleteTierraCultivo: (id: string) => void

  addAcondicionamiento: (data: Acondicionamiento) => void

  loadAnalisisCalidad: (data: AnalisisCalidad) => void

  clearStore: () => void
}

export const useRegistroProductor = create<State>((set, get) => ({
  state: registroProductor,
  loadProfesional: (profesional) =>
    set(({ state }) => ({ state: { ...state, profesional } })),
  loadDatosGenerales: (datosGenerales) => {
    set(({ state }) => ({ state: { ...state, datosGenerales } }))
  },
  // INFORMACION DE CULTIVARES
  addInfoCultivo: (values) => {
    const prevInfo = get().state.informacionCultivos
    const prevValues = prevInfo.filter((i) => i.ESPECIE_ID !== 0)

    set(({ state }) => ({
      state: {
        ...state,
        informacionCultivos: [...prevValues, { ...values }]
      }
    }))
  },
  updateInfoCultivo: (values, id) => {
    const infoCult = get().state.informacionCultivos.findIndex(
      (item) => item.id === id
    )
    const prevInfo = get().state.informacionCultivos
    const valuesData = prevInfo.filter((i) => i.ESPECIE_ID !== 0)
    valuesData[infoCult] = values
    set(({ state }) => ({
      state: {
        ...state,
        informacionCultivos: [...valuesData]
      }
    }))
  },
  deleteInfoCultivo: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        informacionCultivos: state.informacionCultivos.filter((i) => {
          return i.id !== id
        })
      }
    }))
  },
  // INFORMACION DE ESPECIALIZACION
  addEspecializacion: (esp) => {
    set(({ state }) => ({
      state: { ...state, especializacion: [...state.especializacion, esp] }
    }))
  },
  updateEspecializacion: (values) => {
    const index = get().state.especializacion.findIndex(
      (item) => item.id === values.id
    )
    const prevInfo = get().state.especializacion
    prevInfo[index] = values
    set(({ state }) => ({
      state: {
        ...state,
        especializacion: [...prevInfo]
      }
    }))
  },
  deleteEspecializacion: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        especializacion: state.especializacion.filter((esp) => esp.id !== id)
      }
    }))
  },
  // INFORMACION DE EXPERIENCIA
  addExperiencia: (exp) => {
    set(({ state }) => ({
      state: { ...state, experiencia: [...state.experiencia, exp] }
    }))
  },
  updateExperiencia: (exp) => {
    const index = get().state.experiencia.findIndex(
      (item) => item.id === exp.id
    )
    const prevInfo = get().state.experiencia
    prevInfo[index] = exp
    set(({ state }) => ({
      state: {
        ...state,
        experiencia: [...prevInfo]
      }
    }))
  },
  deleteExperiencia: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        experiencia: state.experiencia.filter((exp) => exp.id !== id)
      }
    }))
  },
  // INFORMACION DE TIEERRAS DE CULTIVO
  addTierraCultivo: (tierra) => {
    set(({ state }) => ({
      state: { ...state, tierrasCultivo: [...state.tierrasCultivo, tierra] }
    }))
  },
  updateTierraCultivo: (values) => {
    const index = get().state.tierrasCultivo.findIndex(
      (item) => item.id === values.id
    )
    const prevInfo = get().state.tierrasCultivo
    prevInfo[index] = values
    set(({ state }) => ({
      state: {
        ...state,
        tierrasCultivo: [...prevInfo]
      }
    }))
  },
  deleteTierraCultivo: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        tierrasCultivo: state.tierrasCultivo.filter((tierra) => {
          return tierra.id !== id
        })
      }
    }))
  },
  addAcondicionamiento: (data) => {
    set(({ state }) => ({ state: { ...state, acondicionamiento: data } }))
  },
  loadAnalisisCalidad: (data) => {
    set(({ state }) => ({ state: { ...state, analisisCalidad: data } }))
  },
  clearStore: () => set({ state: registroProductor })
}))
