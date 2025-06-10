import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { CategoriesPage } from './pages/categories/CategoriesPage/index'
import { CategoryPage } from './pages/categories/CategoryPage/index'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { SentryUser } from './lib/sentry'
import { NewCategoryPage } from './pages/categories/NewCategoryPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { EditCategoryPage } from './pages/categories/EditCategoryPage'
import { NotAuthRouteTracker } from './components/NotAuthRouteTracker'
import { AppContextProvider } from './lib/ctx'
import { NotFoundPage } from './pages/other/NotFoundPage'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { NewChannelPage } from './pages/channels/NewChannelPage'
import { ChannelPage } from './pages/channels/ChannelPage'
import { ChannelsPage } from './pages/channels/ChannelsPage'
import { EditChannelPage } from './pages/channels/EditChannelPage'
import { HelmetProvider } from 'react-helmet-async'

export const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <SentryUser />
            <NotAuthRouteTracker />
            <Routes>
              <Route path={routes.getSignOutRoute.definition} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getSignInRoute.definition} element={<SignInPage />} />
                <Route path={routes.getSignUpRoute.definition} element={<SignUpPage />} />
                <Route path={routes.getEditProfileRoute.definition} element={<EditProfilePage />} />
                <Route path={routes.getAllCategoriesRoute.definition} element={<CategoriesPage />} />
                <Route path={routes.getCategoryRoute.definition} element={<CategoryPage />} />
                <Route path={routes.getEditCategoryRoute.definition} element={<EditCategoryPage />} />
                <Route path={routes.getNewCategoryRoute.definition} element={<NewCategoryPage />} />
                <Route path={routes.getChannelsRoute.definition} element={<ChannelsPage />} />
                <Route path={routes.getChannelRoute.definition} element={<ChannelPage />} />
                <Route path={routes.getEditChannelRoute.definition} element={<EditChannelPage />} />
                <Route path={routes.getNewChannelRoute.definition} element={<NewChannelPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}
