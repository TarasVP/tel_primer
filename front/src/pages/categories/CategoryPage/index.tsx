import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { CategoryRouteParams, getEditCategoryRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { Button, LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { type TrpcRouterOutput } from '@telegrino/back/src/router'
import { useForm } from '../../../lib/form'
import { FormItems } from '../../../components/FormItems'
import { Alert } from '../../../components/Alert'
import { canBlockCategories, canEditCategory } from '@telegrino/back/src/utils/can'

const BlockCategory = ({ category }: { category: NonNullable<TrpcRouterOutput['getCategory']['category']> }) => {
  const blockCategory = trpc.blockCategory.useMutation()
  const trpcUtils = trpc.useUtils()
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockCategory.mutateAsync({ categoryId: category.id })
      await trpcUtils.getCategory.refetch({ categoryId: category.id })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Category
        </Button>
      </FormItems>
    </form>
  )
}

export const CategoryPage = withPageWrapper({
  useQuery: () => {
    const { categoryId } = useParams() as CategoryRouteParams
    return trpc.getCategory.useQuery({
      categoryId,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    category: checkExists(queryResult.data.category, 'Category not found'),
    me: ctx.me,
  }),
})(({ category, me }) => (
  <Segment title={category.name} description={category.description}>
    <div className={css.createdAt}>Created At: {format(category.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>
      Author: {category.author.nick}
      {category.author.name ? ` (${category.author.name})` : ''}
    </div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: category.text }} />
    {canEditCategory(me, category) && (
      <div className={css.editButton}>
        <LinkButton to={getEditCategoryRoute({ categoryId: category.id })}>Edit category</LinkButton>
      </div>
    )}
    {canBlockCategories(me) && (
      <div className={css.blockCategory}>
        <BlockCategory category={category} />
      </div>
    )}
  </Segment>
))
