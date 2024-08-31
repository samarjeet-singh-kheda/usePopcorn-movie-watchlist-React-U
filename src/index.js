import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

// function Test() {
//   const [rating, setRating] = useState(0);

//   return (
//     <div>
//       <StarRating color="#2e46ff" maxRating={10} onSetRating={setRating} />
//       <p>The movie was rated {rating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
