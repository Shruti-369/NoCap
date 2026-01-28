const features = [
  {
    title: "ML-Based Detection",
    desc: "Uses a machine learning model trained on real news data."
  },
  {
    title: "KNN Algorithm",
    desc: "Implements K-Nearest Neighbors for accurate classification."
  },
  {
    title: "Kaggle Dataset",
    desc: "Model is trained using a real-world dataset from Kaggle."
  },
  {
    title: "Text Vectorization",
    desc: "Converts news text into numerical form using TF-IDF."
  },
  {
    title: "Fast Prediction",
    desc: "Delivers instant results with high accuracy."
  }
];

const borderColors = [
  "border-red-500",
  "border-green-500",
  "border-pink-500",
  "border-yellow-500",
  "border-blue-500"
];

const Features = () => {
  return (
    <section className="px-[10%] py-20 bg-gray-700 text-center min-h-screen mb-16">
      <h1 className="text-[38px] font-bold mb-2 mt-6 text-red-500">
        Our Key Features
      </h1>

      <p className="text-gray-300 mb-20 text-base">
        An ML-powered system to identify fake news using real datasets.
      </p>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {features.map((item, index) => (
          <div
            key={index}
            className={`bg-gray-100 p-7 rounded-2xl shadow-md
                        border-l-4 ${borderColors[index]}
                        transition-all duration-300
                        hover:-translate-y-1.5 hover:shadow-xl
                        text-left`}
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
