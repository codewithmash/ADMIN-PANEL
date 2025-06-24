
import { Outlet } from 'react-router-dom';
import PartnerSidebar from './PartnerSidebar';

const PartnerLayout = () => {
  return (
    <div className="flex h-screen bg-admin-background">
      <PartnerSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;
