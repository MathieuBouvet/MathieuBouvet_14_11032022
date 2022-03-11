import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateEmployeePage from "./pages/CreateEmployeePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewEmployeesPage from "./pages/ViewEmployeesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEmployeePage />} />
        <Route path="employees" element={<ViewEmployeesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
