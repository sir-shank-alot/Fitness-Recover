import { AthleteProfile } from '../types/training';

export const ATHLETE_PROFILES: Record<'arwel' | 'helen', AthleteProfile> = {
  arwel: {
    id: 'arwel',
    name: 'Arwel Thomas',
    age: 63,
    gender: 'Male',
    weightKg: 71,
    race: 'Auckland Marathon',
    focusAreas: [
      'Adductor longus recovery & active hip flexion / toe clearance',
      'Anti-extension core control & lumbar facet decompression',
      'Gluteus medius strengthening to unload tight IT bands',
      'Low-shear quadriceps strengthening (VMO) for arthritic right knee'
    ],
    equipmentRecommended: [
      'Small soccer ball or yoga block (adductor isometric squeeze)',
      'Loop resistance bands (light & medium)',
      'Stable chair or low 4-inch step/box',
      'Smooth wall for wall sits & TKEs',
      'Foam roller (for glutes/TFL, avoid direct bone rubbing)'
    ],
    injuries: [
      {
        title: 'Right Adductor Strain & Ground Scuffing',
        clinicalName: 'Adductor Longus / Brevis Strain & Hip Flexor Kinetic Disruption',
        description: 'Strained right adductor resulting in difficulty actively pulling the right leg through during the swing phase, causing the right toe to scuff the ground.',
        gaitImpact: 'Loss of hip flexion power and active pelvic stabilization during initial swing phase; compensatory pelvic hitching and reduced stride length on right side.',
        rehabStrategy: 'Progressive isometric adductor loading (ball squeeze), short-lever Copenhagen planks, followed by banded hip flexion + dorsiflexion pull-through to restore active ground clearance.',
        bannedMovements: ['Aggressive wide-stance Cossack squats under heavy load', 'Sudden sprinting or ballistic groin stretches', 'Running through sharp groin pinch']
      },
      {
        title: 'Lumbar Extension Overload & Facet Irritation',
        clinicalName: 'Lumbar Facet Joint Syndrome & Erector Spinae Hypertonicity',
        description: 'Lower back pain caused by running with an overly upright, hyperextended trunk posture, compressing the posterior lumbar facet joints.',
        gaitImpact: 'Running with a rigid, vertical or backward-leaning torso rather than an athletic forward lean from the ankles, forcing the lumbar spine to absorb repeated ground impact.',
        rehabStrategy: 'McGill Big 3 (Modified Curl-Up, Side Bridge, Bird Dog), Dead Bugs, and neutral-spine hip hinging to teach pelvic control and posterior chain drive without lumbar arching.',
        bannedMovements: ['Lumbar hyperextension (Cobra stretch, Roman chair back extensions without pelvic lock)', 'Heavy overhead pressing', 'Running with an arch in the lower back']
      },
      {
        title: 'Bilateral Post-Race IT Band Stiffness',
        clinicalName: 'Iliotibial Band Friction / TFL Overcompensation',
        description: 'Stiff IT bands post-marathon due to fatigued gluteal stabilizers forcing the Tensor Fasciae Latae (TFL) to overwork in holding the pelvis level.',
        gaitImpact: 'Contralateral pelvic drop (Trendelenburg sign) causing increased tensile strain along the lateral knee and distal IT band.',
        rehabStrategy: 'Targeted gluteus medius and minimus strengthening (clamshells, banded bridges, side-lying abduction with slight hip extension) plus soft-tissue release of the TFL muscle belly.',
        bannedMovements: ['Aggressively rolling directly onto the lateral femoral epicondyle / knee bone', 'Excessive downhill running until hip abduction strength returns']
      },
      {
        title: 'Mild Arthritic Right Knee',
        clinicalName: 'Mild Right Knee Osteoarthritis (Tibiofemoral & Patellofemoral)',
        description: 'Pre-existing uncomfortable arthritic right knee that remained manageable during the race but requires dedicated joint protection and muscle buffering.',
        gaitImpact: 'Tendency to reduce knee flexion angle at impact; risk of knee valgus collapse if hip abductors fatigue.',
        rehabStrategy: 'Low-shear closed kinetic chain quad strengthening: Terminal Knee Extensions (TKEs) with resistance bands, isometric wall sits, and controlled low step-downs.',
        bannedMovements: ['Deep loaded squats past 90 degrees under fatigue', 'Heavy open-chain knee extension machine', 'High-impact plyometrics during acute recovery phase']
      }
    ]
  },
  helen: {
    id: 'helen',
    name: 'Helen Shanley',
    age: 58,
    gender: 'Female',
    weightKg: 59,
    race: 'Auckland Marathon',
    focusAreas: [
      'Rathleff Protocol for high-load plantar fascia remodeling',
      'GTPS / Gluteal tendinopathy rehab (strictly avoiding compressive adduction)',
      'Soleus & posterior tibialis strengthening (shock absorption for running)',
      'Joint-friendly, grip-free upper & lower body strength (protecting inflamed wrists/fingers)'
    ],
    equipmentRecommended: [
      'Rolled hand towel (for big toe dorsiflexion under foot during calf raises)',
      'Sturdy staircase step or aerobic step box',
      'Medium resistance loop band (around knees/ankles/forearms)',
      'Chair / bed for forearm-supported exercises',
      'Yoga mat & soft pillow (to place between knees during sleep and side-lying work)'
    ],
    injuries: [
      {
        title: 'Intermittent Plantar Fasciitis',
        clinicalName: 'Plantar Fasciopathy & Calcaneal Enthesopathy',
        description: 'Intermittent stabbing or aching heel pain along the medial calcaneal tubercle, typically worse upon first steps in the morning or after prolonged rest.',
        gaitImpact: 'Reluctance to push off fully through the 1st metatarsophalangeal (MTP) joint, resulting in premature heel lift, foot supination, and reduced propulsion efficiency.',
        rehabStrategy: 'The gold-standard Rathleff Protocol: high-load, slow eccentric-concentric calf raises with a rolled towel under the toes to recruit the windlass mechanism and remodel collagen.',
        bannedMovements: ['Barefoot walking on hardwood/tile during flare-ups', 'Aggressive cold calf stretching', 'Fast ballistic calf bouncing']
      },
      {
        title: 'Hip Pain (Greater Trochanteric Pain Syndrome)',
        clinicalName: 'Gluteus Medius/Minimus Tendinopathy & Sub-gluteal Bursal Irritation',
        description: 'Lateral hip pain near the greater trochanter, aggravated by lying on the affected side, prolonged standing, or crossing the legs.',
        gaitImpact: 'Pelvic drop on the swing side causing increased tensile compression of the gluteus medius tendon over the greater trochanter.',
        rehabStrategy: 'Isometric glute medius loading in neutral or slight abduction (wall pushes, side planks with bent knees), strictly avoiding cross-body adduction stretches that compress the tendon!',
        bannedMovements: [
          'Cross-body IT band stretches or Pigeon pose (compresses tendon against bone!)',
          'Standing with all weight pushed into one hip ("hanging on the hip")',
          'Sitting with legs crossed or knees clamped together',
          'Sleeping without a pillow between the knees'
        ]
      },
      {
        title: 'Joint Inflammation in Fingers, Thumbs, Wrists, & Elbows',
        clinicalName: 'Hormonal / Postmenopausal Arthralgia & Inflammatory Synovitis',
        description: 'Aching, stiffness, and joint sensitivity in the upper extremities (wrists, thumb CMC joints, fingers, and elbows), likely related to hormonal shifts and joint changes.',
        gaitImpact: 'Arm swing compensation if wrists or elbows are tender; risk of gripping tension traveling into neck and shoulders during running.',
        rehabStrategy: 'Complete elimination of heavy gripping, barbell holding, or wrist hyperextension. All exercises utilize forearm supports, hands-free loop bands around thighs/ankles, bodyweight, or open-palm setups.',
        bannedMovements: [
          'Push-ups on flat palms (extreme wrist extension)',
          'Heavy dumbbell farmer carries or heavy barbell deadlifts with tight hand grip',
          'Bar hanging or pull-ups',
          'Small-diameter dumbbell squeezing'
        ]
      }
    ]
  }
};
