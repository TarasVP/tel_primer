import type { TrpcRouterOutput } from '@telegrino/back/src/router'
import { zUpdateCtegoryTrpcInput } from '@telegrino/back/src/router/updateCategory/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import pick from 'lodash/pick'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { type EditCategoryRouteParams, getCategoryRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditCategoryComponent = ({
  category,
}: {
  category: NonNullable<TrpcRouterOutput['getCategory']['category']>
}) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateCategory = trpc.updateCategory.useMutation()
  const formik = useFormik({
    initialValues: pick(category, ['name', 'id', 'description', 'text']),
    validate: withZodSchema(zUpdateCtegoryTrpcInput.omit({ categoryId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateCategory.mutateAsync({ categoryId: category.id, ...values })
        navigate(getCategoryRoute({ categoryId: values.id }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
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
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
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
  const getMeResult = trpc.getMe.useQuery()

  if (getCategoryResult.isLoading || getCategoryResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getCategoryResult.isError) {
    return <span>Error: {getCategoryResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getCategoryResult.data.category) {
    return <span>Idea not found</span>
  }

  const category = getCategoryResult.data.category
  const me = getMeResult.data.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== category.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditCategoryComponent category={category} />
}
