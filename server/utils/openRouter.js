import axios from "axios";

// eslint-disable-next-line complexity
export const askAI = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages,
        max_tokens: 4500,
        temperature: 0.55,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "X-OpenRouter-Title": "COSMIC UI",
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;
    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }
    return content;
  } catch (error) {
    console.error("OpenRouter Error: ", error?.response?.data || error?.message);
    throw new Error("OpenRouter API Error");
  }
};
