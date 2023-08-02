import * as React from 'react';

import clsxm from '@/lib/clsxm';

import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/typography/Typography';

const breadcrumbs = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/dashboard/geolympic': 'Geolympic 2023',
  '/admin': 'Admin',
  '/admin/geolympic/detail-peserta': 'Detail Peserta',
  '/dashboard/tryout': 'Tryout',
  '/dashboard/tryout/detail-tryout': 'Detail Tryout',
  '/admin/tryout/detail-tryout': 'Detail Tryout',
  '/admin/tryout': 'Tryout',
  '/admin/tryout/peserta': 'Peserta',
};
type BreadcrumbProps = {
  crumbs: Array<keyof typeof breadcrumbs>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  crumbs: _crumbs,
  ...rest
}: BreadcrumbProps) {
  // split array into the last part and the rest
  const lastCrumb = _crumbs[_crumbs.length - 1];
  const crumbs = _crumbs.slice(0, _crumbs.length - 1);

  return (
    <div className={clsxm('space-x-1', className)} {...rest}>
      {crumbs.map((crumb) => (
        <React.Fragment key={crumb}>
          <PrimaryLink href={crumb} size='sm' className='font-medium'>
            <Typography
              as='span'
              variant='s3'
              color='primary'
              className='text-[#8A62D0]'
            >
              {breadcrumbs[crumb]}
            </Typography>
          </PrimaryLink>
          <span className='text-sm font-medium text-typo'>/</span>
        </React.Fragment>
      ))}
      <Typography as='span' variant='s3'>
        {breadcrumbs[lastCrumb]}
      </Typography>
    </div>
  );
}
