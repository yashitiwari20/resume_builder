import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (user) GetResumesList();
  }, [user]);

  /** Get all resumes for logged-in user */
  const GetResumesList = () => {
    setLoader(true);
    GlobalApi
      .GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setResumeList(resp.data.data);
        setLoader(false); // FIXED: Move inside .then
      })
      .catch(() => setLoader(false)); // In case of error
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
    <h2 className='font-bold text-3xl'>My Resume</h2>
    <p>Start Creating AI resume to your next Job role</p>
    <div className='grid grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-5  mt-10 gap-5'>
      <AddResume/>

        {/* LOADER SKELETON */}
        {loader && (
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse h-[280px] rounded-xl border p-5 bg-gray-100"
            >
              <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        )}

        {/* RESUME CARDS */}
        {!loader && resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={GetResumesList}
            />
          ))
        }

      </div>
    </div>
  );
}

export default Dashboard;
