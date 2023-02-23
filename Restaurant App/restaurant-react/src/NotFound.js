import { Card } from "react-bootstrap";
export default function NotFound() {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <Card.Title>Unknown Route</Card.Title>
          <Card.Text>We can't find what you're looking for..</Card.Text>
        </Card.Header>
      </Card>
    </>
  );
}
