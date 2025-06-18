import alert from './alert.twig';
import data from './alert.yml';
import './alert.css';
import './alert.js';

const settings = {
  title: 'Components/Alert',
};

export const InfoAlert = {
  name: 'InfoAlert',
  render: (args) => alert(args),
  args: {
    ...data,
  },
};

export const WarningAlert = {
  ...InfoAlert,
  name: 'Warning alert',
  args: {
    ...data,
    type: 'warning',
    dismissible: true,
  },
};

export const ErrorAlert = {
  ...InfoAlert,
  name: 'Error alert',
  args: {
    ...data,
    type: 'danger'
  },
};

export default settings;


