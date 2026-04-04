## 🧪 HOW TO TEST YOUR AMBULANCE DETECTION SYSTEM

### ✅ STEP-BY-STEP TESTING GUIDE

---

## METHOD 1: Audio Test Only (Easiest)

1. **Open Command Prompt or PowerShell**

2. **Run this command:**
   ```
   cd C:\Users\Admin\ambulance_siren
   python test_audio_only.py
   ```

3. **You'll see:**
   - Real-time energy readings: `[DEBUG] Audio energy in siren band: 0.050`
   - Normal background should be around 0.05 (5%)

4. **Play ambulance siren on YouTube:**
   - Open YouTube
   - Search: "ambulance siren sound effect"
   - Click any video with a loud siren
   - **TURN UP THE VOLUME** near your microphone

5. **Watch for detection:**
   ```
   [DEBUG] Audio energy in siren band: 0.831  <- SPIKE!
   [DEBUG] Hit detected! Consecutive hits: 1/8
   [DEBUG] Hit detected! Consecutive hits: 2/8
   ...
   [DEBUG] Hit detected! Consecutive hits: 8/8
   
   🚨🚨🚨 SIREN DETECTED - EMERGENCY MODE ACTIVATED! 🚨🚨🚨
   ```

6. **Stop the video** - you'll see:
   ```
   ✅ Siren cleared - returning to normal mode
   ```

---

## METHOD 2: Full System Test (Camera + Audio)

1. **Run the full system:**
   ```
   cd C:\Users\Admin\ambulance_siren
   python main.py --live
   ```

2. **You'll see a live dashboard:**
   ```
   ────────────────────────────────────────
   🚑  AMBULANCE EMERGENCY DETECTION SYSTEM
   ────────────────────────────────────────
   
   LANE       LIGHT        AMBULANCE    SIREN
   NORTH      🟢 GREEN     --           --
   SOUTH      🔴 RED       --           --
   EAST       🔴 RED       --           --
   WEST       🔴 RED       --           --
   ```

3. **Play ambulance siren** (same as Method 1)

4. **Watch for changes:**
   - SIREN column shows: 🔊 YES
   - Event log shows: [TIME] 🚨 SIREN DETECTED
   - System responds to the emergency

5. **Stop with Ctrl+C**

---

## METHOD 3: Demo Mode (Simulated Ambulances)

**If you don't want to play sounds:**

```
cd C:\Users\Admin\ambulance_siren
python main.py --live --demo
```

This will:
- Use your REAL camera and microphone
- But ADD simulated ambulances every few seconds
- You can see how the system responds

---

## 🎯 WHAT TO LOOK FOR (WORKING SYSTEM):

### ✅ Audio Detection Working:
- Energy readings change when you make noise
- Background: ~0.05
- Loud siren: 0.6-0.9
- Detection after 8 consecutive hits

### ✅ Camera Working:
- Shows: `[CameraDetector:NORTH] Initialised (camera #0)`
- No errors about camera access

### ✅ Traffic Controller Working:
- Lights rotate: GREEN → YELLOW → RED
- Changes happen every 10 seconds (or 5 in demo)

---

## ❌ TROUBLESHOOTING:

### "No detection when playing siren"
- **Volume too low** - turn it up!
- **Wrong frequency** - try different siren videos
- **Threshold too high** - normal for real-world use

### "Camera errors"
- Normal if you only have 1 webcam
- System shares it across all 4 lanes

### "Can't hear audio/see output"
- Make sure your default microphone is set correctly
- Check Windows sound settings

---

## 🏆 BEST TEST VIDEOS ON YOUTUBE:

Search for:
- "ambulance siren sound effect"
- "emergency vehicle siren"
- "wee woo siren 10 hours"

Play it LOUD at your microphone!

---

## QUICK ONE-LINER TEST:

```bash
cd C:\Users\Admin\ambulance_siren && python test_audio_only.py
```

Then play siren on YouTube. Done! ✅
