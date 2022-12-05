import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = (requestConfig) => {

    const [res, setRes] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        doAxiosCall();
    }, []);

    const doAxiosCall = async () => {
        await axios(requestConfig)
            .then(res => setRes(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }

    return [res, error, loading];

}

export default useAxios;