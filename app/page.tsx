"use client";
import { useState } from "react";
import Head from "next/head";
import { BsCopy } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import { LuHelpCircle } from "react-icons/lu";
import HelpModal from "../components/HelpModal";
import Background from "../components/Background";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [ledger, setLedger] = useState([]);
  const [error, setError] = useState(false);
  const [copy, setCopy] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ledgerBalanced, setLedgerBalanced] = useState(true);

  const handleSubmit = async () => {
    setLedger([]);
    setLedgerBalanced(true);
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: inputText }),
      });

      if (!response.ok) {
        setError(true);
        setTimeout(() => {
          setError(false);
          setInputText("");
        }, 1000);
      } else {
        const data = await response.json();
        let ledger = data.ledger;
        if (ledger.at(-1) === "ledger doesn't check out") {
          setLedgerBalanced(false);
          ledger.pop();
        }
        setLedger(ledger);
        setLedger(data.ledger);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = () => {
    setInputText("");
    setLedger([]);
    setLedgerBalanced(true);
  };
  const handleCopy = () => {
    const ledgerText = ledger.join("\n");
    navigator.clipboard
      .writeText(ledgerText)
      .then(() => {
        console.log("Ledger copied to clipboard");
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error copying ledger:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Background />
      <Head>
        <title>settle.it</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <button
        className="z-10 absolute top-4 right-4 px-6 py-2 font-bold rounded-lg shadow-md border-2 border-black text-black bg-transparent hover:bg-gray-200 focus:outline-none transition duration-300 flex items-center space-x-1"
        onClick={onOpen}
      >
        <span>Help</span>
        <LuHelpCircle />
      </button>
      <HelpModal isOpen={isOpen} onClose={onClose} />

      <h1 className="z-10 font-inter text-[2.65rem] sm:text-6xl md:text-6xl lg:text-6xl font-bold mb-8 text-center outlined-text">
        ♥️♠️ settle.it ♦️♣️
      </h1>

      <textarea
        className={`z-10 w-full max-w-lg h-64 p-4 mb-8 border-2 rounded-lg shadow-lg focus:outline-none ${
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        }`}
        placeholder="Enter your ledger data here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>

      <div className="flex space-x-4">
        <button
          className="z-10 px-6 py-3 font-bold rounded-lg shadow-md border-2 border-black text-black bg-transparent hover:bg-gray-200 focus:outline-none transition duration-300"
          onClick={handleSubmit}
        >
          Calculate
        </button>
        <button
          className="z-10 px-6 py-3 font-bold rounded-lg shadow-md border-2 border-black text-black bg-transparent hover:bg-gray-200 focus:outline-none transition duration-300"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {ledger.length > 0 && (
        <div>
          <div className="z-10 mt-8 max-w-2xl">
            <div
              className={
                "bg-white p-4 rounded-lg shadow-md relative" +
                (!ledgerBalanced ? " border border-red-500" : "")
              }
            >
              {ledgerBalanced &&
                (copy ? (
                  <button
                    className="absolute bottom-2 right-2 text-gray-600 hover:border-black focus:outline-none border border-gray-300 rounded p-1 text-sm flex items-center space-x-1"
                    onClick={handleCopy}
                    aria-label="Copy ledger to clipboard"
                    title="Copy ledger to clipboard"
                  >
                    <FaCheck />
                    <span>copied!</span>
                  </button>
                ) : (
                  <button
                    className="absolute bottom-2 right-2 text-gray-600 hover:border-black focus:outline-none border border-gray-300 rounded p-1 text-sm flex items-center space-x-1"
                    onClick={handleCopy}
                    aria-label="Copy ledger to clipboard"
                    title="Copy ledger to clipboard"
                  >
                    <BsCopy />
                  </button>
                ))}

              <div className="whitespace-pre-wrap pb-6">
                {ledger.join("\n")}
              </div>
              {!ledgerBalanced && (
                <button className="bg-red-500 text-white font-bold py-1 px-2 rounded text-xs">
                  ledger doesn't balance
                </button>
              )}
            </div>
          </div>
          <div className="z-10"></div>
        </div>
      )}
    </div>
  );
}
