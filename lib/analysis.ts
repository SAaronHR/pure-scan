export interface TextAnalysisResult {
  id: string
  kind: "text"
  createdAt: string
  source: "comprehend" | "fallback"
  promptScore: number
  summary: string
  strengths: string[]
  issues: string[]
  recommendations: string[]
  improvedPrompt: string
  structure: {
    role: string
    objective: string
    context: string
    constraints: string
    outputFormat: string
    audience: string
    tone: string
    missingElements: string[]
  }
  signals: {
    dominantLanguage: string
    entities: string[]
    keyPhrases: string[]
    piiCount: number
    sentiment: string
  }
  historyKey: string | null
}

export interface HistoryItemInput {
  text?: string
  fileName?: string
  mimeType?: string
  size?: number
  imageKey?: string
}

export interface HistoryItem {
  id: string
  kind: "text" | "image"
  createdAt: string
  input: HistoryItemInput
  result: TextAnalysisResult | ImageAnalysisResult
  historyKey: string
}

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000"

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.error ?? "No fue posible completar la solicitud.")
  }

  return response.json() as Promise<T>
}

export async function analyzeText(text: string) {
  const response = await fetch(`${backendUrl}/analyze/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  })

  return parseJsonResponse<TextAnalysisResult>(response)
}

export interface ImageAnalysisResult {
  id?: string
  kind?: "image"
  createdAt?: string
  source: "bedrock" | "fallback"
  analysisStrength: number
  summary: string
  scene?: any
  subjects?: any[]
  objects?: string[]
  textFound?: string[]
  dominantColors?: string[]
  quality?: any
  signals?: any
  recommendations?: string[]
  tags?: string[]
  historyKey?: string | null
}

export async function analyzeImage(file: File) {
  const form = new FormData()
  form.append("image", file)

  const response = await fetch(`${backendUrl}/analyze/image`, {
    method: "POST",
    body: form
  })

  return parseJsonResponse<ImageAnalysisResult>(response)
}

export async function getHistory(kind: "text" | "image", limit = 10) {
  const response = await fetch(`${backendUrl}/analyze/history?kind=${kind}&limit=${limit}`)

  return parseJsonResponse<{ items: HistoryItem[] }>(response).then((payload) => payload.items)
}
