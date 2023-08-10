import * as React from 'react';

import Typography from '@/components/typography/Typography';

export default function Countdown({
  remainingTime,
}: {
  remainingTime: number;
}) {
  const [time, setTime] = React.useState(remainingTime);

  React.useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    }

    return () => clearTimeout(time);
  }, [time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);

  return (
    <Typography variant='s2' className=''>
      Sisa Waktu :{' '}
      <span className='text-[#1A3FC4]'>
        {hours}:{minutes}:{seconds}
      </span>
    </Typography>
  );
}
