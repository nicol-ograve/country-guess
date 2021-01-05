import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { GuessButton } from '../buttons/guess-button';

import './flag-guess-input.scss';

interface FlagGuessProps {
    countryCodes: string[];
}


const EmptyFlag = () => {
    return <span className='empty-flag'>?</span>;
};


export const FlagGuess = ({ countryCodes }: FlagGuessProps) => {
    const [selectedFlagCountryCode, setSelectedFlag] = useState('');
    const [isPickerShown, setShowPicker] = useState(false);

    const guess = useCallback(() => { }, []);
    const showPicker = useCallback(() => { setShowPicker(true); }, []);
    const closePicker = useCallback(() => { setShowPicker(false); }, []);

    const onFlagPicked = useCallback((code: string) => {
        setSelectedFlag(code);
        setShowPicker(false);
    }, []);

    return <div className='flag-guess guess-box'>
        <span className='guess-title'>Flag</span>
        <div className='flag-image' onClick={showPicker}>
            {selectedFlagCountryCode ?
                <svg className="flag-icon">
                    <use href={'#' + selectedFlagCountryCode} />
                </svg> : <EmptyFlag />}
        </div>
        <GuessButton onClick={guess} label='Guess' />
        <FlagPickerDialog
            open={isPickerShown}
            countryCodes={countryCodes}
            onFlagPicked={onFlagPicked}
            onDelete={closePicker} />
    </div>;
};

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