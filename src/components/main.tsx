import { useEffect, useState } from "react";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  //@ts-ignore
} from "@solana/web3.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface RpcResponse {
  data: Buffer;
  executable: boolean;
  lamports: number;
  owner: PublicKey;
  rentEpoch: number;
}

interface Props {
    url: string
}

const pClass = "m-10 max-sm:m-5 text-3xl max-sm:text-xl text-left border-2 p-5 max-sm:p-2 rounded-3xl"

const Main = (props: Props) => {
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<RpcResponse>();
  const [balance, setBalance] = useState<number>();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setShowData(false)
  }, [props.url])

  let connection = new Connection(props.url, "confirmed");

  const fetchInfo = async (address: string) => {
    const TARGET_KEY = new PublicKey(address);
    const data: any = await connection.getAccountInfo(TARGET_KEY);
    if(data) {
        setData(data)
        setBalance(data?.lamports / LAMPORTS_PER_SOL);
        return "Data Fetched!";
    } else {
        throw new Error()
    }
  };

  const handleEnter = () => {
    if (address.length < 32 || address.length > 44) {
      toast("Please enter a valid Solana address!");
      return;
    }
    toast("Fetching data...");
    fetchInfo(address)
      .then((res) => {
        toast(res);
        setShowData(true);
      })
      .catch(() => {
        toast("Data not found");
      });
  };

  return (
    <>
      <div className={`h-3/4 max-sm:h-3/6 w-5/6 max-sm:w-96 bg-black rounded-3xl flex justify-center items-center flex-col relative`}>
        <input
            spellCheck="false"
          className={`p-2 text-center bg-input-grey w-full h-14 placeholder-middle focus:outline-none transition-transform duration-500 ${
            showData ? "-translate-y-3/4 max-sm:translate-y-10" : "translate-y-0"
          }`}
          type="text"
          placeholder="enter Solana address here and hit return..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleEnter() : "")}
        />
        {showData && data ? (
          <div className="m-10 animate-fadeIn">
            <p className={pClass}>Balance:       {balance} SOL</p>
            <p className={pClass}>Is Executable: {data.executable ? "Yes" : "No"}</p>
            <p className={pClass}>Rent EPOCH:    {data.rentEpoch}</p>
          </div>
        ) : null}
      </div>
      <ToastContainer autoClose={300} draggable />
    </>
  );
};

export default Main;
