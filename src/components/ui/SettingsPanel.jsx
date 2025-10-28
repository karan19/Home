import React from 'react';
import { useControls, folder } from 'leva';
import { setSimulatedTime } from '../../config/timeBasedSettings';

/**
 * Settings Panel Component
 * 
 * Professional settings panel using Leva
 * Controls:
 * - Time simulation (dev mode only)
 * - Weather (clear, rain, snow)
 * - Audio (enable/disable, volume)
 * - Post-processing effects
 */

function SettingsPanel({ onSettingsChange }) {
  // Check environment mode for defaults
  const isDevelopment = import.meta.env.MODE === 'development';
  
  const settings = useControls({
    // Scene Controls
    'Scene Controls': folder({
      showGrid: {
        value: isDevelopment, // Grid only in dev mode by default
        label: 'Show Grid'
      },
      simulatedTime: {
        value: 'Real Time',
        options: [
          'Real Time',
          '06:00 - 6 AM (Newspaper starts)',
          '06:30 - 6:30 AM (Mid newspaper)',
          '08:00 - 8 AM (Mail starts)',
          '08:30 - 8:30 AM (Mid mail)',
          '11:00 - 11 AM (Newspaper ends)',
          '11:30 - 11:30 AM (After newspaper)',
          '16:00 - 4 PM (Afternoon)',
          '17:00 - 5 PM (Mail ends)',
          '18:00 - 6 PM (Night starts)',
          '18:30 - 6:30 PM (Early night)',
          '20:00 - 8 PM (Night)',
          '00:00 - Midnight'
        ],
        label: 'Time Simulator',
        onChange: (value) => {
          if (value === 'Real Time') {
            setSimulatedTime(null);
          } else {
            const timeStr = value.split(' - ')[0];
            setSimulatedTime(timeStr);
          }
          
          // Force immediate update with a small delay to ensure time is set first
          setTimeout(() => {
            if (onSettingsChange) {
              onSettingsChange({ ...settings, _timeChanged: Date.now() });
            }
          }, 0);
        }
      }
    }),
    
    // Weather Settings
    Weather: folder({
      weather: {
        value: 'clear',
        options: ['clear', 'rain', 'snow'],
        label: 'Weather Type'
      }
    }),
    
    // Audio Settings
    Audio: folder({
      enabled: {
        value: true,
        label: 'Enable Audio'
      },
      masterVolume: {
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.1,
        label: 'Master Volume'
      },
      ambientVolume: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.1,
        label: 'Ambient Volume'
      }
    }),
    
    // Post-Processing
    'Post-Processing': folder({
      bloom: {
        value: true,
        label: 'Bloom Effect'
      },
      bloomIntensity: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Bloom Intensity'
      },
      ssao: {
        value: true,
        label: 'SSAO'
      },
      ssaoIntensity: {
        value: 30,
        min: 10,
        max: 50,
        step: 5,
        label: 'SSAO Intensity'
      }
    })
  });

  // Notify parent of settings changes
  React.useEffect(() => {
    if (onSettingsChange) {
      onSettingsChange(settings);
    }
  }, [settings, onSettingsChange]);

  return null; // Leva renders its own UI
}

export default SettingsPanel;
