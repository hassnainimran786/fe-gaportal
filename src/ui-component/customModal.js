import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};
CustomModal.propTypes = {
  children: PropTypes.node
};

function CustomModal(props) {
  return (
    <Modal {...props}>
      <Box sx={style}>{props.children}</Box>
    </Modal>
  );
}

export default CustomModal;
