import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import CategoryContext from '../../../context/CategoryContext'
import { baseUrl } from '../../../api/api'
import axios from 'axios'

const EditCategory = () => {
  const { categories, setCategories } = useContext(CategoryContext)

  const [categoryname, setCategoryName] = useState('')
  const [status, setStatus] = useState('')
  const [parentcategory, setParentCategory] = useState('')

  const navigate = useNavigate()
  const { id } = useParams()

  const category = categories.find((category) => category.id.toString() === id)

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryname)
      setStatus(category.status)
      setParentCategory(category.parentcategory)
    }
  }, [category])

  const handleEdit = async (id) => {
    const updatedCategory = {
      categoryName: categoryname,
      parentCategory: parentcategory,
      status: status,
    }

    try {
      const req = await axios.put(`${baseUrl}/category/${id}`, updatedCategory)

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, ...req.data.data } : category,
        ),
      )

      setCategoryName('')
      setParentCategory('')
      setStatus('')

      navigate('/categories')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <Container maxWidth="sm">
      {category ? (
        <>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Edit Category
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: '#f5f5f5',
              p: 3,
              borderRadius: '8px',
              boxShadow: 1,
            }}
          >
            <FormControl fullWidth margin="normal" sx={{ background: 'white' }}>
              <InputLabel>Parent Category</InputLabel>
              <Select
                fullWidth
                label="Parent Cateory"
                value={parentcategory}
                onChange={(e) => setParentCategory(e.target.value)}
              >
                <MenuItem value={null}>Parent Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ background: 'white' }}
              fullWidth
              label="Category Name"
              variant="outlined"
              margin="normal"
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <FormControl fullWidth margin="normal" sx={{ background: 'white' }}>
              <InputLabel>Status</InputLabel>
              <Select
                sx={{ background: 'white' }}
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={() => handleEdit(category.id)}>
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Category Not Found
          </Typography>
          <Typography variant="body1" gutterBottom>
            Looks like the category does not exist anymore or has been moved.
          </Typography>
          <Link to="/categories">
            <Button variant="contained" color="primary">
              Visit All Categories List
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  )
}

export default EditCategory
