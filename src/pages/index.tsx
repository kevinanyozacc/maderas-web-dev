import Tabs from '@components/shared/Tabs'
import TabList from '@components/shared/Tabs/TabList'
import Breadcrumb from '../components/shared/Breadcrumb'
import TabButton from '@components/shared/Tabs/TabButton'
import TabPanels from '@components/shared/Tabs/TabPanels'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'
import TabRegistroResponsable from '@modules/Registro-responsable/TabRegistroResponsable'
import TabSolicitudAutorizacion from '@modules/solicitud-autorizacion/TabSolicitudAutorizacion'
import TabSolicitudBaja from '@modules/solicitud-baja/TabSolicitudBaja'

const Home = () => {
  return (
    <div className="container flex flex-col flex-1 py-4">
      <Breadcrumb
        className="mb-4"
        links={[{ id: 'inicio', label: 'Inicio' }]}
      />
      <Tabs>
        <TabList>
          <TabButton>Responsable Técnico</TabButton>
          <TabButton>Solicitud de Autorización</TabButton>
          <TabButton>Solicitud de Baja </TabButton>
          {/* <TabButton>Formato de Baja RT</TabButton>
          <TabButton>Formato de Tratamiento de embalajes</TabButton> */}
        </TabList>
        <TabPanels>
          <TabRegistroResponsable />
          <TabSolicitudAutorizacion />
          <TabSolicitudBaja />
          {/* <TabRegistroProductor />
          <TabRegistroProductor /> */}
        </TabPanels>
      </Tabs>
    </div>
  )
}

// export default Home
export default withUrqlClient(client)(Home)
