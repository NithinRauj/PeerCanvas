import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ type, children }) => {
    const user = useSelector((state) => state.app.userData);

    if (user.userId && user.type === type) {
        return children;
    } else {
        return <Navigate to='/signin' replace />
    }
}

export default ProtectedRoute;