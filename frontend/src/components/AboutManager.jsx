import { useState } from 'react';
import { getAbout, updateAbout } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './StatusState';
import './AboutManager.css';

async function fetchAbout() {
  try {
    return await getAbout();
  } catch (err) {
    if (err.response?.status === 404) return { bio: '', photoUrl: '' };
    throw err;
  }
}

export default function AboutManager() {
  const { data, status, refetch } = useFetch(fetchAbout);
  if (status === 'loading') return <LoadingState label="loading about.md" />;
  if (status === 'error') return <ErrorState message="Couldn't load About." onRetry={refetch} />;
  return <AboutForm about={data} />;
}

function AboutForm({ about }) {
  const [bio, setBio] = useState(about?.bio || '');
  const [photoUrl, setPhotoUrl] = useState(about?.photoUrl || '');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setSaved(false);
    try {
      await updateAbout({ bio, photoUrl });
      setSaved(true);
    } catch {
      setFormError('Could not save. Bio is required.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="about-manager" onSubmit={handleSubmit}>
      <label className="about-manager-field">
        <span className="mono">bio</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={6}
          required
        />
      </label>

      <label className="about-manager-field">
        <span className="mono">photo url</span>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
        />
      </label>

      {formError && <p className="about-manager-error mono">{formError}</p>}

      <div className="about-manager-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'saving...' : 'save'}
        </button>
        {saved && <span className="about-manager-saved mono">saved ✓</span>}
      </div>
    </form>
  );
}
