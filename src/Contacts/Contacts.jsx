import './Contacts.css'
import PropTypes from "prop-types";

const Contacts = ({ libraryContacts , onDelete}) => {
  return (
    <div>
      <ul className="contacts__list">
        {libraryContacts.map((el) => (
          <li className="contacts__item" key={el.id}>
            <p className="contact__name">{el.name}:
            <span className="contact__tel">{el.number}</span>
            </p>
            <button className="btn btn-delete" onClick={() => onDelete(el.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  
  onDelete: PropTypes.func,
 };
export default Contacts;
