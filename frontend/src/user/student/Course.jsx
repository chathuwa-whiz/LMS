import React from 'react'
import Header from './Header'

export default function Course() {
  return (
    <section className='w-4/6 px-10'>
        <Header />

        <div className='mt-10'>
          {/* title */}
          <span className='text-2xl font-semibold text-primary4'>Assignments | Quizzes</span>
        </div>
        
    </section>
  )
}
