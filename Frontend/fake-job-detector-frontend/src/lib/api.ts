export async function analyzeJob(data: {
  title: string;
  description: string;
  location: string;
  threshold: number; // Added tracking parameter type
}) {
  const res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      location: data.location,
      description: data.description,
      threshold: data.threshold, // Passes the chosen slider parameter
      requirements: "",
    }),
  });

  if (!res.ok) {
    const errorDetails = await res.json().catch(() => ({}));
    throw new Error(errorDetails.detail || "Check Python Terminal for Error");
  }

  return res.json();
}