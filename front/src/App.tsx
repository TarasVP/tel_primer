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
            <Routes>
              <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getSignInRoute()} element={<SignInPage />} />
                <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
                <Route path={routes.getEditProfileRoute()} element={<EditProfilePage />} />
                <Route path={routes.getAllCategoriesRoute()} element={<CategoriesPage />} />
                <Route path={routes.getCategoryRoute(routes.categoryRouteParams)} element={<CategoryPage />} />
                <Route
                  path={routes.getEditCategoryRoute(routes.editCategoryRouteParams)}
                  element={<EditCategoryPage />}
                />
                <Route path={routes.getNewCategoryRoute()} element={<NewCategoryPage />} />
                <Route path={routes.getChannelsRoute()} element={<ChannelsPage />} />
                <Route path={routes.getChannelRoute(routes.channelRouteParams)} element={<ChannelPage />} />
                <Route path={routes.getEditChannelRoute(routes.editChannelRouteParams)} element={<EditChannelPage />} />
                <Route path={routes.getNewChannelRoute()} element={<NewChannelPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}
