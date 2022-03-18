import { useEmployeeList } from "../context/employeeListContext";

const ViewEmployeesPage = () => {
  const { employees } = useEmployeeList();
  console.log(employees);
  return (
    <>
      <header>
        <h1>Current Employees</h1>
      </header>
    </>
  );
};

export default ViewEmployeesPage;
