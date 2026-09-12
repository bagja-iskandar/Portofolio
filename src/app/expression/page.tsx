import type { Metadata } from 'next';
import ExpressionView from '@/views/immersive/ExpressionView';

export const metadata: Metadata = {
  title: 'EXPRESSION // Bagja Iskandar Jamil — The Full Story',
  description:
    'Editorial storytelling, architectural reflections, and interactive experiments behind the engineering work of Bagja Iskandar Jamil.',
  icons: {
    icon: [
      { url: '/brand/bij-logo-expression.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/brand/bij-logo-expression.svg',
  },
};

export default function ExpressionPage() {
  return <ExpressionView />;
}
