// O 'type' permanece o mesmo, já que a descrição não é uma prop
import Input from "./Input";
import PhoneCountryInput from "./PhoneCountryInput";
import Button from "./Button";
import VSL from "./VSL";
import womanImage from "../assets/imagem mulher.png";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { trackEvent } from "../lib/metaPixel.ts";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/HYgJJu82oWO1yVxX6JDz1T";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
});

type FormData = z.infer<typeof formSchema>;

type DescriptionProps = {
  title: string;
  label: string;
};

function Description({ label, title }: DescriptionProps) {
  const { register, handleSubmit, control, reset, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const email = watch("email");
  const phone = watch("phone");

  // Verifica se ambos os campos estão preenchidos e válidos
  const isEmailValid = email && email.trim() !== "" && email.includes("@");
  // Remove caracteres não numéricos para contar apenas dígitos
  const phoneDigits = phone ? phone.replace(/\D/g, "") : "";
  const isPhoneValid = phone && phone.trim() !== "" && phoneDigits.length >= 10;
  const isFormValid = isEmailValid && isPhoneValid;

  const submit = async (data: FormData) => {
    const webhookUrl = "/api/webhook/grupo-vip";

    const payload = {
      email: data.email,
      phone: data.phone,
    };

    // Rastreia o evento no Meta Pixel
    trackEvent("Entrar no grupo VIP", {
      button_label: "Entrar no grupo VIP",
      button_type: "primary",
    });

    try {
      const response = await axios.post(webhookUrl, payload);
      if (response.status === 200) {
        console.log("Dados enviados com sucesso para o webhook");
        reset(); // Limpa os campos do formulário após envio bem-sucedido
        // Redireciona para o grupo do WhatsApp
        window.open(WHATSAPP_GROUP_LINK, "_blank");
      } else {
        console.error(
          "Erro ao enviar dados para o webhook:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erro ao enviar dados para o webhook:", error);
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-8 md:pl-[7.125rem] text-[#FFFFFF] font-['Poppins'] pb-8">
      {/* 1. Imagem da mulher no topo - apenas no mobile */}
      <div className="flex justify-center sm:hidden pt-0 pb-2">
        <img
          src={womanImage}
          alt="Mulher"
          className="w-full max-w-xs object-contain h-[20rem]"
        />
      </div>

      {/* 2. Bloco de Título - Black Vencendo a Procrastinação */}
      <div className="pt-2 sm:pt-24 md:pt-[7.5rem]">
        <p className="text-base sm:text-lg md:text-xl font-bold">{label}</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>
      </div>

      {/* 3. Container para o vídeo VSL (quadrado verde) - apenas mobile */}
      <div className="pt-2 sm:hidden w-full max-w-[33.25rem]">
        <div className="w-full aspect-video bg-[#00FF00] rounded-lg flex items-center justify-center">
          {/* Placeholder para o vídeo VSL */}
          <span className="text-white text-sm opacity-50">Vídeo VSL</span>
        </div>
      </div>

      {/* 4. Bloco de Descrição */}
      {/* A CORREÇÃO PRINCIPAL: Trocamos 'w-[33.25rem]' por 'max-w-[33.25rem]'.
           Isso corrige a quebra de linha indesejada em telas maiores.
         Removemos o 'pl' daqui, pois já está no 'div' pai.
      */}
      <div className="pt-2 sm:pt-6 md:pt-[1.75rem] max-w-[33.25rem] flex items-center">
        {/* 5. Limpamos as classes desnecessárias (como m-0, p-0, box-border, etc)
             que o 'w-full' já resolve.
        */}
        <p className="text-base sm:text-lg md:text-xl w-full font-['Poppins']">
          A procrastinação{" "}
          <strong className="text-[#DDC07F]">não é um defeito seu. </strong>
          <br /> Ela{" "}
          <strong className="text-[#DDC07F]">é um mecanismo automático </strong>
          do seu cérebro <br className="hidden sm:block" /> para aliviar
          ansiedade, medo, insegurança ou
          <br /> sensação de sobrecarga.
        </p>
      </div>

      <div className="pt-2 sm:pt-6 md:pt-[1.75rem] max-w-[33.25rem] flex flex-col ">
        <strong className="text-[#DDC07F] text-base sm:text-lg md:text-xl">
          Mas a boa notícia:
        </strong>
        <p className="text-base sm:text-lg md:text-xl w-full font-['Poppins']">
          Se o cérebro aprendeu a procrastinar…{" "}
          <br className="hidden sm:block" />
          Ele pode aprender a agir.
        </p>
        <p className="font-['Poppins'] text-sm sm:text-[0.9rem] text-[#FFFFFF] mt-2 sm:mt-[0.5rem]">
          No dia 28, eu vou abrir a Semana Vencendo a Procrastinação, onde
          <br /> vou te mostrar como reprogramar sua mente para agir, mesmo
          <br />
          quando estiver cansada, desmotivada, ansiosa ou com medo.
        </p>
        <strong className="font-['Poppins'] text-sm sm:text-[0.9rem] text-[#DDC07F] mt-2 sm:mt-[0.5rem]">
          O conteúdo será liberado apenas no Grupo VIP da Black.
        </strong>
      </div>
      {/* 5. Formulário para Grupo VIP com VSL ao lado no desktop */}
      <div className="pt-2 sm:pt-6 md:pt-[1.75rem] max-w-[33.25rem] sm:max-w-none">
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8 lg:gap-[10.56rem]">
          {/* Inputs - responsivo */}
          <div className="col-span-1 sm:col-span-4 lg:col-start-1 lg:col-end-5">
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col sm:max-w-[40rem]"
            >
              <Input placeholder="Digite seu email" {...register("email")} />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneCountryInput
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                )}
              />
              <Button label="Entrar no grupo VIP" disabled={!isFormValid} />
            </form>
          </div>
          {/* VSL - responsivo, aparece apenas no tablet e desktop */}
          <div className="hidden sm:block sm:col-span-2 lg:col-start-6 lg:col-end-9 w-full">
            <VSL />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
