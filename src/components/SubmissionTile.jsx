import React, { useState } from 'react';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react';
import getStorageClient from '../utils/getStorageClient';
import API from '../data/api.json';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SubmissionTile = ({ submissionId, assignmentId, userName, fileCid, currentGrade }) => {

    const [grade, setGrade] = useState(currentGrade);
    const user = useSelector(state => state.app.userData);

    const downloadSubmission = async () => {
        try {
            const client = getStorageClient();
            const res = await client.get(fileCid);
            if (res.ok) {
                const file = await res.files();
                const url = new URL(`${API.IPFS_URL}${fileCid}/${file[0].name}`);
                const aElement = document.createElement('a');
                aElement.href = url;
                aElement.setAttribute('target', '_blank');
                aElement.click();
            } else {
                console.log('Failed to locate file');
            }
        } catch (err) {
            console.log('Error', err);
        }
    }

    const onGradeChange = (val) => {
        setGrade(val);
    }

    const submitGrade = async () => {
        await axios.post(`${API.ROOT_URL}${API.SUBMIT_GRADE}`,
            { assignmentId, submissionId, grade },
            { headers: { authorization: 'Bearer ' + user.accessToken } }
        )
    }

    return (
        <Card m={'5px 0px'}>
            <CardHeader>
                <Heading size={'sm'}>
                    Submission
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack>
                    <Text>
                        Submitted by {userName}
                    </Text>
                    <Text>Grade</Text>
                    <NumberInput
                        onChange={onGradeChange}
                        step={5}
                        defaultValue={grade}
                        min={0}
                        max={100}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </VStack>
            </CardBody>
            <CardFooter>
                <ButtonGroup>
                    <Button onClick={downloadSubmission}>
                        Download Submission
                    </Button>
                    <Button onClick={submitGrade} disabled={!grade}>
                        Submit Grade
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default SubmissionTile