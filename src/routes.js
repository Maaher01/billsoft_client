import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CategoryList = React.lazy(() => import('./views/pages/categoryList/CategoryList'))
const EditCategory = React.lazy(() => import('./views/pages/editCategory/EditCategory'))
const NewCategory = React.lazy(() => import('./views/pages/newCategory/NewCategory'))
const CategoryDetails = React.lazy(() => import('./views/pages/categoryDetails/CategoryDetails'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories', name: 'Categories', element: CategoryList },
  { path: '/category/:id', name: 'Edit Category', element: EditCategory },
  { path: '/category/add', name: 'Add Category', element: NewCategory },
  { path: '/category/details/:id', name: 'Category Details', element: CategoryDetails },
]

export default routes
