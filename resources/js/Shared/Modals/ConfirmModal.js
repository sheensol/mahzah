import React from 'react';
import Modal from '@/Shared/Modals/Modal';

export default function ConfirmModal(props) {
    const { open, onClose, onConfirm, onReject, title, children } = props;

    if (!open) {
        return <></>;
    }

    let onClickNo = () => {
        onClose();

        if (typeof onReject !== "undefined") {
            onReject();
        }
    }

    let onClickYes = () => {
        onClose();

        if (typeof onConfirm !== "undefined") {
            onConfirm();
        }
    }

    return (
        <Modal open={open} onClose={onClose} title={title}
            mWidthClassName="mw-550px"
            buttons={
                <React.Fragment>
                    <button
                        onClick={onClickNo}
                        className="btn btn-light"
                    >
                        No
                    </button>
                    <button
                        onClick={onClickYes}
                        className="btn btn-primary">
                        Yes
                    </button>
                </React.Fragment>
            }>
            {children}
        </Modal>
    );
}
