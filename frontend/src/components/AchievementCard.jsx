import './AchievementCard.css';

export default function AchievementCard({ achievement }) {
  const { title, issuer, type, dateAwarded, credentialURL: credentialUrl, description } = achievement;
  const isAward = type === 'award';

  return (
    <div className="achievement-row">
      <span className={`achievement-badge mono ${isAward ? 'achievement-badge--award' : 'achievement-badge--cert'}`}>
        {isAward ? 'AWARD' : 'CERT'}
      </span>

      <div className="achievement-content">
        <div className="achievement-heading">
          <h3 className="achievement-title">
            {credentialUrl ? (
              <a href={credentialUrl} target="_blank" rel="noreferrer">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <time className="achievement-date mono">{formatDate(dateAwarded)}</time>
        </div>
        <p className="achievement-issuer">{issuer}</p>
        {description && <p className="achievement-desc">{description}</p>}
      </div>
    </div>
  );
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short' });
}
