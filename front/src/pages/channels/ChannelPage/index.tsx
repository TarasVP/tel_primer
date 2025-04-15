import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { ChannelRouteParams, getEditChannelRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const ChannelPage = withPageWrapper({
  useQuery: () => {
    const { channelId } = useParams() as ChannelRouteParams
    return trpc.getChannel.useQuery({
      channelId,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    channel: checkExists(queryResult.data.channel, 'Channel not found'),
    me: ctx.me,
  }),
})(({ channel, me }) => (
  <Segment title={channel.name} description={channel.description}>
    <div className={css.createdAt}>Created At: {format(channel.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>
      Author: {channel.author.nick}
      {channel.author.name ? ` (${channel.author.name})` : ''}
    </div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: channel.text }} />
    {me?.id === channel.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditChannelRoute({ channelId: channel.id })}>Edit channel</LinkButton>
      </div>
    )}
  </Segment>
))
