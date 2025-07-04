import "./H2.css";

interface H2Props {
  children?: React.ReactNode;
}
const H2 = ({ children }: H2Props) => {
  return <h2 className="sub-heading">{children}</h2>;
};

export default H2;
