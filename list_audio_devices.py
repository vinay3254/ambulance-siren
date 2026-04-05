"""
List all audio input and output devices
"""
import sounddevice as sd

print("\n" + "="*70)
print("AUDIO DEVICES AVAILABLE ON THIS SYSTEM")
print("="*70 + "\n")

devices = sd.query_devices()

print(f"Total devices: {len(devices)}\n")

for idx, device in enumerate(devices):
    is_default = ""
    if idx == sd.default.device[0]:
        is_default = " <-- DEFAULT INPUT"
    elif idx == sd.default.device[1]:
        is_default = " <-- DEFAULT OUTPUT"

    in_chans = device['max_input_channels']
    out_chans = device['max_output_channels']

    print(f"[{idx}] {device['name']}")
    print(f"     Input channels: {in_chans}, Output channels: {out_chans}")
    print(f"     Sample rate: {device['default_samplerate']} Hz")
    if in_chans > 0:
        print(f"     [INPUT DEVICE]{is_default}")
    if out_chans > 0:
        print(f"     [OUTPUT DEVICE]{is_default}")
    print()

print("\nTo use a specific device, modify the camera_detector.py or audio_detector.py")
print("and pass 'device=INDEX' to the InputStream() call")
print("="*70 + "\n")
