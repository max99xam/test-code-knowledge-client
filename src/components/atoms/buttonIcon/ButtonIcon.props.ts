import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
// import up from '../../../assets/close.svg';
// import close from '../../../assets/close.svg';
// import menu from '../../../assets/menu.svg';

import up from './close.svg';
import close from './close.svg';
import menu from './menu.svg';

export const icons = {
	up,
	close,
	menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}