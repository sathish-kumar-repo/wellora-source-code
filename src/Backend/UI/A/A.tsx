import "./A.css";

interface AProps {
  link: string;
  children?: React.ReactNode;
}

const A = ({ link, children }: AProps) => {
  return (
    <a className="anchor" href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default A;
