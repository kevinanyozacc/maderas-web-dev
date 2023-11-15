import type { LazyExoticComponent, ReactElement, SVGProps } from 'react'

export interface Paths {
  to: string
  path: string
  name: string
  render: boolean
  component: LazyExoticComponent<() => ReactElement>
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
}

export interface SidebarLinkType {
  to: string
  name: string
  subMenu: { value: boolean; paths: Paths[] }
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
}

export interface Route extends SidebarLinkType {
  path: string
  component: LazyExoticComponent<() => ReactElement>
}

export interface User {
  username: string
  roles: string[] | null
  userId: number | null
  sedeId: number | null
}

export interface dataTabla {
  nombre: string
  fechaInicio: number
  fechaFinal: number
  hora: number
  lugar: string
  acciones: string
}
