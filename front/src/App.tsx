import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trps'
import { CategoriesPage } from './pages/CategoriesPage'
import { SubCategoriesPage } from './pages/SubCategoriesPage'
import { getAllCategoriesRoute, getSubCategoriesRoute } from './lib/routes'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllCategoriesRoute()} element={<CategoriesPage />} />
          <Route path={getSubCategoriesRoute({ categoryId: ':categoryId' })} element={<SubCategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
