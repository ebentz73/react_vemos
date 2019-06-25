import logger from '@utils/logger';

class Notifier {
  setNotifier = notify => {
    this.notify = notify;
  };

  _notify = (msg, options) => {
    if (typeof this.notify !== 'function') {
      logger.warn('Notifier is not initialized');
      return;
    }

    this.notify(msg, options);
  };

  error = (msg, options = {}) => {
    this._notify(msg, {
      ...options,
      variant: 'error'
    });
  };

  success = (msg, options = {}) => {
    this._notify(msg, {
      ...options,
      variant: 'success'
    });
  };

  info = (msg, options = {}) => {
    this._notify(msg, {
      ...options,
      variant: 'info'
    });
  };

  warn = (msg, options = {}) => {
    this._notify(msg, {
      ...options,
      variant: 'warning'
    });
  };
}

export default new Notifier();
