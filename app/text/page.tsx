"use client"

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/components/textInput";
import HistoryPanel from "@/components/history-panel";
import ThreatList from "@/components/threatList";
import { analyzeText, type HistoryItem, type TextAnalysisResult } from "@/lib/analysis";

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message
    }

    return "No fue posible completar el análisis de texto."
}

export default function TextPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [text, setText] = useState("");
    const [result, setResult] = useState<TextAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [historyOpen, setHistoryOpen] = useState(false);

    const handleScan = async (value: string) => {
        setIsScanning(true);
        setError(null);
        setResult(null);

        try {
            const analysis = await analyzeText(value);
            setResult(analysis);
        } catch (scanError) {
            setError(getErrorMessage(scanError));
        } finally {
            setIsScanning(false);
        }
    };

    const handleRestoreHistory = (item: HistoryItem) => {
        if (item.kind !== "text") {
            return
        }

        setError(null)
        setIsScanning(false)
        setText(item.input.text ?? "")
        setResult(item.result as TextAnalysisResult)
    }

    return (
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(88,147,255,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.95),_rgba(5,10,18,1)_65%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
                <header className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div className="space-y-4">
                        <Badge variant="secondary" className="border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200">
                            Análisis de prompts con Comprehend
                        </Badge>
                        <div className="space-y-3">
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Sube tu prompt y recibe una guía para mejorarlo.
                            </h1>
                            <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                                Esta vista evalúa claridad, estructura, restricciones, formato esperado y contexto. Además te devuelve una versión mejorada del prompt para que puedas reutilizarla.
                            </p>
                        </div>
                    </div>

                    <Card className="border-zinc-800/80 bg-[#0b1018]">
                        <CardContent className="grid gap-3 p-5 sm:grid-cols-3">
                            {[
                                ["Claridad", "Qué tan entendible es la intención"],
                                ["Estructura", "Rol, objetivo, contexto y salida"],
                                ["Mejora", "Prompt reescrito para usarlo mejor"]
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
                        <TextInput
                            value={text}
                            onChange={setText}
                            onScan={handleScan}
                            onOpenHistory={() => setHistoryOpen(true)}
                            isScanning={isScanning}
                        />
                        <HistoryPanel kind="text" open={historyOpen} onOpenChange={setHistoryOpen} onSelect={handleRestoreHistory} />

                        <Card className="border-zinc-800/80 bg-[#0b1018]">
                            <CardContent className="space-y-3 p-5 text-sm text-zinc-400">
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Cómo leer el resultado</p>
                                <p>El puntaje ya no representa riesgo. Mide qué tan listo está el prompt para una IA.</p>
                                <p>Las recomendaciones están pensadas para ayudarte a formular mejores instrucciones, no para sancionar el texto.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {error && (
                            <div className="w-full rounded-2xl border border-[#93000A] bg-[#2C0A0A] px-4 py-3 text-sm text-[#FFB4AB] shadow-lg shadow-black/20">
                                {error}
                            </div>
                        )}

                        {!result && !error && (
                            <Card className="border-dashed border-zinc-700/80 bg-[#0b1018]/80">
                                <CardContent className="space-y-4 p-8 text-zinc-300">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-500">Vista previa vacía</p>
                                    <h2 className="text-2xl font-semibold text-white">Todavía no hay un prompt para analizar</h2>
                                    <p className="max-w-2xl text-sm leading-7 text-zinc-400">
                                        Escribe o pega tu prompt y el panel de la derecha te devolverá una evaluación de estructura, fortalezas, vacíos, recomendaciones y una versión mejorada.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {result && (
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ThreatList
                                    summary={result.summary}
                                    promptScore={result.promptScore}
                                    strengths={result.strengths}
                                    issues={result.issues}
                                    recommendations={result.recommendations}
                                    improvedPrompt={result.improvedPrompt}
                                    structure={result.structure}
                                    signals={result.signals}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {isScanning && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#1b3f7a] bg-[#08111f] px-8 py-7 shadow-2xl shadow-black/40">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#1f5fbf] border-t-transparent" />
                            <div className="text-center">
                                <p className="text-lg font-semibold text-white">Analizando prompt</p>
                                <p className="mt-1 text-sm text-zinc-300">Esto puede tardar unos segundos mientras se consulta Comprehend.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}