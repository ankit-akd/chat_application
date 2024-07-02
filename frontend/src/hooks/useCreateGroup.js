import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';


const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();


    const createGroup = async (groupName, userId) => {
        setLoading(true);
        try {

            const res = await fetch('/api/group/:groupId/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ groupName, userId })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("user-info",JSON.stringify(data));
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return { createGroup, loading };
}

export default useCreateGroup;