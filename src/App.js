import { BrowserRouter, Routes, Route } from "react-router-dom";

import { EmployeeListProvider } from "./context/employeeListContext";

import CreateEmployeePage from "./pages/CreateEmployeePage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewEmployeesPage from "./pages/ViewEmployeesPage";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <EmployeeListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CreateEmployeePage />} />
            <Route path="employees" element={<ViewEmployeesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EmployeeListProvider>
  );
}

export default App;
