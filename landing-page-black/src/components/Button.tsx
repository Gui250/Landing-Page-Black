type ButtonProps = {
  label: string;
  disabled?: boolean;
};

function Button({ label, disabled = false }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`transition-all duration-300 mt-[1rem] rounded-[0.5rem] p-3 sm:p-4 md:p-[1rem] w-full sm:w-auto text-sm sm:text-base ${
        disabled
          ? "bg-[#808080] text-[#FFFFFF] cursor-not-allowed opacity-60"
          : "bg-[#2B9832] text-[#FFFFFF] hover:bg-[#1E7526] cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}

export default Button;
