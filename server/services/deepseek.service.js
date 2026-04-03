import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv()

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export const generateWithDeepseek = async (prompt) => {
    const res = await axios.post('https://api.deepseek.com/v1/chat/completions',
        {
            model: 'deepseek-chat',
            messages: [
                {role: 'user', content: prompt}
            ],
            max_tokens: 1024,
            temperature: 0.7
        }, 
        {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    )

    return res.data.choices[0].message.content
}