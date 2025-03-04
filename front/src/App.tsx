import { TrpcProvider } from './lib/trps'
import { CategoriesPage } from './pages/categoriesPage'

export const App = () => {
  return (
    <TrpcProvider>
      <CategoriesPage/>
    </TrpcProvider>
  )
}