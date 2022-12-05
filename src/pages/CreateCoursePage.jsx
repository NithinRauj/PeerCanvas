import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Container, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../data/api.json';
import { useSelector } from 'react-redux';

const CreateCoursePage = () => {
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
    const state = useSelector((state) => state.app);
    const toast = useToast();


    const onSubmit = async (values) => {
        try {
            values = {
                ...values,
                deptId: state.userData.deptId,
                createdBy: state.userData.userId,
            }
            const config = { headers: { 'authorization': 'Bearer ' + state.userData.accessToken } };
            const res = await axios.post(`${API.ROOT_URL}${API.CREATE_COURSE}`, values, config);
            console.log(res.data);
            showToast('Course created!', 'success');
        } catch (e) {
            console.error(e);
            showToast('Error creating course!', 'error');
        }
    }

    const showToast = (title, status) => {
        toast({
            title,
            status,
            duration: 3000,
            isClosable: true,
        });
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
                        <FormLabel htmlFor='courseCode'>Course Code</FormLabel>
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

export default CreateCoursePage