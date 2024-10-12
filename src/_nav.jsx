import { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilPlus, cilList, cilCaretRight } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import axios from 'axios'
import { baseUrl } from './api/api'

export const Navigation = () => {
  const [parentCategories, setParentCategories] = useState([])

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category/parent`)
        setParentCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchParentCategories()
  }, [])

  const navItems = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Category Administration',
    },
    {
      component: CNavItem,
      name: 'All Categories',
      to: '/categories',
      icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Add Category',
      to: '/category/add',
      icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Categories',
    },
    ...parentCategories.map((category) => ({
      component: CNavItem,
      name:
        category.categoryname.length >= 25
          ? `${category.categoryname.slice(0, 25)}...`
          : category.categoryname,
      to: `/category/details/${category.id}`,
      icon: <CIcon icon={cilCaretRight} customClassName="nav-icon" />,
    })),
  ]

  return navItems
}
