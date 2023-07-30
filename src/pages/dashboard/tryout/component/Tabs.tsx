import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

type TabsProps = {
  TabTitle: string;
  OnClick: () => void;
  className: string;
  LeftIcon?: IconType;
  RightIcon?: IconType;
  href?: string;
};

export default function Tabs({
  TabTitle,
  OnClick,
  className,
  LeftIcon,
  RightIcon,
  href,
}: TabsProps) {
  return (
    <ul className='-mb-px flex cursor-pointer flex-wrap text-center'>
      <li className='mr-2'>
        <a
          onClick={OnClick}
          href={href}
          className={clsxm(
            [
              'inline-flex items-center justify-center rounded-t-lg border-b-2 border-transparent p-4 ',
              'text-sm font-medium',
            ],
            className
          )}
        >
          {LeftIcon && <LeftIcon className={clsxm(['mr-2 h-4 w-4'])} />}
          {TabTitle}
          {RightIcon && <RightIcon className={clsxm(['ml-2 h-4 w-4'])} />}
        </a>
      </li>
    </ul>
  );
}
