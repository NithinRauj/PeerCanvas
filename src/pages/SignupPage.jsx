import React, { useState, useEffect } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Button, Container, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from '../data/api.json';

const SignupPage = () => {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
    const [depts, setDepts] = useState([]);

    useEffect(() => {
        fetchDepts();
    }, []);

    const fetchDepts = async () => {
        const res = await axios.get(`${API.ROOT_URL}${API.GET_DEPTS}`);
        console.log(res.data);
        setDepts(res.data.depts);
    }

    const onSubmit = async (values) => {
        const res = await axios.post(`${API.ROOT_URL}${API.CREATE_ACCOUNT}`, values);
        console.log(res.data);
    }

    return (
        <>
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
                        {
                            depts.length &&
                            <>
                                <FormLabel htmlFor='deptId'>Departments</FormLabel>
                                <Select {...register('deptId')}>
                                    {depts.map(dept => <option key={dept._id} value={dept._id}>{dept.name}</option>)}
                                </Select>
                            </>
                        }
                        <FormLabel htmlFor='accountType'>Account Type</FormLabel>
                        <Select {...register('accountType')}>
                            <option value='student'>Student</option>
                            <option value='professor'>Professor</option>
                        </Select>
                        {['name', 'depts', 'accountType'].map((field) => {
                            return <FormErrorMessage>
                                {errors[field.fieldName] && errors[field.fieldName].message}
                            </FormErrorMessage>
                        })}
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Create
                    </Button>
                </form>
            </Container>
        </>

    )
}

export default SignupPage