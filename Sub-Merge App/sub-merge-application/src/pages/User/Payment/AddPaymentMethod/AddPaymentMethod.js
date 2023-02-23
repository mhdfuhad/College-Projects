import { useState } from "react";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./AddPaymentMethod.css";
import PaymentForm from "../PaymentForm/PaymentForm";

export default function AddPaymentMethod() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="AddPaymentContainer">
      <span style={{ display: "block" }}>Add New Payment Method</span>
      <div className="blank"></div>
      <button
        className="PaymentMethodAddBtnContainer"
        onClick={() => setModalShow(!modalShow)}
      >
        <div style={{ size: 16 }} className="PaymentMethodAddContainer">
          <div className="PaymentMethodItem-1">
            <span className="Item1">
              <div>
                <CreditCardOutlinedIcon
                  style={{ fontSize: "40px", marginRight: "16px" }}
                />
                <span className="CreditText">Credit/Debit Card</span>
              </div>
            </span>
          </div>
          <div className="PaymentMethodItem-2">
            <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
          </div>
        </div>
      </button>
      <div className="blank"></div>
      <hr className="HorizontalBreak" />
      <button
        className="PaymentMethodAddPaypalBtnContainer"
        onClick={() => setModalShow(!modalShow)}
      >
        <div style={{ size: 16 }} className="PaymentMethodAddPaypalContainer">
          <div className="PaymentMethodItem-1">
            <span className="Item1">
              <div>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-64/paypal-4-226455.png"
                  alt=""
                  style={{ height: "40px", marginRight: "16px" }}
                ></img>
                <span className="CreditText">Paypal</span>
              </div>
            </span>
          </div>
          <div className="PaymentMethodItem-2">
            <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
          </div>
        </div>
      </button>
      <hr className="HorizontalBreak" />
      <div className="blank"></div>

      {modalShow && <PaymentForm setModalShow={setModalShow} />}
    </div>
  );
}
