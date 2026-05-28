const exactTranslations: Record<string, string> = {
  Unknown: "Desconocido",
  "No description": "Sin descripción",
  "No summary provided.": "Sin resumen disponible.",
  "Not analyzed": "Sin analizar",
  Neutral: "Neutro",
  Positive: "Positivo",
  Negative: "Negativo",
  Mixed: "Mixto",
  Low: "Bajo",
  Medium: "Medio",
  High: "Alto",
  Portrait: "Retrato",
  Landscape: "Paisaje",
  Wildlife: "Vida silvestre",
  Indoor: "Interior",
  Outdoor: "Exterior",
  Scene: "Escena",
  Background: "Fondo",
  Black: "Negro",
  White: "Blanco",
  Brown: "Marrón",
  Green: "Verde",
  Blue: "Azul",
  Yellow: "Amarillo",
  Red: "Rojo",
  Gray: "Gris",
  Grey: "Gris",
  Orange: "Naranja",
  Purple: "Morado",
  Pink: "Rosa",
  Bedrock: "Bedrock",
  bedrock: "Bedrock",
  "no visible": "sin contenido visible"
}

const phraseTranslations: Array<[RegExp, string]> = [
  [/\bThe image appears to be completely black with no discernible features or content\.?/gi, "La imagen parece ser completamente negra, sin rasgos ni contenido discernibles."],
  [/\bThe image appears to be\b/gi, "La imagen parece ser"],
  [/\bThe image shows\b/gi, "La imagen muestra"],
  [/\ba man with beard and dark hair\b/gi, "un hombre con barba y cabello oscuro"],
  [/\ba woman with dark hair\b/gi, "una mujer con cabello oscuro"],
  [/\bwearing a white shirt\b/gi, "vistiendo una camiseta blanca"],
  [/\bwearing a white t-shirt\b/gi, "vistiendo una camiseta blanca"],
  [/\bsmiling and looking down\b/gi, "sonriendo y mirando hacia abajo"],
  [/\bThere is\b/gi, "Hay"],
  [/\bThere are\b/gi, "Hay"],
  [/\bwithout any visible\b/gi, "sin contenido visible"],
  [/\bwith no visible\b/gi, "sin contenido visible"],
  [/\bno discernible features or content\b/gi, "sin rasgos ni contenido discernibles"],
  [/\bNo visible subject\b/gi, "Sin sujeto visible"],
  [/\bNo visible objects\b/gi, "Sin objetos visibles"],
  [/\bcompletely black\b/gi, "completamente negra"],
  [/\bcompletely blank\b/gi, "completamente vacía"],
  [/\bblack background\b/gi, "fondo negro"],
  [/\bno visible subject\b/gi, "sin sujeto visible"],
  [/\bvisible\b/gi, "visible"]
]

export function translateDisplayText(value?: string | null) {
  if (!value) {
    return ""
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return ""
  }

  if (exactTranslations[trimmed]) {
    return exactTranslations[trimmed]
  }

  let translated = trimmed
  for (const [pattern, replacement] of phraseTranslations) {
    translated = translated.replace(pattern, replacement)
  }

  return translated
}

export function translateDisplayList(values?: string[]) {
  return (values ?? []).map((value) => translateDisplayText(value)).filter(Boolean)
}

export function translateDisplayLanguage(value?: string | null) {
  const translated = translateDisplayText(value)
  if (translated) {
    return translated
  }

  return value ?? ""
}

export function translateDisplaySentiment(value?: string | null) {
  if (!value) {
    return ""
  }

  const upper = value.toUpperCase()
  if (upper === "UNKNOWN") return "No concluyente"
  if (upper === "POSITIVE") return "Positivo"
  if (upper === "NEGATIVE") return "Negativo"
  if (upper === "MIXED") return "Mixto"
  return translateDisplayText(value)
}

export function translateDisplaySource(value?: string | null) {
  if (!value) {
    return ""
  }

  if (value.toLowerCase() === "bedrock") {
    return "Bedrock"
  }

  return translateDisplayText(value)
}

export function translateDisplayScene(scene?: { type?: string; description?: string; setting?: string; mood?: string } | null) {
  if (!scene) {
    return scene
  }

  return {
    type: translateDisplayText(scene.type),
    description: translateDisplayText(scene.description),
    setting: translateDisplayText(scene.setting),
    mood: translateDisplayText(scene.mood)
  }
}

export function translateDisplayQuality(quality?: { lighting?: string; sharpness?: string; composition?: string; noise?: string } | null) {
  if (!quality) {
    return quality
  }

  return {
    lighting: translateDisplayText(quality.lighting),
    sharpness: translateDisplayText(quality.sharpness),
    composition: translateDisplayText(quality.composition),
    noise: translateDisplayText(quality.noise)
  }
}

export function translateDisplaySubjects(subjects?: Array<{ label?: string; description?: string }> | null) {
  return (subjects ?? [])
    .map((subject) => ({
      label: translateDisplayText(subject?.label),
      description: translateDisplayText(subject?.description)
    }))
    .filter((subject) => Boolean(subject.label))
}

export function translateImageAnalysisResult(result?: {
  summary?: string
  source?: string
  analysisStrength?: number
  scene?: { type?: string; description?: string; setting?: string; mood?: string }
  subjects?: Array<{ label?: string; description?: string }>
  objects?: string[]
  textFound?: string[]
  dominantColors?: string[]
  quality?: { lighting?: string; sharpness?: string; composition?: string; noise?: string }
  signals?: { likelihood?: string; clues?: string[]; provenance?: string[] }
  recommendations?: string[]
  tags?: string[]
  historyKey?: string | null
  id?: string
  kind?: "image"
  createdAt?: string
} | null) {
  if (!result) {
    return result
  }

  return {
    ...result,
    summary: translateDisplayText(result.summary),
    source: translateDisplaySource(result.source),
    scene: translateDisplayScene(result.scene),
    subjects: translateDisplaySubjects(result.subjects),
    objects: translateDisplayList(result.objects),
    textFound: translateDisplayList(result.textFound),
    dominantColors: translateDisplayList(result.dominantColors),
    quality: translateDisplayQuality(result.quality),
    signals: result.signals
      ? {
          ...result.signals,
          clues: translateDisplayList(result.signals.clues),
          provenance: translateDisplayList(result.signals.provenance)
        }
      : result.signals,
    recommendations: translateDisplayList(result.recommendations),
    tags: translateDisplayList(result.tags)
  }
}
