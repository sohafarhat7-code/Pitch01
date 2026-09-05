import React, { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../services/googleAuth';
import {
  listGoogleDrivePresentations,
  createGoogleSlidesDeck,
  GoogleDriveFile,
} from '../services/googleSlides';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tab: 'export' | 'browse' | 'embed'
  const [activeTab, setActiveTab] = useState<'export' | 'browse' | 'embed'>('export');

  // Export State
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportConfirmOpen, setExportConfirmOpen] = useState<boolean>(false);
  const [exportedResult, setExportedResult] = useState<{
    presentationId: string;
    webViewLink: string;
    title: string;
  } | null>(null);

  // Browse State
  const [presentations, setPresentations] = useState<GoogleDriveFile[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [listError, setListError] = useState<string | null>(null);

  // Embed State
  const [selectedPresentationId, setSelectedPresentationId] = useState<string>('');

  // Initialize Auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setAuthError(null);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Authentication failed');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setPresentations([]);
    setExportedResult(null);
  };

  // Load presentations when browse tab is selected and user is authenticated
  const loadPresentations = useCallback(async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) return;

    setIsLoadingList(true);
    setListError(null);
    try {
      const files = await listGoogleDrivePresentations(token);
      setPresentations(files);
      if (files.length > 0 && !selectedPresentationId) {
        setSelectedPresentationId(files[0].id);
      }
    } catch (err: any) {
      setListError(err?.message || 'Failed to list presentations from Google Drive');
    } finally {
      setIsLoadingList(false);
    }
  }, [accessToken, selectedPresentationId]);

  useEffect(() => {
    if (isOpen && activeTab === 'browse' && user && accessToken) {
      loadPresentations();
    }
  }, [isOpen, activeTab, user, accessToken, loadPresentations]);

  // Handle Export with Mandatory User Confirmation per Workspace Guidelines
  const handleConfirmExport = async () => {
    setExportConfirmOpen(false);
    setIsExporting(true);
    setAuthError(null);

    try {
      const token = accessToken || (await getAccessToken());
      if (!token) throw new Error('Not authenticated with Google');

      const result = await createGoogleSlidesDeck(
        'Soha Farhat — Architectural Presentation Deck',
        token
      );
      setExportedResult(result);
      setSelectedPresentationId(result.presentationId);
    } catch (err: any) {
      setAuthError(err?.message || 'Failed to create Google Slides deck');
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 sm:p-6 font-mono"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1B1B1B] text-[#F9F9F9] border border-[#3A3A3A] shadow-2xl overflow-hidden">
        {/* Header Console */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2C2C2C] bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
              // WORKSPACE_INTEGRATION
            </span>
            <span className="text-white text-xs font-bold tracking-tight">
              GOOGLE SLIDES × ARCHITECTURAL DECK
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xs tracking-wider border border-[#333] hover:border-neutral-400 px-2 py-1 transition-colors cursor-pointer"
          >
            [ × CLOSE ]
          </button>
        </div>

        {/* Auth Bar & Status */}
        <div className="px-6 py-3 border-b border-[#262626] bg-[#171717] flex flex-wrap items-center justify-between gap-3 text-[10px] text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              STATUS:{' '}
              <strong className="text-white">
                {user ? `CONNECTED (${user.email})` : 'UNAUTHENTICATED'}
              </strong>
            </span>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 hidden sm:inline">
                PROJECT: gen-lang-client-0238079585
              </span>
              <button
                onClick={handleSignOut}
                className="text-neutral-400 hover:text-white underline cursor-pointer"
              >
                [ SIGN OUT ]
              </button>
            </div>
          ) : (
            <span className="text-neutral-500">
              REQUIRES PERMISSION TO READ/WRITE PRESENTATIONS
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!user ? (
            /* Unauthenticated View: Sign in with Google */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 max-w-lg mx-auto">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-neutral-500">
                  // GOOGLE_WORKSPACE_AUTHORIZATION
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Connect Google Slides &amp; Drive
                </h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Review the connection below to enable Google Slides and Google Drive for your app.
                  Once signed in with your permission, you can export this 7-slide architectural
                  deck directly into Google Slides or browse and embed your existing decks.
                </p>
              </div>

              {/* Official Material Design "Sign in with Google" Button */}
              <button
                onClick={handleSignIn}
                disabled={isAuthLoading}
                className="inline-flex items-center gap-3 bg-white text-[#3c4043] hover:bg-neutral-100 px-5 py-2.5 rounded-sm border border-[#dadce0] font-sans text-sm font-medium shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5 block"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>{isAuthLoading ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>

              {authError && (
                <div className="border border-red-900/60 bg-red-950/20 text-red-400 p-3 text-[10px] text-left w-full">
                  // ERROR: {authError}
                </div>
              )}
            </div>
          ) : (
            /* Authenticated View */
            <div className="space-y-6">
              {/* Feature Sub-Navigation Tabs */}
              <div className="flex border-b border-[#2C2C2C] text-[11px]">
                <button
                  onClick={() => setActiveTab('export')}
                  className={`px-4 py-2 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'export'
                      ? 'border-white text-white font-bold bg-[#222222]'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  [ 01 // EXPORT DECK TO GOOGLE SLIDES ]
                </button>
                <button
                  onClick={() => {
                    setActiveTab('browse');
                    loadPresentations();
                  }}
                  className={`px-4 py-2 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'browse'
                      ? 'border-white text-white font-bold bg-[#222222]'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  [ 02 // BROWSE GOOGLE SLIDES IN DRIVE ]
                </button>
                <button
                  onClick={() => setActiveTab('embed')}
                  className={`px-4 py-2 border-b-2 cursor-pointer transition-colors ${
                    activeTab === 'embed'
                      ? 'border-white text-white font-bold bg-[#222222]'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  [ 03 // LIVE PRESENTATION EMBED ]
                </button>
              </div>

              {/* TAB 1: EXPORT DECK TO GOOGLE SLIDES */}
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <div className="border border-[#333333] bg-[#141414] p-5 space-y-3">
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      // SYNC_SPECIFICATION: DECK TO SLIDES ENGINE
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Create Native Google Slides Presentation
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      This will generate a brand new Google Slides presentation titled{' '}
                      <span className="text-white">
                        &quot;Soha Farhat — Architectural Presentation Deck&quot;
                      </span>{' '}
                      directly in your personal Google Drive, formatting all 7 interactive panels:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-neutral-300 pt-2">
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        01 // SOHA FARHAT // ARCHITECTURAL CORE
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        02 // INTERACTIVE ROLES SYSTEM
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        03 // AUDIENCE × CULTURE STUDY
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        04 // PROACTIVE INTERVENTION PROTOCOLS
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        05 // PRODUCTION FEASIBILITY LOG
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818]">
                        06 // REQUEST CONFIGURATOR
                      </div>
                      <div className="p-2 border border-[#2A2A2A] bg-[#181818] sm:col-span-2">
                        07 // CREATIVE FOUNDATIONS TOPOLOGY
                      </div>
                    </div>

                    {!exportedResult ? (
                      <div className="pt-4">
                        <button
                          onClick={() => setExportConfirmOpen(true)}
                          disabled={isExporting}
                          className="border border-white bg-white text-black hover:bg-neutral-200 px-5 py-2.5 text-xs font-mono tracking-wider cursor-pointer transition-colors disabled:opacity-50"
                        >
                          {isExporting ? 'GENERATING GOOGLE SLIDES...' : '[ GENERATE GOOGLE SLIDES IN DRIVE ]'}
                        </button>
                      </div>
                    ) : (
                      <div className="border border-emerald-800/80 bg-emerald-950/30 p-4 space-y-3 mt-4">
                        <div className="text-emerald-400 text-xs font-bold">
                          ✓ PRESENTATION GENERATED SUCCESSFULLY IN GOOGLE DRIVE
                        </div>
                        <div className="text-[10px] text-neutral-300">
                          FILE TITLE: {exportedResult.title}
                          <br />
                          ID: {exportedResult.presentationId}
                        </div>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a
                            href={exportedResult.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white text-black px-4 py-2 text-xs font-bold hover:bg-neutral-200 transition-colors inline-block"
                          >
                            [ OPEN IN GOOGLE SLIDES ↗ ]
                          </a>
                          <button
                            onClick={() => {
                              setSelectedPresentationId(exportedResult.presentationId);
                              setActiveTab('embed');
                            }}
                            className="border border-neutral-400 text-white px-4 py-2 text-xs hover:bg-[#2A2A2A] cursor-pointer transition-colors"
                          >
                            [ PREVIEW EMBED HERE ]
                          </button>
                          <button
                            onClick={() => setExportedResult(null)}
                            className="text-neutral-400 hover:text-white text-xs underline px-2 py-2"
                          >
                            [ EXPORT AGAIN ]
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: BROWSE GOOGLE SLIDES IN DRIVE */}
              {activeTab === 'browse' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-neutral-500">
                    <span>// GOOGLE DRIVE PRESENTATIONS QUERY</span>
                    <button
                      onClick={loadPresentations}
                      disabled={isLoadingList}
                      className="text-neutral-300 hover:text-white underline cursor-pointer"
                    >
                      [ REFRESH LIST ]
                    </button>
                  </div>

                  {isLoadingList && (
                    <div className="text-center py-8 text-neutral-500 text-xs">
                      // SCANNING GOOGLE DRIVE FILES FOR PRESENTATIONS...
                    </div>
                  )}

                  {listError && (
                    <div className="border border-red-900/60 bg-red-950/20 text-red-400 p-3 text-[10px]">
                      // ERROR: {listError}
                    </div>
                  )}

                  {!isLoadingList && presentations.length === 0 && !listError && (
                    <div className="border border-[#2C2C2C] bg-[#151515] p-6 text-center text-neutral-500 text-xs">
                      No Google Slides files found in Drive yet. You can export one using the
                      &quot;Export Deck to Google Slides&quot; tab!
                    </div>
                  )}

                  {!isLoadingList && presentations.length > 0 && (
                    <div className="space-y-2 max-h-72 overflow-y-auto border border-[#2C2C2C] p-2 bg-[#141414]">
                      {presentations.map((file) => (
                        <div
                          key={file.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border border-[#242424] bg-[#181818] hover:border-neutral-500 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="text-white text-xs font-bold tracking-tight">
                              {file.name}
                            </div>
                            <div className="text-[9px] text-neutral-500">
                              ID: {file.id} | MODIFIED:{' '}
                              {file.modifiedTime
                                ? new Date(file.modifiedTime).toLocaleDateString()
                                : 'N/A'}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 text-[10px]">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="border border-[#444] hover:border-white px-2.5 py-1 text-neutral-300 hover:text-white transition-colors"
                              >
                                OPEN ↗
                              </a>
                            )}
                            <button
                              onClick={() => {
                                setSelectedPresentationId(file.id);
                                setActiveTab('embed');
                              }}
                              className="bg-white text-black px-2.5 py-1 font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
                            >
                              EMBED &gt;
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: LIVE EMBED VIEW */}
              {activeTab === 'embed' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-neutral-500">
                    <span>// GOOGLE SLIDES PRESENTATION EMBED PLAYER</span>
                    <div className="flex items-center gap-2">
                      <label htmlFor="presentationIdInput" className="text-neutral-400">ID:</label>
                      <input
                        id="presentationIdInput"
                        type="text"
                        value={selectedPresentationId}
                        onChange={(e) => setSelectedPresentationId(e.target.value)}
                        placeholder="Paste presentationId..."
                        className="bg-[#111] border border-[#333] px-2 py-0.5 text-white text-[10px] w-52 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {selectedPresentationId ? (
                    <div className="border border-[#333] bg-black overflow-hidden relative">
                      <iframe
                        src={`https://docs.google.com/presentation/d/${selectedPresentationId}/embed?start=false&loop=false&delayms=3000`}
                        title="Google Slides Viewer"
                        className="w-full h-[450px] border-none"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="border border-[#2C2C2C] bg-[#141414] p-8 text-center text-neutral-500 text-xs">
                      No presentation ID selected. Choose a deck from the Browse tab or export one to preview it here.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-[#262626] bg-[#141414] flex justify-between items-center text-[9px] text-neutral-600">
          <span>// GOOGLE WORKSPACE API: SLIDES v1 &amp; DRIVE v3 ENABLED</span>
          <span>SCOPES: presentations, drive.file, drive.readonly</span>
        </div>
      </div>

      {/* Mandatory Explicit User Confirmation Dialog for Mutating Action */}
      {exportConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4 font-mono"
        >
          <div className="bg-[#1A1A1A] border border-white text-[#F9F9F9] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              // CONFIRMATION REQUIRED
            </div>
            <h4 className="text-sm font-bold text-white">
              Create New Google Slides Presentation?
            </h4>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              This action will create a new presentation named{' '}
              <strong className="text-white">&quot;Soha Farhat — Architectural Presentation Deck&quot;</strong>{' '}
              with 7 slides in your Google Drive under account{' '}
              <span className="text-white underline">{user?.email}</span>.
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800 text-xs">
              <button
                onClick={() => setExportConfirmOpen(false)}
                className="px-4 py-2 border border-neutral-600 text-neutral-400 hover:text-white cursor-pointer transition-colors"
              >
                [ CANCEL ]
              </button>
              <button
                onClick={handleConfirmExport}
                className="px-4 py-2 bg-white text-black font-bold hover:bg-neutral-200 cursor-pointer transition-colors"
              >
                [ CONFIRM &amp; CREATE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
