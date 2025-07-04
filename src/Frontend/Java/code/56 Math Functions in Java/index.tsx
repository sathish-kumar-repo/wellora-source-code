import { Para, Syntax, Table, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MathFunctionsInJava = () => {
  return (
    <>
      <Title>Math Functions in Java</Title>
      <Para>
        The Java Math class has many methods that allows you to perform
        mathematical tasks on numbers. The class Math contains methods for
        performing basic numeric operations such as the elementary exponential,
        logarithm, square and root. The java.lang.Math contains a set of basic
        math functions for obtaining the absolute value, highest and lowest of
        two values, rounding of values.
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>abs()</td>
            <td>Returns the absolute (positive) value</td>
          </tr>
          <tr>
            <td>sqrt()</td>
            <td>Returns the square root of the argument</td>
          </tr>
          <tr>
            <td>max()</td>
            <td>Returns the maximum of the two values passed as arguments</td>
          </tr>
          <tr>
            <td>min()</td>
            <td>Returns the minimum of the two values passed as arguments</td>
          </tr>
          <tr>
            <td>ceil()</td>
            <td>Rounds a float value up to the nearest integer</td>
          </tr>
          <tr>
            <td>floor()</td>
            <td>Rounds a float value down to the nearest integer</td>
          </tr>
          <tr>
            <td>pow()</td>
            <td>
              Returns the value of the first parameter raised to the power of
              the second
            </td>
          </tr>
          <tr>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </Table>
      <Syntax
        src="56 Math Functions in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MathFunctionsInJava;
