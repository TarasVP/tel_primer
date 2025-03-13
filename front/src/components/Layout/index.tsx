import { Link, Outlet } from 'react-router-dom'
import { getAllCategoriesRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>Category</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllCategoriesRoute()}>
              All categories
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
