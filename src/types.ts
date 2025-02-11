export interface NodeProps {
  id?: number;
  name?: string;
  type?: string;
  data?: string;
  children?: NodeProps[];
  city?: string;
}

export interface TypeOrderProps {
  _id: string;
  order: number;
  type: string;
  __v?: number;
}

export interface Option {
  [key: string]: any;
}

export interface BaseModalProps {
  onClose: () => void;
  title?: string;
  dropdownOptions?: Option[];
  dropdownLabel: string;
  dropdownValueKey?: string;
  dropdownLabelKey?: string;
}