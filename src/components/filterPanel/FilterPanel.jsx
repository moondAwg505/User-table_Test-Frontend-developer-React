import React, { useState } from "react";

export const TableHeader = () => {
  // Функция для сброса формы
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Все",
    tel: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      name: "",
      age: "",
      gender: "Все",
      tel: "",
    });
  };

  return (
    <header>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <p>Имя</p>
          <input
            type="text"
            name="name"
            placeholder="Hanson"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Возраст</p>
          <input
            type="number"
            name="age"
            placeholder="25"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Пол</p>
          <select ame="gender" value={formData.gender} onChange={handleChange}>
            <option value="Все">Все</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
        </div>
        <div>
          <p>Телефон</p>
          <input
            type="tel"
            name="tel"
            placeholder="+881 965"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleReset}>
          Сбросить
        </button>
      </form>
    </header>
  );
};
