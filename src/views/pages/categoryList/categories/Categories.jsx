import Category from './category/Category'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const Categories = ({ categories }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Parent Category
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Status
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Categories
