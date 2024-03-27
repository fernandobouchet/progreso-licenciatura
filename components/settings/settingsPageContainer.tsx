import CareerSelector from '@/components/settings/careerSelector';
import { api } from '@/trpc/server';

const SettingsPageContainer = async () => {
  let selectedCareers: { careerId: number; }[] = [];

  selectedCareers = await api.user.getUserCareers();

  return (
    <div className='flex w-full justify-start'>
      <CareerSelector selectorInitialData={selectedCareers} />
    </div>
  )
}

export default SettingsPageContainer