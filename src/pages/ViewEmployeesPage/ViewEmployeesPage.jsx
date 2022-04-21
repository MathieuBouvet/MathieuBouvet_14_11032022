import { useEmployeeList } from "../../context/employeeListContext";
import ReactDataTable, { Pagination } from "mb-react-data-table";

import formatDate from "../../utils/formatDate";
import sortDate from "../../utils/sortDate";

import "./viewEmployeesPage.css";

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
    {
      name: "Start Date",
      dataKey: "startDate",
      formater: formatDate,
      sortFn: sortDate,
    },
    { name: "Department", dataKey: "department" },
    {
      name: "Date of Birth",
      dataKey: "birthDate",
      formater: formatDate,
      sortFn: sortDate,
    },
    { name: "Street", dataKey: "street" },
    { name: "City", dataKey: "city" },
    { name: "State", dataKey: "state" },
    { name: "Zip code", dataKey: "zipCode" },
  ];
  return (
    <>
      <header>
        <h2>Current Employees</h2>
      </header>
      <ReactDataTable
        columns={headers}
        renderPagination={props => (
          <Pagination {...props} className="pagination" />
        )}
      >
        {employees}
      </ReactDataTable>
    </>
  );
};

export default ViewEmployeesPage;
