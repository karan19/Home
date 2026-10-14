import React from 'react';
import { HOUSE_PALETTES } from '../../context/HousePalette';

function SceneToolbar({
  paletteId,
  onPaletteChange,
  canExport,
  exportStatus,
  polyCount,
  showGrid,
  onExport,
  onResetCamera,
  onToggleGrid
}) {
  const isExporting = exportStatus === 'exporting';
  const buttonDisabled = !canExport || isExporting;

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      left: 16,
      right: 16,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      maxWidth: 'calc(100vw - 32px)',
      padding: 8,
      borderRadius: 8,
      background: 'rgba(18, 18, 24, 0.72)',
      color: 'white',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <button
        type="button"
        onClick={onResetCamera}
        disabled={!canExport}
        style={buttonStyle(!canExport)}
      >
        Reset View
      </button>

      <button
        type="button"
        onClick={onToggleGrid}
        style={buttonStyle(false, showGrid)}
        aria-pressed={showGrid}
      >
        Grid
      </button>

      <button
        type="button"
        onClick={onExport}
        disabled={buttonDisabled}
        style={buttonStyle(buttonDisabled, false, true)}
      >
        {isExporting ? 'Exporting...' : 'Export GLB'}
      </button>

      <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,flexWrap:'wrap'}}>
        Colors
        <select aria-label="House color palette" value={paletteId} onChange={event => onPaletteChange(event.target.value)}
          style={{height:34,maxWidth:'100%',borderRadius:6,border:'1px solid #ffffff40',padding:'0 8px',background:'#343940',color:'#fff',font:'inherit',cursor:'pointer'}}>
          {Object.entries(HOUSE_PALETTES).map(([id, palette]) => <option key={id} value={id}>{palette.name}</option>)}
        </select>
        <span aria-hidden="true" style={{display:'flex',gap:3}}>
          {['wall','floor','stairs'].map(key => <span key={key} style={{width:12,height:12,borderRadius:3,background:HOUSE_PALETTES[paletteId][key],border:'1px solid #ffffff60'}} />)}
        </span>
      </label>

      <div style={{
        minWidth: 116,
        flex: '1 0 116px',
        paddingLeft: 4,
        fontSize: 12,
        lineHeight: 1.3,
        color: exportStatus === 'error' ? '#ffb4b4' : 'rgba(255, 255, 255, 0.78)',
        whiteSpace: 'nowrap'
      }}>
        {statusText(exportStatus, polyCount)}
        <a href="/celebrities/credits.html" target="_blank" rel="noreferrer"
          style={{color:'inherit', marginLeft:12, fontSize:11}}>Media credits</a>
      </div>
    </div>
  );
}

const statusText = (exportStatus, polyCount) => {
  if (exportStatus === 'success') return 'GLB downloaded';
  if (exportStatus === 'error') return 'Export failed';
  return `${polyCount.toLocaleString()} triangles`;
};

const buttonStyle = (disabled, active = false, primary = false) => ({
  height: 34,
  padding: '0 12px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 6,
  background: active
    ? 'rgba(255, 255, 255, 0.22)'
    : primary
      ? '#7c5cff'
      : 'rgba(255, 255, 255, 0.1)',
  color: disabled ? 'rgba(255, 255, 255, 0.45)' : '#ffffff',
  fontSize: 13,
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.65 : 1,
  whiteSpace: 'nowrap'
});

export default SceneToolbar;
