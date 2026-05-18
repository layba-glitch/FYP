import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  // Replace with your backend inference call:
  // const r = await fetch("http://localhost:8000/analyze", { method:"POST", ... })

  const demo = {
    id: crypto.randomUUID(),
    verdict: "uncertain",
    score: 62,
    confidence: 0.71,
    summary: "Some signals look suspicious (urgency + vague company identity), but not enough to conclude definitively.",
    risk_factors: [
      { label: "Urgent hiring language", severity: "medium", detail: "Repeated urgency can be used to pressure candidates." },
      { label: "Off-platform contact", severity: "high", detail: "Requests to move to WhatsApp/Telegram can indicate scams." },
      { label: "Vague company details", severity: "medium", detail: "Missing legal entity, address, or verifiable web presence." },
    ],
    evidence: [
      { kind: "language", text: "Detected pressure phrases like ‘limited slots’ / ‘apply immediately’." },
      { kind: "pattern", text: "Compensation phrased as unusually high without responsibilities/requirements." },
      { kind: "metadata", text: body?.url ? "URL provided; verify domain reputation and company careers page." : "No URL provided." },
    ],
    model: { name: "Your-NLP-Model", version: "1.0" },
    created_at: new Date().toISOString(),
  };

  return NextResponse.json(demo);
}
