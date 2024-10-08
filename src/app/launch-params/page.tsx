'use client';

import { List } from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@tma.js/sdk-react';

import { DisplayData } from '@/components/DisplayData/DisplayData';

export default function LaunchParamsPage() {
  const lp = useLaunchParams();

  return (
    <List>
      <DisplayData
        rows={[
          { title: 'tgWebAppPlatform', value: lp.platform },
          { title: 'tgWebAppShowSettings', value: lp.showSettings },
          { title: 'tgWebAppVersion', value: lp.version },
          { title: 'tgWebAppBotInline', value: lp.botInline },
          { title: 'tgWebAppStartParam', value: lp.startParam },
          { title: 'tgWebAppData', type: 'link', value: '/init-data' },
          {
            title: 'tgWebAppThemeParams',
            type: 'link',
            value: '/theme-params',
          },
        ]}
      />
    </List>
  );
}
