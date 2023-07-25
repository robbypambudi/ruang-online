import Typography from '@/components/typography/Typography';

export default function HelperText({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c2'
        className='text-xs !leading-tight text-typo-secondary'
      >
        {children}
      </Typography>
    </div>
  );
}
