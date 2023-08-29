import * as React from 'react';

import clsxm from '@/lib/clsxm';

import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/typography/Typography';

const breadcrumbs = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/dashboard/tryout': 'Tryout',
  '/dashboard/tryout/result': 'Hasil Tryout',
  '/dashboard/geolympic': 'Geolympic',
  '/dashboard/tryout/detail-tryout': 'Detail Tryout',
  '/dashboard/tryout/result/pembahasan': 'Pembahasan',
  '/admin': 'Admin',
  '/dashboard/tryout/quiz/soal': 'Quiz',
  '/admin/tryout/detail-tryout': 'Detail Tryout',
  '/admin/tryout': 'Tryout',
  '/admin/tryout/participant': 'Peserta',
  '/admin/tryout/detail-peserta': 'Detail Peserta',
  '/admin/tryout/buat': 'Buat Tryout',
  '/admin/tryout/edit': 'Edit Tryout',
  '/admin/tryout/question': 'Soal',
  '/admin/tryout/question/edit': 'Edit',
  '/admin/tryout/participant/assign/peserta': 'Assign Peserta',
};
type BreadcrumbProps = {
  crumbs: Array<keyof typeof breadcrumbs>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  id = '',
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
          <PrimaryLink
            href={
              crumb === '/admin/tryout/detail-tryout'
                ? `/admin/tryout/${id}`
                : crumb
            }
            size='sm'
            className='font-medium'
          >
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
