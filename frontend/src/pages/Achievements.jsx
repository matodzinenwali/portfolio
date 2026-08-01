import { useCallback } from 'react';
import { achievementsApi } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState, EmptyState } from '../components/StatusState';
import AchievementCard from '../components/AchievementCard';
import './Achievements.css';

export default function Achievements() {
  const fetchAchievements = useCallback(() => achievementsApi.getAll(), []);
  const { data, status, refetch } = useFetch(fetchAchievements, []);

  return (
    <section className="container achievements-page">
      <span className="section-label mono">achievements</span>
      <h1 className="section-title">Awards &amp; certifications</h1>

      {status === 'loading' && <LoadingState label="fetching /api/achievements" />}
      {status === 'error' && (
        <ErrorState message="Couldn't load achievements from the API." onRetry={refetch} />
      )}
      {status === 'success' && data?.length === 0 && (
        <EmptyState message="Nothing listed yet." />
      )}

      {status === 'success' && data?.length > 0 && (
        <div className="achievements-list">
          {data.map((achievement) => (
            <AchievementCard key={achievement._id} achievement={achievement} />
          ))}
        </div>
      )}
    </section>
  );
}
