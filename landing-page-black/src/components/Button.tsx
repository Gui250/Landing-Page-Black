type ButtonProps = {
  label: string;
};

function Button({ label }: ButtonProps) {
  return (
    <button className="bg-[#2B9832] text-[#A0A0A0] rounded-[0.5rem] p-[1rem]">
      {label}
    </button>
  );
}

export default Button;
