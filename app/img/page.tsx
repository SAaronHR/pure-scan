"use client"

import { useState } from "react";
import { Level } from "@/components/level";
import NewImg from "@/components/newImg";
import Result from "@/components/result";
import { Metadata } from "@/components/metadata";
import { Anomalies } from "@/components/anomalies";

export default function ImgPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [hasResult, setHasResult] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setHasResult(false);
        setTimeout(() => {
            setIsScanning(false);
            setHasResult(true);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-6 items-center justify-center p-10">
            <NewImg onScan={handleScan} isScanning={isScanning} />

            {hasResult && (
                <div className="flex flex-col gap-6 items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Result isAI={true} />
                    <Level value={50} />
                    <div className="flex h-fit flex-col md:flex-row gap-6 w-full">
                        <Metadata />
                        <Anomalies />
                    </div>
                </div>
            )}
        </div>
    );
}