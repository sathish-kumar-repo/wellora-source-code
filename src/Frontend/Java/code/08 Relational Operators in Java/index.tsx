import { Para, Syntax, Table, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const RelationalOperatorsInJava = () => {
  return (
    <>
      <Title>Relational Operators in Java</Title>
      <Para>
        Relational Operators are a bunch of binary operators that are used to
        check for relations between two operands including equality, greater
        than, less than, etc. They return a boolean result after the comparison
        and are extensively used in looping statements as well as conditional
        if-else statements and so on.Relational operator checks the relationship
        between two operands. If the relation is true, it returns 1; if the
        relation is false, it returns value 0.
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Uses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>==</td>
            <td>equality operator</td>
          </tr>
          <tr>
            <td>!=</td>
            <td>non-equality operator</td>
          </tr>
          <tr>
            <td>&lt;</td>
            <td>less than operator</td>
          </tr>
          <tr>
            <td>&gt;</td>
            <td>greater than operator</td>
          </tr>
          <tr>
            <td>&lt;=</td>
            <td>less than or equal to operator</td>
          </tr>
          <tr>
            <td>&gt;=</td>
            <td>greater than or equal to operator</td>
          </tr>
        </tbody>
      </Table>
      <Syntax
        src="08 Relational Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default RelationalOperatorsInJava;
