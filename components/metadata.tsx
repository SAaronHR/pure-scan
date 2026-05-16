import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Metadata() {
    return (
        <Card className="w-full h-full">
            <CardHeader className="pb-2">
                <CardTitle className="uppercase tracking-widest text-sm text-zinc-300 leading-relaxed">
                    Metadatos de la<br/>Imagen
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="w-full h-px bg-zinc-800 mb-2" />
                
                <div className="flex justify-between items-center py-4 border-b border-zinc-800">
                    <span className="text-zinc-400">Cámara</span>
                    <span className="text-zinc-200">Midjourney v6</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-zinc-800">
                    <span className="text-zinc-400">Software</span>
                    <span className="text-zinc-200">Desconocido</span>
                </div>
                <div className="flex justify-between items-center py-4">
                    <span className="text-zinc-400">Espacio de<br/>Color</span>
                    <span className="text-zinc-200 text-right">sRGB</span>
                </div>
            </CardContent>
        </Card>
    );
}
