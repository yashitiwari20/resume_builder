import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle}, Depends on job title give me a list of summaries for 3 experience levels (Fresher, Mid-Level, Experienced) in 3-4 lines in JSON array format, with fields 'summary' and 'experience_level'.";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);

  // Sync summery with context
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      summery,
    }));
  }, [summery, setResumeInfo]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace(
      "{jobTitle}",
      resumeInfo?.jobTitle || "your job title"
    );
    console.log("Generated Prompt:", PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = (await result.response.text()).trim();
      console.log("AI Response:", responseText);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);

        // Handle array or object response
        if (Array.isArray(parsedResponse)) {
          // AI returned an array directly
          setAiGenerateSummeryList(parsedResponse);
        } else if (parsedResponse?.summaries && Array.isArray(parsedResponse.summaries)) {
          // AI returned object with "summaries" field
          setAiGenerateSummeryList(parsedResponse.summaries);
        } else {
          console.error("Unexpected format. No valid summaries found.");
          toast.error("AI response is not in the expected format.");
          setAiGenerateSummeryList([]);
        }
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        toast.error("Failed to parse AI response. Please try again.");
        setAiGenerateSummeryList([]);
      }
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      toast.error("Failed to generate summary. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!params?.resumeId) {
      toast.error("Resume ID is missing. Cannot save.");
      setLoading(false);
      return;
    }

    const data = {
      data: {
        summery,
      },
    };

    try {
      const resp = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
      console.log("Save Response:", resp);
      toast.success("Details updated successfully.");
      enabledNext(true);
    } catch (error) {
      console.error("Error saving summary:", error);
      toast.error("Failed to save summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Brain className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList.length > 0 ? (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item.summary || "")}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item.experience_level || "Unknown"}
              </h2>
              <p>{item.summary || "No summary available."}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-5">No suggestions available. Please generate from AI.</p>
      )}
    </div>
  );
}

export default Summery;
