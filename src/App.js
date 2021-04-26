import React from "react";
import shortid from "shortid";
import PropTypes from "prop-types";

import Form from "./FormContacts/Form";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };
  duplicateSearch = (data) => {
    const { name } = data;
    const arrNames = [];
    const lowerCase= name.toLowerCase();

    this.state.contacts.map((el) => arrNames.push(el.name.toLowerCase()));
    if (!arrNames.includes(lowerCase)) {
      this.addToLibrary(data);
    } else alert(`${name} is alredy in contacts`);
  };

  addToLibrary = (data) => {
    const { name, number } = data;

    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.setState(({ contacts }) => {
      return {
        contacts: [contact, ...contacts],
      };
    });
  };
  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteById = (id) => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter((contact) => contact.id !== id),
      };
    });
  };
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <Form
          duplicateSearch={this.duplicateSearch}
          addToLibrary={this.addToLibrary}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts
          libraryContacts={visibleContacts}
          onDelete={this.deleteById}
        />
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.array,
    filter: PropTypes.string,
  }),

  changeFilter: PropTypes.func,
  getVisibleContacts: PropTypes.func,
  deleteById: PropTypes.func,
  addToLibrary: PropTypes.func,
  duplicateSearch:PropTypes.func,
};

export default App;
