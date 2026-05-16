import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { TriangleAlert, ShieldCheck } from "lucide-react";

const HookIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="19" viewBox="0 0 14 19" fill="none">
        <path d="M6 19C4.33333 19 2.91667 18.4167 1.75 17.25C0.583333 16.0833 0 14.6667 0 13V7L5 12L3.6 13.425L2 11.825V13C2 14.1 2.39167 15.0417 3.175 15.825C3.95833 16.6083 4.9 17 6 17C7.1 17 8.04167 16.6083 8.825 15.825C9.60833 15.0417 10 14.1 10 13V9.825C9.4 9.59167 8.91667 9.22083 8.55 8.7125C8.18333 8.20417 8 7.63333 8 7C8 6.36667 8.18333 5.79583 8.55 5.2875C8.91667 4.77917 9.4 4.40833 10 4.175V0H12V4.175C12.6 4.40833 13.0833 4.77917 13.45 5.2875C13.8167 5.79583 14 6.36667 14 7C14 7.63333 13.8167 8.20833 13.45 8.725C13.0833 9.24167 12.6 9.60833 12 9.825V13C12 14.6667 11.4167 16.0833 10.25 17.25C9.08333 18.4167 7.66667 19 6 19ZM11 8C11.2833 8 11.5208 7.90417 11.7125 7.7125C11.9042 7.52083 12 7.28333 12 7C12 6.71667 11.9042 6.47917 11.7125 6.2875C11.5208 6.09583 11.2833 6 11 6C10.7167 6 10.4792 6.09583 10.2875 6.2875C10.0958 6.47917 10 6.71667 10 7C10 7.28333 10.0958 7.52083 10.2875 7.7125C10.4792 7.90417 10.7167 8 11 8Z" fill="#FFB4AB" />
    </svg>
);

interface ThreatCardProps {
    title: string;
    icon: React.ReactNode;
    level: number;
    iconColor?: string;
}

function ThreatCard({ title, icon, level, iconColor }: ThreatCardProps) {
    return (
        <Card className="w-full bg-[#0a0a0a] border-zinc-800/60 p-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center p-2 rounded-md bg-[#121212] border border-zinc-800 ${iconColor}`}>
                    {icon}
                </div>
                <span className="font-semibold text-zinc-200">{title}</span>
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Nivel de Peligro</span>
                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold text-primary leading-none">{level}</span>
                        <span className="text-sm font-medium text-zinc-500">/10</span>
                    </div>
                    <Progress value={level * 10} className="w-24 h-1.5 bg-zinc-800" />
                </div>
            </div>
        </Card>
    );
}

export default function ThreatList() {
    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="uppercase tracking-widest text-zinc-300 text-lg mb-2">Clasificación de Amenaza</h2>
            <div className="flex flex-col gap-4">
                <ThreatCard
                    title="Phishing"
                    icon={<HookIcon className="w-5 h-5" />}
                    iconColor="text-[#FFB4AB]"
                    level={8}
                />
                <ThreatCard
                    title="Estafa Sugerida"
                    icon={<TriangleAlert className="w-5 h-5" />}
                    iconColor="text-[#FFB4AB]"
                    level={6}
                />
                <ThreatCard
                    title="Contenido Seguro"
                    icon={<ShieldCheck className="w-5 h-5" />}
                    iconColor="text-zinc-400"
                    level={1}
                />
            </div>
        </div>
    );
}
