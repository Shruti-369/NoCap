import { useState } from "react";

function NewsForm() {
  const [news, setNews] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!news.trim()) {
      alert("Please enter news text!");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:5000/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news: news }),
      });

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setResult("Error connecting backend ❌");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <textarea
        placeholder="Paste news here..."
        value={news}
        onChange={(e) => setNews(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {loading ? "Checking..." : "Check News"}
      </button>

      {result && <h2>Result: {result}</h2>}
    </div>
  );
}

export default NewsForm;
