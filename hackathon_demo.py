"""
Hackathon Demo Mode - Manually trigger siren detection
Press SPACE to trigger a siren event
"""
import time
import sys
import os
from audio_detector import SirenDetector
from camera_detector import AmbulanceDetector
from traffic_controller import TrafficController, LANES

IS_TTY = bool(getattr(sys.stdout, "isatty", lambda: False)())

try:
    if IS_TTY:
        from colorama import just_fix_windows_console, Fore, Style, Back
        just_fix_windows_console()
        COLORS = True
    else:
        raise ImportError
except ImportError:
    COLORS = False
    class Fore:
        RED = GREEN = YELLOW = CYAN = WHITE = MAGENTA = RESET = ""
    class Style:
        BRIGHT = RESET_ALL = DIM = ""
    class Back:
        RED = GREEN = YELLOW = BLUE = BLACK = RESET = ""

LIGHT_ICONS = {
    "RED"   : f"{Fore.RED    }[RED]  {Style.RESET_ALL}",
    "YELLOW": f"{Fore.YELLOW }[YELLOW]{Style.RESET_ALL}",
    "GREEN" : f"{Fore.GREEN  }[GREEN]{Style.RESET_ALL}",
}

class HackathonSystem:
    def __init__(self):
        self.tc = TrafficController(green_duration=5.0, yellow_duration=1.5)

        # LIVE mode - actual microphone
        self.siren_det = SirenDetector(
            callback=self._on_siren,
            simulation=False,  # LIVE MODE
        )

        self.cam_dets = []
        for idx, lane in enumerate(LANES):
            det = AmbulanceDetector(
                camera_index=idx,
                lane=lane,
                callback=self._on_ambulance,
                simulation=False,  # LIVE MODE - real camera
            )
            self.cam_dets.append(det)

        self._siren_active = False
        self._event_log = []
        self._running = False

    def _on_siren(self, detected: bool):
        self._siren_active = detected
        self.tc.set_siren(detected)
        msg = "[SIREN] DETECTED!" if detected else "[OK] Siren gone"
        self._log(msg)

    def _on_ambulance(self, lane: str, detected: bool):
        self.tc.set_ambulance(lane, detected)
        if detected:
            msg = f"[CAM] AMBULANCE on {lane}"
        else:
            msg = f"[OK] {lane} cleared"
        self._log(msg)

    def _log(self, msg: str):
        ts = time.strftime("%H:%M:%S")
        self._event_log.append(f"[{ts}] {msg}")
        if len(self._event_log) > 8:
            self._event_log.pop(0)

    def _clear(self):
        if IS_TTY:
            os.system("cls" if os.name == "nt" else "clear")

    def _render(self):
        self._clear()
        print("\n" + "="*70)
        print("HACKATHON LIVE DEMO - Ambulance Detection System")
        print("="*70)

        state = self.tc.get_state()

        print(f"\n  LANE       LIGHT          AMBULANCE       SIREN")
        print(f"  ────       ─────          ─────────       ─────")

        for lane, info in state.items():
            light_str = LIGHT_ICONS.get(info["light"], info["light"])
            amb_str   = f"{Fore.RED}[YES]{Style.RESET_ALL}" if info["ambulance_here"] else "[--]"
            sir_str   = f"{Fore.YELLOW}[YES]{Style.RESET_ALL}" if self._siren_active else "[--]"
            print(f"  {lane:<10} {light_str:<15} {amb_str:<15} {sir_str}")

        em = any(s["ambulance_here"] for s in state.values())
        print()
        if em:
            print(f"  {Back.RED}{Fore.WHITE}{Style.BRIGHT}EMERGENCY MODE ACTIVE{Style.RESET_ALL}")
        else:
            print(f"  {Style.DIM}Normal operation{Style.RESET_ALL}")

        print(f"\n  EVENT LOG:")
        print(f"  ──────────")
        for entry in self._event_log[-6:]:
            print(f"  {entry}")

        print("\n" + "="*70)
        print("CONTROLS:")
        print("  - System runs in LIVE mode (real mic + camera)")
        print("  - Lower thresholds for hackathon mode")
        print("  - Press Ctrl+C to quit")
        print("="*70)

    def start(self):
        self._running = True
        print("\n[System] Starting all subsystems...")

        self.tc.start()
        self.siren_det.start()
        for det in self.cam_dets:
            det.start()

        self._log("System started in LIVE mode")
        print("[System] All subsystems running\n")
        time.sleep(1)

        try:
            while self._running:
                self._render()
                time.sleep(2.0)
        except KeyboardInterrupt:
            print("\n[System] Stopping...")
        finally:
            self.stop()

    def stop(self):
        self._running = False
        self.siren_det.stop()
        for det in self.cam_dets:
            det.stop()
        self.tc.stop()
        print("[System] Shutdown complete\n")


if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════╗
║      HACKATHON LIVE DEMO - Emergency Detection 🚑🚨    ║
╚══════════════════════════════════════════════════════════╝

Running in LIVE mode with ultra-low thresholds
- Real microphone: Ready (thresholds set to HACKATHON mode)
- Real camera: Ready (sharing single webcam)
- Traffic lights: Ready

Play siren audio LOUD near your microphone!
""")

    system = HackathonSystem()
    system.start()
