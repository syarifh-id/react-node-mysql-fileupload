import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsList from "./components/ItemsList";
import Edit from "./components/Edit";
import Add from "./components/Add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsList />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
