import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Select from "../components/Select/Select";
import { useEmployeeList } from "../context/employeeListContext";
import { statesByAbbreviation } from "../data/states";
import usePresence from "../hooks/usePresence";

const CreateEmployeePage = () => {
  const { addEmployee } = useEmployeeList();

  const [
    isModalOpened,
    isModalClosing,
    setModalOpened,
    setModalClosing,
    setModalClosed,
  ] = usePresence();

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

    setModalOpened();
  }
  return (
    <>
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
          <Select selected={state} onChange={setState} id="state-input">
            {statesByAbbreviation}
          </Select>
          <label htmlFor="zip-code-input">Zip code</label>
          <input
            type="text"
            id="zip-code-input"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
          />
        </fieldset>
        <label htmlFor="department-input">Department</label>
        <Select
          id="department-input"
          selected={department}
          onChange={setDepartment}
        >
          {["Sales", "Marketing", "Engineering", "Human Resources", "Legal"]}
        </Select>
        <button className="save-employee-button">save</button>
      </form>
      {isModalOpened && (
        <Modal
          isClosing={isModalClosing}
          onCloseFinished={setModalClosed}
          onCloseRequested={setModalClosing}
        >
          <div className="creation-notification-modal">Employee Created!</div>
        </Modal>
      )}
    </>
  );
};

export default CreateEmployeePage;
