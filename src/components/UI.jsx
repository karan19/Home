import React from 'react';

function UI({ polyCount, showGrid, onToggleGrid, showFloorGrids, onToggleFloorGrids, showWallGrids, onToggleWallGrids, dayMode, onToggleDayMode }) {
  const handleExport = () => {
    // Export functionality will be implemented in House component
    window.dispatchEvent(new CustomEvent('exportGLB'));
  };

  const handleResetCamera = () => {
    window.dispatchEvent(new CustomEvent('resetCamera'));
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      minWidth: '250px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h2 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600' }}>
        3D House Viewer
      </h2>

      <button
        onClick={handleExport}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '10px',
          background: '#9370DB',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = '#7B68EE'}
        onMouseOut={(e) => e.target.style.background = '#9370DB'}
      >
        Export GLB
      </button>

      <button
        onClick={handleResetCamera}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          background: '#F5F5DC',
          color: '#333',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.target.style.background = '#E8E8D0'}
        onMouseOut={(e) => e.target.style.background = '#F5F5DC'}
      >
        Reset Camera
      </button>

      <label style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        <input
          type="checkbox"
          checked={showGrid}
          onChange={onToggleGrid}
          style={{
            marginRight: '8px',
            width: '18px',
            height: '18px',
            cursor: 'pointer'
          }}
        />
        Show Grid
      </label>

      <label style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        <input
          type="checkbox"
          checked={showFloorGrids}
          onChange={onToggleFloorGrids}
          style={{
            marginRight: '8px',
            width: '18px',
            height: '18px',
            cursor: 'pointer'
          }}
        />
        Show Floor Grids
      </label>

      <label style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        <input
          type="checkbox"
          checked={showWallGrids}
          onChange={onToggleWallGrids}
          style={{
            marginRight: '8px',
            width: '18px',
            height: '18px',
            cursor: 'pointer'
          }}
        />
        Show Wall Grids
      </label>

      <label style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        <input
          type="checkbox"
          checked={dayMode}
          onChange={onToggleDayMode}
          style={{
            marginRight: '8px',
            width: '18px',
            height: '18px',
            cursor: 'pointer'
          }}
        />
        Day Mode
      </label>

      <div style={{
        paddingTop: '15px',
        borderTop: '1px solid #e0e0e0',
        fontSize: '13px',
        color: '#666'
      }}>
        <div style={{ marginBottom: '5px' }}>
          <strong>Polygon Count:</strong> {polyCount.toLocaleString()}
        </div>
        <div>
          <strong>Camera:</strong> Isometric View
        </div>
      </div>
    </div>
  );
}

export default UI;
