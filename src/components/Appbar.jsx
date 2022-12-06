import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import API from '../data/api.json';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/reducer';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {

    const user = useSelector((state) => state.app.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await axios.post(`${API.ROOT_URL}${API.LOGOUT}`);
            console.log(res.data);
            dispatch(setUserData({
                userId: null,
                name: null,
                deptId: null,
                accessToken: null,
                type: null
            }));
            navigate('/signin', { replace: true });
        } catch (err) {
            console.log('Error', err);
        }
    }

    return (
        <Flex
            width={'100%'}
            p={5}
            bg={'blackAlpha.800'}
            justify={'space-between'}
        >
            <Heading size={'lg'} color={'whitesmoke'}>PeerCanvas</Heading>
            {user.userId !== null ?
                <Button onClick={logout}>Log out</Button>
                : null
            }
        </Flex>
    );
}

export default Appbar;