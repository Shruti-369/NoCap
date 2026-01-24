import NewsForm from "./components/NewsForm";

function App() {
  return (
    <div className="app">
      <h1>📰 Fake News Detection</h1>
      <p>Paste news text below and check authenticity</p>
      <NewsForm />
    </div>
  );
}

export default App;
