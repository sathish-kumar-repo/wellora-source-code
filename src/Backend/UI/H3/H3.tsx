interface HProps {
  children?: React.ReactNode;
}
const H3 = ({ children }: HProps) => {
  return <h6 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-3">{children}</h6>;
};

export default H3;