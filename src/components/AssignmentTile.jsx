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

const AssignmentTile = ({ id, name, fileCid }) => {

    const [file, setFile] = useState();
    const user = useSelector((state) => state.app.userData);
    const client = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        client.current = getStorageClient();
    }, [])

    const downloadQuestion = async () => {
        const res = await client.current.get(fileCid);
        const file = await res.files();
        const url = new URL(`${API.IPFS_URL}${fileCid}/${file[0].name}`);
        const aElement = document.createElement('a');
        aElement.href = url;
        aElement.setAttribute('target', '_blank');
        aElement.click();
    }

    const uploadSubmission = async () => {
        try {
            const client = getStorageClient();
            const cid = await client.put([file]);
            console.log(cid);
            if (cid) {
                const res = await axios.post(`${API.ROOT_URL}${API.UPLOAD_SUBMISSION}`,
                    { userName: user.name, userId: user.userId, courseId: id, fileCid: cid, assignmentId: id },
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

    return (
        <>
            <Card width={'100%'} m={'5px 0px'}>
                <CardBody>
                    <Text>{name}</Text>
                </CardBody>
                <CardFooter>
                    <HStack spacing={5}>
                        <Button onClick={downloadQuestion}>Download Question</Button>
                        {user.type === 'student' ?
                            <Button onClick={onOpen}>Upload Submisssion</Button>
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