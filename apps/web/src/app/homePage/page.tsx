"use client"
import React from 'react'
import { withAuth } from '@web/src/components'

function homePage() {
  return (
    <div>homePage</div>
  )
}

export default withAuth(homePage)