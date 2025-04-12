import React from 'react'
import CourseCard from '../../../components/cards/courseCard/CourseCard'

const UserCourse:React.FC = () => {
  return (
    <div className='w-full  mt-10 flex flex-wrap gap-5 justify-evenly'>
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      
    </div>
  )
}

export default UserCourse
