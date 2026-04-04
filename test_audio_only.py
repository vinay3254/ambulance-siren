"""
Simple audio-only test to demonstrate siren detection
"""
from audio_detector import SirenDetector
import time

print("\n" + "="*60)
print("🎙️  AMBULANCE SIREN AUDIO DETECTOR TEST")
print("="*60)
print("\n📊 This will show you REAL-TIME audio analysis:")
print("   - Energy levels in siren frequency band (700-1800 Hz)")
print("   - Hit counter showing consecutive detections")
print("   - Final detection when threshold is reached")
print("\n🎵 TEST IT: Play an ambulance siren sound on YouTube!")
print("   Search: 'ambulance siren sound effect'")
print("\n⏱️  Running for 60 seconds... Press Ctrl+C to stop early\n")
print("="*60 + "\n")

def on_siren(detected):
    if detected:
        print("\n" + "🚨"*20)
        print("🔴  SIREN DETECTED - EMERGENCY MODE ACTIVATED! 🔴")
        print("🚨"*20 + "\n")
    else:
        print("\n✅ Siren cleared - returning to normal mode\n")

detector = SirenDetector(callback=on_siren, simulation=False)
detector.start()

try:
    time.sleep(60)
except KeyboardInterrupt:
    print("\n\n[TEST] Stopping...")

detector.stop()
print("\n[TEST] ✅ Test complete!\n")
