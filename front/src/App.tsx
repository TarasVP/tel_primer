import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { CategoriesPage } from './pages/categories/CategoriesPage/index'
import { CategoryPage } from './pages/categories/CategoryPage/index'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewCategoryPage } from './pages/categories/NewCategoryPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { EditCategoryPage } from './pages/categories/EditCategoryPage'
import { AppContextProvider } from './lib/ctx'
import { NotFoundPage } from './pages/other/NotFoundPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getAllCategoriesRoute()} element={<CategoriesPage />} />
              <Route path={routes.getCategoryRoute(routes.categoryRouteParams)} element={<CategoryPage />} />
              <Route
                path={routes.getEditCategoryRoute(routes.editCategoryRouteParams)}
                element={<EditCategoryPage />}
              />
              <Route path={routes.getNewCategoryRoute()} element={<NewCategoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
