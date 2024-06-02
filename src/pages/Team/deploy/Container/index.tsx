import { useEffect, useState } from 'react';
import { getAllContainer } from '@/utils/apis/container';
import { useParams } from 'react-router-dom';
import { TeamDeployHaveContainer } from './HaveContainer';
import { TeamDeployNoneContainer } from './NoneContainer';

export const TeamDeployContainer = () => {
  const { deployUUID } = useParams();
  const [hasContainers, setHasContainers] = useState<boolean | null>(null);

  useEffect(() => {
    if (deployUUID) {
      getAllContainer(deployUUID).then((res) => {
        setHasContainers(res.data.length > 0);
      });
    }
  }, [deployUUID]);

  if (hasContainers === null) {
    return <div>Loading...</div>;
  }

  return hasContainers ? <TeamDeployHaveContainer /> : <TeamDeployNoneContainer />;
};
