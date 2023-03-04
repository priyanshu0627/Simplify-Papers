// import Link from 'next/link';
import type { ReactNode } from 'react';

// import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased">
    <div className="content text-xl">{props.children}</div>
  </div>
);

export { Main };
