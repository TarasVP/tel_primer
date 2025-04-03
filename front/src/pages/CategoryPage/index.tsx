import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { CategoryRouteParams, getEditCategoryRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'
import { LinkButton } from '../../components/Button'
import { useMe } from '../../lib/ctx'

export const CategoryPage = () => {
  const { categoryId } = useParams() as CategoryRouteParams

  const getCategoryResult = trpc.getCategory.useQuery({ categoryId })
  const me = useMe()

  if (getCategoryResult.isLoading || getCategoryResult.isFetching) {
    return <span>Loading..</span>
  }

  if (getCategoryResult.isError) {
    return <span>Error: {getCategoryResult.error.message}</span>
  }

  const category = getCategoryResult.data.category

  if (!category) {
    return <span>Category not found</span>
  }

  return (
    <Segment title={category.name} description={category.description}>
      <div className={css.createdAt}>Created At: {format(category.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {category.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }}></div>
      {me?.id === category.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditCategoryRoute({ categoryId: category.id })}>Edit category</LinkButton>
        </div>
      )}
    </Segment>
  )
}
