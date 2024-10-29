/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
'use client'
import React, { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export type GoogleAdUnitProps = {
  children: React.ReactNode
}

declare global {
  interface Window {
    adsbygoogle?: any | any[]
  }
}
// test
const GoogleAdUnitClient: React.FC<GoogleAdUnitProps> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  React.useEffect(() => {
    try {
      const ok = (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [pathname, searchParams])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <React.Fragment>{children}</React.Fragment>{' '}
    </Suspense>
  )
}

export default GoogleAdUnitClient
