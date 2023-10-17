import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, Spinner, Container, Row, CardDeck } from "react-bootstrap";
import { format } from "date-fns";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchURL = `https://web422nddrestaurant.herokuapp.com/api/restaurants/${id}`;

    fetch(fetchURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Fetch was unsuccessful");
      })
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {!loading ? (
        restaurant ? (
          <>
            <Card style={{ width: "100%" }}>
              <Card.Header>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  {restaurant.address.building} {restaurant.address.street}
                </Card.Text>
              </Card.Header>
              <Card.Body style={{ padding: "0" }}>
                <MapContainer
                  style={{ height: "400px" }}
                  center={[
                    restaurant.address.coord[1],
                    restaurant.address.coord[0],
                  ]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[
                      restaurant.address.coord[1],
                      restaurant.address.coord[0],
                    ]}
                  ></Marker>
                </MapContainer>
              </Card.Body>
            </Card>
            <Container className="p-0" fluid>
              <Row>
                <h3 className="mt-4 ml-4">Ratings</h3>
              </Row>
              <hr />
              <CardDeck>
                {restaurant.grades.map((grade) => {
                  return (
                    <Card>
                      <Card.Header>
                        <Card.Text>Grade: {grade.grade}</Card.Text>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          Completed:{" "}
                          {format(new Date(grade.date), "MM/dd/yyyy")}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </CardDeck>
            </Container>
          </>
        ) : (
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Card.Title style={{ margin: "20px" }}>
                Unable to find restaurant with id: {id}
              </Card.Title>
            </Card.Header>
          </Card>
        )
      ) : (
        <Container>
          <Row>
            <Spinner animation="border" style={{ margin: "20px" }} />
            <h3 className="mt-3">Loading restaurant data...</h3>
          </Row>
        </Container>
      )}
    </>
  );
}
