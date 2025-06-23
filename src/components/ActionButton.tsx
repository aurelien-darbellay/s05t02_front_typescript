import UserUpdateDialog from "./UserUpdateDialog";

interface ActionButtonProps {
  onClick: () => void;
  message?: string;
  value: string;
  color:string;
  open?: boolean;
  onOkay?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, message, value,color, open, onOkay}) => {
  if (!open) open = false;
  return (
    <div>
      <button
      onClick={onClick}
      style={{
        padding: "0.5rem 1.2rem",
        backgroundColor: color,
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {value}
    </button>
    <UserUpdateDialog open={open} message={message} onClick={onOkay}/>
    </div>
    
  );
};