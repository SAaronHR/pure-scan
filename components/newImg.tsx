"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Clock3, CloudUpload, X, TriangleAlert } from "lucide-react"
import { Card, CardContent, CardTitle } from "./ui/card"
import { analyzeImage } from "@/lib/analysis"

interface NewImgProps {
    onResult?: (res: any) => void;
    onScanStart?: () => void;
    onScanEnd?: () => void;
    onOpenHistory?: () => void;
    resetSignal?: number;
    restoredPreviewUrl?: string | null;
    onClearRestoredPreview?: () => void;
    isScanning?: boolean;
}

export default function NewImg({ onResult, onScanStart, onScanEnd, onOpenHistory, resetSignal, restoredPreviewUrl, onClearRestoredPreview, isScanning }: NewImgProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const displayPreview = preview || restoredPreviewUrl || null

    useEffect(() => {
        setPreview(null)
        setError(null)
        setSelectedFile(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }, [resetSignal])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setError(null)
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!validTypes.includes(file.type)) {
                setError("El formato del archivo no es válido. Solo se admiten JPG, PNG y WEBP.")
                e.target.value = ''
                return
            }
            if (file.size > 10 * 1024 * 1024) {
                setError("El archivo supera el límite de 10MB.")
                e.target.value = ''
                return
            }
            const url = URL.createObjectURL(file)
            setPreview(url)
            setSelectedFile(file)
        }
    }

    const clearPreview = (e: React.MouseEvent) => {
        e.preventDefault()
        setPreview(null)
        setError(null)
        setSelectedFile(null)
        onClearRestoredPreview?.()

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <Card className="w-full">
            <div className="flex items-center justify-between px-6 pt-6">
                <CardTitle>
                    Nueva Imagen
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-2 text-zinc-300 hover:text-white" onClick={onOpenHistory} type="button">
                    <Clock3 className="h-4 w-4" />
                    Historial
                </Button>
            </div>
            <CardContent>
                <div className={`mb-4 relative flex flex-col items-center justify-center w-full h-72 border-2 ${displayPreview ? 'border-transparent' : 'border-primary border-dashed'} rounded-md bg-background hover:bg-secondary/20 transition-colors overflow-hidden group`}>
                    {displayPreview ? (
                        <>
                            <img src={displayPreview} alt="Vista previa" className="w-full h-full object-contain bg-black/10" />
                            <button
                                onClick={clearPreview}
                                className="absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors z-20"
                                title="Eliminar imagen"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                            <CloudUpload className="w-16 h-16 text-primary" strokeWidth={1.5} />
                            <p className="text-xl text-foreground">
                                Arrastra tu imagen aquí o haz clic<br />para subir
                            </p>
                            <p className="text-sm text-muted-foreground font-mono tracking-wider">
                                JPG, PNG, WEBP max 10MB
                            </p>
                        </div>
                    )}

                    <Input
                        ref={fileInputRef}
                        type="file"
                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 ${displayPreview ? 'hidden' : ''}`}
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleFileChange}
                    />
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-md bg-[#330000] border border-[#93000A] text-[#FFB4AB] text-sm flex items-start gap-2">
                        <TriangleAlert className="w-5 h-5 shrink-0" />
                        <p className="mt-0.5">{error}</p>
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={async () => {
                        if (!selectedFile) return
                        onClearRestoredPreview?.()
                        onScanStart?.()
                        try {
                            const res = await analyzeImage(selectedFile)
                            console.debug("NewImg: received analysis result:", res)
                            onResult?.(res)
                        } catch (err) {
                            console.error("NewImg analyzeImage error:", err)
                            setError((err as Error).message ?? String(err))
                        } finally {
                            onScanEnd?.()
                        }
                    }}
                    disabled={isScanning || !selectedFile}
                >
                    {isScanning ? "ANALIZANDO..." : "ANALIZAR IMAGEN"}
                </Button>
            </CardContent>
        </Card>
    )
}