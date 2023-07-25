import { MdOutlineChangeCircle } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import ImagePreview from '@/components/image/ImagePreview';
import ImagePreviewWithFetch from '@/components/image/ImagePreviewWithFetch';
import Typography from '@/components/typography/Typography';

type ImagePreviewCardProps = {
  imgPath: string;
  label?: string;
  caption: string;
  withFetch?: boolean;
  onDelete?: () => void;
  onDeleteLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ImagePreviewCard({
  imgPath,
  label = '',
  caption,
  withFetch = false,
  onDelete,
  onDeleteLoading,
}: ImagePreviewCardProps) {
  return (
    <div className='border-typo-outline group relative flex items-center gap-x-4 rounded-xl border p-4'>
      {withFetch ? (
        <ImagePreviewWithFetch
          imgPath={imgPath}
          alt={label}
          label={label}
          width={80}
          height={80}
          className='w-20'
          imgClassName='rounded-md'
        />
      ) : (
        <ImagePreview
          imgSrc={imgPath}
          alt={label}
          label={label}
          width={80}
          height={80}
          className='w-20'
          imgClassName='rounded-md'
        />
      )}
      <div className='space-y-2'>
        <Typography className='text-typo-primary font-semibold'>
          {label}
        </Typography>
        <Typography className='text-typo-icon'>{caption}</Typography>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className='text-typo-primary/70 group-hover:text-typo-primary absolute right-2 top-2'
          type='button'
        >
          <MdOutlineChangeCircle
            size={26}
            className={clsxm(onDeleteLoading && 'animate-spin')}
          />
        </button>
      )}
    </div>
  );
}
