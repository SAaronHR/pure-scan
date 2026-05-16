import { Card, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface LevelProps {
    value?: number;
}

export function Level({ value = 0 }: LevelProps) {
    return (
        <Card className="w-full">
            <div className="flex items-center justify-between mb-4">
                <CardTitle>Nivel de Confianza</CardTitle>
                <span className="text-primary text-5xl font-bold tracking-tight">{value}%</span>
            </div>
            <Progress value={value} className="h-3.5 bg-zinc-800/80" />
        </Card>
    );
}