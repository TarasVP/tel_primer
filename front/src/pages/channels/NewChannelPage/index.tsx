import { Segment } from '../../../components/Segment'
import { Input } from '../../../components/Input'
import { Textarea } from '../../../components/Textarea'
import { trpc } from '../../../lib/trpc'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { useForm } from '../../../lib/form'
import { zCreateChannelTrpcInput } from '@glimmung/back/src/router/channels/createChannel/input'
import { UploadsToCloudinary } from '../../../components/UploadsToCloudinary'

export const NewChannelPage = () => {
  const createChannel = trpc.createChannel.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      description: '',
      text: '',
      images: [],
    },
    validationSchema: zCreateChannelTrpcInput,
    onSubmit: async (values) => {
      await createChannel.mutateAsync(values)
      formik.resetForm()
    },
  })

  return (
    <Segment title="New Channel">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <UploadsToCloudinary label="Images" name="images" type="image" preset="preview" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create channel</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
