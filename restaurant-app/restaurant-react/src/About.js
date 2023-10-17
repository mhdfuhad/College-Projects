import { Card } from "react-bootstrap";

export default function About() {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <Card.Title>About</Card.Title>
          <Card.Text>Mohammad Fuhad Uddin</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Well, as an "aspiring" developer I never gave thought to this but
            due to this requirement of some information about me being placed
            into this view I'll talk about my realization of how much I enjoy
            web development over all the other types of programming like C++ or
            Java in this program. What makes it interesting for me is the
            ability to integrate and use various libraries or frameworks towards
            a project and how efficiently it can be done due to the development
            of these libraries and frameworks over the years. As python and many
            of its frameworks are also used in web development I aim to learn
            python in the future and work towards building a better foundation
            towards web development through practise of the things I learn
            through the web courses.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
