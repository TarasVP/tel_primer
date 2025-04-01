import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { CategoryRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'

export const CategoryPage = () => {
  const { categoryId } = useParams() as CategoryRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getCategory.useQuery({ categoryId })

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
      <div className={css.author}>Author: {category.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }}></div>
    </Segment>
  )
}
