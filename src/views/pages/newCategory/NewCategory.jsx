import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import axios from 'axios'
import { baseUrl } from '../../../api/api'
import CategoryContext from '../../../context/CategoryContext'
import { Container, TextField, Button, Typography, Box } from '@mui/material'

const NewCategory = () => {
  const { categories, setCategories } = useContext(CategoryContext)

  const [categoryName, setCategoryName] = useState('')
  const [parentCategory, setParentCategory] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleAdd = async (e) => {
    e.preventDefault()

    const newCategory = {
      categoryName,
      parentCategory,
      status,
    }

    try {
      const response = await axios.post(`${baseUrl}/category/add`, newCategory)

      setCategories((prevCategories) => [...prevCategories, response.data.data])

      setCategoryName('')
      setParentCategory('')
      setStatus('')
      navigate('/categories')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Category
      </Typography>
      <Box
        component="form"
        onSubmit={handleAdd}
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
        <TextField
          sx={{ background: 'white' }}
          id="categoryName"
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <FormControl fullWidth margin="normal" sx={{ background: 'white' }}>
          <InputLabel>Parent Category</InputLabel>
          <Select
            sx={{ background: 'white' }}
            fullWidth
            label="Parent Cateory"
            value={parentCategory}
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default NewCategory
