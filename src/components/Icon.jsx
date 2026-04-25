export const Icon = ({ as: IconComponent, className = "" }) => {
  return <IconComponent className={`w-5 h-5 shrink-0 ${className}`} />;
};