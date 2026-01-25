import { useState } from "react";

function Detect() {
  const [mode, setMode] = useState("article"); // article | url
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePredict = () => {
    if (!input.trim()) return;

    // dummy logic for now
    if (input.toLowerCase().includes("fake")) {
      setResult("FAKE");
    } else {
      setResult("REAL");
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
        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
          <input
            type="text"
            placeholder={
              mode === "url"
                ? "Paste your URL here..."
                : "Enter your news text here..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-6 py-3 outline-none text-gray-700"
          />

          <button
            onClick={handlePredict}
            className="px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-500"
          >
            Predict
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-8 text-2xl font-semibold">
            {result === "REAL" ? (
              <span className="text-green-500">
                The News is REAL
              </span>
            ) : (
              <span className="text-red-500">
                The News is FAKE !
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detect;
