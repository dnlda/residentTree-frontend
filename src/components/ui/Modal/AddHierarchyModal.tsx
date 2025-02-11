import { useState } from "react";
import "./style.css";

interface Option {
  type: string;
  order: number;
}

interface AddHierarchyTypeModalProps {
  onClose: () => void;
  onSubmit: (name: string, order: number) => void;
  dropdownOptions: Option[];
}

const AddHierarchyTypeModal = ({
  onClose,
  onSubmit,
  dropdownOptions,
}: AddHierarchyTypeModalProps) => {
  const [selectedOption, setSelectedOption] = useState(dropdownOptions[0]);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, selectedOption.order + 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    const selected = dropdownOptions.find(
      (option) => option.type === selectedType
    );
    if (selected) {
      setSelectedOption(selected);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal__title">Создание нового типа узла</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <div className="modal__form-group">
            <label className="modal__label">Родитель</label>
            <select
              value={selectedOption.type}
              onChange={handleSelectChange}
              required
              className="modal__input"
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option.type}>
                  {option.type}
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

export default AddHierarchyTypeModal;
