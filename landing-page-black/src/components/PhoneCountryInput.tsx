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
  const hasValue = value && value.trim() !== "";

  return (
    <div className="w-full">
      <PhoneInput
        value={value}
        defaultCountry="BR"
        onChange={(value) => onChange?.(value?.toString())}
        onBlur={onBlur}
        name={name}
        placeholder="Digite seu telefone"
        inputClass={`font-['Inter'] rounded-[0.5rem] w-full focus:outline-none focus:ring-1 focus:ring-[#DDC07F] ${
          hasValue ? "text-black" : "text-[#AFA9A9]"
        }`}
      />
    </div>
  );
}

export default PhoneCountryInput;
