export interface GoogleDriveFile {
  id: string;
  name: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
}

export interface GooglePresentationSlide {
  objectId: string;
  slideProperties?: {
    layoutObjectId?: string;
    masterObjectId?: string;
  };
}

export interface GooglePresentation {
  presentationId: string;
  title: string;
  slides?: GooglePresentationSlide[];
  pageSize?: {
    width?: { magnitude: number; unit: string };
    height?: { magnitude: number; unit: string };
  };
}

export const listGoogleDrivePresentations = async (accessToken: string): Promise<GoogleDriveFile[]> => {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.presentation' and trashed=false");
  const fields = encodeURIComponent('files(id,name,createdTime,modifiedTime,webViewLink,thumbnailLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=modifiedTime%20desc&pageSize=15`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to list presentations (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

export const getPresentation = async (
  presentationId: string,
  accessToken: string
): Promise<GooglePresentation> => {
  const url = `https://slides.googleapis.com/v1/presentations/${presentationId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch presentation (${response.status})`);
  }

  return response.json();
};

export interface DeckSlideContent {
  title: string;
  subtitle: string;
  bodyRows: string[];
}

export const DECK_SLIDES_BLUEPRINT: DeckSlideContent[] = [
  {
    title: 'SOHA FARHAT // ARCHITECTURAL CORE',
    subtitle: 'CONCEPT × STRATEGY × FORM // CRITICAL_BALANCE_DETERMINISTIC_MODEL',
    bodyRows: [
      '[ EXECUTION_PROTOCOL ] ≡ IF brief_input THEN ∅ bypass_standard_output;',
      '[ MATRIX_ALIGNMENT ] ⇄ SYNCHRONIZE (insight_data + concept_intuition) → multi_medium_form;',
      '01 / CONCEPT ⟶ 02 / STRATEGY ⟶ 03 / FORM',
      'SYS_CORE_PLATFORM_STABLE // RUN_OPERATION_SECURE',
    ],
  },
  {
    title: 'SECTION 02 // INTERACTIVE ROLES SYSTEM',
    subtitle: 'CAPABILITY FLOW ANALYSIS // 3-CORE DISCIPLINE ENGINE',
    bodyRows: [
      'DISCIPLINE 01: STRATEGY DESIGN [360° CONSUMER INSIGHT / ARCHITECTURAL POSITIONING]',
      'DISCIPLINE 02: CREATIVE DIRECTION [UNIFIED ART DIRECTION / KINETIC IDENTITY]',
      'DISCIPLINE 03: SHOOTING & CONTENT EXECUTION [HIGH VELOCITY ASSET GENERATION]',
      'VALIDATE PROOF: OODI RAMADAN 360 CAMPAIGN',
    ],
  },
  {
    title: 'SECTION 03 // AUDIENCE × CULTURE STUDY',
    subtitle: 'GEOMETRIC CROSSHAIR RADAR TARGET CHART // REGIONAL DEMOGRAPHIC FOOTPRINTS',
    bodyRows: [
      'ZONE 01: IRAQ [33.3152° N, 44.3661° E] — 360° MASS BRAND IDENTITY & TELECOM REACH',
      'ZONE 02: UAE [25.2048° N, 55.2708° E] — LUXURY CULTURE & COMMERCIAL EXPERIENCES',
      'ZONE 03: KUWAIT [29.3759° N, 47.9774° E] — EDITORIAL DIGITAL DIRECTION & RETAIL',
      'ZONE 04: LEBANON [33.8938° N, 35.5018° E] — RAW CREATIVE DIRECTION & PRODUCTION UNDERGROUND',
      'ZONE 05: USA [37.7749° N, 122.4194° W] — CONTEMPORARY DIGITAL FORM & EXPORT',
    ],
  },
  {
    title: 'SECTION 04 // PROACTIVE INTERVENTION PROTOCOLS',
    subtitle: 'CRITICAL INCIDENT TIMELINE // ZERO-LATENCY RESOLVER',
    bodyRows: [
      '01 [DISRUPTION] ──> FINALIZED 4-DAY VIDEO LIFE-CYCLE METRIC COLLAPSED AT 11:30 PM BY CLIENT SHIFT',
      '02 [BYPASS] ──────> INFRASTRUCTURE CONSTRAINTS AND COMMUNICATIONS BLACKOUT ON SITE',
      '03 [FORMULATION] ──> SHIPPED ALTERNATIVE PAYLOAD DISPATCH AT 04:30 AM / CODED INTERACTIVE APP AT 05:00 AM',
      '04 [DATA VALUE] ──> DATA-MINING PUBLIC DEMOGRAPHIC USER EXP STUDY FEED GENERATING LIVE TRICHROMATIC HUES (B/G/R)',
      '• OPERATIONAL VALUE: DEPLOYING MINIMAL ZERO-LATENCY SETUP TO BYPASS MIDDLE LAYERS',
    ],
  },
  {
    title: 'SECTION 05 // PRODUCTION FEASIBILITY LOG',
    subtitle: 'PIPELINE MECHANICS // HUMAN INTEGRITY INDEX',
    bodyRows: [
      'BAR 01 // ASSISTANCE LOGISTICS: 100% FULL CAPACITY (PLATFORM SCHEDULING & VELOCITY)',
      'BAR 02 // AI CONCEPT FORMULATION: 0% COMPLETE LOCKDOWN GRID (STRICTLY PROHIBITED)',
      '• CREATIVE INTEGRITY: ALL CONCEPT INTUITION AND ART DIRECTION REMAIN RIGIDLY HUMAN',
      '• AUTOMATION LOOPS: AI IS EMPLOYED EXCLUSIVELY AS A MECHANISM FOR VELOCITY',
    ],
  },
  {
    title: 'SECTION 06 // REQUEST CONFIGURATOR',
    subtitle: '3-AXIS PARAMETER MATRIX // REALTIME DELIVERABLE RESOLVER',
    bodyRows: [
      'AXIS 01: STRATEGY (BASELINE ⟶ FULL TRANSFORMATION)',
      'AXIS 02: CREATIVE DIRECTION (UNIFIED ART GUIDE ⟶ 360° CONCEPT DOMINANCE)',
      'AXIS 03: SHOOTING & CONTENT EXECUTION (ASSET DISPATCH ⟶ FULL PRODUCTION SET)',
      'TARGET MATRIX RESOLUTION: BRAND REBRANDING, MULTI-CHANNEL ART DIRECTION, VIDEO COMPOSITING',
    ],
  },
  {
    title: 'SECTION 07 // CREATIVE FOUNDATIONS',
    subtitle: 'TOPOLOGICAL INTERSECTION GRAPH // MULTI-DISCIPLINARY SYNAPSE',
    bodyRows: [
      'NODE A: [ANCILLARY FINE ART LOGS] ──> Structural layout blueprints & geometric spatial rules',
      'NODE B: [POLYRHYTHMIC DRUMMING TEMPO] ──> Precision timing & tempo drilling for campaign velocity',
      'NODE C: [COMMUNITY NODES] ──> Direct connection to trusted underground production house pipeline',
      'AUTHENTICITY ASSURED // RE-ENGINEERED BLUEPRINT SYSTEMS FOR COMPREHENSIVE PLATFORM DEPLOYMENT',
    ],
  },
];

export const createGoogleSlidesDeck = async (
  title: string,
  accessToken: string
): Promise<{ presentationId: string; webViewLink: string; title: string }> => {
  // 1. Create Presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create presentation (${createRes.status})`);
  }

  const createdData: GooglePresentation = await createRes.json();
  const presentationId = createdData.presentationId;

  // 2. Build BatchUpdate Requests for all slides
  const requests: any[] = [];

  // Generate slides 2 through 7 (slide 1 exists by default in Google Slides)
  DECK_SLIDES_BLUEPRINT.forEach((deckSlide, index) => {
    const slideObjectId = `slide_page_${index + 1}_${Date.now()}`;
    const titleBoxId = `title_box_${index + 1}_${Date.now()}`;
    const bodyBoxId = `body_box_${index + 1}_${Date.now()}`;

    if (index > 0) {
      requests.push({
        createSlide: {
          objectId: slideObjectId,
          insertionIndex: index,
          slideLayoutReference: {
            predefinedLayout: 'BLANK',
          },
        },
      });
    }

    const targetSlideId = index === 0 && createdData.slides?.[0]?.objectId
      ? createdData.slides[0].objectId
      : slideObjectId;

    // Create Title Text Box
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: targetSlideId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 70, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 40,
            translateY: 40,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: `${deckSlide.title}\n${deckSlide.subtitle}`,
      },
    });

    // Create Body Text Box
    requests.push({
      createShape: {
        objectId: bodyBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: targetSlideId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 250, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 40,
            translateY: 130,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: bodyBoxId,
        text: deckSlide.bodyRows.join('\n\n'),
      },
    });
  });

  // Execute Batch Update
  try {
    await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });
  } catch (err) {
    console.warn('Batch update slide styling minor warning:', err);
  }

  const webViewLink = `https://docs.google.com/presentation/d/${presentationId}/edit`;
  return { presentationId, webViewLink, title };
};
