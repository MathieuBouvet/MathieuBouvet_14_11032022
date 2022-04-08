import { useEmployeeList } from "../context/employeeListContext";
import ReactDataTable from "mb-react-data-table";

const ViewEmployeesPage = () => {
  const { employees } = useEmployeeList();

  const headers = [
    {
      name: "First Name",
      dataKey: "firstName",
    },
    {
      name: "Last Name",
      dataKey: "lastName",
    },
  ];
  return (
    <>
      <header>
        <h2>Current Employees</h2>
      </header>
      <ReactDataTable columns={headers} initialEntriesNumber={2}>{employees}</ReactDataTable>
    </>
  );
};

export default ViewEmployeesPage;
