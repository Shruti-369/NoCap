# React + Vite - Fake News Detector

This project is a React-based Front End for the Fake News Detection system.

## HackJNU 4.0 Prize Tracks Integration

### 1. ETH India (Web3)
- **Feature**: Connect MetaMask and "Sign" your verification results.
- **Usage**: Click "Connect Wallet" in the top right. After getting a prediction, click "Sign Check".

### 2. Requestly (Dev Tools)
- **Feature**: Redirect traffic from known fake sites to our local detector.
- **Usage**:
  1. Install [Requestly Browser Extension](https://requestly.io/).
  2. Open Requestly -> Rules -> Upload Rule.
  3. Upload `../requestly_rules.json`.
  4. Visit `http://example-fake.com` and watch it redirect here!

### 3. ArmorIQ (AI Security)
- **Feature**: The Python backend is protected by ArmorIQ against malicious prompts.
- **Usage**: The system automatically scans input for injection attacks before processing.

## Setup
1. `npm install`
2. `npm run dev`
