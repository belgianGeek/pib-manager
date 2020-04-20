const sendSuccessNotification = io => {
  io.emit('notification', {
    type: 'success'
  });
}

module.exports = sendSuccessNotification;
