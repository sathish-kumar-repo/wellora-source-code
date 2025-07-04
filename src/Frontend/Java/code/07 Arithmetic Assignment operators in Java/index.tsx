import { Para, Syntax, Table, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ArithmeticAssignmentOperatorsInJava = () => {
  return (
    <>
      <Title>Arithmetic Assignment operators in Java</Title>
      <Para>
        The five arithmetic assignment operators are a form of short hand.
        Various textbooks call them "compound assignment operators" or "combined
        assignment operators". Their usage can be explaned in terms of the
        assignment operator and the arithmetic operators.
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Compound Operator</th>
            <th>Sample Expression</th>
            <th>Expanded Form</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+=</td>
            <td>x += 2</td>
            <td>x = x + 2</td>
          </tr>
          <tr>
            <td>-=</td>
            <td>y -= 6</td>
            <td>y = y - 6</td>
          </tr>
          <tr>
            <td>*=</td>
            <td>z *= 7</td>
            <td>z = z * 7</td>
          </tr>
          <tr>
            <td>/=</td>
            <td>a /= 4</td>
            <td>a = a / 4</td>
          </tr>
          <tr>
            <td>%=</td>
            <td>b %= 9</td>
            <td>b = b % 9</td>
          </tr>
        </tbody>
      </Table>
      <Syntax
        src="07 Arithmetic Assignment operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ArithmeticAssignmentOperatorsInJava;
