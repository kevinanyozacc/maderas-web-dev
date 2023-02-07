import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { IconLogo } from '../../../icons'
import ToggleTheme from '../../shared/ToggleTheme'

const Navbar = () => {
  const router = useRouter()

  if (router.pathname === '/graphql-playground') {
    return <div />
  }

  return (
    <header className="shadow bg-primary-500 sticky top-0 z-50">
      <nav className="container flex justify-between items-center py-2">
        <NextLink href="/">
          <a>
            <IconLogo className="h-15 w-auto" fill="#fff" />
          </a>
        </NextLink>

        <ToggleTheme className="text-white h-max" />
      </nav>
    </header>
  )
}

export default Navbar
