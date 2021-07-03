import ReactDOM from "react-dom";
import { KcApp, kcContext } from "./app/components/KcApp";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

if (!kcContext) {
  throw new Error();
}

ReactDOM.render(
  <KcApp kcContext={kcContext} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
