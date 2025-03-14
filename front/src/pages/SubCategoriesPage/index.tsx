import { useParams } from 'react-router-dom'
import { SubCategoriesRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trps'
import css from './index.module.scss'

export const SubCategoriesPage = () => {
  const { categoryId } = useParams() as SubCategoriesRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getSubCategories.useQuery({ categoryId })

  if (isLoading || isFetching) {
    return <span>Loading..</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const category = data.category

  if (!category) {
    return <span>Category not found</span>
  }

  return (
    <div>
      <h1 className={css.title}>{category.name}</h1>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }}></div>
    </div>
  )
}
