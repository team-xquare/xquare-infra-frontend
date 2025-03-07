import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { getSharedDashboard } from '@/utils/apis/trace';

export const TeamDeployContainerTraces = () => {
  const { deployUUID, env } = useParams();
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (deployUUID && env) {
      getSharedDashboard(deployUUID, env)
        .then((res) => {
          // 반환되는 데이터 형식에 따라 적절히 접근합니다.
          // 예를 들어, res.data.url 형식으로 URL이 포함되어 있다고 가정합니다.
          setDashboardUrl(res.data.url);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching dashboard URL:', err);
          setError('Dashboard를 불러오는 데 실패했습니다.');
          setLoading(false);
        });
    }
  }, [deployUUID, env]);

  if (loading) return <p>Dashboard 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <IframeWrapper>
      {dashboardUrl ? (
        <iframe
          src={dashboardUrl.replaceAll(" ", "")}
          title="Shared Dashboard"
          style={{ width: '100%', height: '100vh', border: 'none' }}
        />
      ) : (
        <p>사용 가능한 Dashboard가 없습니다.</p>
      )}
    </IframeWrapper>
  );
};

const IframeWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
