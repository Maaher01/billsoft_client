import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CategoryContext from '../../../../../context/CategoryContext'

const Category = ({ category }) => {
  const { categories, setCategories } = useContext(CategoryContext)
  const navigate = useNavigate()

  const { id } = useParams()

  return (
    <tr>
      <td className="text-center">{category.categoryname}</td>
      <td className="d-flex gap-1">
        <Link to={`/categories/edit/${category.id}`}>
          <button className="btn btn-success btn-sm">Edit</button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Category
