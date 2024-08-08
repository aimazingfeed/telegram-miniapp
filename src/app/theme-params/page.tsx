'use client';

import { List } from '@telegram-apps/telegram-ui';
import { useThemeParams } from '@tma.js/sdk-react';

import { DisplayData } from '@/components/DisplayData/DisplayData';

export default function ThemeParamsPage() {
  const themeParams = useThemeParams();

  return (
    <List>
      <DisplayData
        rows={Object.entries(themeParams.getState()).map(([title, value]) => ({
          title: title
            .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
            .replace(/background/, 'bg'),
          value,
        }))}
      />
    </List>
  );
}
