import { TrpcProvider } from './lib/trps'
import { CategoriesPage } from './pages/CategoriesPage'

export const App = () => {
  return (
    <TrpcProvider>
      <CategoriesPage/>
    </TrpcProvider>
  )
}