import { Segment } from '../../../components/Segment'
import { Input } from '../../../components/Input'
import { Textarea } from '../../../components/Textarea'
import { trpc } from '../../../lib/trpc'
import { zCreateCategoryTrpcInput } from '@telegrino/back/src/router/categories/createCategory/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { useForm } from '../../../lib/form'

export const NewCategoryPage = () => {
  const createCategory = trpc.createCategory.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      id: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateCategoryTrpcInput,
    onSubmit: async (values) => {
      await createCategory.mutateAsync(values)
      formik.resetForm()
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
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="id" label="Id" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create category</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
