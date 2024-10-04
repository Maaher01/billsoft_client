import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CategoryList = React.lazy(() => import('./views/pages/categoryList/CategoryList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories', name: 'Categories', element: CategoryList },
]

export default routes
