import produce from 'immer';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast, ToastBar, Toaster, ToastOptions } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';
import { RiErrorWarningLine } from 'react-icons/ri';

const topPosition = 'top-center';
const toastClassname = 'w-[375px] [&>div]:justify-start';

export default function DismissableToast() {
  const router = useRouter();
  /**
   * ? This allows to show a toast via query params
   * * toast_type success, error, or none: default
   * * toast_message (required) the message to show
   */
  React.useEffect(() => {
    const toast_type = router.query.toast_type;
    const toast_message = router.query.toast_message;

    if (typeof toast_message === 'string') {
      if (toast_type === 'success') {
        toast.success(toast_message as string);
      } else if (toast_type === 'error') {
        toast.error(toast_message as string);
      } else {
        toast(toast_message as string);
      }

      const cleanedQuery = produce(router.query, (draft) => {
        delete draft.toast_type;
        delete draft.toast_message;
      });
      router.replace({ query: cleanedQuery }, undefined, { shallow: true });
    }
  }, [router, router.query]);

  return (
    <div>
      <Toaster
        reverseOrder={false}
        position={topPosition}
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#E8F0E0',
            color: '#8AB364',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='rounded-full p-1 ring-primary-400 transition hover:bg-[#444] focus:outline-none focus-visible:ring'
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <HiX />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

const DEFAULT_TOAST: ToastOptions = {
  style: {
    background: '#F0F2F5',
    color: '#9AA2B1',
  },
  icon: <RiErrorWarningLine />,
  className: toastClassname,
  position: topPosition,
  duration: 5000,
};

const createCustomToast = (options: ToastOptions) => {
  return { ...DEFAULT_TOAST, ...options };
};

const showToast = (message: string, options?: ToastOptions) => {
  return toast(message, options || DEFAULT_TOAST);
};

export { createCustomToast, showToast };

const SUCCESS_TOAST = createCustomToast({
  style: {
    background: '#E8F0E0',
    color: '#8AB364',
  },
  icon: <RiErrorWarningLine size={30} />,
  className: toastClassname,
  position: topPosition,
  duration: 5000,
});
const DANGER_TOAST = createCustomToast({
  style: {
    background: '#F7DBDB',
    color: '#D84A4D',
  },
  icon: <RiErrorWarningLine size={30} />,
  className: toastClassname,
  position: topPosition,
  duration: 5000,
});

const WARNING_TOAST = createCustomToast({
  style: {
    background: '#FFEFCC',
    color: '#FEB100',
  },
  icon: <RiErrorWarningLine size={30} />,
  className: toastClassname,
  position: topPosition,
  duration: 5000,
});

export { DANGER_TOAST, SUCCESS_TOAST, WARNING_TOAST };
