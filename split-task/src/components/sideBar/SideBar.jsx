import React, { useState } from 'react';
import "../sideBar/module.sideBar.css";
import AddFriend from '../addFriend/AddFriend';
import SelectBillForm from '../selectBillForm/SelectBillForm'

export default function SideBar() {
  const [friends, setFriends] = useState([
    { id: 1, name: "Clark", image: "./images/imag1.jpg", balance: -7 },
    { id: 2, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20 },
    { id: 3, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0 }
  ]);
  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("You");

  const handleSelect = (friend) => {
    setSelectedFriend(prev => (prev?.id === friend.id ? null : friend));
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
          <li key={friend.id} className={`friendName d-flex flex-row p-3 justify-content-between align-items-center gap-3 ${selectedFriend?.id === friend.id ? 'selected' : ''}`}>
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

        <AddFriend friends={friends} setFriends={setFriends} />
      </ul>

      {selectedFriend && (
       <SelectBillForm 
       selectedFriend={selectedFriend}
       billValue={billValue}
       setBillValue={setBillValue}
       yourExpense={yourExpense}
       setYourExpense={setYourExpense}
       payer={payer}
       setPayer={setPayer}
       handleSplitBill={handleSplitBill}
       />
      )}
    </>
  );
}
