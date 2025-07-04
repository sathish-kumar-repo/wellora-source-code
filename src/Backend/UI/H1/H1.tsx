import "./H1.css";

interface H1Props {
  children?: React.ReactNode;
}

const H1 = ({ children }: H1Props) => {
  return <h1 className="heading">{children}</h1>;
};

export default H1;
