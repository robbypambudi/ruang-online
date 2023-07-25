import { useRouter } from 'next/navigation';
import * as React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import BaseDialog from '@/components/dialog/BaseDialog';
import DesktopNavigation from '@/components/layout/dashboard/DesktopNavigation';
import MobileNavigation from '@/components/layout/dashboard/MobileNavigation';

import useDialogStore from '@/store/useDialogStore';

type DashboardLayoutProps = {
  children?: React.ReactNode;
  className?: string;
  backUrl?: string;
  showBackButton?: boolean;
};

export default function DashboardLayout({
  children,
  className,
  backUrl,
  showBackButton = false,
}: DashboardLayoutProps) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========
  const router = useRouter();

  return (
    <>
      <div className='min-h-full'>
        {showBackButton && (
          <Button
            leftIcon={HiOutlineChevronLeft}
            className='absolute left-[300px] top-5 hidden border-0 bg-transparent ring-0 hover:bg-transparent active:bg-transparent md:flex'
            leftIconClassName='text-base-primary'
            onClick={() => (backUrl ? router.push(backUrl) : router.back())}
          >
            Back
          </Button>
        )}
        <DesktopNavigation />

        <div className='flex flex-col lg:pl-24'>
          <MobileNavigation />

          <main
            className={clsxm(
              'bg-typo-surface min-h-screen px-6 py-10 md:py-16',
              className
            )}
            tabIndex={-1}
          >
            {children}
          </main>

          <BaseDialog
            onClose={handleClose}
            onSubmit={handleSubmit}
            open={open}
            options={state}
          />
        </div>
      </div>
    </>
  );
}
