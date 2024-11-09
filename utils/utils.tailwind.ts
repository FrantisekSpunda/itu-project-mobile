import { tailwind } from 'react-native-tailwindcss';

type TailwindClass = keyof typeof tailwind;

export const tw = (...classes: TailwindClass[]) => classes.map((cls) => tailwind[cls]);
