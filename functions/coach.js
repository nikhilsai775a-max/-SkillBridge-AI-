import OpenAI from "openai";

export default async (req) => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...headers, Allow: "POST" } });
  if (!process.env.OPENAI_API_KEY) return new Response(JSON.stringify({ error: "AI is not configured yet. Add OPENAI_API_KEY in Netlify environment variables." }), { status: 503, headers });
  try {
    const body = await req.json();
    const question = String(body.question || "").trim().slice(0, 1800);
    if (!question) return new Response(JSON.stringify({ error: "Please enter a question." }), { status: 400, headers });
    const profile = body.profile && typeof body.profile === "object" ? body.profile : {};
    const assessment = body.assessment && typeof body.assessment === "object" ? body.assessment : null;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: "You are SkillBridge AI, a supportive education and career mentor for students across school, intermediate, diploma, undergraduate, postgraduate and working learners. Tailor guidance to their level, course, goals, interests and assessment data. Use simple language, practical steps and headings. Explain uncertainty. Never present a career match as guaranteed or claim a quiz is validated. Do not request passwords, API keys, or sensitive personal data. Do not invent official syllabus details. If assessment data is supplied, use it carefully and distinguish quiz evidence from self-reported interests.",
      input: `Student profile (user supplied):\n${JSON.stringify(profile)}\n\nLatest prototype assessment (may be null):\n${JSON.stringify(assessment)}\n\nStudent question:\n${question}`,
      max_output_tokens: 1000
    });
    return new Response(JSON.stringify({ answer: response.output_text || "I couldn't generate an answer. Please try again." }), { status: 200, headers });
  } catch (err) {
    console.error("SkillBridge AI request failed:", err?.status || "unknown status");
    const status = err?.status === 429 ? 429 : 502;
    return new Response(JSON.stringify({ error: status === 429 ? "API quota or rate limit reached. Check API billing and limits." : "The AI request failed. Check the Netlify function logs and API configuration." }), { status, headers });
  }
};
