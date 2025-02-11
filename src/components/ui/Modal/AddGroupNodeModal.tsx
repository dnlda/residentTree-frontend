import { useState } from "react";
import "./style.css";

interface AddGroupNodeModalProps {
  onClose: () => void;
  onSubmit: (type: string, name: string) => void;
  dropdownOptions: string[];
}

const AddGroupNodeModal = ({
  onClose,
  onSubmit,
  dropdownOptions,
}: AddGroupNodeModalProps) => {
  const [selectedOption, setSelectedOption] = useState(
    dropdownOptions[0] || ""
  );
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedOption, name);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Создание нового узла</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-group">
            <label className="modal__label">Тип узла</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
              className="modal__input"
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
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

export default AddGroupNodeModal;
