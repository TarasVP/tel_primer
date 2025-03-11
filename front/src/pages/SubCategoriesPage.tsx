import { useParams } from 'react-router-dom'
import { SubCategoriesRouteParams } from '../lib/routes'

export const SubCategoriesPage = () => {
  const { categoryId } = useParams() as SubCategoriesRouteParams

  return (
    <div>
      <h1>Category {categoryId}</h1>
      <div>
        <p>subcategory 1</p>
        <p>subcategory 2</p>
        <p>subcategory 3</p>
      </div>
    </div>
  )
}
