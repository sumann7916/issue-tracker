import { Form } from "@remix-run/react";
import React, { useState } from "react";

type EditFormProps = {
  formTitle: string;
  optionsList: string[];
  id: string;
  name: string;
};

const EditForm: React.FC<EditFormProps> = ({
  formTitle,
  optionsList,
  id,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(optionsList[0]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Form method="post">
      <div className="flex items-center mb-4">
        <label className="mr-2 text-gray-700 font-semibold" htmlFor={id}>
          {formTitle}:
        </label>
        <select
          className="border rounded-md py-2 px-3 text-gray-700"
          id={id}
          name={name}
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {optionsList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        OK
      </button>
    </Form>
  );
};

export default EditForm;
