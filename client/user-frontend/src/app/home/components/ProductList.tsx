'use client'
import React from 'react'
import ProductCard from '../../../common/components/ProductCard'
import './product-list.scss'
import { IProduct } from '@/types/product'
import { useGetCategoriesQuery } from '@/services/category.service'

export default function ProductList({ products }: { products: IProduct[] }): React.ReactNode {
  const { data: categories } = useGetCategoriesQuery()

  const productsWithCategoryNames = products.map((product) => {
    const matchingCategory = categories?.find((category) => category.id === product.category_id)
    return {
      ...product,
      category_name: matchingCategory ? matchingCategory.name : 'Unknown Category'
    }
  })

  return (
    <div className='container p-0 mb-3'>
      <div className='row g-2'>
        {productsWithCategoryNames.map((product) => (
          <div key={product.id} className='col-md-2 mb-1'>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
