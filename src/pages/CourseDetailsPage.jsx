import axios from 'axios';
import React, { useState } from 'react'

const CourseDetailsPage = () => {

    const [files, setFiles] = useState();

    const uploadFiles = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('assignment', file);

        axios.post('http://localhost:5000/student/uploadAssignment', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    return (
        <>
            <div>CourseDetailsPage</div>
            <input type='file' name='submission' multiple onChange={uploadFiles} />
        </>

    )
}

export default CourseDetailsPage