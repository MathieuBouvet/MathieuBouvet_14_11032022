import { useEmployeeList } from "../context/employeeListContext";

const ViewEmployeesPage = () => {
  const { employees } = useEmployeeList();
  console.log(employees);
  return (
    <>
      <header>
        <h2>Current Employees</h2>
      </header>
    </>
  );
};

export default ViewEmployeesPage;
