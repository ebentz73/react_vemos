import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import notifier from '@utils/notifier';

function Notifier() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    notifier.setNotifier(enqueueSnackbar);
  }, []);

  return null;
}

export default Notifier;
