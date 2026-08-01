import { useState } from 'react';
import './Avatar.css';

export default function Avatar({ src, name = 'Matodzi Nenwali', size = 160 }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="avatar-frame" style={{ width: size, height: size }}>
      {showImage ? (
        <img src={src} alt={name} onError={() => setFailed(true)} />
      ) : (
        <div className="avatar-placeholder mono" aria-label={name}>
          <span>{initials}</span>
        </div>
      )}
    </div>
  );
}
