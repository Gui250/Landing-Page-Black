type ButtonProps = {
  label: string;
};

function Button({ label }: ButtonProps) {
  return (
    <button className="cursor-pointer mt-[1rem] bg-[#2B9832] text-[#FFFFFF] rounded-[0.5rem] p-3 sm:p-4 md:p-[1rem] w-full sm:w-auto text-sm sm:text-base">
      {label}
    </button>
  );
}

export default Button;
