import Category from './category/Category'
import { useState } from 'react'

const Categories = ({ categories }) => {
  return (
    <div>
      <table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Parent Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Categories
