import { Link, Outlet } from 'react-router-dom'
import { getAllCategoriesRoute } from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b className="logo">Category</b>
      </p>
      <ul>
        <li>
          <Link to={getAllCategoriesRoute()}>All categories</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
