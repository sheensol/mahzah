import React from 'react';
import ExitIcon from './ExitIcon';
import IconButton from './IconButton';
import SimpleBar from 'simplebar-react';

export default function Modal(props) {
    const { open, onClose, title, buttons, mWidthClassName = '' } = props;
    if (!open) {
        return <></>;
    }
    return (
      <>
        <div className={`modal fade ${open ? ' show' : ''}`} aria-hidden="true" style={{ display: (open ? "block" : "none") }}>
            <div className={`modal-dialog modal-dialog-centered ${mWidthClassName}`}>
                <div className="modal-content border-2">
                    <div className="modal-header">
                        <h2 className="fw-bolder">{title}</h2>
                        <IconButton onClick={() => onClose()}>
                            <ExitIcon />
                        </IconButton>
                    </div>
                    <div className="modal-body">
                        <SimpleBar style={{ maxHeight: 400 }}>
                            <div className="p-10">
                                {props.children}
                            </div>
                        </SimpleBar>
                    </div>
                    {buttons && (<div className="modal-footer">
                        {buttons}
                    </div>)}
                </div>
            </div>
            {/* <div onClick={() => onClose()}
                className="fixed inset-0 z-10 bg-black opacity-25"
            ></div> */}
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black" id="modal-id-backdrop"></div>
      </>
    );
}
