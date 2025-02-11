import { useState } from "react";
import "./style.css";

interface Option {
  [key: string]: any;
}

interface ModalProps {
  onClose: () => void;
  onSubmit: (type: any, name: string) => void;
  title?: string;
  dropdownOptions: Option[];
  dropdownLabel: string;
  dropdownValueKey?: string;
  dropdownLabelKey?: string;
}

const Modal = ({
  onClose,
  onSubmit,
  dropdownOptions,
  dropdownLabel,
  title,
  dropdownValueKey = "value",
  dropdownLabelKey = "label",
}: ModalProps) => {
  const [selectedOption, setSelectedOption] = useState(
    dropdownOptions[0][dropdownValueKey]
  );
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedOption, name);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {title && <h2 className="modal__title">{title}</h2>}
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-group">
            <label className="modal__label">{dropdownLabel}</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
              className="modal__input"
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option[dropdownValueKey]}>
                  {option[dropdownLabelKey]}
                </option>
              ))}
            </select>
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
