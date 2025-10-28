/**
 * Interaction Manager
 * 
 * Centralized system for managing interactive elements in the scene
 * Handles click events, hover states, and interaction feedback
 */

class InteractionManager {
  constructor() {
    this.interactions = new Map();
    this.hoveredObject = null;
  }

  /**
   * Register an interactive object
   * @param {string} id - Unique identifier for the object
   * @param {Object} config - Interaction configuration
   */
  register(id, config) {
    this.interactions.set(id, {
      ...config,
      state: config.initialState || 'default'
    });
  }

  /**
   * Handle click on an interactive object
   * @param {string} id - Object identifier
   * @param {Event} event - Click event
   */
  handleClick(id, event) {
    event.stopPropagation();
    
    const interaction = this.interactions.get(id);
    if (!interaction) return;

    // Execute click handler if provided
    if (interaction.onClick) {
      interaction.onClick(interaction.state);
    }

    // Toggle state if it's a toggle interaction
    if (interaction.type === 'toggle') {
      const states = interaction.states || ['default', 'active'];
      const currentIndex = states.indexOf(interaction.state);
      const nextIndex = (currentIndex + 1) % states.length;
      interaction.state = states[nextIndex];
      
      // Trigger state change callback
      if (interaction.onStateChange) {
        interaction.onStateChange(interaction.state);
      }
    }
  }

  /**
   * Handle pointer over event
   * @param {string} id - Object identifier
   * @param {Event} event - Pointer event
   */
  handlePointerOver(id, event) {
    event.stopPropagation();
    this.hoveredObject = id;
    document.body.style.cursor = 'pointer';
    
    const interaction = this.interactions.get(id);
    if (interaction?.onHover) {
      interaction.onHover(true);
    }
  }

  /**
   * Handle pointer out event
   * @param {string} id - Object identifier
   * @param {Event} event - Pointer event
   */
  handlePointerOut(id, event) {
    event.stopPropagation();
    this.hoveredObject = null;
    document.body.style.cursor = 'default';
    
    const interaction = this.interactions.get(id);
    if (interaction?.onHover) {
      interaction.onHover(false);
    }
  }

  /**
   * Get current state of an interactive object
   * @param {string} id - Object identifier
   * @returns {string} Current state
   */
  getState(id) {
    const interaction = this.interactions.get(id);
    return interaction?.state || 'default';
  }

  /**
   * Set state of an interactive object
   * @param {string} id - Object identifier
   * @param {string} state - New state
   */
  setState(id, state) {
    const interaction = this.interactions.get(id);
    if (interaction) {
      interaction.state = state;
      if (interaction.onStateChange) {
        interaction.onStateChange(state);
      }
    }
  }

  /**
   * Unregister an interactive object
   * @param {string} id - Object identifier
   */
  unregister(id) {
    this.interactions.delete(id);
  }

  /**
   * Clear all interactions
   */
  clear() {
    this.interactions.clear();
    this.hoveredObject = null;
    document.body.style.cursor = 'default';
  }
}

// Export singleton instance
export const interactionManager = new InteractionManager();
