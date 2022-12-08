import React, { useRef, useEffect } from 'react';
import {
    Button, Card, CardBody, CardFooter,
    HStack, Text, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, useDisclosure, FormLabel, Container,
} from '@chakra-ui/react';
import axios from 'axios';
import API from '../data/api.json';
import { useSelector } from 'react-redux';
import getStorageClient from '../utils/getStorageClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptCid, encryptCid } from '../utils/crypto';

const AssignmentTile = ({ id, name, fileCid }) => {

    const [file, setFile] = useState();
    const [grade, setGrade] = useState(0);
    const user = useSelector((state) => state.app.userData);
    const client = useRef(null);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        client.current = getStorageClient();
        if (user.type === 'student') {
            getGrade();
        }
    }, []);

    const getGrade = async () => {
        try {
            const res = await axios.get(`${API.ROOT_URL}${API.GET_GRADE}${user.userId}`,
                { headers: { authorization: 'Bearer ' + user.accessToken } }
            );
            setGrade(res.data.data.grade);
        } catch (err) {
            console.log('Error', err);
        }
    }

    const downloadQuestion = async () => {
        const decryptedCid = decryptCid(fileCid);
        const res = await client.current.get(decryptedCid);
        const file = await res.files();
        const url = new URL(`${API.IPFS_URL}${decryptedCid}/${file[0].name}`);
        const aElement = document.createElement('a');
        aElement.href = url;
        aElement.setAttribute('target', '_blank');
        aElement.click();
    }

    const uploadSubmission = async () => {
        try {
            const cid = await client.current.put([file]);
            console.log(cid);
            const encryptedCid = encryptCid(cid);
            if (cid) {
                const res = await axios.post(`${API.ROOT_URL}${API.UPLOAD_SUBMISSION}`,
                    { userName: user.name, userId: user.userId, courseId: id, fileCid: encryptedCid, assignmentId: id },
                    { headers: { authorization: 'Bearer ' + user.accessToken } });
                console.log(res.data);
                setFile(null);
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const openSubmissions = () => {
        navigate('/prof/course/submissions/' + id);
    }

    return (
        <>
            <Card width={'100%'} m={'5px 0px'}>
                <CardBody>
                    <Text>{name}</Text>
                    {user.type === 'student' ?
                        <Text>Grade: {grade} / 100</Text>
                        : null
                    }
                </CardBody>
                <CardFooter>
                    <HStack spacing={5}>
                        <Button onClick={downloadQuestion}>Download Question</Button>
                        {user.type === 'student' ?
                            <Button onClick={onOpen}>Upload Submisssion</Button>
                            : null}
                        {user.type === 'professor' ?
                            <Button onClick={openSubmissions}>View Submissions</Button>
                            : null}
                    </HStack>
                </CardFooter>
            </Card>
            {user.type === 'student' ?
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Upload Submission</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Container size='md'>
                                <FormLabel htmlFor='submission'>
                                    Upload File (docx,pdf)
                                </FormLabel>
                                <input type='file' name='submission' multiple onChange={onFileChange} />
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={uploadSubmission} disabled={!file}>Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                : null
            }
        </>
    )
}

export default AssignmentTile