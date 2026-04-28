import cv2
import numpy as np
from PIL import Image
import imagehash
import os

def generate_perceptual_hash(image_path):
    """
    Generates a perceptual hash for an image. 
    pHash is resilient to resizing and minor color changes.
    """
    hash = imagehash.phash(Image.open(image_path))
    return str(hash)

def compare_hashes(hash1_str, hash2_str):
    """
    Compares two pHash strings. Returns a similarity score (0.0 to 1.0).
    A lower Hamming distance means higher similarity.
    """
    h1 = imagehash.hex_to_hash(hash1_str)
    h2 = imagehash.hex_to_hash(hash2_str)
    
    # Hamming distance (max 64 for a 64-bit hash)
    distance = h1 - h2
    
    # Normalize to a similarity score (0.0 to 1.0)
    similarity = 1 - (distance / 64.0)
    return similarity

def apply_invisible_watermark(image_path, output_path, secret_key="SENTINEL"):
    """
    Placeholder for invisible watermarking using Discrete Cosine Transform (DCT).
    For the MVP, we'll simulate this by adding metadata or a subtle alpha-channel change.
    """
    img = cv2.imread(image_path)
    if img is None:
        return False
    
    # SIMULATION: In a real hackathon, we'd use a library like 'stegano' or 
    # implement a DCT-based spread-spectrum watermark.
    # For now, let's just save the file to signify the process.
    cv2.imwrite(output_path, img)
    return True

def detect_anomaly(propagation_data):
    """
    Simple heuristic for anomaly detection.
    Real implementation would use a GNN or ML model to find spikes in non-authorized nodes.
    """
    # Logic: If views/shares spike > 300% in < 5 mins from an unknown source
    pass
