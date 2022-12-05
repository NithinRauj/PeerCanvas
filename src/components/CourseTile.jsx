import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import API from '../data/api.json';
import { useSelector } from 'react-redux';

const CourseTile = ({ id, name, courseCode }) => {

    const user = useSelector((state) => state.app.userData);

    const enroll = async () => {
        try {
            const res = await axios.post(`${API.ROOT_URL}${API.ENROLL}`,
                { courseId: id },
                { headers: { authorization: 'Bearer ' + user.accessToken } });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Card width={'100%'} m={'5px 0px'}>
            <CardHeader>
                <Heading size={'sm'}>
                    {courseCode}
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>{name}</Text>
            </CardBody>
            <CardFooter>
                <Button onClick={enroll}>Enroll</Button>
            </CardFooter>
        </Card>
    )
}

export default CourseTile;