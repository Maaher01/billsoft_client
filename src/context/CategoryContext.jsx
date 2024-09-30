import { createContext, useState, useEffect } from 'react'
import { baseUrl } from '../api/api'
import axios from 'axios'

const CategoryContext = createContext({})

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  //Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/category`)
        setCategories(response.data.data)
        setFetchError(null)
      } catch (error) {
        console.error('Error fetching categories:', error.response.data.message)
        setFetchError(error.response.data.message)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContext
