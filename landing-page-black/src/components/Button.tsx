import { trackEvent } from "../lib/metaPixel.ts";

type ButtonProps = {
  label: string;
};

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/HYgJJu82oWO1yVxX6JDz1T";

function Button({ label }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Rastreia o evento no Meta Pixel
    trackEvent("Entrar no grupo VIP", {
      button_label: label,
      button_type: "primary",
    });

    // Redireciona para o grupo do WhatsApp
    window.open(WHATSAPP_GROUP_LINK, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-[#1E7526] transition-all duration-300 cursor-pointer mt-[1rem] bg-[#2B9832] text-[#FFFFFF] rounded-[0.5rem] p-3 sm:p-4 md:p-[1rem] w-full sm:w-auto text-sm sm:text-base"
    >
      {label}
    </button>
  );
}

export default Button;
