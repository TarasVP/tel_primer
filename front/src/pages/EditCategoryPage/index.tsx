import type { TrpcRouterOutput } from '@telegrino/back/src/router'
import { zUpdateCtegoryTrpcInput } from '@telegrino/back/src/router/updateCategory/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type EditCategoryRouteParams, getCategoryRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { useForm } from '../../lib/form'
import { useMe } from '../../lib/ctx'

const EditCategoryComponent = ({
  category,
}: {
  category: NonNullable<TrpcRouterOutput['getCategory']['category']>
}) => {
  const navigate = useNavigate()
  const updateCategory = trpc.updateCategory.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(category, ['name', 'id', 'description', 'text']),
    validationSchema: zUpdateCtegoryTrpcInput.omit({ categoryId: true }),
    onSubmit: async (values) => {
      await updateCategory.mutateAsync({ categoryId: category.id, ...values })
      navigate(getCategoryRoute({ categoryId: values.id }))
    },
  })

  return (
    <Segment title={`Edit Category: ${category.id}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Id" name="id" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update category</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditCategoryPage = () => {
  const { categoryId } = useParams() as EditCategoryRouteParams

  const getCategoryResult = trpc.getCategory.useQuery({
    categoryId,
  })
  const me = useMe()

  if (getCategoryResult.isLoading || getCategoryResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getCategoryResult.isError) {
    return <span>Error: {getCategoryResult.error.message}</span>
  }

  if (!getCategoryResult.data.category) {
    return <span>Idea not found</span>
  }

  const category = getCategoryResult.data.category

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== category.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditCategoryComponent category={category} />
}
