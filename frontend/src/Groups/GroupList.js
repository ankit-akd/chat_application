import React from 'react';
import { Link } from 'react-router-dom';
import useGroupList from '../hooks/useGroupList';

const GroupList = () => {
  const { groups, loading } = useGroupList();

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <h2 className='text-3xl font-semibold text-center text-gray-300'>
        Groups
      </h2>
      <Link to="/groups/create" className='btn btn-primary mt-4'>
        Create New Group
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          {groups.map(group => (
            <li key={group._id} className='my-2'>
              <Link to={`/groups/${group._id}`} className='text-blue-500 hover:underline'>
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
