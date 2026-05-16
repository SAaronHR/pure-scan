"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { CloudUpload, X } from "lucide-react"
import { Card, CardContent, CardTitle } from "./ui/card"

export default function NewImg() {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }

    const clearPreview = (e: React.MouseEvent) => {
        e.preventDefault()
        setPreview(null)
    }

    return (
        <Card className="w-full">
            <CardTitle>
                Nueva Imagen
            </CardTitle>
            <CardContent>
                <div className={`mb-4 relative flex flex-col items-center justify-center w-full h-72 border-2 ${preview ? 'border-transparent' : 'border-primary border-dashed'} rounded-md bg-background hover:bg-secondary/20 transition-colors overflow-hidden group`}>
                    {preview ? (
                        <>
                            <img src={preview} alt="Vista previa" className="w-full h-full object-contain bg-black/10" />
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
                        id="picture"
                        type="file"
                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 ${preview ? 'hidden' : ''}`}
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleFileChange}
                    />
                </div>
                <Button className="w-full">ANALIZAR IMAGEN</Button>
            </CardContent>
        </Card>
    )
}