import React from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate, Navigate, Outlet } from 'react-router-dom';

// Layout 은 Outlet 을 리턴해야한다.
const AuthLayout = ({children}) => {
    const { user } = useAuth();

    // if( !user ){ navigate ('/')} // 컴포넌트가 아니라서 리턴하지 못해 밑에 것을 사용한다
    return !user ? <Navigate to='/' /> : <>{children}</> // Outlet을 리턴하던지, Component를 리턴하던지
    
}

export default AuthLayout