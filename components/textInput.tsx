"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";

interface TextInputProps {
    onScan?: () => void;
    isScanning?: boolean;
}

export default function TextInput({ onScan, isScanning }: TextInputProps) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="uppercase tracking-widest text-zinc-200 text-lg font-semibold">Entrada de Datos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <Textarea
                    placeholder="Pegue aquí el contenido del correo electrónico, mensaje de texto o documento para iniciar el análisis de amenazas..."
                    className="min-h-[200px] bg-[#111111] border-zinc-800/80 text-zinc-300 placeholder:text-zinc-600 resize-none p-5 font-mono text-sm leading-relaxed focus-visible:ring-1 focus-visible:ring-primary"
                />
                <div className="flex justify-end">
                    <Button 
                        className="px-6 py-5 rounded-md tracking-wider font-medium flex items-center gap-2"
                        onClick={onScan}
                        disabled={isScanning}
                    >
                        {!isScanning && <Shield className="w-5 h-5" />}
                        {isScanning ? "ANALIZANDO..." : "ESCANEAR AMENAZAS"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
