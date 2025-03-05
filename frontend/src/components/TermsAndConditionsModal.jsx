/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  bgcolor: 'background.default',
  color: 'text.primary',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const TermsAndConditionsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="terms-and-conditions-modal"
      aria-describedby="terms-and-conditions-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>
          Terms & Conditions (Beta Version)
        </Typography>
        <Typography variant="body1">
          This website is currently under development and is in its <strong>beta phase</strong>. By using this beta version, you acknowledge and agree to the following terms:
        </Typography>
        <Typography variant="body1">
          1. <strong>Data Usage</strong> This version may collect and store certain data to improve app functionality. Your data will be handled securely and used only for development and testing purposes.
        </Typography>
        <Typography variant="body1">
          2. <strong>Limited Stability</strong> As this is a beta release, you may experience bugs, crashes, or incomplete features.
        </Typography>
        <Typography variant="body1">
          3. <strong>No Liability</strong> We are not responsible for any data loss, errors, or unintended behavior encountered while using this version.
        </Typography>
        <Typography variant="body1">
          4. <strong>Feedback & Reporting</strong> Your input is valuable! If you encounter issues, please report them to help us improve the app.
        </Typography>
        <Typography variant="body1">
          5. <strong>Voluntary Participation</strong> You can opt out of using this beta version at any time.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you willing to share your data and continue using this beta version?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsAndConditionsModal;