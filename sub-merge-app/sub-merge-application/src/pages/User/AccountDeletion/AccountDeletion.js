import { useState } from "react";
import "./AccountDeletion.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

function ConfirmDialogModal(props) {
  let navigate = useNavigate();
  let { enqueueSnackbar } = useSnackbar();
  const requestHandler = () => {
    axios
      .delete(
        process.env.REACT_APP_SUBMERGE_API_ENDPOINT +
          "api/user/delete/" +
          localStorage.getItem("id"),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/");
        window.location.reload(false);
      })
      .catch((err) => {
        enqueueSnackbar(
          "Account deletion could not be completed, please try again later.",
          {
            variant: "error",
          }
        );
        console.log(err.response);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Account Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="confirmText">
          Protecting your privacy and the security of your data is and has
          always been a top priority for Sub-Merge. We received a request for
          your account to be closed and your information deleted. If you submit
          this request and would like to proceed, please click the
          <strong>
            <big> Delete Account </big>
          </strong>
          button below.
        </p>
        <p>Once we receive your confirmation, we will process your request.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={requestHandler} className="actionBtn">
          Delete Account
        </Button>
        <Button onClick={props.onHide} className="actionBtn">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AccountDeletion() {
  const formSubmitHandler = () => {};

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="formContainer">
      <form onSubmit={formSubmitHandler}>
        <section className="warningSection">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5501/5501160.png"
            alt="Hazard Icon"
          ></img>
          <div className="warningMessage">
            <h4>Account Closure Is A Permanent Action</h4>
            <p>
              Please note account closure is a permanent action and once your
              account is closed it will no longer be available to you and cannot
              be restored. If you decide later that you would like to use our
              products and services that require an account, you will need to
              create a new account.
            </p>
          </div>
        </section>
        <section className="deleteActions">
          <Button className="deleteBtn" onClick={() => setModalShow(true)}>
            Delete Account
          </Button>
        </section>
      </form>

      <ConfirmDialogModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
