import React from 'react';
import './guess-button.scss';

interface GuessButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const GuessButton = ({ label, onClick }: GuessButtonProps) => {
    return <button className='guess-button' onClick={onClick}>{label}</button>;
};