/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from "react";
import { Row, Col, Form, Button, ListGroup, Toast } from "react-bootstrap";
const { getUser } = require("./functions/auth");
const {
  getUserFragments,
  saveFragment,
  getFragment,
  updateFragment,
  deleteFragment,
} = require("./functions/api");

export default function Fragment() {
  const [fragments, setFragments] = useState(null); // List of all fragments id
  const [fragmentsExtended, setFragmentsExtended] = useState(null); // List of all fragments with metadata
  const [fragment, setFragment] = useState(null); // Current single fragment
  const [fragmentExtended, setFragmentExtended] = useState(null); // Current single fragment with metadata
  const [fragmentSaved, setFragmentSaved] = useState(null); // Current fragment saved
  const [user, setUser] = useState(null); // User object
  const [data, setData] = useState(); // Data for submission
  const [id, setId] = useState(""); // ID for submission
  const [clicked, setClicked] = useState(false); // Is clicked state
  const [message, setMessage] = useState(""); // Message state
  const [toast, setToast] = useState(false); // Toast state
  const [type, setType] = useState(""); // Mime type
  const img = useRef(); // Image ref

  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);

  // Handlers
  const getFragmentsHandler = (expand) => {
    console.log("Requesting user fragments data...");
    getUserFragments(user, expand)
      .then((res) => {
        if (expand) {
          setFragmentsExtended(res.fragments);
        } else {
          setFragments(res.fragments);
        }

        if (res.fragments.length === 0) {
          setMessage("No fragments found");
        } else {
          setMessage("Fragments found");
        }
      })
      .catch((err) => {
        setMessage("Unable to get fragments, please try again later.");
        console.error("Unable to call GET /v1/fragment", { err });
      });

    setClicked(true);
    setToast(true);
  };

  const getFragmentHandler = (expand) => {
    img.current.src = "";

    if (id === "") {
      setMessage("Please enter id to get fragment");
      setToast(true);
      return;
    }
    console.log("Requesting fragment data...");
    getFragment(user, id, expand, type)
      .then((res) => {
        if (res === "404") {
          setMessage("Fragment not found");
          setToast(true);
          return;
        }

        if (expand) setFragmentExtended(res.fragment);
        else {
          if (typeof res === "object") {
            console.log(res);
            if (res && res.size && res.type) {
              setFragment(res.type);

              img.current.src = URL.createObjectURL(res);
            } else {
              setFragment(Object.values(res)[0]);
            }
          } else {
            setFragment(res);
          }
        }

        if (res.fragment === null) {
          setMessage(
            "No fragment found, please make sure it exists by clicking on Get Fragment(s) Button."
          );
        } else {
          setMessage("Fragment found");
        }
      })
      .catch((err) => {
        setMessage("Unable to get fragment, please try again later.");
        console.error("Unable to call GET /v1/fragment", { err });
      });

    setClicked(true);
    setId("");
    setToast(true);
  };

  const saveSubmitHandler = (e) => {
    e.preventDefault();
    if (data === "") {
      setMessage("Please enter data to save");
      setToast(true);
      return;
    }
    console.log("Saving fragment...", data);
    saveFragment(user, data, type)
      .then((res) => {
        setFragmentSaved(res.fragment);
        setClicked(true);
        setData("");

        if (res.fragment === null) {
          setMessage("Unable to save fragment, please try again later.");
        } else {
          setMessage("Fragment saved successfully");
        }
      })
      .catch((err) => {
        setMessage("Unable to save fragment, please try again later.");
        console.error("Unable to call POST /v1/fragment", { err });
      });
    setToast(true);
    setType("");
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    if (id === "" || data === "") {
      setMessage("Please enter id and data to update");
      setToast(true);
      return;
    }
    console.log("Updating fragment...", data);
    updateFragment(user, id, data, type)
      .then((res) => {
        console.log(res);
        setClicked(true);
        setData("");
        setId("");

        if (res.fragment === null) {
          setMessage(
            "Unable to update fragment, please make sure it exists by clicking on Get Fragment(s) Button."
          );
        } else {
          setMessage("Fragment updated successfully");
        }
      })
      .catch((err) => {
        setMessage("Unable to update fragment, please try again later.");
        console.error("Unable to call PUT /v1/fragment", { err });
      });
    setToast(true);
    setType("");
  };

  const deleteSubmitHandler = (e) => {
    e.preventDefault();
    if (id === "") {
      setMessage("Please enter id to delete");
      setToast(true);
      return;
    }
    console.log("Deleting fragment...", id);
    deleteFragment(user, id)
      .then((res) => {
        setClicked(true);

        setId("");
        if (res.status === "ok") setMessage("Fragment deleted successfully");
        else
          setMessage(
            "Unable to delete fragment, please make sure it exists by clicking on Get Fragment(s) Button."
          );
      })
      .catch((err) => {
        setMessage("Unable to delete fragment, please try again later.");
        console.error("Unable to call DELETE /v1/fragment", { err });
      });
    setToast(true);
  };

  // Data field handler
  const onDataHandler = (event) => {
    if (event.target.getAttribute("name") === "id") setId(event.target.value);
    else if (event.target.getAttribute("name") === "type") {
      setData("");
      setType(event.target.value);
    } else {
      if (event.target.files && event.target.files[0]) {
        setData(event.target.files[0]);
      } else setData(event.target.value);
    }
  };

  return (
    <div className="Fragment container-fluid mt-3">
      <h1>Fragment CRUD</h1>
      <Row className="getFragments mt-4">
        <h2>Get fragment requests</h2>
        <Col>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            onClick={() => getFragmentsHandler(false)}
          >
            Get Fragments
          </Button>
          <ListGroup className="mt-2">
            {fragments && clicked
              ? fragments.map((fragment) => (
                  <ListGroup.Item key={fragment}>ID: {fragment}</ListGroup.Item>
                ))
              : null}
          </ListGroup>
        </Col>
        <Col>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            onClick={() => getFragmentsHandler(true)}
          >
            Get Fragments Extended
          </Button>
          <ListGroup className="mt-2">
            {fragmentsExtended && clicked
              ? fragmentsExtended.map((fragmentData) => (
                  <ListGroup.Item key={fragmentData.id}>
                    Owner ID: {fragmentData.ownerId.slice(0, 8)}
                    <br />
                    ID: {fragmentData.id}
                    <br />
                    Created: {fragmentData.created}
                    <br />
                    Updated: {fragmentData.updated}
                    <br />
                    Size: {fragmentData.size}
                    <br />
                    Type: {fragmentData.type}
                  </ListGroup.Item>
                ))
              : null}
          </ListGroup>
        </Col>
        <Col>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            onClick={() => getFragmentHandler(false)}
          >
            Get Fragment
          </Button>
          <Form>
            <Form.Group className="mt-2 mb-3">
              <Form.Select name="type" onChange={onDataHandler}>
                <option defaultValue value="">
                  Default
                </option>
                <option value=".txt">Text/Plain</option>
                <option value=".html">HTML</option>
                <option value=".md">Markdown</option>
                <option value=".json">JSON</option>
                <option value=".gif">GIF</option>
                <option value=".jpg">JPEG</option>
                <option value=".png">PNG</option>
                <option value=".webp">WEBP</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="id"
                className="w-100 mt-2"
                type="text"
                placeholder="Enter ID"
                value={id}
                onChange={onDataHandler}
              />
            </Form.Group>
          </Form>
          {fragment && clicked ? (
            <div>
              Data: {fragment} <br />
              <br />
              <p>If JSON check console for whole data object</p>
            </div>
          ) : null}
          <img ref={img} width={250} />
        </Col>
        <Col>
          <Button
            className="mt-2"
            variant="primary"
            type="submit"
            onClick={() => getFragmentHandler(true)}
          >
            Get Fragment MetaData
          </Button>
          <Form>
            <Form.Group>
              <Form.Control
                name="id"
                className="w-100 mt-2"
                type="text"
                placeholder="Enter ID"
                value={id}
                onChange={onDataHandler}
              />
            </Form.Group>
          </Form>
          {fragmentExtended && clicked ? (
            <div>
              {" "}
              Owner ID: {fragmentExtended.ownerId.slice(0, 8)}
              <br />
              ID: {fragmentExtended.id}
              <br />
              Created: {fragmentExtended.created}
              <br />
              Updated: {fragmentExtended.updated}
              <br />
              Size: {fragmentExtended.size}
              <br />
              Type: {fragmentExtended.type}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h2>Update fragment</h2>
          <Form onSubmit={updateSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Select name="type" onChange={onDataHandler}>
                <option defaultValue>None</option>
                <option value="text/plain">Text/Plain</option>
                <option value="text/html">HTML</option>
                <option value="text/markdown">Markdown</option>
                <option value="application/json">JSON</option>
                <option value="image/gif">GIF</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WEBP</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col xs="4">
                  <Form.Control
                    name="id"
                    className="w-100"
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={onDataHandler}
                  />{" "}
                </Col>
                <Col>
                  {type === "image/gif" ||
                  type === "image/jpeg" ||
                  type === "image/png" ||
                  type === "image/webp" ? (
                    <Form.Control
                      name="data"
                      className="w-100"
                      type="file"
                      placeholder="Enter file"
                      onChange={onDataHandler}
                      accept="image/*"
                    />
                  ) : (
                    <Form.Control
                      name="data"
                      className="w-100"
                      type="text"
                      as="textarea"
                      placeholder="Enter data"
                      value={data}
                      onChange={onDataHandler}
                    />
                  )}
                </Col>
              </Row>
              <Button className="my-2" variant="primary" type="submit">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h2>Save fragment</h2>
          <Form onSubmit={saveSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Select name="type" onChange={onDataHandler}>
                <option defaultValue>None</option>
                <option value="text/plain">Text/Plain</option>
                <option value="text/html">HTML</option>
                <option value="text/markdown">Markdown</option>
                <option value="application/json">JSON</option>
                <option value="image/gif">GIF</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WEBP</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              {type === "image/gif" ||
              type === "image/jpeg" ||
              type === "image/png" ||
              type === "image/webp" ? (
                <Form.Control
                  name="data"
                  className="w-100"
                  type="file"
                  placeholder="Enter file"
                  onChange={onDataHandler}
                  accept="image/*"
                />
              ) : (
                <Form.Control
                  name="data"
                  className="w-100"
                  type="text"
                  as="textarea"
                  placeholder="Enter data"
                  value={data}
                  onChange={onDataHandler}
                />
              )}
            </Form.Group>
            <Button className="my-2" variant="primary" type="submit">
              Save
            </Button>
          </Form>
          {fragmentSaved && clicked ? (
            <div>
              Owner ID: {fragmentSaved.ownerId.slice(0, 8)}
              <br />
              ID: {fragmentSaved.id}
              <br />
              Created: {fragmentSaved.created}
              <br />
              Updated: {fragmentSaved.updated}
              <br />
              Size: {fragmentSaved.size}
              <br />
              Type: {fragmentSaved.type}
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Delete fragment</h2>
          <Form onSubmit={deleteSubmitHandler}>
            <Form.Group>
              <Form.Control
                name="id"
                className="w-100 mt-2"
                type="text"
                placeholder="Enter ID"
                value={id}
                onChange={onDataHandler}
              />
            </Form.Group>
            <Button className="my-2" variant="primary" type="submit">
              Delete
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col></Col>
        <Col>
          <Toast
            onClose={() => setToast(false)}
            show={toast}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Fragment</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
