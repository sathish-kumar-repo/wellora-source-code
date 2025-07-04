import "./Switch.css";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round" />
    </label>
  );
};

export default Switch;
