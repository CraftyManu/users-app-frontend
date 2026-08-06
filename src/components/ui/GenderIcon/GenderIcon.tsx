import { Mars, Venus, CircleHelp } from "lucide-react";

interface GenderIconProps {
  gender?: string | null;
}

export default function GenderIcon({ gender }: GenderIconProps) {
  if (gender === "Masculino" || gender === "masculino") {
    return (
      <span title="Masculino">
        {" "}
        <Mars size={30} color="#4F8EF7" aria-label="Masculino" />{" "}
      </span>
    );
  }

  if (gender === "Femenino" || gender === "femenino") {
    return (
      <span title="Femenino">
        {" "}
        <Venus size={30} color="#E56AA6" aria-label="Femenino" />{" "}
      </span>
    );
  }

  return (
    <span title="Otro">
      {" "}
      <CircleHelp size={20} color="#888" aria-label="Otro" />{" "}
    </span>
  );
}
