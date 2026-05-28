"use client"

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Level } from "@/components/level";
import HistoryPanel from "@/components/history-panel";
import NewImg from "@/components/newImg";
import Result from "@/components/result";
import { Metadata } from "@/components/metadata";
import { Anomalies } from "@/components/anomalies";
import { backendUrl, type HistoryItem, type ImageAnalysisResult } from "@/lib/analysis";
import { translateImageAnalysisResult } from "@/lib/display";

export default function ImgPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [resetSignal, setResetSignal] = useState(0);
    const [restoredPreviewUrl, setRestoredPreviewUrl] = useState<string | null>(null);

    const handleScanStart = () => {
        setIsScanning(true)
        setResult(null)
        setRestoredPreviewUrl(null)
    }

    const handleScanEnd = () => {
        setIsScanning(false)
    }

    const handleResult = (res: any) => {
        setResult(translateImageAnalysisResult(res))
    }

    const handleRestoreHistory = (item: HistoryItem) => {
        if (item.kind !== "image") {
            return
        }

        setIsScanning(false)
        setResult(translateImageAnalysisResult(item.result as ImageAnalysisResult))
        setRestoredPreviewUrl(item.input.imageKey ? `${backendUrl}/analyze/history/image?key=${encodeURIComponent(item.input.imageKey)}` : null)
        setResetSignal((value) => value + 1)
    }

    return (
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(88,147,255,0.15),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.96),_rgba(5,10,18,1)_64%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <header className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div className="space-y-4">
                        <Badge variant="secondary" className="border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200">
                            Análisis visual con Bedrock
                        </Badge>
                        <div className="space-y-3">
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Sube una imagen y deja que el modelo la describa.
                            </h1>
                            <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                                Esta vista extrae escena, sujetos, objetos, colores, calidad y señales relevantes. Cuando presiones analizar, verás una pantalla de carga hasta que el backend regrese la respuesta.
                            </p>
                        </div>
                    </div>

                    <Card className="border-zinc-800/80 bg-[#0b1018]">
                        <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
                            {[
                                ["Escena", "Qué está ocurriendo en la imagen"],
                                ["Detalles", "Sujetos, objetos y colores"],
                                ["Señales", "Calidad, texto y recomendaciones"],
                            ].map(([title, body]) => (
                                <div key={title} className="rounded-2xl border border-zinc-800 bg-[#101826] p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-zinc-300">{body}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </header>

                <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
                    <div className="space-y-6 lg:sticky lg:top-6 h-fit">
                        <NewImg
                            onScanStart={handleScanStart}
                            onScanEnd={handleScanEnd}
                            onOpenHistory={() => setHistoryOpen(true)}
                            onResult={handleResult}
                            resetSignal={resetSignal}
                            restoredPreviewUrl={restoredPreviewUrl}
                            onClearRestoredPreview={() => setRestoredPreviewUrl(null)}
                            isScanning={isScanning}
                        />
                        <HistoryPanel kind="image" open={historyOpen} onOpenChange={setHistoryOpen} onSelect={handleRestoreHistory} />

                        <Card className="border-zinc-800/80 bg-[#0b1018]">
                            <CardContent className="space-y-3 p-5 text-sm text-zinc-400">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Cómo leer el resultado</p>
                                <p>La pantalla de carga aparece durante la consulta al backend para dejar claro que el análisis sigue en curso.</p>
                                <p>El resultado final se maqueta con tarjetas para escena, calidad, sujetos, señales y observaciones.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {!result && !isScanning && (
                            <Card className="border-dashed border-zinc-700/80 bg-[#0b1018]/80">
                                <CardContent className="space-y-4 p-8 text-zinc-300">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Vista previa vacía</p>
                                    <h2 className="text-2xl font-semibold text-white">Todavía no hay una imagen para analizar</h2>
                                    <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                                        Selecciona una imagen y pulsa analizar. En cuanto empiece la solicitud, verás una capa de carga hasta que el backend devuelva el análisis.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {result && !isScanning && (
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Result
                                    summary={result?.summary}
                                    source={result?.source}
                                    analysisStrength={result?.analysisStrength ?? 0}
                                    mood={result?.scene?.mood}
                                    tags={result?.tags ?? []}
                                />
                                <Level value={result?.analysisStrength ?? 50} />
                                <div className="flex h-fit flex-col gap-6 md:flex-row w-full">
                                    <Metadata data={result} />
                                    <Anomalies data={result} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isScanning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#1b3f7a] bg-[#08111f] px-8 py-7 shadow-2xl shadow-black/40">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1f5fbf] border-t-transparent" />
                        <div className="text-center">
                            <p className="text-lg font-semibold text-white">Analizando imagen</p>
                            <p className="mt-1 text-sm text-zinc-300">Esto puede tardar unos segundos mientras se consulta Bedrock.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}