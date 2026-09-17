import { Component, StrictMode, type ReactNode, type ErrorInfo } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SHILPSETU Render Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 24px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
          <h2 style={{ fontSize: '20px', color: '#8C3B1E', marginBottom: '12px' }}>Something went wrong loading SHILPSETU</h2>
          <pre style={{ background: '#FAF7F2', padding: '16px', borderRadius: '8px', fontSize: '13px', overflowX: 'auto', border: '1px solid #e7e5e4' }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px', padding: '10px 20px', background: '#1C1917', color: '#fff', border: 'none', borderRadius: '9999px', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
