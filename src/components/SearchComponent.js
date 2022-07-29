import { useState } from "react";

function SearchStaff({ staff }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>Tên nhân viên:</h3>
      </label>
      <input
        type="text"
        name="staffname"
        value={inputs.staffname || ""}
        onChange={handleChange}
      />

      <input type="submit" />
    </form>
  );
}

export default SearchStaff;
