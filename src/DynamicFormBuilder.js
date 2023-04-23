import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import {ref, set} from 'firebase/database';
import { getDatabase } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import 'firebase/compat/database';

firebase.initializeApp(firebaseConfig);

const DynamicFormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [labelValue, setLabelValue] = useState('');
  const [inputType, setInputType] = useState('text');
  const database = getDatabase();
  const dbRef = ref(database, 'fields');

  useEffect(() => {
    const formFieldsRef = firebase.database().ref('formFields');
    formFieldsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formFieldsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        }));
        setFormFields(formFieldsArray);
      }
    });
  }, []);

  const handleLabelChange = (event) => {
    setLabelValue(event.target.value);
  };

  const handleTypeChange = (event) => {
    setInputType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newField = {
      label: labelValue,
      type: inputType
    };
    const formFieldsRef = firebase.database().ref('formFields');
    formFieldsRef.push(newField)
      .then(() => {
        setLabelValue('');
        setInputType('text');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const renderInput = (field) => {
    const handleDelete = () => {
      const formFieldsRef = firebase.database().ref('formFields');
      formFieldsRef.child(field.id).remove()
        .catch((error) => {
          console.error(error);
        });
    };
  
    if (field.type === 'textarea') {
      return (
        <div className="mb-3" key={field.label}>
          <label className="form-label">{field.label}</label>
          <textarea className="form-control" />
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      );
    } else if (field.type === 'submit') {
      return (
        <button className="btn btn-success" type="submit" key={field.label}>
          {field.label}
        </button>
      );
    } else {
      return (
        <div className="mb-3" key={field.label}>
          <label className="form-label">{field.label}</label>
          <input type={field.type} className="form-control" />
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      );
    }
  };
  

  return (
    <div className="form-container">
      <h1>Dynamic Form Builder</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="labelValue">
            Label
          </label>
          <input
            type="text"
            className="form-control"
            id="labelValue"
            value={labelValue}
            onChange={handleLabelChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="inputType">
            Input Type
          </label>
          <select
            className="form-control"
            id="inputType"
            value={inputType}
            onChange={handleTypeChange}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">Phone</option>
            <option value="textarea">Textarea</option>
            <option value="submit">Submit Button</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Add Field
        </button>
      </form>
      {formFields.map((field) => renderInput(field))}
    </div>
  );
};

export default DynamicFormBuilder;
