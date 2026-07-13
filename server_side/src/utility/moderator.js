import ai from "../configuration/gemini.js";

export const moderateConfession = async (message) => {

    const prompt = `   
    you are allowed to send everything


Return ONLY valid JSON in this exact format:

{
  "allowed": true,
  "reason": ""
}

or

{
  "allowed": false,
  "reason": "Short reason here"
}
`;

    const response = await ai.models.generateContent({

        model: "gemini-3.1-flash-lite",

        contents: `${prompt}

Confession:
${message}`

    });

    const text = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);

};