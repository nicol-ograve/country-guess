import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { FlagGuess } from '../../store/models/flag-guess';
import { GuessButton } from '../buttons/guess-button';

import './flag-guess-input.scss';

interface FlagGuessInputProps {
    countryCodes: string[];
    flagGuess: FlagGuess;
}


const EmptyFlag = () => {
    return <span className='empty-flag'>?</span>;
};


export const FlagGuessInput = observer(({ countryCodes, flagGuess }: FlagGuessInputProps) => {
    const [isPickerShown, setShowPicker] = useState(false);

    const { selectedFlagCode, isGuessed, isFailed, selectFlag } = flagGuess;

    const guess = useCallback(() => { flagGuess.guess(); }, []);
    const showPicker = useCallback(() => { setShowPicker(true); }, [setShowPicker]);
    const closePicker = useCallback(() => { setShowPicker(false); }, [setShowPicker]);

    const onFlagPicked = useCallback((code: string) => {
        selectFlag(code);
        setShowPicker(false);
    }, [selectFlag, setShowPicker]);

    return <div className={`flag-guess guess-box${isGuessed ? ' guessed' : ''}${isFailed ? ' failed' : ''}`}>
        <span className='guess-title'>Flag</span>
        <div className='flag-image' onClick={showPicker}>
            {selectedFlagCode ?
                <svg className="flag-icon">
                    <use href={'#' + selectedFlagCode} />
                </svg> : <EmptyFlag />}
        </div>
        <GuessButton onClick={guess} label='Guess' />
        <FlagPickerDialog
            open={isPickerShown}
            countryCodes={countryCodes}
            onFlagPicked={onFlagPicked}
            onDelete={closePicker} />
    </div>;
});

interface FlagPickerDialogProps {
    open: boolean;
    countryCodes: string[];
    onFlagPicked: (code: string) => void;
    onDelete: () => void;
}

const FlagPickerDialog = ({ open, countryCodes, onFlagPicked, onDelete }: FlagPickerDialogProps) => {
    const pickFlag = useCallback((code) => () => {
        onFlagPicked(code); // TODO memoize
    }, []);
    return <Dialog open={open}>
        <DialogContent>
            <div className='flag-picker-content'>
                {countryCodes.map(code => <svg key={code} className="flag-icon" onClick={pickFlag(code)}>
                    <use href={'#' + code} />
                </svg>)}
            </div>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onDelete}>
                Delete
          </Button>
        </DialogActions>
    </Dialog>;
};