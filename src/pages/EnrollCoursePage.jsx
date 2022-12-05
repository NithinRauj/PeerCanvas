import React, { useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import API from '../data/api.json';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { useSelector } from 'react-redux';
import CourseTile from '../components/CourseTile';

const EnrollCoursePage = () => {
    const user = useSelector((state) => state.app.userData);
    const [courses, setCourses] = useState();
    const [res, err, loading] = useAxios({
        method: 'get',
        url: `${API.ROOT_URL}${API.GET_STUDENT_COURSES} `,
        headers: { 'authorization': 'Bearer ' + user.accessToken }
    });

    useEffect(() => {
        if (res) {
            setCourses(res.data);
        }
    }, [res]);

    return (
        <>
            <Heading>Enroll in Courses</Heading>
            <Container size={'md'} centerContent>
                {
                    courses && courses.length ?
                        courses.map((course) =>
                            <CourseTile
                                key={course._id}
                                id={course._id}
                                name={course.name}
                                courseCode={course.courseCode}
                            />
                        )
                        : null
                }
            </Container>
        </>
    );
}

export default EnrollCoursePage;