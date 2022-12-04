import React, { useState } from 'react';
import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Container, Select, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../data/api.json';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/reducer';

const SigninPage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API.ROOT_URL}${API.SIGN_IN}`, values);
            const userData = res.data.userData
            if (res.data.err) {
                toast({
                    title: 'Sign in failed!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
                return;
            }
            dispatch(setUserData(userData));
            setLoading(false);
            navigate('/home');
        } catch (err) {
            console.log(err);
            toast({
                title: 'Sign in failed!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    return (
        <Flex
            width={'100%'}
            height={'lg'}
            direction={'column'}
            justify={'center'}
            align={'center'}
        >
            <Heading>Sign In</Heading>
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
                        <FormLabel htmlFor='accountType'>Account Type</FormLabel>
                        <Select {...register('accountType')}>
                            <option value='student'>Student</option>
                            <option value='professor'>Professor</option>
                        </Select>
                        {['name', 'password', 'accountType'].map((field) => {
                            return <FormErrorMessage>
                                {errors[field.fieldName] && errors[field.fieldName].message}
                            </FormErrorMessage>
                        })}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' type='submit' isLoading={isSubmitting || loading} loadingText={'Authenticating...'}>
                        Sign In
                    </Button>
                </form>
            </Container>
            <Link to={'/signup'}>
                <Text>Already have an account? Sign Up</Text>
            </Link>
        </Flex>
    );
}

export default SigninPage;