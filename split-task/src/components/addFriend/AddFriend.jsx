import React, { useState } from 'react';
import "../addFriend/module.addFriend.css";

export default function AddFriend({ friends, setFriends }) {


  const [showAddForm, setShowAddForm] = useState(false);
  const [newFriend, setNewFriend] = useState({ name: "", image: "https://i.pravatar.cc/48" });

  const handleAddFriend = () => {
    if (!newFriend.name) return;
    setFriends([...friends, { ...newFriend, id: Date.now(), balance: 0 }]);
    setNewFriend({ name: "", image: "https://i.pravatar.cc/48" });
    setShowAddForm(false);
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">

      {!showAddForm && (
        <div className="mt-3 w-100 d-flex justify-content-end">
          <button
            className="btnAddForm"
            onClick={() => setShowAddForm(true)}
          >
            Add friend
          </button>
        </div>
      )}

      {showAddForm && (
        <>
          <div className="addForm mt-4">
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
              <label className="me-2 m-0" style={{ minWidth: "100px" }}>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={newFriend.image}
                onChange={(e) => setNewFriend({ ...newFriend, image: e.target.value })}
              />
            </div>

            <div className="d-flex justify-content-end w-100 mt-4">
              <button className="btnAddForm w-50" onClick={handleAddFriend}>
                Add
              </button>
            </div>
          </div>

          <div className=" d-flex justify-content-end w-100 mt-2">
            <button className="btnAddForm" onClick={() => setShowAddForm(false)}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
