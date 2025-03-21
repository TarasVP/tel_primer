import { withZodSchema } from 'formik-validator-zod'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trps'
import { zCreateCategoryTrpcInput } from '@telegrino/back/src/router/createCategory/input'
import { useState } from 'react'

export const NewCategoryPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
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
      await createCategory.mutateAsync(values)
      formik.resetForm()
      setSuccessMessageVisible(true)
      setTimeout(() => setSuccessMessageVisible(false), 3000)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="id" label="Id" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>Category created</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </Segment>
  )
}
