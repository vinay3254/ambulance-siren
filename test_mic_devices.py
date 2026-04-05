"""
Test different microphones to find one that's actually working
"""
import sounddevice as sd
import numpy as np
import time

# Try these microphone devices
MICS_TO_TEST = [
    (1, "Microphone Array (2- Intel® Sma)"),
    (6, "Microphone Array (2- Intel® Smart Sound)"),
    (12, "Microphone Array @ 48kHz"),
    (15, "Stereo Mix (Realtek)"),
    (19, "Microphone (Realtek HD Audio Mic input)"),
    (23, "Microphone Array 1"),
    (24, "Microphone Array 2"),
]

print("\n" + "="*70)
print("TESTING MICROPHONE DEVICES")
print("="*70)
print("\nSpeaking now... Testing each microphone for ~3 seconds\n")

for device_id, device_name in MICS_TO_TEST:
    try:
        print(f"[{device_id}] Testing: {device_name}...", end=" ", flush=True)

        # Record for 3 seconds
        with sd.InputStream(device=device_id, channels=1, dtype='float32', blocksize=1024) as stream:
            max_amplitude = 0.0
            samples_read = 0

            for _ in range(30):  # ~3 seconds at 10fps
                data, _ = stream.read(1024)
                chunk = data[:, 0] if data.ndim > 1 else data
                amplitude = np.abs(chunk).max()
                max_amplitude = max(max_amplitude, amplitude)
                samples_read += 1
                time.sleep(0.1)

        if max_amplitude > 0.05:
            print(f"✅ WORKING! (max amplitude: {max_amplitude:.4f})")
        elif max_amplitude > 0.01:
            print(f"⚠️  Quiet but working (max amplitude: {max_amplitude:.4f})")
        else:
            print(f"❌ NOT WORKING (max amplitude: {max_amplitude:.4f} - basically silent)")

    except Exception as e:
        print(f"❌ ERROR: {str(e)[:40]}")

print("\n" + "="*70)
print("Which microphone showed ✅ WORKING? Use that device ID!")
print("="*70 + "\n")
