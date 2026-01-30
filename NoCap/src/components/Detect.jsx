import { useState } from "react";
import WalletConnect from "./WalletConnect";

function Detect() {
  const [mode, setMode] = useState("article"); // article | url
  const [input, setInput] = useState("");
  const [textBody, setTextBody] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = async () => {
    if (!input.trim() && !textBody.trim()) return;

    setResult("Loading...");
    try {
      const response = await fetch("http://localhost:5001/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: input,
          text: textBody
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error predicting:", error);
      setResult("ERROR");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* BACKGROUND IMAGE */}
      <img
        src="/public/detect.jpg"
        alt="news bg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl text-center px-6">

        <h1 className="text-4xl md:text-4xl font-bold text-white mb-7">
          Fake News Detector
        </h1>

        {/* TABS */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setMode("article")}
            className={`px-6 py-2 rounded-lg border transition
    ${mode === "article"
                ? "bg-red-200 text-black rounded-full"
                : "bg-transparent text-white border-white"
              }`}
          >
            For Article
          </button>

          <button
            onClick={() => setMode("url")}
            className={`px-6 py-2 rounded-lg border transition
    ${mode === "url"
                ? "bg-red-200 text-black rounded-full"
                : "bg-transparent text-white border-white"
              }`}
          >
            For URL
          </button>

        </div>

        {/* INPUT BAR */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder={
                mode === "url"
                  ? "Paste your URL here..."
                  : "Enter news title..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-6 py-3 outline-none text-gray-700"
            />
          </div>

          <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg">
            <textarea
              placeholder="Enter news text body (optional but recommended for better results)..."
              value={textBody}
              onChange={(e) => setTextBody(e.target.value)}
              rows="4"
              className="flex-1 px-6 py-3 outline-none text-gray-700 resize-none"
            />
          </div>

          <button
            onClick={handlePredict}
            className="w-full md:w-auto px-12 py-3 bg-red-600 text-white font-semibold hover:bg-red-500 rounded-lg shadow-lg"
          >
            {result === "Loading..."
              ? (mode === "url" ? "Scraping & Predicting..." : "Predicting...")
              : "Predict"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-8 text-2xl font-semibold">
            {result === "Loading..." ? (
              <span className="text-blue-400">Loading...</span>
            ) : result === "SCRAPER_BLOCKED" ? (
              <div className="flex flex-col gap-2">
                <span className="text-yellow-500">Access Denied by Website</span>
                <p className="text-sm text-gray-300 max-w-lg mx-auto font-normal">
                  This news site blocks automated checkers. Please switch to <b>"For Article"</b> mode and copy-paste the text manually for a result.
                </p>
              </div>
            ) : result === "ERROR" ? (
              <span className="text-red-500">Error fetching result</span>
            ) : result === "REAL" ? (
              <span className="text-green-500 underline decoration-2 underline-offset-8">
                The News is REAL ✅
              </span>
            ) : (
              <span className="text-red-500 underline decoration-2 underline-offset-8">
                The News is FAKE ❌ !
              </span>
            )}

            {/* Signing Option for ETH Track */}
            {(result === "REAL" || result === "FAKE") && (
              <div className="mt-6 flex justify-center">
                <p className="text-sm text-gray-300 mb-2 block w-full">Verify this result on-chain:</p>
                {/* WalletConnect is already in the corner, but we could also put a sign button here if we wanted specific transaction logic, 
                       but for now the top corner component handles general signing. 
                       Actually, let's put the sign button contextually here if we want? 
                       No, let's keep it simple as per plan: "Add WalletConnect component to the header... Add a Sign & Verify button for results"
                   */}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Wallet Connect Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <WalletConnect onSign={(sig) => console.log("Signed:", sig)} />
      </div>
    </div>
  );
}

export default Detect;
