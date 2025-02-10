import { useState } from "react";
import "./style.css";

interface ModalProps {
  onClose: () => void;
  onSubmit: (type: string, name: string) => void;
}

const Modal = ({ onClose, onSubmit }: ModalProps) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(type, name);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Добавить узел</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-group">
            <label className="modal__label">Тип</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="modal__input"
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__label">Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="modal__input"
            />
          </div>
          <div className="modal__actions">
            <button
              className="modal__actions__button modal__actions__button--cancel"
              type="button"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              className="modal__actions__button modal__actions__button--submit"
              type="submit"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
