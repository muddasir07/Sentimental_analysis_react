import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function fetchData() {
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
        "x-rapidapi-key": "55085e4fb9mshd8f68b60f5edfd1p1813aejsnaecfcb92e35e"
      },
      data: {
        language: "english",
        text: text
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setSentiment(response.data.sentiment);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Text Sentiment Analysis</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setText("");
          fetchData();
        }}
        action=""
      >
        <input
          onChange={(event) => setText(event.target.value)}
          type="text"
          name="text"
          id="text"
          value={text}
          className="input"
          placeholder="Enter you string here..."
        />
        <input className="btn" type="submit" value="Analyze" />
      </form>
      {isLoading ? (
        <div className="data">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="data">
          <p>
            Sentiment:
            <span> {sentiment}</span>
          </p>
        </div>
      )}
    </div>
  );
}
export default App;
