import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { type EditChannelRouteParams, getChannelRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { zUpdateChannelTrpcInput } from '@telegrino/back/src/router/channels/updateChannel/input'

export const EditChannelPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { channelId } = useParams() as EditChannelRouteParams
    return trpc.getChannel.useQuery({
      channelId,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const channel = checkExists(queryResult.data.channel, 'Channel not found')
    checkAccess(ctx.me?.id === channel.authorId, 'An category can only be edited by the author')
    return {
      channel,
    }
  },
  title: ({ channel }) => `Edit channel "${channel.name}"`,
})(({ channel }) => {
  console.info(channel.id)
  const navigate = useNavigate()
  const updateChannel = trpc.updateChannel.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(channel, ['name', 'id', 'description', 'text']),
    validationSchema: zUpdateChannelTrpcInput.omit({ channelId: true }),
    onSubmit: async (values) => {
      await updateChannel.mutateAsync({ channelId: channel.id, ...values })
      navigate(getChannelRoute({ channelId: channel.id }))
    },
  })

  return (
    <Segment title={`Edit Channel: ${channel.name}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update channel</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
