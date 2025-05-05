import React, { useState } from 'react';
import "../sideBar/module.sideBar.css";

export default function SideBar() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Clark", image: "./images/imag1.jpg", balance: -7 },
    { id: 2, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20 },
    { id: 3, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0 }
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("You");
  const [newFriend, setNewFriend] = useState({ name: "", image: "https://i.pravatar.cc/48" });

  const handleSelect = (friend) => {
    setSelectedFriend(prev => (prev?.id === friend.id ? null : friend));
  };

  const handleAddFriend = () => {
    if (!newFriend.name) return;
    setFriends([...friends, { ...newFriend, id: Date.now(), balance: 0 }]);
    setNewFriend({ name: "", image: "https://i.pravatar.cc/48" });
    setShowAddForm(false);
  };

  const handleSplitBill = () => {
    const updatedFriends = friends.map(friend => {
      if (friend.id === selectedFriend.id) {
        const paidByYou = payer === "You";
        const friendExpense = billValue - yourExpense;

        const updatedBalance = paidByYou
          ? friend.balance + friendExpense
          : friend.balance - yourExpense;

        return { ...friend, balance: updatedBalance };
      }
      return friend;
    });

    setFriends(updatedFriends);
    setSelectedFriend(null);
    setBillValue("");
    setYourExpense(0);
    setPayer("You");
  };

  return (
    <>
      <ul className="d-flex flex-column gap-3">
        {friends.map(friend => (
          <li key={friend.id} className="friendName d-flex flex-row p-3 justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <img className="w-20 h-20 rounded-circle" src={friend.image} alt={friend.name} />
              <div className="d-flex flex-column gap-2">
                <h3 className="fw-bold fs-5 m-0">{friend.name}</h3>
                <p className="m-0" style={{ color: friend.balance < 0 ? "red" : friend.balance > 0 ? "green" : "black" }}>
                  {friend.balance < 0
                    ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
                    : friend.balance > 0
                      ? `${friend.name} owes you ${friend.balance}$`
                      : `You and ${friend.name} are even`}
                </p>
              </div>
            </div>
            <div>
              <button className="selectbtn rounded py-1 px-3 border-0" onClick={() => handleSelect(friend)}>
                {selectedFriend?.id === friend.id ? 'Close' : 'Select'}
              </button>
            </div>
          </li>
        ))}

        {!showAddForm && (
          <div className="d-flex justify-content-end mt-3 w-100">
            <button
              className="btn"
              style={{
                backgroundColor: "#FFA94D",
                color: "#343a40",
                padding: "6px 16px",
                borderRadius: "6px",
                fontWeight: "500"
              }}
              onClick={() => setShowAddForm(true)}
            >
              Add friend
            </button>
          </div>
        )}

        {showAddForm && (
          <li className="d-flex flex-column align-items-start w-100">
            <div className="addForm p-4 mb-2 w-100" style={{ minWidth: "300px" }}>
              <div className="mb-3 d-flex align-items-center gap-2">
                <span>👫</span>
                <label className="me-2 m-0" style={{ minWidth: "100px" }}>Friend name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newFriend.name}
                  onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                />
              </div>

              <div className="mb-3 d-flex align-items-center gap-2">
                <span>🖼️</span>
                <label className="me-2 m-0" style={{ minWidth: "100px" }}>Image Url</label>
                <input
                  type="text"
                  className="form-control"
                  value={newFriend.image}
                  onChange={(e) => setNewFriend({ ...newFriend, image: e.target.value })}
                />
              </div>

              <div className="d-flex rounded justify-content-end w-100">
                <button
                  className="btn"
                  style={{ backgroundColor: "#FFA94D", color: "#343a40", width: "50%", fontWeight: "500" }}
                  onClick={handleAddFriend}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end w-100 mt-2">
              <button
                className="btn"
                style={{
                  backgroundColor: "#FFA94D",
                  color: "#343a40",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  fontWeight: "500"
                }}
                onClick={() => setShowAddForm(false)}
              >
                Close
              </button>
            </div>
          </li>
        )}
      </ul>

      {selectedFriend && (
        <div className="addForm p-4 rounded mt-4" style={{ minWidth: "300px", marginTop: "20px" }}>
          <h5 className="fw-bold mb-4">
            SPLIT A BILL WITH {selectedFriend.name.toUpperCase()}
          </h5>

          <div className="mb-3 d-flex align-items-center justify-content-between">
            <span>💵 Bill value</span>
            <input
              type="number"
              className="form-control text-center"
              style={{ width: "120px" }}
              value={billValue}
              onChange={(e) =>
                setBillValue(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          <div className="mb-3 d-flex align-items-center justify-content-between">
            <span>🧍 Your expense</span>
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
            <span>👫 {selectedFriend.name} expense</span>
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
            <span>😎 Who is paying the bill</span>
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
              className="btn"
              style={{
                backgroundColor: "#FFA94D",
                color: "#343a40",
                padding: "6px 16px",
                borderRadius: "6px",
                width: "120px",
                fontWeight: "500"
              }}
              onClick={handleSplitBill}
            >
              Split bill
            </button>
          </div>
        </div>
      )}
    </>
  );
}
