import React, { useState, useEffect } from 'react';
import '../styles/ListDetail.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { shoppingLists } from '../data/shopListsData';
import itemList from '../data/itemList';
import UserService from '../services/userService';

import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';


const ListDetail = () => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const selectedList = shoppingLists.find((list) => list.id === parseInt(listId, 10));
  const selectedListOwner = selectedList ? selectedList.ownerId : null;
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [listName, setListName] = useState(() => selectedList.name);
  const [selectedFood, setSelectedFood] = useState('');
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [members, setMembers] = useState(() => selectedList.members);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState(() => selectedList.name);

  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const initialItemsData = itemList.map((item, index) => ({ id: index + 1, ...item }));
  const selectedItemsData = selectedList.itemsList.map((itemId) => {
    const selectedItem = initialItemsData.find((item) => item.id === itemId);
    return selectedItem ? { id: itemId, ...selectedItem } : null;
  }).filter((item) => item !== null);

  const [items, setItems] = useState([...selectedItemsData]);

  useEffect(() => {
    if (!selectedList) {
      navigate('/');
    }
  }, [selectedList, navigate]);

  const addItem = () => {
    if (selectedFood && !items.some((item) => item.name === selectedFood)) {
      const newItem = {
        id: items.length + 1,
        name: selectedFood,
        quantity: foodQuantity,
        completed: false,
      };
      setItems([...items, newItem]);
      setSelectedFood('');
    } 
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const toggleItemCompletion = (itemId) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.completed = !itemToUpdate.completed;
      setItems(updatedItems);
    }
  };

  const addMember = (memberName) => {
    const newMember = {
      id: members.length + 1,
      name: memberName,
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (memberId) => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    setMembers(updatedMembers);
  };

  const leaveList = () => {
    navigate('/');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmNameChange = () => {
    if (newListName.trim() !== '') {
      setListName(newListName);
      closeModal();
    }
  };

  const filterItems = (item) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'uncompleted') return !item.completed;
  };

  return (
    <div className="container">
      <div className="shoplist-header">
        <h1 className="mt-2">
          {listName}
        </h1>
        <div className="mt-4">
          {currentUser.id !== selectedListOwner && (
            <button className="btn btn-danger" onClick={leaveList}>
              Leave List
            </button>
          )}
        </div>
        {currentUser.id === selectedListOwner && (
          <div className="change-name col-md-4 col-sm-6">
            <button className="btn btn-primary btn-block" onClick={openModal}>
              Change List Name
            </button>

            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Change List Name</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label>New List Name: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new list name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmNameChange}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}

      </div>

      <section className="section-item">


        <div className="sec1">
          <div className="row mb-2">
            <div className="col-md-4 col-sm-6">
              <label>Item: </label>
              <select
                className="form-control select-food"
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
              >
                <option value="">Select item</option>
                {itemList.map((food, index) => (
                  <option key={index} value={food.name}>
                    {food.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 col-sm-3">
              <label>Quantity: </label>
              <input
                type="number"
                className="form-control input-quantity"
                value={foodQuantity}
                onChange={(e) => setFoodQuantity(parseInt(e.target.value))}
                min="1"
                max="99"
              />
            </div>
            <div className="col-md-2 col-sm-3">
              <button className="btn btn-primary btn-block" onClick={addItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label>Filter: </label>
          <select className="form-controlstate" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
        <ul className="list-group">
          {items.filter(filterItems).map((item) => (
            <li key={item.id} className={`list-group-item ${item.completed ? 'list-group-item-success' : ''}`}>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.completed}
                  onChange={() => toggleItemCompletion(item.id)}
                />
                <label className="form-check-label">
                  {item.quantity}x {item.name}
                </label>
              </div>
              <div className="float-right">
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {currentUser.id === selectedListOwner && (
        <div className="mt-3">
          <p>Users: </p>
          <div className="row">

            <div className="col-md-2 col-sm-3">
              <button className="btn btn-primary mt-2" onClick={() => addMember('New Member')}>
                Add Member
              </button>
            </div>
          </div>
          <div className="uslist">
            <ul className="list-group" id="members-list">
              {members.map((member) => (
                <li key={member.id} className="list-group-item" id="members-list-item">
                  {member.name}
                  <button className="btn btn-danger btn-sm" onClick={() => removeMember(member.id)}>
                    Remove Member
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {currentUser.id !== selectedListOwner && (
        <>
          <p>Users: </p>
          <div
            className="uslist">
            <ul className="list-group" id="members-list">
              {members.map((member) => (
                <li key={member.id} className="list-group-item" id="members-list-item">
                  {member.name}
                </li>
              ))}
            </ul>
          </div></>
      )}

    </div>
  );
};

export default ListDetail;
