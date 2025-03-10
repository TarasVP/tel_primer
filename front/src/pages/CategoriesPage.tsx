import { Link } from 'react-router-dom'
import { trpc } from '../lib/trps'
import { getSubCategoriesRoute } from '../lib/routes'

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
      <h1>Categories</h1>
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
