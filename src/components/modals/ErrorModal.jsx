import React from 'react';
import { exact, string } from 'prop-types';
import { Modal } from '@mui/material';

const ErrorModal = ({ isOpen, handleOnClose, info }) => {
  const blockName = 'modal';

  return (
    <Modal
      open={isOpen}
      onClose={handleOnClose}
      className={`${blockName} ${blockName}--error`}
    >
      <div className={`${blockName}__content-wrapper`}>
        <i className={`${blockName}__error-icon icon-circle-error`} />
        <h2 className={`${blockName}__header`}>Wystąpił niespodziewany problem!</h2>
        <div className={`${blockName}__info`}>
          <p>{info}</p>
          <p>Za utrudnienia przepraszamy</p>
        </div>
      </div>
    </Modal>
  );
};

ErrorModal.propTypes = exact({
  info: string
}).isRequired;

export default ErrorModal;
