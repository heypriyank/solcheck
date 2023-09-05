import React, { useEffect, useState } from "react";
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    AccountInfo,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { typingSimulator } from "node-typing-simulator";

const KEY = import.meta.env.VITE_SYNDICA_KEY;
const URLS = {
    MAINNET: `https://solana-api.syndica.io/access-token/${KEY}/rpc`,
    TESTNET: "https://api.testnet.solana.com",
    DEVNET: "https://api.devnet.solana.com",
};

interface RpcResponse {
    data: Buffer;
    executable: boolean;
    lamports: number;
    owner: PublicKey;
    rentEpoch: number;
}

const Main: React.FC = () => {
    const sentences = [
        "Hello, how are you?",
        "I'm a typing simulator.",
        "This is a test sentence.",
    ];
    const timeout = 1000;
    const typingSpeed = 100;
    const mistakeProbability = 0;
    const [address, setAddress] = useState<string>("");
    const [data, setData] = useState<RpcResponse>();
    const [balance, setBalance] = useState<number>();
    const [placeholderText, setPlaceHolderText] = useState<string>("");

    let connection = new Connection(URLS.MAINNET, "confirmed");

    useEffect(() => {
        typingSimulator(
            sentences,
            timeout,
            typingSpeed,
            mistakeProbability,
            setPlaceHolderText
        );
    }, []);

    const fetchInfo = async (address: String) => {
        const TARGET_KEY = new PublicKey(address);
        const data = await connection.getAccountInfo(TARGET_KEY);
        setData(data);
        setBalance(data.lamports / LAMPORTS_PER_SOL);
        return "Data Fetched!";
    };

    const handleEnter = () => {
        if (address.length < 32 || address.length > 44) {
            toast("Not a valid sol address!!");
            return;
        }
        toast("Fetching data...");
        fetchInfo(address)
            .then((res) => {
                toast(res);
            })
            .catch((err) => {
                toast("Some error occured 😢");
            });
    };

    return (
        <>
            <div className="h-3/4 w-5/6 bg-black rounded-3xl">
                <input
                    className="p-2 text-center rounded-3xl w-3/4 h-10 mt-5 placeholder-middle focus:outline-none"
                    type="text"
                    placeholder={placeholderText}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter" ? handleEnter() : "")}
                />
                {data ? (
                    <div className="">
                        <span>Balance: {balance} SOL</span>
                        <span>Is Executable: {data.executable}</span>
                        <span>Rent EPOCH: {data.rentEpoch}</span>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Main;
// HwAeUv6aWwLZfqJHapXAAUbJvrSHAb4iKF1CEs55nYih
