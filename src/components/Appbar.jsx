import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const Appbar = () => {
    return (
        <Flex
            width={'100%'}
            p={5}
            bg={'blackAlpha.800'}
        >
            <Heading size={'lg'} color={'whitesmoke'}>PeerCanvas</Heading>
        </Flex>
    );
}

export default Appbar;