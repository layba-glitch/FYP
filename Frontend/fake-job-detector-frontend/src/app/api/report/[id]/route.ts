import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return NextResponse.json({
    id,
    verdict: "uncertain",
    score: 62,
    confidence: 0.71,
    summary: "Demo report detail page output.",
    risk_factors: [
      {
        label: "Demo factor",
        severity: "medium",
        detail: "Replace with real output.",
      },
    ],
    evidence: [
      {
        kind: "language",
        text: "Replace with real explainability artifacts.",
      },
    ],
    created_at: new Date().toISOString(),
  });
}
