type BadgeVariant = "type" | "level" | "status";

export interface BadgeProps {
    variant: BadgeVariant;
    value: string | number;  // chaine ou nombre (level)
    type?: string | string[];  // Utilisé pour le variant "type", qui peut être un tableau de types
    className?: string; // Pour personnaliser davantage les styles si nécessaire
  }