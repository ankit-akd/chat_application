import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import useCreateGroup from '../hooks/useCreateGroup';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [userIds, setUserIds] = useState("");

    const { loading, createGroup } = useCreateGroup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userIdArray = userIds.split(',').map(id => id.trim());
        await createGroup(groupName, userIdArray);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Create
                    <span className='text-blue-500'> Group</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Group Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter group name'
                            className='w-full input input-bordered h-10'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>User IDs (comma separated)</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter user IDs'
                            className='w-full input input-bordered h-10'
                            value={userIds}
                            onChange={(e) => setUserIds(e.target.value)}
                        />
                    </div>
                    <Link to='/' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Back to Home
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Create Group"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateGroup;