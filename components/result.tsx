import { TriangleAlert, ShieldCheck } from "lucide-react";
import { Card } from "./ui/card";

interface ResultProps {
    isAI: boolean;
}

export default function Result({ isAI = true }: ResultProps) {
    return (
        <Card className={`p-4 border-1 flex items-center gap-4 flex-row w-full ${isAI ? 'bg-[#1A0A0A] border-[#FFB4AB]' : 'bg-[#0A1A0A] border-[#ABFFB4]'}`}>
            <div className={`flex items-center justify-center p-3 rounded-lg shrink-0 ${isAI ? 'bg-[#93000A]' : 'bg-[#005221]'}`}>
                {isAI ? <TriangleAlert className="w-6 h-6 text-white" /> : <ShieldCheck className="w-6 h-6 text-white" />}
            </div>
            <div className="flex flex-col uppercase">
                <h3 className="text-white text-lg">VEREDICTO</h3>
                <p className="text-zinc-400 text-sm">
                    {isAI ? 'Imagen GENERADA POR IA' : 'Imagen AUTÉNTICA'}
                </p>
            </div>
        </Card>
    );
}