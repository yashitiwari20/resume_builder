import React from "react";

function EducationalPreview({resumeInfo}){
    
    const themeColor = resumeInfo?.preferences?.themeColor || '#7133FF';
    return(
        <div className="my-6">
        <h2 className="text-center font-bold text-xm mb-2"
        style={{color:themeColor||'#7133FF'}}>Education</h2>
        <hr 
        style={{borderColor:themeColor||'#7133FF'}}/>
        {resumeInfo?.education?.map((education,index)=>(
            <div key={index} className="my-5">
                <h2 className="text-sm font-bold"
                style={{color:themeColor}}>{education.universityName}</h2>
                <h2 className="text-xs flex justify-between">{education?.degree} in {education?.major}
                <span>{education?.startDate} to {education?.endDate}</span>
                </h2>
                <p className="text-xs my-2">
                    {education?.description}
                </p>
                </div> 
        ))}

    </div>
    )
}

export default EducationalPreview  

