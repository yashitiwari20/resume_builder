import { Notebook, MoreVertical, Navigation, Loader, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

  

function ResumeCardItem({ resume,refreshData}) {
    // Debugging: log the entire resume object
    console.log("Resume object:", resume);
    const navigation=useNavigate();
    const [loading,setLoading]=useState(false)

    


    // Check various levels to locate `title`
    const title = resume?.attributes?.title || resume?.title || "No title available";
    const resumeId = resume?.attributes?.id || resume?.id;
    //const themeColor = resume?.themeColor || "gray"; // Fallback color for testing
    const [openAlert,setOpenAlert]=useState(false);
  
    console.dir(resume, { depth: null });

    useEffect(() => {
        console.log("Resume title:", title);
        console.log("Resume ID:", resumeId);
       // console.log("Theme Color:", themeColor);
    }, [resume]);
    
    const onDelete=()=>{
        setLoading(true)
        GlobalApi.DeleteResumeById(resumeId).then(resp=>{
            console.log(resp);
            toast('Resume Deleted!');
            refreshData()
            setLoading(false)
            setOpenAlert(false)
        },(error)=>{
            setLoading(false)
        })
    }
    



    return (
        <div>
            <Link to={`/dashboard/resume/${resumeId}/edit`}>
                <div
                    className="p-14 
                    flex items-center justify-center h-[280px]
                    rounded-lg border-t-4
                    hover: bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:via-purple-500 ... 
                    hover:shadow-md shadow-primary"
                    style={{ borderColor: resume?. themeColor||"#7133FF" }}
                >
                    <div className='flex items-center justify-center h-[180px]'>
                        <img src="/curriculum.png" width={80} height={80} alt="Curriculum Icon"/>
                    </div>
                </div>
            </Link>
            <div
                className='border p-3 flex justify-between text-white rounded-b-lg shadow-lg'
                style={{
                    background: resume?.themeColor||"#7133FF"
                }}
            >
                <h2 className='text-sm'>{title}</h2>
            
            <DropdownMenu>
  <DropdownMenuTrigger><MoreVertical className='h-4 w-4 cursor-ponter'/></DropdownMenuTrigger>
  <DropdownMenuContent>
    
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>navigation(`/dashboard/resume/${resumeId}/edit`)}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation(`/my-resume/${resumeId}/view`)}>View</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>navigation(`/my-resume/${resumeId}/view`)}>Download</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

<AlertDialog open={openAlert}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete} disabled={loading}>
      {loading?<Loader2Icon className='animate-spin'/>:'Delete'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

</div>
            
        </div>
    );
}

export default ResumeCardItem;
