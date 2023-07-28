import * as React from 'react';
import { useFieldArray } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import TextArea from '@/components/forms/TextArea';
import UploadImage from '@/components/forms/UploadImage';
import Typography from '@/components/typography/Typography';

export default function MemberArrayField() {
  const { fields, append, remove } = useFieldArray({
    name: 'member[]',
    shouldUnregister: true,
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [append, fields.length]);

  return (
    <div className='mt-6 w-full border-t'>
      {fields.map((field, index) => (
        <div key={index} className='mt-4 grid grid-cols-2 gap-x-4'>
          <div className=''>
            <div>
              <Typography variant='h6' className='font-bold'>
                Member {index + 1}
              </Typography>
            </div>
            <div key={index} className='mt-2 gap-4'>
              <Input
                id={`members[${index}].name`}
                label='Name'
                placeholder='Enter name'
                validation={{
                  required: 'Name is required',
                }}
              />
              <Input
                id={`members[${index}].tempat_lahir`}
                label='Place of Birth'
                placeholder='Enter place of birth'
                validation={{
                  required: 'Place of birth is required',
                }}
              />
              <DatePicker
                id={`members[${index}].tanggal_lahir`}
                label='Date of Birth'
                placeholder='Enter date of birth'
                validation={{
                  required: 'Date of birth is required',
                }}
              />
              <TextArea
                id={`members[${index}].alamat`}
                label='Address'
                placeholder='Enter address'
                validation={{
                  required: 'Address is required',
                }}
              />
            </div>
          </div>
          <div>
            <div className='gap-2'>
              <div className='flex justify-end gap-x-2'>
                {fields.length <= 2 && (
                  <Button variant='outline' onClick={() => append({})}>
                    Tambah Anggota
                  </Button>
                )}
                <Button onClick={() => remove(fields.length - 1)}>
                  Delete Anggota
                </Button>
              </div>
              <Input
                id={`members[${index}].sosmed`}
                label='WhatsApp Number'
                placeholder='Enter whatsapp number'
                validation={{
                  required: 'Whatsapp number is required',
                }}
                helperText='Example: 6281234567890'
              />
              <UploadImage
                id={`members[${index}].kartu_pelajar_url`}
                location='geolympic/student-card'
                label='Upload Student Card'
                accept={{
                  image: ['image/png', 'image/jpg', 'image/jpeg'],
                }}
                validation={{
                  required: 'Student card is required',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
