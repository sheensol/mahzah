import React from 'react';
import Modal from '@/Shared/Modals/Modal';

export default function ModalWithButtons(props) {
    const { open, onClose, title, children, onConfirm, buttons, mWidthClassName="mw-700px" } = props;
    if (!open) {
        return <></>;
    }

    return (
        <Modal open={open} onClose={onClose} title={title}
            mWidthClassName={mWidthClassName}
            buttons={
                <React.Fragment>
                    <button onClick={() => onClose()} className="btn btn-light me-3">
                        Cancel
                    </button>
                    {buttons}
                </React.Fragment>
            }>
            {children}
        </Modal>
    );
}
