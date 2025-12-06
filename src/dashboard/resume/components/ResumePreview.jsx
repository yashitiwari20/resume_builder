import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkiilsPreview'

function ResumePreview() {
    const { resumeInfo } = useContext(ResumeInfoContext)

    // If still loading, show loader
    if (!resumeInfo) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
            </div>
        );
    }

    const themeColor = resumeInfo?.preferences?.themeColor || '#7133FF';

    return (
        <div 
            className='shadow-lg h-full p-14 border-t-[20px]' 
            style={{ borderColor: themeColor }}
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummeryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
        </div>
    )
}

export default ResumePreview
