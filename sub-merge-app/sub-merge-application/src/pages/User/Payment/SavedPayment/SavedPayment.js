import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./SavedPayment.css";
export default function SavedPayment() {
  const paymentMethod = [
    { id: 1, name: "Visa", lastFour: "4019", date: "12/20", default: true },
    {
      id: 2,
      name: "MasterCard",
      lastFour: "1234",
      date: "12/20",
      default: false,
    },
    {
      id: 3,
      name: "Discover",
      lastFour: "1234",
      date: "12/20",
      default: false,
    },
  ];

  const [savedPayments, setSavedPayments] = useState(paymentMethod);

  const deletePaymentHanlder = (id) => {
    return (event) => {
      const newList = savedPayments.filter((item) => item.id !== id);
      setSavedPayments(newList);
    };
  };

  const setDefaultHandler = (id) => {
    return (event) => {
      setSavedPayments((prevPayments) => {
        let newPayments = prevPayments.map((payment) => {
          payment.default = payment.id === id ? true : false;
          return payment;
        });
        return newPayments;
      });
    };
  };

  return (
    <div className="PaymentMethodCardContainer">
      {savedPayments.map((payment) => (
        <div key={payment.id} className="PaymentMethodCard">
          <div key={payment.id} className="CardItemContainer">
            <div className="CardItemIcon">
              <img
                src="https://cdn.icon-icons.com/icons2/1259/PNG/512/1495815261-jd08_84586.png"
                alt=""
              ></img>
            </div>

            <div className="CardItemInfo">
              <span className="CardNumber">
                <span className="TextPrimary">{payment.lastFour}</span>
              </span>
              <span className="CardExpire">
                <span className="TextSecondary">Expires {payment.date}</span>
              </span>
            </div>

            <div style={{ gridArea: "3 / 2 / auto / auto" }}></div>
            {payment.default ? (
              <div className="DefaultCardContainer">
                <span>
                  <div>
                    <DoneSharpIcon id="icon" />
                    <span className="TextPrimary"> Default</span>
                  </div>
                </span>
              </div>
            ) : null}
            <div className="DeleteCardContainer">
              <div style={{ display: "inline-flex" }}>
                <DropdownButton id="dropdown-basic-button" title="...">
                  <Dropdown.Item onClick={setDefaultHandler(payment.id)}>
                    Set Default
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <div onClick={deletePaymentHanlder(payment.id)}>Delete</div>
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
