import { useEffect, useState } from 'react';

interface PageInfo {
  title: string;
  url: string;
  timestamp: string;
}

function App() {
  const [count, setCount] = useState(0)
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Get page information from parent window
    try {
      if (window.parent && window.parent !== window) {
        const parentDoc = window.parent.document;
        setPageInfo({
          title: parentDoc.title,
          url: parentDoc.location.href,
          timestamp: new Date().toLocaleString()
        });
      }
    } catch (error) {
      console.log('Cannot access parent page info due to CORS');
      setPageInfo({
        title: 'Current Page',
        url: window.location.href,
        timestamp: new Date().toLocaleString()
      });
    }
  }, []);

  return (
    <div style={{
      padding: '20px',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      overflow: 'auto'
    }}>
      <h1 style={{
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333'
      }}>
        React Sidebar
      </h1>

      {pageInfo && (
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>Page Info</h3>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Title:</strong> {pageInfo.title}
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px', wordBreak: 'break-all' }}>
            <strong>URL:</strong> {pageInfo.url}
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Opened:</strong> {pageInfo.timestamp}
          </p>
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#555' }}>Counter Example</h3>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              console.log('##', document.getElementById('inicio-manchetes'));
              setCount(count + 1)
            }}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Count: {count}
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#555' }}>Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your notes here..."
          style={{
            width: '100%',
            height: '150px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>
    </div>
  )
}

export default App
