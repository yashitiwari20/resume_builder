import React, { useEffect,useState}  from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume(){

    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();

    useEffect(()=>{
       
        GetResumeInfo()
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
          console.log(resp.data.data.attributes)
          setResumeInfo(resp.data.data.attributes)
        })
    
      }
        
       {/* const GetResumeInfo = () => {
          GlobalApi.GetResumeById(resumeId)
              .then((resp) => {
                  console.log("Fetched Resume Info:", resp.data.data); // Log to inspect
                  // Assuming the data is in `resp.data.data.attributes`
                  setResumeInfo(resp.data.data.attributes);
              })
              .catch((err) => {
                  console.error("Error fetching resume info:", err);
                  setResumeInfo(dummy); // Optionally load dummy data on error
                  setError("Failed to load resume information.");
              });
      };*/}
      
    
    return (
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            {/* form section */}
             <FormSection/>
 
            {/* Previe section */}
            <ResumePreview/>
        </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume
