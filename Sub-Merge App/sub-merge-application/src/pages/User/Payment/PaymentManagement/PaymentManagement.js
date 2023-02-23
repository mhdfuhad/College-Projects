import "./PaymentManagement.css";
import SavedPayment from "../SavedPayment/SavedPayment";
import AddPaymentMethod from "../AddPaymentMethod/AddPaymentMethod";

export default function PaymentManagement() {
  return (
    <div className="PaymentPageContainer container-fluid">
      <div className="PaymentMethodsModule">
        <div className="ChangePaymentModal">
          <div className="SavedPaymentMethodContainer">
            <div className="SavedPaymentMethods">
              <span>Saved Payment Methods</span>
              <div className="blank"></div>
            </div>
            <SavedPayment />
          </div>
          <hr className="HorizontalBreak" />
          <AddPaymentMethod />
        </div>
      </div>
    </div>
  );
}
