import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/providers/SupabaseProvider'
import Sidebar from '@/components/Sidebar'
import UserProvider from '@/providers/userProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoonExchange',
  description: 'Buy & Sell Crypto Now!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
})

{
  const products = await getActiveProductsWithPrices();

   {
    return (
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
            <Sidebar>
              {children}
            </Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </body>
      </html>
    )
  }
}