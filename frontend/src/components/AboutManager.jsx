import { useCallback, useEffect, useState } from 'react';
import { getAbout, updateAbout } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { LoadingState, ErrorState } from './StatusState';
import './AboutManager.css';

export default function AboutManager() {
  const fetchAbout = useCallback(() => getAbout().catch(() => ({ bio: '', photoUrl: '' })), []);
  const { data, status, refetch } = useFetch(fetchAbout, []);

  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState(null);

  // Pre-fill the form once the current About data has loaded, so editing
  // updates what's there instead of starting blank every time.
  useEffect(() => {
    if (status === 'success' && data) {
      setBio(data.bio || '');
      setPhotoUrl(data.photoUrl || '');
    }
  }, [status, data]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setSaved(false);
    try {
      await updateAbout({ bio, photoUrl });
      setSaved(true);
      refetch();
    } catch (err) {
      setFormError('Could not save. Bio is required.');
    } finally {
      setSubmitting(false);
    }
  }

  if (status === 'loading') return <LoadingState label="loading about.md" />;
  if (status === 'error') return <ErrorState message="Couldn't load About." onRetry={refetch} />;

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
