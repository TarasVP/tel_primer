import { Link } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { getCategoryRoute } from '../../../lib/routes'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { Alert } from '../../../components/Alert'
import InfiniteScroll from 'react-infinite-scroller'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'

export const CategoriesPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getCategories.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All categories">
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.category}>
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
              .flatMap((page) => page.categories)
              .map((category) => (
                <div className={css.idea} key={category.id}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.ideaLink} to={getCategoryRoute({ categoryId: category.id })}>
                        {category.name}
                      </Link>
                    }
                    description={category.description}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
