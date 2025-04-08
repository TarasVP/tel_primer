import { Link } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { getCategoryRoute } from '../../../lib/routes'
import css from './index.module.scss'
import { Segment } from '../../../components/Segment'
import { Alert } from '../../../components/Alert'

export const CategoriesPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getCategories.useInfiniteQuery(
      { limit: 2 },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="All categories">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.ideas}>
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
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  )
}
