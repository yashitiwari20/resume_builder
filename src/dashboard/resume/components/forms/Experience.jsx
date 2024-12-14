import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
};

function Experience() {   
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState(resumeInfo.experience || [formField]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    

    useEffect(() => {
       // if (resumeInfo.experience && resumeInfo.experience.length > 0) {
      //      setExperienceList(resumeInfo.experience);
       // }
       resumeInfo&&setExperienceList(resumeInfo?.experience)
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, formField]);
    };

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList, setResumeInfo]);
 
    const onSave = async () => { 
        setLoading(true);
    
        const payload = { 
            data: { 
                experience: experienceList.map(exp => ({
                    title: exp.title,
                    companyName: exp.companyName,
                    city: exp.city,
                    state: exp.state,
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                    workSummery: exp.workSummery
                }))
            } 
        };
    
        console.log("Payload:", JSON.stringify(payload, null, 2));  // Log payload
    
        try {
            const response = await GlobalApi.UpdateResumeDetail(params.resumeId, payload);
            console.log("Response:", response);
            toast('Details updated!');
        } catch (error) {
            console.error("Error details:", error?.response?.data || error.message);
            toast.error("Failed to update details. Please check your input and try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>                 
              {experienceList.map((item, index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.title}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.companyName} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.city}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.state}
                             />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="startDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.startDate}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.endDate}
                            />
                        </div>
                        <div className='col-span-2'>
                           {/* Work Summery  */}
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.workSummery}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experience;
