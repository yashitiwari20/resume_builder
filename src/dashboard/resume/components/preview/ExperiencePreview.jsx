import React from "react";

function ExperiencePreview({ resumeInfo }) {
    const themeColor = resumeInfo?.preferences?.themeColor || '#7133FF';
    return (
        <div className="my-6">
            <h2 className="text-center font-bold text-xm mb-2"
                style={{ color: themeColor }}>Professional Experience</h2>
            <hr 
                style={{ borderColor: themeColor }} 
            />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className="my-5">
                    <h2 className="text-sm font-bold" 
                        style={{ color: themeColor }}>{experience?.title}</h2>
                    <h2 className="text-xs flex justify-between">{experience?.companyName},
                       ({experience?.city},
                        {experience?.state})
                        <span>{experience?.startDate} to {experience?.currentlyWorking ? 'Present' : experience.endDate}</span>
                    </h2>
                    {/* Apply text-sm class to workSummery */}
                    <div  className="text-xs">
                    <div    dangerouslySetInnerHTML={{ __html: experience?.workSummery }}   />
                    </div>


                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview;
