import React from 'react';

function UI({ 
  polyCount, 
  showGrid, 
  onToggleGrid, 
  dayMode, 
  onToggleDayMode, 
  previewPosition,
  onPreviewPositionChange,
  placedMarkers,
  onPlaceMarker,
  onDeleteMarker,
  onClearMarkers
}) {
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

      {/* Coordinate Explorer Section */}
      <div style={{
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '2px solid #9370DB'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600', color: '#9370DB' }}>
          🎯 Coordinate Explorer
        </h3>

        {/* X Slider */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>
            X (Left ← → Right)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.05"
              value={previewPosition.x}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, x: parseFloat(e.target.value) })}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              value={previewPosition.x.toFixed(2)}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, x: parseFloat(e.target.value) || 0 })}
              step="0.1"
              style={{
                width: '60px',
                padding: '4px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* Y Slider */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>
            Y (Down ← → Up)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="range"
              min="-1"
              max="8"
              step="0.05"
              value={previewPosition.y}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, y: parseFloat(e.target.value) })}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              value={previewPosition.y.toFixed(2)}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, y: parseFloat(e.target.value) || 0 })}
              step="0.1"
              style={{
                width: '60px',
                padding: '4px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* Z Slider */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '12px', fontWeight: '500', color: '#666', display: 'block', marginBottom: '4px' }}>
            Z (Back ← → Front)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.05"
              value={previewPosition.z}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, z: parseFloat(e.target.value) })}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              value={previewPosition.z.toFixed(2)}
              onChange={(e) => onPreviewPositionChange({ ...previewPosition, z: parseFloat(e.target.value) || 0 })}
              step="0.1"
              style={{
                width: '60px',
                padding: '4px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button
            onClick={onPlaceMarker}
            style={{
              flex: 1,
              padding: '8px',
              background: '#9370DB',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Place Marker
          </button>
          <button
            onClick={onClearMarkers}
            disabled={placedMarkers.length === 0}
            style={{
              flex: 1,
              padding: '8px',
              background: placedMarkers.length === 0 ? '#ccc' : '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: placedMarkers.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Clear All
          </button>
        </div>

        {/* Placed Markers List */}
        {placedMarkers.length > 0 && (
          <div style={{
            maxHeight: '150px',
            overflowY: 'auto',
            background: '#f9f9f9',
            borderRadius: '6px',
            padding: '8px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
              Markers ({placedMarkers.length}):
            </div>
            {placedMarkers.map((marker, index) => {
              const colors = ['🔴', '🔵', '🟢', '🟡', '🟣', '🔶'];
              const coordText = `[${marker.x.toFixed(2)}, ${marker.y.toFixed(2)}, ${marker.z.toFixed(2)}]`;
              
              return (
                <div key={marker.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px',
                  marginBottom: '4px',
                  background: 'white',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }}>
                  <span>{colors[index % colors.length]} {coordText}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(coordText);
                      }}
                      style={{
                        padding: '2px 6px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => onDeleteMarker(marker.id)}
                      style={{
                        padding: '2px 6px',
                        background: '#FF6B6B',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        fontSize: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Del
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UI;
