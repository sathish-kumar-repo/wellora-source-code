import {
  Media,
  Para,
  Space,
  Syntax,
  Table,
  Title,
} from "../../../../Backend/UI";
import { domain } from "../../content";

const BitwiseAndShiftOperatorsInJava = () => {
  return (
    <>
      <Title>Bitwise & Shift Operators in Java</Title>
      <Para>
        A shift operator performs bit manipulation on data by shifting the bits
        of its first operand right or left. The bitwise operators are the
        operators used to perform the operations on the data at the bit-level.
        When we perform the bitwise operations, then it is also known as
        bit-level programming. It consists of two digits, either 0 or 1.
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Description</th>
            <th>Example</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&amp;</td>
            <td>Bitwise AND</td>
            <td>5 &amp; 3</td>
            <td>Performs AND operation on each bit (1 if both bits are 1)</td>
          </tr>
          <tr>
            <td>|</td>
            <td>Bitwise OR</td>
            <td>5 | 3</td>
            <td>Performs OR operation on each bit (1 if any bit is 1)</td>
          </tr>
          <tr>
            <td>^</td>
            <td>Bitwise XOR (exclusive OR)</td>
            <td>5 ^ 3</td>
            <td>Performs XOR on each bit (1 if bits differ)</td>
          </tr>
          <tr>
            <td>~</td>
            <td>Bitwise NOT (One's complement)</td>
            <td>~5</td>
            <td>Inverts each bit (0 → 1 and 1 → 0)</td>
          </tr>
          <tr>
            <td>&lt;&lt;</td>
            <td>Left Shift</td>
            <td>5 &lt;&lt; 1</td>
            <td>
              Shifts bits left, fills right with 0 (multiplies by 2<sup>n</sup>)
            </td>
          </tr>
          <tr>
            <td>&gt;&gt;</td>
            <td>Signed Right Shift</td>
            <td>5 &gt;&gt; 1</td>
            <td>
              Shifts bits right, fills left with sign bit (preserves sign)
            </td>
          </tr>
          <tr>
            <td>&gt;&gt;&gt;</td>
            <td>Unsigned Right Shift</td>
            <td>-5 &gt;&gt;&gt; 1</td>
            <td>
              Shifts bits right, fills left with 0 (does not preserve sign)
            </td>
          </tr>
        </tbody>
      </Table>
      <Media
        src="12 Bitwise & Shift Operators in Java/img.png"
        customDomain={domain}
      />
      <Space sT={20} />
      <Syntax
        src="12 Bitwise & Shift Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default BitwiseAndShiftOperatorsInJava;
