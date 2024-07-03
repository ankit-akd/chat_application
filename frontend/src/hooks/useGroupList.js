import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/groups', {
          method: 'GET',
          headers: {'Content-Type': 'application/json',},
        });
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  return { groups, loading };
};

export default useGroupList;
