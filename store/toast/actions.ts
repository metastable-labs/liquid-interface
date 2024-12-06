import { useDispatch } from 'react-redux';
import { hideToast, showToast } from './index';
import { Toast } from './types';

export function useToastActions() {
  const dispatch = useDispatch();

  const showToastAction = ({ title, description, variant }: Toast) => {
    dispatch(showToast({ title, description, variant }));

    setTimeout(() => {
      dispatch(hideToast());
    }, 4000);
  };

  const hideToastAction = () => {
    dispatch(hideToast());
  };

  return {
    showToast: showToastAction,
    hideToast: hideToastAction,
  };
}
