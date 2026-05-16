import { Level } from "@/components/level";
import NewImg from "@/components/newImg";
import Result from "@/components/result";
import { Metadata } from "@/components/metadata";
import { Anomalies } from "@/components/anomalies";

export default function ImgPage() {
    return (
        <div className="flex flex-col gap-6 items-center justify-center p-10">
            <NewImg />
            <Result isAI={true} />
            <Level value={50} />
            <div className="flex h-fit flex-col md:flex-row gap-6 w-full">
                <Metadata />
                <Anomalies />
            </div>
        </div>
    );
}