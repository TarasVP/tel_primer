import { useParams } from 'react-router-dom'

export const SubCategoriesPage = () => {
  const { categoryId } = useParams() as { categoryId: string }

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
