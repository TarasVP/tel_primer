import { withZodSchema } from 'formik-validator-zod'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trps'
import { zCreateCategoryTrpcInput } from '@telegrino/back/src/router/createCategory/input'
import { useState } from 'react'
import { Alert } from '../../components/Alert'

export const NewCategoryPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const createCategory = trpc.createCategory.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateCategoryTrpcInput),
    onSubmit: async (values) => {
      try {
        await createCategory.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => setSuccessMessageVisible(false), 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => setSubmittingError(null), 3000)
      }
    },
  })

  return (
    <Segment title="New Category">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="id" label="Id" formik={formik} />
        <Input name="description" label="Description" formik={formik} maxWidth={500} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Category created!</Alert>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create category'}
        </button>
      </form>
    </Segment>
  )
}
