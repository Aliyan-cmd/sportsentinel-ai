# Use Python 3.12 slim
FROM python:3.12-slim

# Install system dependencies for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend and frontend/dist
COPY backend /app/backend
COPY frontend/dist /app/frontend/dist

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Set environment variables
ENV PORT=8080

# Run the application
CMD ["python", "backend/main.py"]
