'use client';

import WithShell from '@/components/shared/WithShell';

export default function CompareLayout({ children }) {
  return (
    <WithShell sideNavStartOpen={false}>
      {children}
    </WithShell>
  );
} 