import { useState, useEffect } from 'react';
import bgImage from './tech-bg.jpeg'; // Importa la imagen colocada en src/

function App() {
  const [nodeData, setNodeData] = useState(null);
  const [previousNode, setPreviousNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      
      setPreviousNode(nodeData ? nodeData.node_name : null);
      setNodeData(data);
      setRequestCount(prev => prev + 1);
    } catch (error) {
      console.error('Error al conectar con el clúster:', error);
      setNodeData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentColor = nodeData?.node_color || '#38bdf8';

  return (
    <div style={{
      backgroundColor: '#030712',
      color: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      padding: '1rem',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Capa de opacidad suave para resaltar la tarjeta central */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.35)',
        pointerEvents: 'none'
      }} />

      {/* Tarjeta interactiva */}
      <div style={{
        background: 'rgba(11, 18, 32, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '2.5rem',
        borderRadius: '24px',
        border: `1px solid ${currentColor}60`,
        textAlign: 'center',
        maxWidth: '520px',
        width: '100%',
        boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${currentColor}30`,
        transition: 'all 0.4s ease',
        zIndex: 1
      }}>
        {/* Badge */}
        <div style={{ display: 'inline-block', marginBottom: '1.2rem' }}>
          <span style={{
            background: currentColor,
            color: '#030712',
            padding: '0.4rem 1.2rem',
            borderRadius: '20px',
            fontWeight: '800',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            boxShadow: `0 0 15px ${currentColor}60`
          }}>
            🤖 DATA ENGINE NODE • HAPROXY LB
          </span>
        </div>

        <h2 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.1rem', color: '#94a3b8', letterSpacing: '1px' }}>
          MÓDULO DE PROCESAMIENTO
        </h2>

        {/* Nombre del Nodo */}
        <h1 style={{
          fontSize: '2.6rem',
          color: currentColor,
          margin: '0.4rem 0 1.2rem 0',
          fontWeight: '800',
          textShadow: `0 0 25px ${currentColor}70`,
          transition: 'color 0.4s ease'
        }}>
          {loading ? 'Procesando...' : nodeData ? nodeData.node_name : 'Sin Conexión'}
        </h1>

        {/* Panel de diagnósticos */}
        <div style={{
          background: 'rgba(3, 7, 18, 0.75)',
          padding: '1.2rem',
          borderRadius: '14px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'left'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0', fontSize: '0.95rem' }}>
            ⚡ <strong>Estado:</strong> {nodeData ? nodeData.message : 'No se pudo conectar al clúster.'}
          </p>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            ID Instancia: {nodeData ? nodeData.container_id : '---'}
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            background: currentColor,
            color: '#030712',
            border: 'none',
            padding: '1rem 1.8rem',
            borderRadius: '12px',
            fontWeight: '800',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            width: '100%',
            boxShadow: `0 4px 20px ${currentColor}50`
          }}
        >
          {loading ? 'Sincronizando...' : 'Procesar Siguiente Petición 🔄'}
        </button>

        {/* Estadísticas */}
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: '#64748b',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1rem'
        }}>
          <span>Carga procesada: <strong style={{ color: '#e2e8f0' }}>{requestCount} reqs</strong></span>
          <span>Anterior: <strong style={{ color: currentColor }}>{previousNode || '---'}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default App;