"use client"

import { useEffect, useState } from "react"
import { Clock3, FileText, Image as ImageIcon, Loader2, RefreshCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { backendUrl, getHistory, type HistoryItem, type ImageAnalysisResult, type TextAnalysisResult } from "@/lib/analysis"
import { translateDisplayText } from "@/lib/display"

interface HistoryPanelProps {
    kind: "text" | "image"
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (item: HistoryItem) => void
}

function formatDate(value: string) {
    try {
        return new Intl.DateTimeFormat("es-ES", {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(value))
    } catch {
        return value
    }
}

function buildPreview(item: HistoryItem) {
    if (item.kind === "text") {
        return translateDisplayText(item.input.text?.trim().slice(0, 180) || item.result.summary)
    }

    return translateDisplayText(item.result.summary || item.input.fileName || "Imagen sin descripción")
}

function buildImagePreviewUrl(item: HistoryItem) {
    if (item.kind !== "image" || !item.input.imageKey) {
        return null
    }

    return `${backendUrl}/analyze/history/image?key=${encodeURIComponent(item.input.imageKey)}`
}

export default function HistoryPanel({ kind, open, onOpenChange, onSelect }: HistoryPanelProps) {
    const [items, setItems] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!open) {
            return
        }

        let active = true
        setLoading(true)
        setError(null)

        getHistory(kind, 10)
            .then((historyItems) => {
                if (active) {
                    setItems(historyItems)
                }
            })
            .catch((historyError) => {
                if (active) {
                    setError(historyError instanceof Error ? historyError.message : "No fue posible cargar el historial.")
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false)
                }
            })

        return () => {
            active = false
        }
    }, [kind, open])

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full border-l border-zinc-800 bg-[#08111f] text-zinc-100 sm:max-w-xl">
                <SheetHeader className="px-6 pt-6">
                    <SheetTitle className="flex items-center gap-2 text-white">
                        <Clock3 className="h-4 w-4 text-sky-300" />
                        Historial de {kind === "text" ? "texto" : "imagen"}
                    </SheetTitle>
                    <SheetDescription className="text-zinc-400">
                        Revisa análisis recientes y vuelve a ponerlos en pantalla con un clic.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 pb-6 pt-2">
                    {loading && (
                        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-sm text-zinc-300">
                            <Loader2 className="h-4 w-4 animate-spin text-sky-300" />
                            Cargando historial...
                        </div>
                    )}

                    {error && !loading && (
                        <div className="rounded-2xl border border-[#93000A] bg-[#2C0A0A] px-4 py-4 text-sm text-[#FFB4AB]">
                            {error}
                        </div>
                    )}

                    {!loading && !error && items.length === 0 && (
                        <Card className="border-dashed border-white/10 bg-white/5">
                            <CardContent className="space-y-3 p-5 text-sm text-zinc-400">
                                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Sin historial</p>
                                <p>Aún no hay análisis guardados en S3 para esta sección.</p>
                            </CardContent>
                        </Card>
                    )}

                    {!loading && !error && items.map((item) => {
                        const isText = item.kind === "text"
                        const textResult = item.result as TextAnalysisResult
                        const imageResult = item.result as ImageAnalysisResult
                        const primaryValue = isText
                            ? `${textResult.promptScore}% listo`
                            : `${imageResult.analysisStrength}% confiabilidad`
                        const secondaryValue = isText
                            ? textResult.signals.sentiment === "UNKNOWN"
                                ? "Sentimiento no concluyente"
                                : `Sentimiento ${textResult.signals.sentiment.toLowerCase()}`
                            : translateDisplayText(imageResult.scene?.type || "Escena sin clasificar")
                        const imagePreviewUrl = buildImagePreviewUrl(item)

                        return (
                            <button
                                key={item.historyKey}
                                onClick={() => {
                                    onSelect(item)
                                    onOpenChange(false)
                                }}
                                className="text-left"
                            >
                                <Card className="border-white/10 bg-gradient-to-b from-white/6 to-white/4 transition-all hover:border-sky-500/30 hover:bg-white/8 hover:shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                                    <CardContent className="space-y-4 p-5">
                                        {imagePreviewUrl && (
                                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                                                <img src={imagePreviewUrl} alt={item.input.fileName ?? "Imagen del historial"} className="h-36 w-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    {isText ? (
                                                        <FileText className="h-4 w-4 text-sky-300" />
                                                    ) : (
                                                        <ImageIcon className="h-4 w-4 text-sky-300" />
                                                    )}
                                                    <Badge variant="secondary" className="border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                                                        {isText ? "Texto" : "Imagen"}
                                                    </Badge>
                                                </div>
                                                <h3 className="line-clamp-2 text-base font-semibold text-white">
                                                    {buildPreview(item)}
                                                </h3>
                                            </div>

                                            <div className="shrink-0 rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-right">
                                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                                                    {isText ? "Puntaje" : "Confianza"}
                                                </div>
                                                <div className="mt-1 text-lg font-bold text-sky-200">{primaryValue}</div>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-2xl border border-white/8 bg-[#0b1018] px-4 py-3">
                                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Fecha</div>
                                                <div className="mt-1 text-sm text-zinc-200">{formatDate(item.createdAt)}</div>
                                            </div>
                                            <div className="rounded-2xl border border-white/8 bg-[#0b1018] px-4 py-3">
                                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Detalle</div>
                                                <div className="mt-1 text-sm text-zinc-200">{secondaryValue}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
                                            <span>{isText ? "Pulsa para restaurar el prompt" : "Pulsa para restaurar el análisis"}</span>
                                            <RefreshCcw className="h-3.5 w-3.5" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </button>
                        )
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
}
