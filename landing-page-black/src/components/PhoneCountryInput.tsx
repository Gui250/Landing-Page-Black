import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type PhoneCountryInputProps = {
  onChange?: (value: string | undefined) => void;
  value?: string;
  name?: string;
  onBlur?: () => void;
};

function PhoneCountryInput({
  onChange,
  value,
  name,
  onBlur,
}: PhoneCountryInputProps) {
  return (
    <div className="w-full">
      <PhoneInput
        value={value}
        defaultCountry="BR"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder="Digite seu telefone"
        inputClass="font-['Inter'] text-[#AFA9A9] rounded-[0.5rem] w-full focus:outline-none focus:ring-1 focus:ring-[#DDC07F]"
      />
    </div>
  );
}

export default PhoneCountryInput;
