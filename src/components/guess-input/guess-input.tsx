import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { WordGuess } from '../../model/word-guess';
import { CharToGuess } from './char-to-guess';

interface GuessInputProps {
    wordGuess: WordGuess;
}

export const GuessInput = observer((props: GuessInputProps) => {

    const { guessedChars, focusedCharIndex, onCharInput, onFocus, onFocusLost } = props.wordGuess;

    const containerRef = useRef(null);

    const click = useCallback(() => {
        const ref: any = containerRef?.current;
        ref?.focus();
    }, []);

    useEffect(() => {

        const onKeyDown = (params: KeyboardEvent) => {
            const key = params.key;
            if (focusedCharIndex >= 0 && key.length === 1 && key.match(/[A-zÀ-ú]/)) {
                onCharInput(params.key);

                // Clear focus when last character is inserted
                if(focusedCharIndex === guessedChars.length - 1) {
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

    return <div className='guess-input' onClick={click} ref={containerRef} onFocus={onFocus} onBlur={onFocusLost} tabIndex={-1}>
        {guessedChars.map((char, index) => <CharToGuess key={index} value={char} focused={index === focusedCharIndex} />)}
    </div>;
});