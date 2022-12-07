import React, { useEffect, useState } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import SubmissionTile from '../components/SubmissionTile';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import API from '../data/api.json';
import { useSelector } from 'react-redux';

const SubmissionsPage = () => {

    const user = useSelector((state) => state.app.userData);
    const { aid } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [res, error, loading] = useAxios({
        method: 'get',
        url: `${API.ROOT_URL}${API.GET_SUBMISSIONS}${aid}`,
        headers: { authorization: 'Bearer ' + user.accessToken }
    });

    useEffect(() => {
        if (res) {
            setSubmissions(res.data);
        }
    }, [res])

    return (
        <>
            <Heading>Submissions</Heading>
            <Container size={'md'}>
                {submissions && submissions.length ?
                    submissions.map(s =>
                        <SubmissionTile
                            key={s._id}
                            submissionId={s._id}
                            assignmentId={aid}
                            currentGrade={s.grade}
                            userName={s.userName}
                            fileCid={s.fileCid}
                        />)
                    : null
                }
            </Container>
        </>
    )
}

export default SubmissionsPage