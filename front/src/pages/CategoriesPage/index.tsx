import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trps'
import { getSubCategoriesRoute } from '../../lib/routes'
import css from './index.module.scss'

export const CategoriesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getCategories.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading..</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const categories = data.categories

  return (
    <div>
      <h1 className={css.title}>Categories</h1>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>
            <Link to={getSubCategoriesRoute({ categoryId: category.id })}>{category.name}</Link>
          </h2>
        </div>
      ))}
    </div>
  )
}
