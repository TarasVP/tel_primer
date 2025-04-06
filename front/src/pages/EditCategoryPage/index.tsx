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
import { withPageWrapper } from '../../lib/pageWrapper'

export const EditCategoryPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { categoryId } = useParams() as EditCategoryRouteParams
    return trpc.getCategory.useQuery({
      categoryId,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const category = checkExists(queryResult.data.category, 'Category not found')
    checkAccess(ctx.me?.id === category.authorId, 'An category can only be edited by the author')
    return {
      category,
    }
  },
})(({ category }) => {
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
})
