
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI('AIzaSyAQrjoYVpvjnqoqq1G9oCjSROJqiwIE-5k');

// export async function getBotReply(message, language) {
//   let langName = {
//     hi: "Hindi",
//     mr: "Marathi",
//     or: "Odia",
//   }[language] || "English";

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `
//       You are an AI Crop Advisor. 
//       Answer farmer questions in a simple and clear way.
//       Reply in ${langName}.

//       User: ${message}
//     `;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     return "⚠️ Sorry, I could not fetch an answer right now.";
//   }
// }



// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI('AIzaSyBQUDCjtTdOQQ1NH3R50u641Pmu6yy09nw');

// export async function getBotReply(message, language) {
//   let langName = {
//     hi: "Hindi",
//     mr: "Marathi",
//     or: "Odia"
//   }[language] || "English";

//   try {
//     // ✅ Use correct model name
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
//       You are an AI Crop Advisor. 
//       Answer farmer questions simply and clearly.
//       Reply in ${langName}.

//       User: ${message}
//     `;

//     const result = await model.generateContent(prompt);
//     return result.response.text();
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     return "⚠️ Sorry, I could not fetch an answer right now.";
//   }
// }




import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyBQUDCjtTdOQQ1NH3R50u641Pmu6yy09nw');

export async function getBotReply(message, language) {
  let langName = "English";

  switch (language) {
    case 'hi':
      langName = "Hindi";
      break;
    case 'mr':
      langName = "Marathi";
      break;
    case 'or':
      langName = "Odia";
      break;
    default:
      langName = "English";
  }

  try {
     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `You are an AI Crop Advisor. Answer farmer questions in a simple and clear way.
       Reply in ${langName}.
       
       User: ${message}`
    );

    return result.response.text();
  } catch (err) {
    console.error('Gemini API Error:', err);
    return '⚠️ Sorry, I could not fetch an answer right now.';
  }
}
