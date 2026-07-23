import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

// ─── Styled Components ────────────────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10001;
  backdrop-filter: blur(4px);
`;

const Panel = styled(motion.section)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 420px;
  max-width: 90vw;
  background: white;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.2);
  z-index: 10002;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1f2937;
`;

const Control = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    transition: transform 0.2s, background 0.2s;

    &:hover {
      transform: scale(1.2);
      background: #2980b9;
    }
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    border: none;
    transition: transform 0.2s, background 0.2s;

    &:hover {
      transform: scale(1.2);
      background: #2980b9;
    }
  }
`;

// FIX: Use a real <button> with explicit pseudo-element positioning.
// The previous version had nested `&:hover` inside `&::after` which is
// not valid CSS — you can't hover a pseudo-element that way.
const Toggle = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  background: ${({ $active }) => ($active ? '#3498db' : '#d1d5db')};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${({ $active }) => ($active ? '25px' : '3px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: left 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Btn = styled.button`
  width: 100%;
  padding: 10px 8px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
  background: ${({ $variant }) => ($variant === 'danger' ? '#ef4444' : 'white')};
  color:      ${({ $variant }) => ($variant === 'danger' ? 'white'   : '#374151')};

  &:hover:not(:disabled) {
    transform:   translateY(-2px);
    box-shadow:  0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #3498db;
    background:  ${({ $variant }) => ($variant === 'danger' ? '#dc2626' : '#f0f9ff')};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3498db;
`;

// ─── Component ────────────────────────────────────────────────────────────────

const AccessibilityPanel = () => {
  const {
    settings,
    updateSetting,
    resetSettings,
    isPanelOpen,
    setIsPanelOpen
  } = useAccessibility();

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/*
           * FIX: className="a11y-keep" on both Overlay and Panel prevents the
           * accessibility widget from being affected by its own CSS effects
           * (image hiding, animation pausing, etc.).
           */}
          <Overlay
            className="a11y-keep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
          />

          <Panel
            className="a11y-keep"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility Settings"
          >
            <Header>
              <Title>Accessibility</Title>
              <Subtitle>Customize your reading experience</Subtitle>
              <CloseButton
                onClick={() => setIsPanelOpen(false)}
                aria-label="Close accessibility panel"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </CloseButton>
            </Header>

            <Content>

              {/* ── Text Adjustments ────────────────────────────────────── */}
              <Section>
                <SectionTitle>Text Adjustments</SectionTitle>

                <Control>
                  <Label>
                    Text Size
                    <Value>{Math.round(settings.textSize * 100)}%</Value>
                  </Label>
                  <ButtonGroup>
                    <Btn
                      disabled={settings.textSize <= 0.7}
                      onClick={() =>
                        updateSetting('textSize', parseFloat(Math.max(0.7, settings.textSize - 0.1).toFixed(1)))
                      }
                    >
                      −
                    </Btn>
                    <Btn onClick={() => updateSetting('textSize', 1)}>Reset</Btn>
                    <Btn
                      disabled={settings.textSize >= 1.5}
                      onClick={() =>
                        updateSetting('textSize', parseFloat(Math.min(1.5, settings.textSize + 0.1).toFixed(1)))
                      }
                    >
                      +
                    </Btn>
                  </ButtonGroup>
                </Control>

                <Control>
                  <Label>
                    Text Spacing
                    <Value>{settings.textSpacing}px</Value>
                  </Label>
                  <ButtonGroup>
                    <Btn
                      disabled={settings.textSpacing <= 0}
                      onClick={() =>
                        updateSetting('textSpacing', Math.max(0, settings.textSpacing - 0.5))
                      }
                    >
                      −
                    </Btn>
                    <Btn onClick={() => updateSetting('textSpacing', 0)}>Reset</Btn>
                    <Btn
                      disabled={settings.textSpacing >= 5}
                      onClick={() =>
                        updateSetting('textSpacing', Math.min(5, settings.textSpacing + 0.5))
                      }
                    >
                      +
                    </Btn>
                  </ButtonGroup>
                </Control>

                <Control>
                  <Label>
                    Line Height
                    <Value>{settings.lineHeight.toFixed(1)}</Value>
                  </Label>
                  <ButtonGroup>
                    <Btn
                      disabled={settings.lineHeight <= 1.2}
                      onClick={() =>
                        updateSetting('lineHeight', parseFloat(Math.max(1.2, settings.lineHeight - 0.1).toFixed(1)))
                      }
                    >
                      −
                    </Btn>
                    <Btn onClick={() => updateSetting('lineHeight', 1.5)}>Reset</Btn>
                    <Btn
                      disabled={settings.lineHeight >= 2.5}
                      onClick={() =>
                        updateSetting('lineHeight', parseFloat(Math.min(2.5, settings.lineHeight + 0.1).toFixed(1)))
                      }
                    >
                      +
                    </Btn>
                  </ButtonGroup>
                </Control>
              </Section>

              {/* ── Reading Modes ───────────────────────────────────────── */}
              <Section>
                <SectionTitle>Reading Modes</SectionTitle>

                <Control>
                  <Label>
                    Dyslexia Friendly Font
                    <Toggle
                      $active={settings.dyslexiaFont}
                      onClick={() => updateSetting('dyslexiaFont', !settings.dyslexiaFont)}
                      aria-pressed={settings.dyslexiaFont}
                      aria-label="Toggle dyslexia friendly font"
                    />
                  </Label>
                </Control>

                <Control>
                  <Label>
                    ADHD Focus Mode
                    <Toggle
                      $active={settings.adhdMode}
                      onClick={() => updateSetting('adhdMode', !settings.adhdMode)}
                      aria-pressed={settings.adhdMode}
                      aria-label="Toggle ADHD focus mode"
                    />
                  </Label>
                </Control>
              </Section>

              {/* ── Visual Adjustments ──────────────────────────────────── */}
              <Section>
                <SectionTitle>Visual Adjustments</SectionTitle>

                <Control>
                  <Label>
                    Color Saturation
                    <Value>{settings.saturation}%</Value>
                  </Label>
                  <Slider
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={settings.saturation}
                    onChange={(e) => updateSetting('saturation', parseInt(e.target.value, 10))}
                    aria-label="Color saturation"
                  />
                </Control>

                <Control>
                  <Label>
                    Invert Colors
                    <Toggle
                      $active={settings.invertColors}
                      onClick={() => updateSetting('invertColors', !settings.invertColors)}
                      aria-pressed={settings.invertColors}
                      aria-label="Toggle invert colors"
                    />
                  </Label>
                </Control>

                <Control>
                  <Label>
                    Highlight Links
                    <Toggle
                      $active={settings.highlightLinks}
                      onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                      aria-pressed={settings.highlightLinks}
                      aria-label="Toggle highlight links"
                    />
                  </Label>
                </Control>

                <Control>
                  <Label>
                    Hide Images
                    <Toggle
                      $active={settings.hideImages}
                      onClick={() => updateSetting('hideImages', !settings.hideImages)}
                      aria-pressed={settings.hideImages}
                      aria-label="Toggle hide images"
                    />
                  </Label>
                </Control>
              </Section>

              {/* ── Interaction ─────────────────────────────────────────── */}
              <Section>
                <SectionTitle>Interaction</SectionTitle>

                <Control>
                  <Label>
                    Cursor Size
                    <Value>{settings.cursorSize}×</Value>
                  </Label>
                  <Slider
                    type="range"
                    min="1"
                    max="3"
                    step="0.5"
                    value={settings.cursorSize}
                    onChange={(e) => updateSetting('cursorSize', parseFloat(e.target.value))}
                    aria-label="Cursor size"
                  />
                </Control>

                <Control>
                  <Label>
                    Pause Animations
                    <Toggle
                      $active={settings.pauseAnimations}
                      onClick={() => updateSetting('pauseAnimations', !settings.pauseAnimations)}
                      aria-pressed={settings.pauseAnimations}
                      aria-label="Toggle pause animations"
                    />
                  </Label>
                </Control>
              </Section>

              {/* ── Reset ───────────────────────────────────────────────── */}
              <Section>
                <Btn $variant="danger" onClick={resetSettings}>
                  Reset All Settings
                </Btn>
              </Section>

            </Content>
          </Panel>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccessibilityPanel;