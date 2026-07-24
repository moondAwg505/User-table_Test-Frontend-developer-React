import { useEffect, useRef } from "react";

export const UserModal = ({ user, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  const {
    firstName,
    lastName,
    age,
    gender,
    phone,
    email,
    height,
    weight,
    image,
    address,
  } = user;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Закрыть"
        >
          ×
        </button>

        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          className="modal-avatar"
        />

        <h2>
          {lastName} {firstName}
        </h2>

        <dl className="modal-fields">
          <div>
            <dt>Возраст</dt>
            <dd>{age}</dd>
          </div>
          <div>
            <dt>Пол</dt>
            <dd>{gender === "male" ? "мужской" : "женский"}</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>{phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Рост</dt>
            <dd>{height} см</dd>
          </div>
          <div>
            <dt>Вес</dt>
            <dd>{weight} кг</dd>
          </div>
          <div>
            <dt>Адрес</dt>
            <dd>
              {address.address}, {address.city}, {address.state}{" "}
              {address.postalCode}, {address.country}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
