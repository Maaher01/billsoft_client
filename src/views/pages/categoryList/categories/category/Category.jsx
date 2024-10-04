import React from 'react'
import { TableCell, TableRow, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
  return (
    <TableRow>
      <TableCell align="center">{category.categoryname}</TableCell>
      <TableCell align="center">{category.parentcategory || 'Parent'}</TableCell>
      <TableCell align="center">{category.status === 1 ? 'Active' : 'Inactive'}</TableCell>
      <TableCell>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Link to={`/categories/edit/${category.id}`}>
            <Button variant="contained" color="success" size="small">
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(category.id)}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default Category
