import * as React from 'react';

import { getAllQuestions } from '@/lib/localstorage';

import Breadcrumb from '@/components/Breadcrumb';
import withAuth from '@/components/hoc/withAuth';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import ButtonLink from '@/components/links/ButtonLink';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import QuizContainer from '@/pages/dashboard/tryout/quiz/container/QuizContainer';

import { QusetionsList } from '@/types/entities/question';

export default withAuth(SoalPage, 'USER');
function SoalPage() {
  //#region  //*=========== Prevent For Right Click ===========
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    // const handleCopy = (evt: ClipboardEvent) => {
    //   if (evt.clipboardData) {
    //     evt.clipboardData.setData(
    //       'text/plain',
    //       'Anda tidak dapat menyalin soal ini, tindakan ini termasuk pelanggaran dan dapat mengakibatkan akun anda diblokir oleh sistem kami'
    //     );
    //   }
    //   evt.preventDefault();
    // };
    const handleBlur = () => {
      document.title = 'Kembali ke halaman tryout';
      alert(
        'Anda tidak dapat menyalin soal ini, tindakan ini termasuk pelanggaran dan dapat mengakibatkan akun anda diblokir oleh sistem kami'
      );
    };

    const handleFocus = () => {
      document.title = 'Quiz | Geosentric 2023';
    };

    if (window) {
      window.addEventListener('contextmenu', handleContextMenu);
      // window.addEventListener('copy', (event) => {
      //   handleCopy(event as ClipboardEvent);
      // });
      window.addEventListener('blur', handleBlur);
      window.addEventListener('focus', handleFocus);
    }

    return () => {
      if (window) {
        window.removeEventListener('contextmenu', handleContextMenu);
        // window.removeEventListener('copy', handleCopy);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  //#region  //*=========== Get Question List ===========
  const ListQuestions: QusetionsList[] = getAllQuestions();

  return (
    <DashboardLayout>
      <Seo templateTitle='Quiz' />

      <div ref={ref}>
        {!ListQuestions ? (
          <NotFoundQuestionList />
        ) : (
          <QuizContainer ListQuestions={ListQuestions} />
        )}
      </div>
    </DashboardLayout>
  );
}

function NotFoundQuestionList() {
  return (
    <div>
      <header className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex flex-col'>
            <Breadcrumb
              crumbs={[
                '/dashboard',
                '/dashboard/tryout',
                '/dashboard/tryout/quiz/soal',
              ]}
            />
            <Typography variant='h2' className='font-bold'>
              Quiz
            </Typography>
          </div>
        </div>
      </header>
      <main className='py-6'>
        <Typography>
          Soal tidak ditemukan, silahkan klik tombol selesai untuk kembali ke
          halaman tryout
        </Typography>
        <ButtonLink className='mt-4' variant='primary' href='/dashboard/tryout'>
          Kembali
        </ButtonLink>
      </main>
    </div>
  );
}
