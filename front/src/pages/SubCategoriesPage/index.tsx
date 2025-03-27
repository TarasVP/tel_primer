import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { SubCategoriesRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trps'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'

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
    <Segment title={category.name} description={category.description}>
      <div className={css.createdAt}>Created At: {format(category.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }}></div>
    </Segment>
  )
}
