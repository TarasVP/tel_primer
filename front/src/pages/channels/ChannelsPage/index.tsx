import { Link } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { getChannelRoute } from '../../../lib/routes'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { Alert } from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'

export const ChannelsPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getChannels.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All channels">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.channel}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.channels)
              .map((channel) => (
                <div className={css.idea} key={channel.id}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.ideaLink} to={getChannelRoute({ channelId: channel.id })}>
                        {channel.name}
                      </Link>
                    }
                    description={channel.description}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
