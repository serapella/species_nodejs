import React, { useState, FormEvent } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  hairColor: string;
  height: string;
  gender: string;
};

export const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    hairColor: "#000000",
    height: "",
    gender: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email");
    }
  };

  return (
    <div
      className="card"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <h2 className="card-title">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", id: "firstName", type: "text" },
          { label: "Last Name", id: "lastName", type: "text" },
          { label: "Birth Date", id: "birthDate", type: "date" },
          { label: "Height (cm)", id: "height", type: "number" },
        ].map(({ label, id, type }) => (
          <div className="form-group" key={id}>
            <label htmlFor={id}>{label}:</label>
            <input
              type={type}
              id={id}
              value={formData[id as keyof FormData]}
              onChange={(e) =>
                setFormData({ ...formData, [id]: e.target.value })
              }
              required
            />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="hairColor">Hair Color:</label>
          <input
            type="color"
            id="hairColor"
            value={formData.hairColor}
            onChange={(e) =>
              setFormData({ ...formData, hairColor: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          {["Male", "Female", "X"].map((gender) => (
            <label key={gender}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              {gender}
            </label>
          ))}
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};
