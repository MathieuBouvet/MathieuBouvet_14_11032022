import { createContext, useState, useContext } from "react";

const STORAGE_KEY = "employee-list";
const EmployeeListContext = createContext();

const EmployeeListProvider = ({ children }) => {
  const existingEmployeeList = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const [state, setState] = useState(existingEmployeeList ?? []);

  const context = {
    employees: state.map(employee => ({
      ...employee,
      startDate: new Date(employee.startDate),
      birthDate: new Date(employee.birthDate),
    })),
    addEmployee: employee =>
      setState(s => {
        const newEmployeeList = [...s, employee];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEmployeeList));
        return newEmployeeList;
      }),
  };
  return (
    <EmployeeListContext.Provider value={context}>
      {children}
    </EmployeeListContext.Provider>
  );
};

function useEmployeeList() {
  const context = useContext(EmployeeListContext);
  if (context == null) {
    throw new Error(
      "useEmployeeList must be used within an EmployeeListProvider"
    );
  }
  return context;
}

export { EmployeeListProvider, useEmployeeList };
