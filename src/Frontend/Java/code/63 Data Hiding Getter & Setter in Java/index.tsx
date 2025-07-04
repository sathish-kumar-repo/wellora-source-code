import { Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const DataHidingGetterAndSetterInJava = () => {
  return (
    <>
      <Title>Data Hiding Getter & Setter in Java</Title>
      <Para>
        Getters and setters are methods used in Java to access and modify the
        private variables (fields) of a class. They are also known as accessors
        and mutators.
      </Para>
      <Space sT={20} />
      <Syntax
        src="63 Data Hiding Getter & Setter in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default DataHidingGetterAndSetterInJava;
