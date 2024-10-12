import { useState, useContext } from 'react'
import { TableCell, TableRow, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilX } from '@coreui/icons'
import { baseUrl } from '../../../../../api/api'
import axios from 'axios'
import CategoryContext from '../../../../../context/CategoryContext'

const Category = ({ category }) => {
  const { categories, setCategories } = useContext(CategoryContext)
  const [openModal, setOpenModal] = useState(false)

  const modalOpen = () => setOpenModal(true)
  const modalClose = () => setOpenModal(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    pb: 2.5,
    pt: 1.5,
    pl: 4,
    pr: 2,
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/category/${id}`)
      const categoryList = categories.filter((category) => category.id !== id)
      setCategories(categoryList)
      modalClose()
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <TableRow>
      <TableCell align="center">{category.categoryname}</TableCell>
      <TableCell align="center">{category.parentcategoryname || 'Parent'}</TableCell>
      <TableCell align="center">{category.status === 1 ? 'Active' : 'Inactive'}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Link to={`/category/${category.id}`}>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{
                padding: '10px',
                minWidth: '50px',
              }}
            >
              <CIcon size="lg" icon={cilPencil} />
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => modalOpen()}
            sx={{
              padding: '10px',
              minWidth: '50px',
            }}
          >
            <CIcon size="lg" icon={cilTrash} />
          </Button>
          <Modal
            open={openModal}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    minWidth: '30px',
                  }}
                  onClick={modalClose}
                >
                  <CIcon icon={cilX} size="md" />
                </Button>
              </Box>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                sx={{ fontWeight: 'bold' }}
              >
                Warning
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1.5 }}>
                Are you sure you want to delete this category?
              </Typography>
              <Box sx={{ display: 'flex', mt: 3, gap: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(category.id)}
                >
                  Yes, Delete
                </Button>
                <Button variant="contained" color="primary" size="small" onClick={modalClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default Category
