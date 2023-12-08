import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { shoppingLists } from '../data/shopListsData';
import UserService from '../services/userService';
import '../styles/Home.css';

import { useContext } from 'react';
import { ThemeContext } from '../context/Theme';
import { useLanguage } from '../context/LanguageContext';


function Home() {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  const [initialLists, setInitialLists] = useState(shoppingLists);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [confirmDeleteList, setConfirmDeleteList] = useState(null);
  const [showActive, setShowActive] = useState(true);

  const { translate } = useLanguage();


  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewListName('');
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const archiveList = (listId) => {
    return
  };

  const isIdUnique = (id) => {
    return !initialLists.some((list) => list.id === id);
  };

  const createNewList = () => {
    if (newListName.trim() !== '') {
      let newId;
      do {
        newId = generateRandomId();
      } while (!isIdUnique(newId));

      const newList = {
        id: newId,
        name: newListName,
        archived: false,
        ownerId: currentUser.id,
      };

      setInitialLists([...initialLists, newList]);
      closeAddModal();
    }
  };

  const openDeleteConfirmation = (listId) => {
    setConfirmDeleteList(listId);
  };

  const confirmDelete = async () => {
    if (confirmDeleteList !== null) {
      const listToDelete = initialLists.find((list) => list.id === confirmDeleteList);
      console.log('currentUser', currentUser.id);
      console.log('listToDetele.ownerId', listToDelete.ownerId);
      if (listToDelete.ownerId === currentUser.id) {
        const updatedLists = initialLists.filter((list) => list.id !== confirmDeleteList);
        setInitialLists(updatedLists);
        setConfirmDeleteList(null);
      }
    }
  };

  const filteredLists = showActive ? initialLists.filter((list) => !list.archived) : initialLists;

  return (
    <div className={`container ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <h1 className="mt-1">{translate('shoppingLists')}</h1>

      <div className="home-buttons mb-2">
        <div className="filter-buttons">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={() => setShowActive(false)}
            disabled={!showActive}
          >
            {translate('showAll')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowActive(true)}
            disabled={showActive}
          >
            {translate('hideArchive')}
          </Button>
        </div>
        <Button variant="primary" className="ml-2" onClick={openAddModal}>
          {translate('create')}
        </Button>
      </div>

      <div className="row">
        {filteredLists.map((list) => (
          <div key={list.id} className="col-md-3">
            <div className={`card mb-4 ${list.archived ? 'border-success' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{list.name}</h5>
                <p className="card-userId">
                  {translate('ownedByUser')} {list.ownerId}
                </p>
                <div className="card-links">
                  <Link to={`/listdetail/${list.id}`} className="btn btn-primary">
                    {translate('viewList')}
                  </Link>
                  {list.ownerId === currentUser.id && (
                    <div className="card-buttons">
                      <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => openDeleteConfirmation(list.id)}
                      >
                        {translate('deleteList')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{translate('createList')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder={translate('createList')}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            {translate('close')}
          </Button>
          <Button variant="primary" onClick={createNewList}>
            {translate('create')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmDeleteList !== null} onHide={() => setConfirmDeleteList(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{translate('confirmDelete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{translate('confirmDelete')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteList(null)}>
            {translate('cancel')}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {translate('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
