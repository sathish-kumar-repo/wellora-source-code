import { Media, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const WhatIsInterfaceInJava = () => {
  return (
    <>
      <Title>What is interface in Java</Title>
      <Para>
        Interface looks like a class but it is not a class. An interface can
        have methods and variables just like the class but the methods declared
        in interface are by default abstract (only method signatures, no body,
        see: Java abstract method). Interfaces are used to achieve full
        abstraction in Java. Since methods in interfaces do not have body, they
        have to be implemented by the class before you can access them.
      </Para>
      <Para>
        The class that implements interface must implement all the methods of
        that interface. Also, java programming language does not allow you to
        extend more than one class, however you can implement more than one
        interface in your class.
      </Para>
      <Media src="77 What is interface in Java/img.jpg" customDomain={domain} />
      <Space sT={20} />
      <Syntax
        src="77 What is interface in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default WhatIsInterfaceInJava;
