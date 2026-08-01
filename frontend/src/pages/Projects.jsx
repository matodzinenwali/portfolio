import { useCallback } from 'react';
import { projectsApi } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState, EmptyState } from '../components/StatusState';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

export default function Projects() {
  const fetchProjects = useCallback(() => projectsApi.getAll(), []);
  const { data, status, refetch } = useFetch(fetchProjects, []);

  return (
    <section className="container projects-page">
      <span className="section-label mono">projects</span>
      <h1 className="section-title">Things I've built</h1>

      {status === 'loading' && <LoadingState label="fetching /api/projects" />}
      {status === 'error' && (
        <ErrorState message="Couldn't load projects from the API." onRetry={refetch} />
      )}
      {status === 'success' && data?.length === 0 && (
        <EmptyState message="No projects published yet." />
      )}

      {status === 'success' && data?.length > 0 && (
        <div className="projects-grid">
          {data.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
