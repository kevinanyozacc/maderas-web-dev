import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/layout/Navbar'

import { useTheme } from '../store/useTheme'

import '../styles/index.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useTheme()

  return (
    <div className={theme}>
      <main className="flex flex-col min-h-screen bg-white dark:bg-slate-800">
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </div>
  )
}

export default MyApp
