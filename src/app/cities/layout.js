'use client';

import WithShell from '@/components/shared/WithShell';

export default function CitiesLayout({ children }) {
  return (
    <WithShell sideNavStartOpen={false}>
      {children}
    </WithShell>
  );
} 