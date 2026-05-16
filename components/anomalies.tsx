import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Anomalies() {
    return (
        <Card className="w-full h-full">
            <CardHeader className="pb-2">
                <CardTitle className="uppercase tracking-widest text-sm text-zinc-300 leading-relaxed">
                    Anomalías<br />Detectadas
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="w-full h-px bg-zinc-800 mb-2" />

                <div className="px-4 w-full py-2.5 rounded-lg border border-[#93000A] bg-[#2C0A0A] text-[#FFB4AB] text-sm w-fit max-w-full">
                    Inconsistencia de bordes
                </div>
                <div className="px-4 w-full py-2.5 rounded-lg border border-[#93000A] bg-[#2C0A0A] text-[#FFB4AB] text-sm w-fit max-w-full">
                    Ruido frecuencial anómalo
                </div>
                <div className="px-4 w-full py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 text-sm w-fit max-w-full">
                    Iluminación irreal
                </div>
            </CardContent>
        </Card>
    );
}
