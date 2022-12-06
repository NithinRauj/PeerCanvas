import React from 'react';
import { Card, Image, Stack, CardBody, CardFooter, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ id, name, courseCode, type }) => {

    const navigate = useNavigate();

    const openCourse = () => {
        navigate(type === 'professor' ? `/prof/course/${id}` : `/student/course/${id}`
            , { state: { id, name, courseCode, type } }
        );
    }

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            width={'500px'}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                alt='Coursework'
            />
            <Stack>
                <CardBody>
                    <Heading size='md'>{name}</Heading>
                    <Text py='2'>
                        {courseCode}
                    </Text>
                </CardBody>
                <CardFooter>
                    <Button variant='solid' colorScheme='blue' onClick={openCourse} >
                        Go to Course
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default CourseCard