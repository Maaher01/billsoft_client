import { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilPencil } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import axios from 'axios'
import { baseUrl } from './api/api'

export const Navigation = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category`)
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const navItems = [
    {
      component: CNavItem,
      name: 'Home',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Categories',
    },
    ...categories.map((category) => ({
      component: CNavItem,
      name: category.categoryname,
      to: `/category/${category.id}`,
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    })),
  ]

  return navItems
}
