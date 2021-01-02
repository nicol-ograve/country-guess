import React from 'react';

import './guess-input.scss';

interface CharToGuessProps {
    value: string;
    focused: boolean;
}
export const CharToGuess = (props: CharToGuessProps) => {
    const { focused, value } = props;

    return <span className={`char-to-guess ${focused ? ' focused-char' : ''}`}>{value || '_'} </span>;
};