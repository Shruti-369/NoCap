import { useState } from "react";

const Report = () => {
  const [news, setNews] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");

    try {
      const res = await fetch("http://127.0.0.1:5001/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news,
          reason,
          comment,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

      // clear form
      setNews("");
      setReason("");
      setComment("");
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <section className="px-[10%] py-20 bg-red-50 min-h-screen">
   
        
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Report Suspicious News
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Help us fight misinformation by reporting fake or misleading news.
        </p>
        <div className="h-4"> 
        {message && (
          <p className="mb-4 text-green-600 font-medium">
            {message}
          </p>
        )}
        </div> 

        <form onSubmit={handleSubmit}>
          {/* News Input */}
          <div className="flex justify-between m-10 w-full h-[210px]">
          <div className="mb-6 w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News Content / Link
            </label>
            <textarea
              rows="4"
              value={news}
              onChange={(e) => setNews(e.target.value)}
              required
              placeholder="Paste the news text or link here..."
              className="w-full border h-full border-gray-300 rounded-md p-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          

          {/* Reason */}
          <div className="w-[40%] h-[132px] mr-20">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Reporting
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a reason</option>
              <option>Fake News</option>
              <option>Misleading Information</option>
              <option>Hate / Violence</option>
              <option>Spam / Clickbait</option>
              <option>Other</option>
            </select>
          </div>

          {/* Optional Comment */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (optional)
            </label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Any extra details..."
              className="w-full border border-gray-300 rounded-md p-3 h-fit text-sm
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-red-600 text-white py-2 rounded-lg
                       px-2 hover:bg-red-700 transition mt-20"
          >
            Submit Report
          </button>
        </form>

  
    </section>
  );
};

export default Report;
