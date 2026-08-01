import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { setAuthToken, projectsApi, skillsApi, achievementsApi } from '../../services/api';
import ResourceManager from '../../components/ResourceManager';
import './Dashboard.css';

const TABS = {
  projects: {
    label: 'projects',
    api: projectsApi,
    titleField: 'title',
    fields: [
      { name: 'title', label: 'title', required: true },
      { name: 'description', label: 'description', type: 'textarea', required: true },
      { name: 'repoUrl', label: 'repo url' },
      { name: 'imageUrl', label: 'image url' },
    ],
  },
  skills: {
    label: 'skills',
    api: skillsApi,
    titleField: 'name',
    fields: [
      { name: 'name', label: 'name', required: true },
      { name: 'category', label: 'category' },
    ],
  },
  achievements: {
    label: 'achievements',
    api: achievementsApi,
    titleField: 'title',
    fields: [
      { name: 'title', label: 'title', required: true },
      { name: 'issuer', label: 'issuer', required: true },
      { name: 'type', label: 'type', type: 'select', options: ['award', 'certification'] },
      { name: 'dateAwarded', label: 'date awarded', type: 'date' },
      { name: 'credentialUrl', label: 'credential url' },
      { name: 'description', label: 'description', type: 'textarea' },
    ],
  },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setAuthToken(null);
    logout();
    navigate('/admin/login');
  }

  const tab = TABS[activeTab];

  return (
    <section className="container dashboard-page">
      <div className="dashboard-header">
        <div>
          <span className="section-label mono">admin</span>
          <h1 className="section-title">Content dashboard</h1>
        </div>
        <button className="btn dashboard-logout" onClick={handleLogout}>
          logout
        </button>
      </div>

      <div className="dashboard-tabs">
        {Object.entries(TABS).map(([key, value]) => (
          <button
            key={key}
            className={'dashboard-tab mono' + (activeTab === key ? ' dashboard-tab--active' : '')}
            onClick={() => setActiveTab(key)}
          >
            /{value.label}
          </button>
        ))}
      </div>

      <ResourceManager
        resourceApi={tab.api}
        fields={tab.fields}
        titleField={tab.titleField}
        key={activeTab}
      />
    </section>
  );
}
