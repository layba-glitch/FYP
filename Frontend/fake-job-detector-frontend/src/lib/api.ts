// api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "dev_key_change_me";

export interface JobAnalysisRequest {
  title: string;
  description: string;
  location: string;
  requirements?: string;
  company_profile?: string;
  benefits?: string;
  threshold: number; // The slider value
}

export interface JobAnalysisResponse {
  final_label: string;
  final_confidence: number;
  dl_prob_fake: number;
  ml_prob_fake: number;
  notes: any;
}

export async function analyzeJob(data: JobAnalysisRequest): Promise<JobAnalysisResponse> {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      location: data.location,
      requirements: data.requirements || "",
      company_profile: data.company_profile || "",
      benefits: data.benefits || "",
      threshold: data.threshold, // Passing the slider parameter
    }),
  });

  if (!res.ok) {
    const errorDetails = await res.json().catch(() => ({ detail: "Unknown server error" }));
    throw new Error(errorDetails.detail || "Failed to analyze job");
  }

  return res.json();
}