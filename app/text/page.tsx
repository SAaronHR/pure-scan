"use client"

import { useState } from "react";
import TextInput from "@/components/textInput";
import ThreatList from "@/components/threatList";

export default function TextPage() {
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
        <div className="flex flex-col gap-10 items-center justify-center p-10 w-full">
            <TextInput onScan={handleScan} isScanning={isScanning} />

            {hasResult && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ThreatList />
                </div>
            )}
        </div>
    );
}