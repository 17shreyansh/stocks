import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AccessibilityContext = createContext();

const DEFAULT_SETTINGS = {
  textSize: 1,
  textSpacing: 0,
  lineHeight: 1.5,
  dyslexiaFont: false,
  adhdMode: false,
  saturation: 100,
  invertColors: false,
  highlightLinks: false,
  cursorSize: 1,
  pauseAnimations: false,
  hideImages: false
};

const STORAGE_KEY = 'accessibility_settings';

// Check if settings are equal to defaults (so we don't persist pointlessly)
const isDefault = (s) => JSON.stringify(s) === JSON.stringify(DEFAULT_SETTINGS);

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Track whether this is a reset so we skip saving to localStorage
  const isResetting = useRef(false);

  // Apply settings to DOM
  useEffect(() => {
    const root = document.documentElement;

    // ── Font size ──────────────────────────────────────────────────────────
    // Set on <html> so rem units scale throughout the document.
    // This avoids the compounding problem of applying to every `*` with em.
    if (settings.textSize !== 1) {
      root.style.setProperty('font-size', `calc(100% * ${settings.textSize})`);
      root.setAttribute('data-a11y-active', 'true');
    } else {
      root.style.removeProperty('font-size');
      root.removeAttribute('data-a11y-active');
    }

    // ── Letter & word spacing ──────────────────────────────────────────────
    if (settings.textSpacing !== 0) {
      root.style.setProperty('--a11y-letter-spacing', `${settings.textSpacing}px`);
      root.style.setProperty('--a11y-word-spacing', `${settings.textSpacing * 2}px`);
      root.classList.add('a11y-spacing-active');
    } else {
      root.style.removeProperty('--a11y-letter-spacing');
      root.style.removeProperty('--a11y-word-spacing');
      root.classList.remove('a11y-spacing-active');
    }

    // ── Line height ────────────────────────────────────────────────────────
    if (settings.lineHeight !== 1.5) {
      root.style.setProperty('--a11y-line-height', settings.lineHeight);
      root.classList.add('a11y-lineheight-active');
    } else {
      root.style.removeProperty('--a11y-line-height');
      root.classList.remove('a11y-lineheight-active');
    }

    // ── Boolean toggle classes ─────────────────────────────────────────────
    root.classList.toggle('a11y-dyslexia-font',    settings.dyslexiaFont);
    root.classList.toggle('a11y-adhd-mode',        settings.adhdMode);
    root.classList.toggle('a11y-highlight-links',  settings.highlightLinks);
    root.classList.toggle('a11y-pause-animations', settings.pauseAnimations);
    root.classList.toggle('a11y-hide-images',      settings.hideImages);

    // ── Visual filters (saturation + invert) ──────────────────────────────
    // Combine into a single filter string on <html> so they work together.
    // Pure identity values (saturate 100%, no invert) → remove the property
    // so we don't create an unnecessary stacking context.
    const parts = [];
    if (settings.invertColors) {
      parts.push('invert(1) hue-rotate(180deg)');
      root.classList.add('a11y-invert-active');
    } else {
      root.classList.remove('a11y-invert-active');
    }
    if (settings.saturation !== 100) parts.push(`saturate(${settings.saturation}%)`);

    if (parts.length > 0) {
      root.style.setProperty('--a11y-filter', parts.join(' '));
      root.classList.add('a11y-filter-active');
    } else {
      root.style.removeProperty('--a11y-filter');
      root.classList.remove('a11y-filter-active');
    }

    // ── Cursor size ────────────────────────────────────────────────────────
    root.style.setProperty('--a11y-cursor-size', settings.cursorSize);

    // ── Persist ────────────────────────────────────────────────────────────
    if (isResetting.current) {
      // Don't re-save after a reset — leave storage empty
      isResetting.current = false;
      return;
    }
    try {
      if (isDefault(settings)) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      }
    } catch (e) {
      console.error('Failed to save accessibility settings:', e);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    isResetting.current = true;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
    setSettings(DEFAULT_SETTINGS);
  };

  // Keyboard shortcut: Ctrl+F2
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'F2') {
        e.preventDefault();
        setIsPanelOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = {
    settings,
    updateSetting,
    resetSettings,
    isPanelOpen,
    setIsPanelOpen
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};