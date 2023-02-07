import create from 'zustand'

import { declaracionSemilla } from '../data/declaracionSemilla'

import {
  DeclaracionSemillaState,
  DatosGenerales,
  AlmacenInput,
  SucursalesInput,
  InformacionCultivoItem
} from '../interfaces/declaracionSemilla'

interface State {
  state: DeclaracionSemillaState
  loadDatosGenerales: (values: DatosGenerales) => void

  addInfoCultivo: (values: InformacionCultivoItem) => void
  updateInfoCultivo: (values: InformacionCultivoItem, id: string) => void
  deleteInfoCultivo: (id: string) => void

  createAlmacen: (values: AlmacenInput) => void
  updateAlmacen: (values: AlmacenInput) => void
  deleteAlmacen: (id: string) => void

  addSucursales: (establecimientoSucu: SucursalesInput) => void
  updateSucursales: (establecimientoSucu: SucursalesInput) => void
  deleteSucursales: (id: string) => void

  clearStore: () => void
}

export const useDeclaracionSemilla = create<State>((set, get) => ({
  state: declaracionSemilla,
  loadDatosGenerales: (datosGenerales) => {
    set(({ state }) => ({ state: { ...state, datosGenerales } }))
  },
  addInfoCultivo: (values) => {
    const prevInfo = get().state.informacionCultivos
    const prevValues = prevInfo.filter(i => i.ESPECIE_ID !== 0)

    set(({ state }) => ({
      state: {
        ...state,
        informacionCultivos: [
          ...prevValues,
          { ...values }
        ]
      }
    }))
  },
  updateInfoCultivo: (values, id) => {
    const infoCult = get().state.informacionCultivos.findIndex((item) => item.id === id)
    const prevInfo = get().state.informacionCultivos
    const valuesData = prevInfo.filter(i => i.ESPECIE_ID !== 0)
    valuesData[infoCult] = values
    set(({ state }) => ({
      state: {
        ...state,
        informacionCultivos: [
          ...valuesData
        ]
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
  createAlmacen: (values) => {
    set(({ state }) => ({
      state: { ...state, almacen: [...state.almacen, values] }
    }))
  },
  updateAlmacen: (values) => {
    const index = get().state.almacen.findIndex(i => i.id === values.id)
    const prevInfo = get().state.almacen
    prevInfo[index] = values
  },
  addSucursales: (establecimientoSucu) => {
    set(({ state }) => ({
      state: { ...state, sucursales: [...state.sucursales, establecimientoSucu] }
    }))
  },
  updateSucursales: (establecimientoSucu) => {
    const index = get().state.sucursales.findIndex(item => item.id === establecimientoSucu.id)
    const prevInfo = get().state.sucursales
    prevInfo[index] = establecimientoSucu
    set(({ state }) => ({
      state: {
        ...state,
        sucursales: [
          ...prevInfo
        ]
      }
    }))
  },
  deleteSucursales: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        sucursales: state.sucursales.filter(item => item.id !== id)
      }
    }))
  },
  deleteAlmacen: (id) => {
    set(({ state }) => ({
      state: {
        ...state,
        almacen: state.almacen.filter(item => item.id !== id)
      }
    }))
  },
  clearStore: () => set({ state: declaracionSemilla })
}))
