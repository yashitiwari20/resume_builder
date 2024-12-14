import { Button } from "@/components/ui/button";
import React, { useState, useContext } from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  Separator,
  BtnBulletList,
  BtnStyles
} from "react-simple-wysiwyg";
import { Brain, LoaderCircle } from "lucide-react"; 
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../service/AIModal";

// AI prompt for generating bullet points
const PROMPT = "Given the position title '{positionTitle}', generate 5-7 bullet points that describe relevant experience for a resume.";


function RichTextEditor({ onRichTextEditorChange, index,defaultValue}) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    try {
      const positionTitle = resumeInfo.experience[index]?.title;
      if (!positionTitle) {
        toast('Please Add Position Title');
        setLoading(false);
        return;
      }
  
      const prompt = PROMPT.replace('{positionTitle}', positionTitle);
      const result = await AIChatSession.sendMessage(prompt);
  
      // Await and parse the response text
      const responseText = await result.response.text(); 
      console.log("Full AI Response:", responseText);
  
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText); // Parsing the JSON response
  
        // Access the 'bullet_points' from the response object
        const bulletPoints = parsedResponse.bullet_points;
  
        // Ensure the bulletPoints array is valid
        if (Array.isArray(bulletPoints) && bulletPoints.length > 0) {
          const formattedHTML = `<ul>${bulletPoints.map(point => `<li>${point}</li>`).join('')}</ul>`;
          setValue(formattedHTML);
  
          // Update resume information in context
          setResumeInfo(prev => {
            const newExperience = [...prev.experience];
            newExperience[index] = { ...newExperience[index], workSummery: formattedHTML };
            return { ...prev, experience: newExperience };
          });
        } else {
          throw new Error("No bullet points found in the response.");
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        toast("Unexpected AI response format. Please check the AI's response.");
      }
    } catch (error) {
      console.error("Error in GenerateSummeryFromAI:", error);
      toast("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={GenerateSummeryFromAI} 
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : <><Brain /> Generate from AI</>}
        </Button>
      </div>
      <EditorProvider>
        <Editor 
          value={value} 
          onChange={(e) => {
            const htmlValue = e.target.value; 
            setValue(htmlValue);
            setResumeInfo(prev => {
              const newExperience = [...prev.experience];
              newExperience[index] = { ...newExperience[index], workSummery: htmlValue };
              return { ...prev, experience: newExperience };
            });
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
