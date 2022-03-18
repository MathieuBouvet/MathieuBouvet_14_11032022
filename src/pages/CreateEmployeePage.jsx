import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmployeeList } from "../context/employeeListContext";
import Dialog from "../components/Modal/Dialog";

const CreateEmployeePage = () => {
  const { addEmployee } = useEmployeeList();

  const [showCreationNotification, setShowCreationNotification] =
    useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const employee = {
      firstName,
      lastName,
      birthDate,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    };

    addEmployee(employee);

    setShowCreationNotification(true);
  }
  return (
    <>
      <header className="flex-column-container">
        <h1>HRnet</h1>
        <nav>
          <Link to="/employees">View Current Employees</Link>
        </nav>
      </header>
      <main className="flex-column-container">
        <h2>Create employee</h2>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="first-name-input">First name</label>
          <input
            type="text"
            id="first-name-input"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <label htmlFor="last-name-input">Last name</label>
          <input
            type="text"
            id="last-name-input"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <label htmlFor="birth-date-input">Date of birth</label>
          <input
            type="date"
            id="birth-date-input"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
          <label htmlFor="start-date-input">Start date</label>
          <input
            type="date"
            id="start-date-input"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street-input">Street</label>
            <input
              type="text"
              id="street-input"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
            <label htmlFor="city-input">City</label>
            <input
              type="text"
              id="city-input"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <label htmlFor="state-input">State</label>
            <select
              id="state-input"
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option value="1">one</option>
              <option value="2">two</option>
            </select>
            <label htmlFor="zip-code-input">Zip code</label>
            <input
              type="text"
              id="zip-code-input"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
            />
          </fieldset>
          <label htmlFor="department-input">Department</label>
          <select
            id="department-input"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            <option>Sales</option>
            <option>Marketing</option>
          </select>
          <button className="save-employee-button">save</button>
        </form>
        <Dialog
          isOpen={showCreationNotification}
          onClose={() => setShowCreationNotification(false)}
        >
          <div className="creation-notification-modal">Employee Created!</div>
        </Dialog>
      </main>
    </>
  );
};

export default CreateEmployeePage;
