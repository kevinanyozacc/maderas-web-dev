import create from 'zustand'
import { bajaSolicitud } from '../data/solicitudbaja'

import {
    DatosGenerales,
    bajasolicitudState
} from '../interfaces/index'

interface State {
    state: bajasolicitudState
    loadDatosGenerales: (values: DatosGenerales) => void
    clearStore: () => void
}

export const useBajaSolicitud = create<State>((set, get) => ({
    state: bajaSolicitud,
    loadDatosGenerales: (datosGenerales) => {
        set(({ state }) => ({ state: { ...state, datosGenerales } }))
    },

    clearStore: () => set({ state: bajaSolicitud })
}))
