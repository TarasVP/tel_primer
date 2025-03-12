import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trps'
import { CategoriesPage } from './pages/CategoriesPage'
import { SubCategoriesPage } from './pages/SubCategoriesPage'
import { getAllCategoriesRoute, getSubCategoriesRoute, subCategoriesRouteParams } from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllCategoriesRoute()} element={<CategoriesPage />} />
            <Route path={getSubCategoriesRoute(subCategoriesRouteParams)} element={<SubCategoriesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
