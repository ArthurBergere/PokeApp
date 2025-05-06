type BadgeVariant = "type" | "level" | "status";
// On utilise une interface ici car ce composant attend un objet de props pouvant être étendu facilement
export interface BadgeProps {
    variant: BadgeVariant;
    type?: string | string[];  // Utilisé pour le variant "type", qui peut être un tableau de types
    className?: string; // Pour personnaliser davantage les styles si nécessaire
  }