import { Configuration, OpenAIApi } from "openai";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: 'Missing fileName in request body' });
  }

  try {
    // Get Firebase Storage file URL
    const storageRef = ref(storage, `uploads/${fileName}`);
    const fileUrl = await getDownloadURL(storageRef);

    // Fetch file content (assuming text or PDF text extraction, simplified here)
    // In prod, use a proper PDF/text extraction service before sending text to OpenAI.
    // For MVP, just provide URL and ask OpenAI to analyze it (may be limited)
    
    // Compose prompt for OpenAI (you can improve this later)
    const prompt = `
      You are an AI assistant for document compliance analysis.
      The document is accessible here: ${fileUrl}
      Please provide a concise summary of the document content.
      Identify any personally identifiable information (PII) such as names, emails, addresses, IBANs, phone numbers.
      Flag any compliance issues or sensitive data found.
      Return the result in JSON with keys: summary, pii (array), complianceFlags (array).
    `;

    // Call OpenAI Chat Completion API
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0,
    });

    const responseText = completion.data.choices[0].message.content;

    // Try to parse JSON from OpenAI response (expecting JSON format)
    let jsonResult;
    try {
      jsonResult = JSON.parse(responseText);
    } catch (err) {
      // Fallback: just return raw text
      jsonResult = { rawResponse: responseText };
    }

    res.status(200).json(jsonResult);

  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ error: 'Failed to scan document', details: error.message });
  }
}
