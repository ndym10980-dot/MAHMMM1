import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DetailedInfo } from '../types';

const apiKey = process.env.API_KEY || '';

// Define the response schema strictly to ensure consistent JSON output
const detailedInfoSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'ملخص شامل عن الشخصية أو الحدث لا يقل عن 100 كلمة',
    },
    dates: {
      type: Type.STRING,
      description: 'التواريخ المهمة (الميلاد/الوفاة أو تاريخ المعركة) بالهجري والميلادي',
    },
    achievements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'قائمة بأهم الأعمال أو الإنجازات أو الأحداث الرئيسية (5 نقاط على الأقل)',
    },
    significance: {
      type: Type.STRING,
      description: 'الأهمية التاريخية والدينية والمناقب',
    },
  },
  required: ['summary', 'achievements', 'significance'],
};

export const fetchHistoricalDetails = async (name: string, category: string): Promise<DetailedInfo> => {
  if (!apiKey) {
    console.warn("No API Key found");
    return {
      summary: "عذراً، مفتاح API غير موجود. لا يمكن جلب التفاصيل الحية.",
      achievements: ["تأكد من إعداد مفتاح API الخاص بـ Gemini."],
      significance: "معلومات غير متوفرة",
      dates: "غير معروف"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      أنت مؤرخ إسلامي خبير وموسوعي.
      قدم لي معلومات مفصلة ودقيقة جداً باللغة العربية الفصحى عن: "${name}"
      الذي يندرج تحت تصنيف: "${category}".
      
      يجب أن تكون المعلومات موثقة ومبنية على المصادر الإسلامية الصحيحة.
      اجعل الأسلوب سردياً مشوقاً واحترافياً.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: detailedInfoSchema,
        systemInstruction: "أنت مساعد ذكي متخصص في التاريخ الإسلامي. تقدم المعلومات بدقة وأدب واحترام للرموز الدينية."
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(text) as DetailedInfo;

  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      summary: "حدث خطأ أثناء جلب المعلومات. يرجى المحاولة مرة أخرى.",
      achievements: [],
      significance: "",
      dates: ""
    };
  }
};
