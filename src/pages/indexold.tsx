import Tabs from '@components/shared/Tabs'
import TabList from '@components/shared/Tabs/TabList'
import Breadcrumb from '../components/shared/Breadcrumb'
import TabButton from '@components/shared/Tabs/TabButton'
import TabPanels from '@components/shared/Tabs/TabPanels'
import { withUrqlClient } from 'next-urql'
import client from '@graphql/client'

import TabRegistroProductor from '@modules/registro-productor/TabRegistroProductor'
import TabDeclaracionSemillas from '@modules/declaracion-semilla/TabDeclaracionSemillas'
import TabCultivaresComerciales from '@modules/cultivares-comerciales/TabCultivaresComerciales'

const Home = () => {
  return (
    <div className="container flex flex-col flex-1 py-4">
      <Breadcrumb
        className="mb-4"
        links={[{ id: 'inicio', label: 'Inicio' }]}
      />
      <Tabs>
        <TabList>
          <TabButton>Productor de Semillas</TabButton>
          <TabButton>Declaracion de Comerciantes de Semillas</TabButton>
          <TabButton>Cultivares Comerciales de Semillas</TabButton>
        </TabList>
        <TabPanels>
          <TabRegistroProductor />
          <TabDeclaracionSemillas />
          <TabCultivaresComerciales />
        </TabPanels>
      </Tabs>
    </div>
  )
}

// export default Home
export default withUrqlClient(client)(Home)
