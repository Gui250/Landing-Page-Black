import { useState } from "react";

type InputProps = {
  placeholder: string;
};

function Input({ placeholder }: InputProps) {
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={email}
      onChange={handleChange}
      className="font-['Inter'] mt-[0.68rem] placeholder:text-[#AFA9A9] w-full py-[0.9rem] px-[1.4rem] bg-[#FFFFFF] text-[#AFA9A9] rounded-[0.5rem] border border-[#DDC07F] focus:outline-none focus:ring-1 focus:ring-[#DDC07F]"
    />
  );
}

export default Input;
