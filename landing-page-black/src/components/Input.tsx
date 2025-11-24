import { forwardRef } from "react";

type InputProps = {
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        {...props}
        translate="no"
        className="font-['Inter'] mt-[0.68rem] placeholder:text-[#AFA9A9] w-full py-[0.9rem] px-[1.4rem] bg-[#FFFFFF] text-[#AFA9A9] rounded-[0.5rem] border border-[#DDC07F] focus:outline-none focus:ring-1 focus:ring-[#DDC07F]"
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
