import {
    Button, Heading,
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, useDisclosure,
    Container, FormLabel,
    Input
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import AssignmentTile from '../components/AssignmentTile';
import API from '../data/api.json';
import useAxios from '../hooks/useAxios';
import getStorageClient from '../utils/getStorageClient';

const CourseDetailsPage = () => {

    const { id } = useParams();
    const { state: pathState } = useLocation();
    const user = useSelector((state) => state.app.userData);
    const { name: courseName, courseCode, type } = pathState;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
    const [assignments, setAssignments] = useState();
    const [file, setFile] = useState(null);

    const [res, err, loading] = useAxios({
        method: 'get',
        url: `${API.ROOT_URL}${API.GET_ASSIGNMENTS}${id}`,
        headers: { 'authorization': 'Bearer ' + user.accessToken }
    });

    useEffect(() => {
        if (res) {
            setAssignments(res.data);
        }
    }, [res])


    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const uploadFiles = async () => {
        try {
            const client = getStorageClient();
            const cid = await client.put([file]);
            console.log(cid);
            if (cid) {
                const res = await axios.post(`${API.ROOT_URL}${API.CREATE_ASSIGNMENT}`,
                    { name, courseId: id, cid },
                    { headers: { 'authorization': 'Bearer ' + user.accessToken } }
                );
                console.log(res.data);
                setName('');
                setFile(null);
                onClose();
            }
        } catch (e) {
            console.log('Error', e);
        }
    }

    return (
        <>
            <Heading>{courseCode} - {courseName}</Heading>
            {type === 'professor' ?
                <Button onClick={onOpen}>Create Assignment</Button> : null
            }
            <Container size={'md'} centerContent>
                {
                    assignments ?
                        assignments.map((a) => <AssignmentTile key={a._id} id={a._id} name={a.name} fileCid={a.fileCid} />)
                        : null
                }
            </Container>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Assignment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container size='md'>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input
                                name='name'
                                id='name'
                                margin={'5px 0px'}
                                onChange={onNameChange}
                            />
                            <FormLabel htmlFor='assignment'>
                                Upload File (docx,pdf)
                            </FormLabel>
                            <input type='file' name='assignment' multiple onChange={onFileChange} />
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={uploadFiles} disabled={!name && !file}>Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default CourseDetailsPage