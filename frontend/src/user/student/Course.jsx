import React from 'react'
import Header from './Header'

export default function Course() {
  return (
    <section className='lg:w-4/6 lg:px-10 px-5 w-full'>
        <Header />

        <div className='mt-10'>
          {/* title */}
          <span className='text-2xl font-semibold text-primary4'>Assignments | Quizzes</span>
        </div>
        
    </section>
  )
}
