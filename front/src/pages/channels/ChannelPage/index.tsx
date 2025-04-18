import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { ChannelRouteParams, getEditChannelRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { type TrpcRouterOutput } from '@telegrino/back/src/router'

const LikeButton = ({ channel }: { channel: NonNullable<TrpcRouterOutput['getChannel']['channel']> }) => {
  const trpcUtils = trpc.useContext()
  const setIdeaLike = trpc.setChannelLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetChannelData = trpcUtils.getChannel.getData({ channelId: channel.id })
      if (oldGetChannelData?.channel) {
        const newGetIdeaData = {
          ...oldGetChannelData,
          idea: {
            ...oldGetChannelData.channel,
            isLikedByMe,
            likesCount: oldGetChannelData.channel.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getChannel.setData({ channelId: channel.id }, newGetIdeaData)
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
        void setIdeaLike.mutateAsync({ channelId: channel.id, isLikedByMe: !channel.isLikedByMe })
      }}
    >
      {channel.isLikedByMe ? 'Unlike' : 'Like'}
    </button>
  )
}

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
  showLoaderOnFetching: false,
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
