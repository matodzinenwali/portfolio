import { useCallback } from 'react';
import { getAbout } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from '../components/StatusState';
import Avatar from '../components/Avatar';
import './About.css';

export default function About() {
  const fetchAbout = useCallback(() => getAbout(), []);
  const { data, status, refetch } = useFetch(fetchAbout);

  return (
    <section className="container about-page">
      <span className="section-label mono">about</span>
      <h1 className="section-title">About me</h1>

      {status === 'loading' && <LoadingState label="cat about.md" />}
      {status === 'error' && (
        <ErrorState message="Couldn't load bio from the API." onRetry={refetch} />
      )}

      {status === 'success' && (
        <div className="about-content">
          <Avatar src={data?.photoUrl} />
          <p className="about-bio">
            {data?.bio || 'Bio coming soon - check back shortly.'}
          </p>
        </div>
      )}
    </section>
  );
}
