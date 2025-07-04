import {
  H1,
  H2,
  HL,
  List,
  Media,
  Para,
  Syntax,
  Title,
} from "../../../../Backend/UI";
import { domain } from "../../content";

const StringbufferAndStringbuilderInJava = () => {
  return (
    <>
      <Title>StringBuffer & StringBuilder in Java</Title>
      <H1>StringBuffer</H1>
      <Para>
        The StringBuffer and StringBuilder classes are suitable for both
        assembling and modifying strings; i.e they provide methods for replacing
        and removing characters as well as adding them in various. Java
        StringBuilder class is used to create mutable (modifiable) string.
      </Para>
      <H2>Key Points:</H2>
      <List
        items={[
          "Used to created mutable (modifiable) string.",
          "Mutable: Which can be changed?",
          "Is thread-safe i.e. multiple threads cannot access it simultaneously.",
        ]}
      />
      <H2>Methods:</H2>
      <List
        items={[
          <>
            public synchronized StringBuffer <HL>append(String s)</HL>
          </>,
          <>
            public synchronized StringBuffer{" "}
            <HL>insert(int offset, String s)</HL>
          </>,
          <>
            public synchronized StringBuffer{" "}
            <HL>replace(int startIndex, int endIndex, String str)</HL>
          </>,
          <>
            public synchronized StringBuffer{" "}
            <HL>delete(int startIndex, int endIndex)</HL>
          </>,
          <>
            public synchronized StringBuffer <HL>reverse()</HL>
          </>,
        ]}
      />
      <H1>StringBuilder</H1>
      <Para>
        Java StringBuilder class is used to create mutable (modifiable) string.
        The Java StringBuilder class is same as StringBuffer class except that
        it is non-synchronized. The StringBuffer and StringBuilder classes are
        suitable for both assembling and modifying strings; i.e they provide
        methods for replacing and removing characters as well as adding them in
        various.
      </Para>
      <Media
        src="49 StringBuffer & StringBuilder in Java/img.jpg"
        customDomain={domain}
      />
      <Syntax
        src="49 StringBuffer & StringBuilder in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StringbufferAndStringbuilderInJava;
