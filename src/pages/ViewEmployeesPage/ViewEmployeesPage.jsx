import { useEmployeeList } from "../../context/employeeListContext";
import ReactDataTable, { Pagination } from "mb-react-data-table";

import formatDate from "../../utils/formatDate";
import sortDate from "../../utils/sortDate";

import Select from "../../components/Select/Select";
import InputGroup from "../../components/InputGroup/InputGroup";

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
        headerClassName="header"
        renderPagination={props => (
          <Pagination {...props} className="pagination" />
        )}
        renderEntriesNumberSelection={({
          selectedNumber,
          setEntriesNumber,
        }) => (
          <Select
            id="select-entries-number"
            selected={selectedNumber.toString()}
            onChange={value => setEntriesNumber(Number(value))}
            label="Show entries"
          >
            {["10", "25", "50", "100"]}
          </Select>
        )}
        renderSearchEntries={({ search, setSearch }) => {
          return (
            <InputGroup
              id="search-entries"
              value={search}
              onChange={setSearch}
              type="search"
            >
              Search
            </InputGroup>
          );
        }}
      >
        {employees}
      </ReactDataTable>
    </>
  );
};

export default ViewEmployeesPage;
