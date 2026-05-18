import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({
    id: params.id,
    verdict: "uncertain",
    score: 62,
    confidence: 0.71,
    summary: "Demo report detail page output.",
    risk_factors: [{ label: "Demo factor", severity: "medium", detail: "Replace with real output." }],
    evidence: [{ kind: "language", text: "Replace with real explainability artifacts." }],
    created_at: new Date().toISOString(),
  });
}
