// O 'type' permanece o mesmo, já que a descrição não é uma prop
import Input from "./Input";
type DescriptionProps = {
  title: string;
  label: string;
};

function Description({ label, title }: DescriptionProps) {
  // 1. Trocamos o Fragment '<>' por uma 'div' principal.
  // 2. Movemos os estilos que se repetiam (pl, cor, fonte) para ela.
  return (
    <div className="flex flex-col pl-[7.125rem] text-[#FFFFFF] font-['Poppins']">
      {/* Bloco de Título (agora mais limpo, sem pl, cor ou fonte) */}
      <div className="pt-[7.5rem]">
        <p className="text-xl font-bold">{label}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      {/* Bloco de Descrição */}
      {/* 3. A CORREÇÃO PRINCIPAL: Trocamos 'w-[33.25rem]' por 'max-w-[33.25rem]'.
           Isso corrige a quebra de linha indesejada em telas maiores.
        4. Removemos o 'pl' daqui, pois já está no 'div' pai.
      */}
      <div className="pt-[1.75rem] max-w-[33.25rem] flex items-center">
        {/* 5. Limpamos as classes desnecessárias (como m-0, p-0, box-border, etc)
             que o 'w-full' já resolve.
        */}
        <p className="text-xl w-full font-['Poppins']">
          A procrastinação{" "}
          <strong className="text-[#DDC07F]">não é um defeito seu. </strong> Ela{" "}
          <strong className="text-[#DDC07F]">é um mecanismo automático </strong>
          do seu cérebro <br /> para aliviar ansiedade, medo, insegurança ou
          sensação de sobrecarga.
        </p>
      </div>

      <div className="pt-[1.75rem] max-w-[33.25rem] flex flex-col ">
        <strong className="text-[#DDC07F]">Mas a boa notícia:</strong>
        <p className="text-xl w-full font-['Poppins']">
          Se o cérebro aprendeu a procrastinar… <br />
          Ele pode aprender a agir.
        </p>
        <p className="font-['Poppins'] text-[0.9rem] text-[#FFFFFF] mt-[0.5rem]">
          No dia 28, eu vou abrir a Semana Vencendo a Procrastinação, onde vou
          te mostrar como reprogramar sua mente para agir, mesmo quando estiver
          cansada, desmotivada, ansiosa ou com medo.
        </p>
        <strong className="font-['Poppins'] text-[0.9rem] text-[#DDC07F] mt-[0.5rem]">
          O conteúdo será liberado apenas no Grupo VIP da Black.
        </strong>
      </div>

      <Input placeholder="Digite seu email" />
    </div>
  );
}

export default Description;
