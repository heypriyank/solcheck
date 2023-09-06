import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/main";
//@ts-ignore
import { typingSimulator } from "node-typing-simulator";
//@ts-ignore
import TripleToggleSwitch from "./components/tripleSwitch";
//@ts-ignore
const KEY = import.meta.env.VITE_SYNDICA_KEY;

const sentences = [
    "GM !!!!",
    "This app let's you check Sol🚀 balance of any address...",
    "Mainnet powered by Syndica.io",
    ".....",
    "Like this typing simulator? checkout my Github 🫡",
];

const timeout = 2000;
const typingSpeed = 120;
const mistakeProbability = 0;

type labelValues = "left" | "center" | "right"

function App() {
    const labels = {
        left: {
            title: "Devnet",
            value: "https://api.devnet.solana.com",
        },
        right: {
            title: "Mainnet",
            value: `https://solana-api.syndica.io/access-token/${KEY}/rpc`,
        },
        center: {
            title: "Testnet",
            value: "https://api.testnet.solana.com",
        },
    };

    const onChange = (value: labelValues): void => {
        setSelectedNetwork(labels[value].value);
    };
    const [heading, setHeading] = useState<string | null>(null);
    const [selectedNetwork, setSelectedNetwork] = useState<string>(
        labels.left.value
    );
    useEffect(() => {
        if (heading === null) {
            typingSimulator(
                sentences,
                timeout,
                typingSpeed,
                mistakeProbability,
                setHeading
            );
        }
    }, []);
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="h-20 w-full">
                <h1 className="max-sm:text-2xl text-4xl font-extrabold max-sm:-mt-8">
                    {heading}
                </h1>
            </div>
            <Main url={selectedNetwork} />
            <TripleToggleSwitch labels={labels} onChange={onChange} />
        </div>
    );
}

export default App;
