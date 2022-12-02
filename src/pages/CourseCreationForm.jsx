import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Container } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../data/api.json';

const CourseCreationForm = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();


    const onSubmit = async (values) => {
        try {
            // For testing
            // values = {
            //     ...values,
            //     deptId: '63815cc1a969cfe7323e2f56',
            //     createdBy: '63842b193063898725d14e3c'
            // };
            const res = await axios.post(`${API.ROOT_URL}${API.CREATE_COURSE}`, values);
            console.log(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Heading>Create Course</Heading>
            <Container size='md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.courseName || errors.courseCode}>
                        <FormLabel htmlFor='courseName'>Course Name</FormLabel>
                        <Input
                            name='courseName'
                            id='courseName'
                            {...register('courseName',
                                {
                                    required: 'Course name is required',
                                    minLength: { value: 5, message: 'Course name should be atleast 5 characters' }
                                }
                            )}
                        />
                        <FormLabel htmlFor='courseId'>Course Code</FormLabel>
                        <Input
                            name='courseCode'
                            id='courseCode'
                            {...register('courseCode',
                                {
                                    required: 'Course code is required',
                                    minLength: { value: 5, message: 'Course ID should be atleast 5 characters' }
                                }
                            )}
                        />
                        <FormErrorMessage>
                            {errors.courseName && errors.courseName.message}
                        </FormErrorMessage>
                        <FormErrorMessage>
                            {errors.courseCode && errors.courseCode.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Create
                    </Button>
                </form>
            </Container>
        </>

    )
}

export default CourseCreationForm