// src/components/Registration.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone must be exactly 10 digits (numbers only)");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        createdAt: serverTimestamp() // use server time
      });

      console.log("Document written with ID: ", docRef.id);
      setSuccess(true);
      // clear form
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Error submitting form. Check console for details.");
    } finally {
      setIsSubmitting(false);
      // hide success message after a short while (optional)
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          Registration successful!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="At least 3 characters"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            placeholder="10 digits"
            maxLength={10}
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Registration;
