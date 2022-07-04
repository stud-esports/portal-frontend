import React from 'react';

export interface MenuOnCLickEvent {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export type MenuCLickHandler = (event: MenuOnCLickEvent) => void;

export interface FormFieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}
