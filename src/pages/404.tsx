import Link from 'next/link'

const FourOhFour = () => {
  return (
    <div className="grid place-items-center h-full flex-1">
      <div className="text-center">
        <h1>404 - Pagina no encontrada</h1>
        <Link href="/">
          <a className="text-primary-500 hover:underline">Volver al inicio</a>
        </Link>
      </div>
    </div>
  )
}

export default FourOhFour
