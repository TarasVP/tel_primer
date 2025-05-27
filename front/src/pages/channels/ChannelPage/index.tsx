import { format } from 'date-fns/format'
import { getChannelRoute, getEditChannelRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { type TrpcRouterOutput } from '@glimmung/back/src/router'
import { Icon } from '../../../components/Icon'

const LikeButton = ({ channel }: { channel: NonNullable<TrpcRouterOutput['getChannel']['channel']> }) => {
  const trpcUtils = trpc.useUtils()
  const setChannelLike = trpc.setChannelLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetChannelData = trpcUtils.getChannel.getData({ channelId: channel.id })
      if (oldGetChannelData?.channel) {
        const newGetChannelData = {
          ...oldGetChannelData,
          channel: {
            ...oldGetChannelData.channel,
            isLikedByMe,
            likesCount: oldGetChannelData.channel.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getChannel.setData({ channelId: channel.id }, newGetChannelData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getChannel.invalidate({ channelId: channel.id })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setChannelLike.mutateAsync({ channelId: channel.id, isLikedByMe: !channel.isLikedByMe })
      }}
    >
      <Icon size={32} className={css.likeIcon} name={channel.isLikedByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}

export const ChannelPage = withPageWrapper({
  useQuery: () => {
    const { channelId } = getChannelRoute.useParams()
    return trpc.getChannel.useQuery({
      channelId,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    channel: checkExists(queryResult.data.channel, 'Channel not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
  title: ({ channel }) => `Channel "${channel.name}"`,
})(({ channel, me }) => (
  <Segment title={channel.name} description={channel.description}>
    <div className={css.createdAt}>Created At: {format(channel.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>
      Author: {channel.author.nick}
      {channel.author.name ? ` (${channel.author.name})` : ''}
    </div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: channel.text }} />
    <div className={css.likes}>
      Likes: {channel.likesCount}
      {me && (
        <>
          <br />
          <LikeButton channel={channel} />
        </>
      )}
    </div>
    {me?.id === channel.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditChannelRoute({ channelId: channel.id })}>Edit channel</LinkButton>
      </div>
    )}
  </Segment>
))
