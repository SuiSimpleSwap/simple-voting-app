import { FC } from "react"

type TextProps = {
  text: string,
  isError?: boolean,
  centered?: boolean
}

export const EcText: FC<TextProps> = ({text, isError, centered}) => {
  const centeredClassname = centered ? "text-center" : "";
  const baseClasses = "font-mono font-bold uppercase tracking-wider";
  
  if (isError) {
    return (
      <div className={`${centeredClassname} ${baseClasses} bg-black text-white border-2 border-black p-2`}>
        {text}
      </div>
    );
  }

  return (
    <div className={`${centeredClassname} ${baseClasses} bg-white text-black border-2 border-black p-2`}>
      {text}
    </div>
  );
}
