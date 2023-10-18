import { Inter } from 'next/font/google'
import '@styles/globals.css'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptopis',
  description: 'Discover and share ai prompts',
}

export default function RootLayout({ children }) {
  return (
   <html>
    <body>
      <Provider>
      <div className="main">
        <div className="gradient"></div>
      </div>
  
      <main className='app'>
        <Navbar/>
          {children}
      </main>
      </Provider>
    </body>
    
   </html>
  )
}
