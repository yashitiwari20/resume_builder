import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkiilsPreview'

function ResumePreview(){
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const themeColor = resumeInfo?.preferences?.themeColor || '#7133FF';
    

    return(
        <div className='shadow-lg h-full p-14 border-t-[20px]'
        style={{borderColor:themeColor}}>
            {/* Personal Detail */}
               <PersonalDetailPreview resumeInfo={resumeInfo}/>
            {/* Summery */}
               <SummeryPreview resumeInfo={resumeInfo}/>
            {/* Professional Experience*/}
                <ExperiencePreview resumeInfo={resumeInfo}/>

            {/* Educational */}
                 <EducationalPreview resumeInfo={resumeInfo}/>

            {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>
        </div>
    )
}

export default ResumePreview