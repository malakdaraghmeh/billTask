import React from "react";
import "../selectBillForm/module.selectBillForm.css"

export default function SplitBillForm({
  selectedFriend,
  billValue,
  setBillValue,
  yourExpense,
  setYourExpense,
  payer,
  setPayer,
  handleSplitBill
}) {
  return (
    <div className="formBill p-4 rounded mt-4" >
      <h5 className="fw-bold mb-4">
        SPLIT A BILL WITH {selectedFriend.name.toUpperCase()}
      </h5>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <span className="fw-medium">💵 Bill value</span>
        <input
          type="number"
          className="form-control text-center "
          style={{ width: "120px" }}
          value={billValue}
          onChange={(e) =>
            setBillValue(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <span className="fw-medium">🧍 Your expense</span>
        <input
          type="number"
          className="form-control text-center"
          style={{ width: "120px" }}
          value={yourExpense}
          onChange={(e) => {
            const val = Number(e.target.value);
            setYourExpense(val > billValue ? billValue : val);
          }}
          min="0"
          max={billValue || undefined}
        />
      </div>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <span className="fw-medium">👫 {selectedFriend.name} expense</span>
        <input
          type="number"
          className="form-control text-center"
          style={{ width: "120px" }}
          disabled
          value={
            billValue !== "" && yourExpense !== ""
              ? Math.max(0, Number(billValue) - Number(yourExpense))
              : ""
          }
        />
      </div>

      <div className="mb-3 d-flex align-items-center justify-content-between">
        <span className="fw-medium">😎 Who is paying the bill</span>
        <select
          className="form-select"
          style={{ width: "120px" }}
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        >
          <option>You</option>
          <option>{selectedFriend.name}</option>
        </select>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btnspilt"
          onClick={handleSplitBill}
        >
          Split bill
        </button>
      </div>
    </div>
  );
}
