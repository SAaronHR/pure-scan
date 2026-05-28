import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { translateDisplayList, translateDisplayQuality, translateDisplayScene } from "@/lib/display";

interface MetadataProps {
    data?: any;
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-start gap-4 py-4 border-b border-white/5 last:border-b-0">
            <span className="text-zinc-400 shrink-0 text-sm uppercase tracking-[0.2em]">{label}</span>
            <span className="text-zinc-100 text-right max-w-[60%] break-words font-medium leading-relaxed">{value}</span>
        </div>
    )
}

function Chip({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            {label}
        </span>
    )
}

export function Metadata({ data }: MetadataProps) {
    const scene = translateDisplayScene(data?.scene)
    const subjects = translateDisplayList(data?.subjects?.map((subject: any) => subject.label)).join(", ") || "Sin sujetos"
    const dominantColors = translateDisplayList(data?.dominantColors).join(", ") || "Sin colores detectados"
    const quality = translateDisplayQuality(data?.quality)
    const objects = data?.objects ?? []
    const textFound = data?.textFound ?? []
    const tags = translateDisplayList(data?.tags)

    return (
        <Card className="w-full h-full border-white/10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/70 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <CardHeader className="pb-2">
                <CardTitle className="uppercase tracking-[0.25em] text-xs text-zinc-400 leading-relaxed">
                    Metadatos de la imagen
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="grid grid-cols-2 gap-3 pb-4">
                    <div className="rounded-xl border border-white/8 bg-white/4 px-3 py-3">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Escena</div>
                        <div className="mt-1 text-sm font-medium text-zinc-100">{scene?.type ?? "Desconocida"}</div>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/4 px-3 py-3">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Luz</div>
                        <div className="mt-1 text-sm font-medium text-zinc-100">{quality?.lighting ?? "Desconocida"}</div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-zinc-950/70 px-4">
                    <Row label="Contexto" value={scene?.description ?? "Sin descripción"} />
                    <Row label="Sujetos" value={subjects} />
                    <Row label="Colores" value={dominantColors} />
                    <Row label="Objetos" value={translateDisplayList(objects).length ? translateDisplayList(objects).join(", ") : "Sin objetos"} />
                    <Row label="Texto" value={translateDisplayList(textFound).length ? translateDisplayList(textFound).join(", ") : "No detectado"} />
                    <Row label="Nitidez" value={quality?.sharpness ?? "Desconocida"} />
                    <Row label="Composición" value={quality?.composition ?? "Desconocida"} />
                </div>

                {tags.length > 0 && (
                    <div className="mt-4 rounded-2xl border border-white/8 bg-white/4 px-4 py-4">
                        <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-zinc-500">Etiquetas</div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string) => (
                                <Chip key={tag} label={tag} />
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
