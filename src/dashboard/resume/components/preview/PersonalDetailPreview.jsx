import React from "react";

function PersonalDetailPreview({resumeInfo}){
    const themeColor = resumeInfo?.preferences?.themeColor || '#7133FF';
    return(
        <div className="my-6">
            <h2 className='font-bold text-xl text-center'
        style={{
            color:themeColor
        }}
        >
            {resumeInfo?.firstName} {resumeInfo?.lastName}</h2>

            <h2 className="text-center text-sm font-medium">{resumeInfo?.jobTitle}</h2>

            <h2 className="text-center font-normal text-xs"
            style={{color:themeColor}}>{resumeInfo?.address}</h2>

            <div className="flex justify-between">
                <h2 className="font-normal text-xs"
                style={{color:themeColor}}>{resumeInfo?.phone}</h2>

                <h2 className="font-normal text-xs"
                style={{color:themeColor}} >{resumeInfo?.email}</h2>
            </div>
            <hr className="border-[1.5px] my-2"
            style={{borderColor:themeColor}}/>
        </div>

    )
}

export default PersonalDetailPreview