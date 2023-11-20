import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface IButtonProps {
 canSubmit: boolean;
 onSubmit: () => void;
 onDeselectAll: () => void;
}

export default function Buttons(props: IButtonProps) {
    const { canSubmit, onSubmit, onDeselectAll } = props;
    return (
        <Stack direction="row" spacing={2} sx={{marginTop: 5, display:"flex", justifyContent:"center"}}>
        <Button variant="outlined" sx={{fontSize: 11}} onClick={onDeselectAll}>Deselect All</Button>
        <Button variant="outlined" sx={{fontSize: 11}} disabled={!canSubmit} onClick={onSubmit}>
            Submit
        </Button>
        </Stack>
    );
}
