import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import css from './index.module.scss'
import { useMe } from '../../lib/ctx'
import { createRef } from 'react'

export const layoutContentElRef = createRef<HTMLDivElement>()

export const Layout = () => {
  const me = useMe()

  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Category</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={routes.getAllCategoriesRoute()}>
              All categories
            </Link>
          </li>
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getNewCategoryRoute()}>
                  Add category
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getEditProfileRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignOutRoute()}>
                  Log out ({me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignUpRoute()}>
                  Sign up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={routes.getSignInRoute()}>
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  )
}
