import { SimpleGrid, Heading } from '@chakra-ui/react'
import React from 'react'
import CourseCard from '../components/CourseCard'

const CoursesPage = () => {
    return (
        <>
            <Heading>My Courses</Heading>
            <SimpleGrid columns={3} spacingX={5} spacingY={5}>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </SimpleGrid>
        </>
    )
}

export default CoursesPage