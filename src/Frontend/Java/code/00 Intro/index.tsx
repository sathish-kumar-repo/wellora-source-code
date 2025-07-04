import { H1, List, Media, Note, Para, Title } from "../../../../Backend/UI";

const Intro = () => {
  return (
    <>
      <Title>Java Programming Tutorial for Beginners</Title>
      <Para>
        Java is a high-level programming language originally developed by Sun
        Microsystems and released in 1995. Java runs on a variety of platforms,
        such as Windows, Mac OS, and the various versions of UNIX. This tutorial
        gives a complete understanding of Java. This reference will take you
        through simple and practical approaches while learning Java Programming
        language.
      </Para>

      <H1>Applications</H1>
      <Para>
        According to Sun, 3 billion devices run Java. There are many devices
        where Java is currently used. Some of them are as follows:
      </Para>
      <List
        items={[
          "Desktop Applications such as Acrobat Reader, Media Player, Antivirus, etc.",
          "Web Applications",
          "Enterprise Applications such as Banking Applications",
          "Mobile",
          "Embedded System",
          "Smart Card",
          "Robotics",
          "Games",
        ]}
      />

      <H1>Reference</H1>
      <Media
        responsive
        src={"https://youtu.be/yC9ZwDfT3b0?si=K4-g6kjmBm6t2zU0"}
      />

      <H1>History and Versions of Java</H1>
      <Note link="https://www.tutorjoes.in/java_programming_tutorial/history_of_java" />

      <H1>Java Installation</H1>
      <Note link="https://www.tutorjoes.in/java_programming_tutorial/java_installation_in_tamil" />
    </>
  );
};

export default Intro;
