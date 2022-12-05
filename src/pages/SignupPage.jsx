import React, { useState, useEffect } from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Container, Select, Text, useToast, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../data/api.json';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const SignupPage = () => {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
    const [depts, setDepts] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    const [res, err, loading] = useAxios({ method: 'get', url: `${API.ROOT_URL}${API.GET_DEPTS}` });

    useEffect(() => {
        if (res) {
            setDepts(res.depts);
        }
    }, [res]);

    const onSubmit = async (values) => {
        const res = await axios.post(`${API.ROOT_URL}${API.SIGN_UP}`, values);
        if (res.data.err) {
            toast({
                title: 'Sign up failed!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        console.log(res.data);
        navigate('/signin');
    }

    return (
        <Flex
            width={'100%'}
            height={'lg'}
            direction={'column'}
            justify={'center'}
            align={'center'}
        >
            <Heading>Create Account</Heading>
            <Container size='md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.name}>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input
                            name='name'
                            id='name'
                            {...register('name',
                                {
                                    required: 'Name is required',
                                    minLength: { value: 5, message: 'Name should be atleast 5 characters' }
                                }
                            )}
                        />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            type={'password'}
                            name='password'
                            id='password'
                            {...register('password',
                                {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password should be atleast 8 characters' }
                                }
                            )}
                        />
                        {
                            depts.length ?
                                <>
                                    <FormLabel htmlFor='deptId'>Departments</FormLabel>
                                    <Select {...register('deptId')}>
                                        {loading ? <Spinner color={'black'} /> : null}
                                        {depts.map(dept => <option key={dept._id} value={dept._id}>{dept.name}</option>)}
                                    </Select>
                                </> : null
                        }
                        <FormLabel htmlFor='accountType'>Account Type</FormLabel>
                        <Select {...register('accountType')}>
                            <option key={'student'} value={'student'}>Student</option>
                            <option key={'professor'} value={'professor'}>Professor</option>
                        </Select>
                        {['name', 'depts', 'accountType'].map((field) => {
                            return <FormErrorMessage>
                                {errors[field.fieldName] && errors[field.fieldName].message}
                            </FormErrorMessage>
                        })}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Sign Up
                    </Button>
                </form>
            </Container>
            <Link to={'/signin'}>
                <Text>Already have an account? Sign In</Text>
            </Link>
        </Flex>
    )
}

export default SignupPage