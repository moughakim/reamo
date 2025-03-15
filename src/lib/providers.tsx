import { ReactNode } from 'react';
import { Layout } from '@/components/Layout';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Layout>
      {children}
    </Layout>
  );
} 