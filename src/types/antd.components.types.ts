import React from 'react';

export interface MenuOnCLickEvent {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

export type MenuCLickHandler = (event: MenuOnCLickEvent) => void;
