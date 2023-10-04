import { useState } from "react";

import Input from "../../../src/components/Input/Input";

function TestInput() {
  // Define default input value
  const [input, setInput] = useState({
    isActive: false,
    value: "",
  });

  return (
    <Input
      placeholder={"Input"}
      input={input}
      setInput={setInput}
      onChange={(e) => {
        setInput({
          ...input,
          value: e.target.value,
        });
      }}
    />
  );
}

export default TestInput;
