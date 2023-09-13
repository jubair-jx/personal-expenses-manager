import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Transctions from "./components/Transcrtions/Transctions";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Balance />
        <Form />
        <Transctions />
      </Layout>
    </>
  );
}

export default App;
