import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { CategoriesPage } from './pages/CategoriesPage/index'
import { CategoryPage } from './pages/CategoryPage/index'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewCategoryPage } from './pages/NewCategoryPage'
import { SignUpPage } from './pages/SignUpPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { EditCategoryPage } from './pages/EditCategoryPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getAllCategoriesRoute()} element={<CategoriesPage />} />
            <Route
              path={routes.getCategoryRoute(routes.categoryRouteParams)}
              element={<CategoryPage />}
            />
            <Route
              path={routes.getEditCategoryRoute(routes.editCategoryRouteParams)}
              element={<EditCategoryPage />}
            />
            <Route path={routes.getNewCategoryRoute()} element={<NewCategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
