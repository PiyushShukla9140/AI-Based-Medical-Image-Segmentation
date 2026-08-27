import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Helper: Convert local file to base64 generative part
const fileToGenerativePart = (filePath, mimeType) => {
  return {
    inlineData: {
      data: fs.readFileSync(filePath).toString("base64"),
      mimeType: mimeType || "image/jpeg"
    }
  };
};

/**
 * Analyzes a medical image and returns structured bounding coordinates and findings
 * @param {string} localFilePath - Path to temporary uploaded image file
 * @param {string} mimeType - Image MIME type (e.g., 'image/jpeg', 'image/png')
 * @param {string} scanType - Modality (e.g., 'Chest X-Ray', 'Brain MRI')
 */
export const analyzeMedicalImageWithGemini = async (
    localFilePath,
    mimeType,
    scanType = "Chest X-Ray"
  ) => {
    try {
      const imagePart = fileToGenerativePart(localFilePath, mimeType);

      const prompt = `
  You are an expert AI radiology and medical imaging assistant.
  Analyze this medical scan of type: "${scanType}".

  Detect and locate any visible abnormalities, pathologies, lesions, consolidations, or fractures.
  For every abnormality detected:
  1. Provide a precise 2D bounding box normalized on a 0 to 1000 scale: { ymin, xmin, ymax, xmax }.
  2. Assign a clinical label and category.
  3. Add a concise clinical note and confidence score (0 to 1).

  Provide an overall clinical summary of findings and assign a severity level ('Normal', 'Low', 'Moderate', or 'High').
  `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [imagePart, prompt],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallFindings: {
                type: Type.STRING,
                description: "Concise clinical summary of observations"
              },
              severityLevel: {
                type: Type.STRING,
                enum: ["Normal", "Low", "Moderate", "High"]
              },
              detectedRegions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    category: { type: Type.STRING },
                    confidenceScore: { type: Type.NUMBER },
                    box2d: {
                      type: Type.OBJECT,
                      properties: {
                        ymin: { type: Type.NUMBER },
                        xmin: { type: Type.NUMBER },
                        ymax: { type: Type.NUMBER },
                        xmax: { type: Type.NUMBER }
                      },
                      required: ["ymin", "xmin", "ymax", "xmax"]
                    },
                    clinicalNote: { type: Type.STRING }
                  },
                  required: ["label", "box2d"]
                }
              }
            },
            required: ["overallFindings", "severityLevel", "detectedRegions"]
          }
        }
      });

      const resultJson = JSON.parse(response.text.trim());
      return resultJson;
    } catch (error) {
      console.error("Gemini Vision API Error:", error);
      throw new Error(`AI Analysis failed: ${error.message}`);
    }
};