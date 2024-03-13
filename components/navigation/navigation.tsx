import { Sidebar } from '@/components/navigation/sidebar';
import { Topbar } from '@/components/navigation/topbar';

interface Props {
  children: React.ReactNode;
}

const Navigation = ({ children }: Props) => {
  return (
    <>
      <Topbar />
      <div className="flex h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4.5rem)]">
        <Sidebar />
        <div className="bg-background-secondary w-full p-0 lg:pb-4 lg:pr-4">
          <div className="page-container">{children}</div>
        </div>
      </div>
    </>
  );
};
export { Navigation };
