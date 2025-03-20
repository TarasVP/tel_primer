import { z } from 'zod'
import { withZodSchema } from 'formik-validator-zod'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { trpc } from '../../lib/trps'

export const NewCategoryPage = () => {
  const createCategory = trpc.createCategory.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      id: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        id: z
          .string()
          .min(1)
          .regex(/^[0-9]+$/, 'Id may contain only numbers'),
        description: z.string().min(1),
        text: z.string().min(10, 'Text should be at least 10 characters long'),
      })
    ),
    onSubmit: async (values) => {
      await createCategory.mutateAsync(values)
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

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
