import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Select from "../../components/Select/Select";
import { useEmployeeList } from "../../context/employeeListContext";
import { statesByAbbreviation } from "../../data/states";
import usePresence from "../../hooks/usePresence";
import InputGroup from "../../components/InputGroup/InputGroup";
import DateInput from "../../components/DateInput/DateInput";

import "./CreateEmployeePage.css";

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
      <h2 className="create-employee-title">Create employee</h2>
      <form action="" onSubmit={handleSubmit} className="employee-form">
        <InputGroup
          id="first-name-input"
          value={firstName}
          onChange={setFirstName}
        >
          First name
        </InputGroup>
        <InputGroup
          id="last-name-input"
          value={lastName}
          onChange={setLastName}
        >
          Last name
        </InputGroup>
        <DateInput
          id="birth-date-input"
          value={birthDate}
          onChange={setBirthDate}
        >
          Date of birth
        </DateInput>
        <DateInput
          id="start-date-input"
          value={startDate}
          onChange={setStartDate}
        >
          Start date
        </DateInput>
        <fieldset className="address">
          <legend>Address</legend>
          <InputGroup
            type="text"
            id="street-input"
            value={street}
            onChange={setStreet}
          >
            Street
          </InputGroup>
          <InputGroup
            type="text"
            id="city-input"
            value={city}
            onChange={setCity}
          >
            City
          </InputGroup>
          <label htmlFor="state-input">State</label>
          <Select selected={state} onChange={setState} id="state-input">
            {statesByAbbreviation}
          </Select>
          <InputGroup
            type="text"
            id="zip-code-input"
            value={zipCode}
            onChange={setZipCode}
          >
            Zip code
          </InputGroup>
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
