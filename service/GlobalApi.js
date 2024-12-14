import axios from "axios";


const API_KEY = '2f1acaa8312e3757b7c5843e62783e00effae84b2aebb29fd6ce0d8950f9bdf2d95ca90c77a496421d3d5688b202498de651255583402a30cb1beae3259a4a210310499ca2efbd5fc81eb4058b09de9a117815f982ff6aa9d372000a9cda54fa7c2bedc22a6b21098be7c603e1e6af03a94c91294ca177442374855f5f35d131';


const axiosClient=axios.create({
    //baseURL:'http://localhost:1337/api/',
   baseURL:'https://ai-resume-builder-strapi-admin-2k6y.onrender.com/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
});




const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}