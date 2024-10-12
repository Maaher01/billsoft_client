import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import CategoryContext from '../../../context/CategoryContext'
import { Typography } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import axios from 'axios'
import { baseUrl } from '../../../api/api'

const CategoryDetails = () => {
  const [categoryname, setCategoryName] = useState('')
  const [subCategories, setSubCategories] = useState([])

  const { categories, setCategories } = useContext(CategoryContext)
  const { id } = useParams()

  const category = categories.find((category) => category.id.toString() === id)

  useEffect(() => {
    if (category) {
      fetchSubCategories(id)
      setCategoryName(category.categoryname)
    }
  }, [category])

  const fetchSubCategories = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/category/sub/${id}`)

      const fetchedSubCategories = response.data.data

      const updatedSubCategories = await Promise.all(
        fetchedSubCategories.map(async (sub) => {
          const subSubCategories = await fetchSubCategories(sub.id)
          return { ...sub, subSubCategories }
        }),
      )

      console.log(updatedSubCategories)
      setSubCategories(fetchedSubCategories)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <>
      <Typography variant="h5" component="h1" align="center" gutterBottom mb={3}>
        {category.categoryname}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {subCategories.map((sub) => (
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  {sub.categoryname}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CategoryDetails
