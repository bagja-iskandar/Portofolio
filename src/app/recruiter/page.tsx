import type { Metadata } from 'next';
import RecruiterStructureView from '@/views/recruiter/RecruiterStructureView';

export const metadata: Metadata = {
  title: 'STRUCTURE // Bagja Iskandar Jamil — The Short Read',
  description:
    'Curated technical summary, engineering benchmarks, systems decision matrix, and official resume for technical recruiters and hiring managers.',
};

export default function RecruiterPage() {
  return <RecruiterStructureView />;
}
