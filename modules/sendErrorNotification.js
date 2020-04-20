const sendErrorNotification = io => {
  io.emit('notification', {
    type: 'error'
  });
}

module.exports = sendErrorNotification;
