import Categories from './categories/Categories'
import { useContext } from 'react'
import CategoryContext from '../../../context/CategoryContext'

const CategoryList = () => {
  const { isLoading, fetchError, categories } = useContext(CategoryContext)

  return (
    <main className="Home">
      <div className="d-flex justify-content-between mb-4 mt-5">
        <h4>All Categories</h4>
      </div>

      {isLoading && <p className="statusMsg">Loading categories...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (categories.length ? (
          <Categories categories={categories} />
        ) : (
          <p style={{ margin: '2rem' }}>No categories to display</p>
        ))}
    </main>
  )
}

export default CategoryList
