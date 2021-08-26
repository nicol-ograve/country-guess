import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
import WordGuess from '../../store/models/word-guess';
import { GuessButton } from '../buttons/guess-button';
import { CharToGuess } from './char-to-guess';

interface GuessInputProps {
    wordGuess: WordGuess;
}

export const GuessInput = observer((props: GuessInputProps) => {

    const { title, guessedChars, focusedCharIndex, isFailed, isGuessed,
         onCharInput, onFocus, onFocusLost, undo, guess } = props.wordGuess;

    const containerRef = useRef(null);

    const click = useCallback(() => {
        const ref: any = containerRef?.current;
        ref?.focus();
    }, []);

    const onGuess = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        guess();

        return false;

    }, [guess]);

    useEffect(() => {

        const onKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            if (key.toLowerCase() === 'backspace' && focusedCharIndex > 0 && guessedChars[focusedCharIndex - 1] !== ' ') {
                undo();
            } else if (focusedCharIndex >= 0 && key.length === 1 && key.match(/[A-zÀ-ú]/)) {
                onCharInput(event.key);

                // Clear focus when last character is inserted
                if (focusedCharIndex === guessedChars.length - 1) {
                    const ref: any = containerRef?.current;
                    ref?.blur();
                }
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [focusedCharIndex, guessedChars]);

    return <div className={`guess-input guess-box${isGuessed ? ' guessed' : ''}${isFailed ? ' failed' : ''}`} 
    onClick={click} ref={containerRef} onFocus={onFocus} onBlur={onFocusLost} tabIndex={-1}>
        <span className='guess-title'>{title}</span>
        <div className='guess-chars'>
            {guessedChars.map((char, index) => <CharToGuess key={index} value={char} focused={index === focusedCharIndex} />)}
        </div>
        <GuessButton onClick={onGuess} label={'Guess'} />
    </div>;
});