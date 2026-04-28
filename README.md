# SportSentinel AI 🛡️

**SportSentinel AI** is an AI + Blockchain-powered platform that proactively authenticates official sports media, tracks it across the global internet in near real-time, and enables instant flagging/takedown with verifiable legal proof.

## 🚀 Hackathon MVP Features
- **Instant Media Upload**: Auto forensic watermarking + blockchain registration.
- **Global AI Monitoring**: Perceptual hashing (pHash) for deep similarity matching.
- **Sentinel Dashboard**: Real-time alerts, protection stats, and propagation tracking.
- **Blockchain Provenance**: Immutable ownership records (Polygon/IPFS simulation).

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS (v4), Framer Motion, Lucide Icons, Recharts.
- **Backend**: Python FastAPI, OpenCV, ImageHash, PIL.
- **Blockchain**: Polygon (Smart Contracts simulation).

## 🏃 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🛡️ Core AI Logic
The system uses **Perceptual Hashing (pHash)** to generate a digital fingerprint of media assets. Unlike cryptographic hashes, pHash is resilient to resizing, compression, and minor edits—making it perfect for tracking unauthorized social media shares of sports highlights.
