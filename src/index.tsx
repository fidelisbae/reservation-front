import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./store/store";
import { Provider } from "react-redux";

import AntdLayout from "./components/AntdLayout";
import GlobalStyle from "./styles/GlobalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <AntdLayout>
        <App />
      </AntdLayout>
    </Provider>
  </React.StrictMode>
);
