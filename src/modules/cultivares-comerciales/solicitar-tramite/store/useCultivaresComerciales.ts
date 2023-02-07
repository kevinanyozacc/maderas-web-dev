import create from 'zustand'

import { cultivaresComerciales } from '@modules/cultivares-comerciales/solicitar-tramite/data/cultivaresComerciales'

import {
  CultivaresComercialesState,
  DatosGenerales,
  DatosCultivar,
  MantenimientoSemilla,
  InfoEnsayos,
  RangosAdaptacionInput,
  LocalidadEnsayosInput
} from '../interfaces/cultivaresComerciales'

interface State {
  state: CultivaresComercialesState
  loadDatosGenerales: (values: DatosGenerales) => void

  loadDatosCultivar: (values: DatosCultivar) => void

  loadMantenimientoSemilla: (values: MantenimientoSemilla) => void

  loadInfoEnsayos: (values: InfoEnsayos) => void

  addLocalidadEnsayos: (values: LocalidadEnsayosInput) => void
  updateLocalidadEnsayos: (values: LocalidadEnsayosInput) => void
  deleteLocalidadEnsayos: (id: string) => void

  addDesarrolloCultivar: (value: string) => void
  deleteDesarrolloCultivar: (value: string) => void

  addRangosAdaptacion: (values: RangosAdaptacionInput) => void
  deleteRangosAdaptacion: (id: string) => void

  addFinalidadUso: (value: string) => void
  deleteFinalidadUso: (value: string) => void
  clearStore: () => void
}

export const useCultivaresComerciales = create<State>((set, get) => ({
  state: cultivaresComerciales,
  loadDatosGenerales: (datosGenerales) => {
    set(({ state }) => ({ state: { ...state, datosGenerales } }))
  },
  loadDatosCultivar: (datosCultivar) => {
    set(({ state }) => ({ state: { ...state, datosCultivar } }))
  },
  loadMantenimientoSemilla: (mantenimientoSemilla) => {
    set(({ state }) => ({ state: { ...state, mantenimientoSemilla } }))
  },
  loadInfoEnsayos: (infoEnsayos) => {
    set(({ state }) => ({ state: { ...state, infoEnsayos } }))
  },
  addLocalidadEnsayos: (values) => {
    set(({ state }) => ({
      state: { ...state, localidadEnsayos: [...state.localidadEnsayos, values] }
    }))
  },
  updateLocalidadEnsayos: (values) => {
    const index = get().state.localidadEnsayos.findIndex(item => item.id === values.id)
    const prevInfo = get().state.localidadEnsayos
    prevInfo[index] = values
    set(({ state }) => ({
      state: {
        ...state,
        localidadEnsayos: [
          ...prevInfo
        ]
      }
    }))
  },
  deleteLocalidadEnsayos: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        localidadEnsayos: state.localidadEnsayos.filter(locEns => locEns.id !== id)
      }
    }))
  },
  addDesarrolloCultivar: (desCul) => {
    set(({ state }) => ({
      state: { ...state, desarrolloCultivar: [...state.desarrolloCultivar, desCul] }
    }))
  },
  addRangosAdaptacion: (rangAdap) => {
    set(({ state }) => ({
      state: { ...state, rangosAdaptacion: [...state.rangosAdaptacion, rangAdap] }
    }))
  },
  addFinalidadUso: (finaUso) => {
    set(({ state }) => ({
      state: { ...state, finalidadUso: [...state.finalidadUso, finaUso] }
    }))
  },
  deleteDesarrolloCultivar: (newValue) => {
    set(({ state }) => ({
      state: {
        ...state,
        desarrolloCultivar: state.desarrolloCultivar.filter((desCul) => desCul !== newValue)
      }
    }))
  },
  deleteRangosAdaptacion: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        rangosAdaptacion: state.rangosAdaptacion.filter((rangAdap) => rangAdap.id !== id)
      }
    }))
  },
  deleteFinalidadUso: (value) => {
    set(({ state }) => ({
      state: {
        ...state,
        finalidadUso: state.finalidadUso.filter((finaUso) => finaUso !== value)
      }
    }))
  },
  clearStore: () => set({ state: cultivaresComerciales })
}))
