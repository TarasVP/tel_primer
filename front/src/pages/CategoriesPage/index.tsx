import { Link } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import { getCategoryRoute } from '../../lib/routes'
import css from './index.module.scss'
import { Segment } from '../../components/Segment'

export const CategoriesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getCategories.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading..</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const categories = data.categories

  return (
    <Segment title="Categories">
      <div className={css.categories}>
        {categories.map((category) => (
          <div className={css.category} key={category.id}>
            <Segment
              size={2}
              title={
                <Link className={css.categoryLink} to={getCategoryRoute({ categoryId: category.id })}>
                  {category.name}
                </Link>
              }
              description={category.description}
            ></Segment>
          </div>
        ))}
      </div>
    </Segment>
  )
}
