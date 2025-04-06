import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { CategoryRouteParams, getEditCategoryRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'
import { LinkButton } from '../../components/Button'
import { withPageWrapper } from '../../lib/pageWrapper'

export const CategoryPage = withPageWrapper({
  useQuery: () => {
    const { categoryId } = useParams() as CategoryRouteParams
    return trpc.getCategory.useQuery({
      categoryId,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    category: checkExists(queryResult.data.category, 'Idea not found'),
    me: ctx.me,
  }),
})(({ category, me }) => (
  <Segment title={category.name} description={category.description}>
    <div className={css.createdAt}>Created At: {format(category.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>Author: {category.author.nick}</div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }} />
    {me?.id === category.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditCategoryRoute({ categoryId: category.id })}>Edit category</LinkButton>
      </div>
    )}
  </Segment>
))
