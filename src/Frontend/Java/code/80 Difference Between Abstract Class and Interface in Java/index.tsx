import { Media, Para, Table, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const DifferenceBetweenAbstractClassAndInterfaceInJava = () => {
  return (
    <>
      <Title>Difference Between Abstract Class and Interface in Java</Title>
      <Para>
        Abstract classes and interfaces are the two main building blocks of the
        Java Programming Language. Though both are primarily used for
        abstraction, they are very different from each other and cannot be used
        interchangeably.
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Abstract Class</th>
            <th>Interface</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              It can extend only one class or one abstract class at a time.
            </td>
            <td>It can extend any number of interfaces at a time.</td>
          </tr>
          <tr>
            <td>
              It can extend another concrete (regular) class or abstract class.
            </td>
            <td>It can only extend another interface.</td>
          </tr>
          <tr>
            <td>Abstract class have both abstract and concrete methods.</td>
            <td>Interface can have only abstract methods.</td>
          </tr>
          <tr>
            <td>
              Keyword <code>abstract</code> is mandatory to declare a method as
              abstract.
            </td>
            <td>
              Keyword <code>abstract</code> is optional to declare a method as
              abstract.
            </td>
          </tr>
          <tr>
            <td>It can have protected and public abstract methods.</td>
            <td>Interface can have only public abstract methods.</td>
          </tr>
          <tr>
            <td>
              Can have <code>static</code>, <code>final</code>, or{" "}
              <code>static final</code> variables with any access specifier.
            </td>
            <td>
              Can only have <code>public static final</code> (constant)
              variables.
            </td>
          </tr>
        </tbody>
      </Table>
      <Media
        src="80 Difference Between Abstract Class and Interface in Java/img.jpg"
        customDomain={domain}
      />
    </>
  );
};

export default DifferenceBetweenAbstractClassAndInterfaceInJava;
