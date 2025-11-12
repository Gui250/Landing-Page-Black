import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
function PhoneCountryInput() {
  const [value, setValue] = useState<string>("");

  return (
    <PhoneInput
      value={value}
      defaultCountry="BR"
      onChange={(value) => setValue(value?.toString() || "")}
      placeholder="Digite seu telefone"
      inputClass="font-['Inter'] text-[#AFA9A9] rounded-[0.5rem] w-full focus:outline-none focus:ring-1 focus:ring-[#DDC07F]"
    />
  );
}

export default PhoneCountryInput;
