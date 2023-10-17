import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import queryString from "query-string";
import {
  Table,
  Pagination,
  Spinner,
  Card,
  Container,
  Row,
} from "react-bootstrap";

export default function Restaurants() {
  const history = useHistory();
  const perPage = 10;
  const location = useLocation();
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const borough = queryString.parse(location.search).borough;
    const fetchURL = `https://web422nddrestaurant.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${
      borough ? `&borough=${borough}` : ""
    }`;

    fetch(fetchURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Fetch was unsuccessful");
      })
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, page]);

  let previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  let nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      {!loading ? (
        restaurants.length !== 0 ? (
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Text>
                Full list of restaurants. Optionally sorted by borough
              </Card.Text>
            </Card.Header>
            <Card.Body style={{ padding: "0" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Borough</th>
                    <th>Cuisine</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => {
                    return (
                      <tr
                        key={restaurant._id}
                        onClick={() => {
                          history.push(`/restaurant/${restaurant._id}`);
                        }}
                      >
                        <td>{restaurant.name}</td>
                        <td>
                          {restaurant.address.building}{" "}
                          {restaurant.address.street}
                        </td>
                        <td>{restaurant.borough}</td>
                        <td>{restaurant.cuisine}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination style={{ margin: "20px" }}>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item disabled>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Card.Body>
          </Card>
        ) : (
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <Card.Title style={{ margin: "20px" }}>
                No restaurants found
              </Card.Title>
            </Card.Header>
          </Card>
        )
      ) : (
        <Container>
          <Row>
            <Spinner animation="border" style={{ margin: "20px" }} />
            <h3 className="mt-3">Loading restaurants...</h3>
          </Row>
        </Container>
      )}
    </>
  );
}
