import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trps'
import { CategoriesPage } from './pages/CategoriesPage'
import { SubCategoriesPage } from './pages/SubCategoriesPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<SubCategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
