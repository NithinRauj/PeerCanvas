import React from 'react';
import { Button, Heading, Spinner, SimpleGrid } from '@chakra-ui/react';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import API from '../data/api.json';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const HomePage = ({ type }) => {

    const user = useSelector((state) => state.app.userData);
    const navigate = useNavigate();
    const [courses, setCourses] = useState();
    const [res, err, loading] = useAxios({
        method: 'get',
        url: type === 'student' ? `${API.ROOT_URL}${API.ENROLLED_COURSES}` : `${API.ROOT_URL}${API.COURSES} `,
        headers: { 'authorization': 'Bearer ' + user.accessToken }
    });

    useEffect(() => {
        if (res) {
            setCourses(res.data);
        }
    }, [res]);

    const goTo = (path) => {
        navigate(path);
    }

    return (
        <>
            <Heading>My Home</Heading>
            {type === 'professor' ?
                <Button onClick={() => goTo('/prof/createCourse')} colorScheme={'gray'}>Create Course</Button> :
                <Button onClick={() => goTo('/student/enrollCourses')} colorScheme={'gray'}>Enroll</Button>
            }
            {loading ? <Spinner color={'black'} size={'xl'} /> : null}
            <SimpleGrid columns={3} spacingX={5} spacingY={5}>
                {
                    courses && courses.length ?
                        courses.map((course) =>
                            <CourseCard
                                key={course.courseCode}
                                id={course._id}
                                name={course.name}
                                type={type}
                                courseCode={course.courseCode}
                            />)
                        : null
                }
            </SimpleGrid>
        </>
    );
}

export default HomePage;