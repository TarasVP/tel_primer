import { Link } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { getChannelRoute } from '../../../lib/routes'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { Alert } from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { useForm } from '../../../lib/form'
import { zGetChannelsTrpcInput } from '@telegrino/back/src/router/channels/getChannels/input'
import { useDebounceValue } from 'usehooks-ts'
import { Input } from '../../../components/Input'

export const ChannelsPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetChannelsTrpcInput.pick({ search: true }),
  })
  const [search] = useDebounceValue(formik.values.search, 500)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getChannels.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All channels">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].channels.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
                <div className={css.category} key={channel.name}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.channelLink} to={getChannelRoute({ channelId: channel.id })}>
                        {channel.name}
                      </Link>
                    }
                    description={channel.description}
                  >
                    Likes: {channel.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
