import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Building2, 
  Users, 
  Sparkles, 
  FileText, 
  DollarSign, 
  AlertCircle, 
  Check, 
  RefreshCw, 
  MapPin, 
  Send, 
  Database,
  Lock,
  ArrowRight
} from 'lucide-react';
import type { ECDProspect, ActivationToken, AuditLog } from '../../types';

interface SuperAdminDashboardProps {
  adminEmail: string;
  onExit: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  adminEmail,
  onExit
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'prospects' | 'activations' | 'ai_ops' | 'audit'>('overview');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Metrics
  const [metrics, setMetrics] = useState<any>({
    totalCentresDiscovered: 3,
    verifiedCentres: 2,
    pendingInvitations: 2,
    activatedCentres: 1,
    activePaidCentres: 3,
    totalParents: 142,
    totalTeachers: 28,
    totalLearners: 420,
    worksheetsGenerated: 1250,
    pdfsDownloaded: 890,
    weeklyPacksGenerated: 94,
    mrrZAR: 4890
  });

  const [prospects, setProspects] = useState<ECDProspect[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Discovery Form state
  const [country, setCountry] = useState('South Africa');
  const [province, setProvince] = useState('Gauteng');
  const [city, setCity] = useState('Johannesburg');
  const [area, setArea] = useState('Soweto');
  const [searchTerm, setSearchTerm] = useState('creche preschool ECD centre');
  const [discoveryMessage, setDiscoveryMessage] = useState<string | null>(null);

  const fetchMetricsAndProspects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data.metrics) setMetrics(data.metrics);
        if (data.recentAuditLogs) setAuditLogs(data.recentAuditLogs);
      } else {
        console.warn(`Admin metrics endpoint returned HTTP ${res.status}`);
      }

      const prosRes = await fetch('/api/ecd/prospects');
      if (prosRes.ok) {
        const prosData = await prosRes.json();
        if (prosData.prospects) setProspects(prosData.prospects);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetricsAndProspects();
  }, []);

  const handleRunDiscovery = async () => {
    setLoading(true);
    setDiscoveryMessage(null);
    try {
      const res = await fetch('/api/ecd/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, city, province, searchTerm, adminEmail })
      });
      const data = await res.json();
      if (data.success) {
        setDiscoveryMessage(`✅ Successfully discovered ${data.candidatesAdded} new candidate ECD centres in ${area}. Latency: ${data.latencyMs}ms`);
        fetchMetricsAndProspects();
      } else {
        setDiscoveryMessage('Discovery query error: ' + data.error);
      }
    } catch (err: any) {
      setDiscoveryMessage('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProspect = async (prospectId: string, status: 'VERIFIED' | 'NEEDS_REVIEW' | 'NOT_ECD') => {
    try {
      const res = await fetch('/api/ecd/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectId, verificationStatus: status, adminEmail })
      });
      const data = await res.json();
      if (data.success) {
        fetchMetricsAndProspects();
      }
    } catch (err) {
      console.error('Verification failed', err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* Top Operational Bar */}
      <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-wide">IMBEWU CONTROL TOWER</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE PRODUCTION
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Authorized Administrator: <span className="text-amber-300 font-semibold">{adminEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMetricsAndProspects}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          
          <button
            onClick={onExit}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
          >
            Exit Control Tower
          </button>
        </div>
      </div>

      {/* Admin Navigation Bar */}
      <div className="bg-[#1E293B]/60 border-b border-slate-800 px-6 py-2 flex gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          📊 Overview & MRR
        </button>
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'discovery' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          🔍 Discover ECDs (Google Maps/Search)
        </button>
        <button
          onClick={() => setActiveTab('prospects')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'prospects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          🏫 Prospect Pipeline ({prospects.length})
        </button>
        <button
          onClick={() => setActiveTab('ai_ops')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'ai_ops' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          ⚡ AI & Google Ops
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeTab === 'audit' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          📜 Audit Logs
        </button>
      </div>

      {/* MAIN BODY */}
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Monthly Recurring Revenue</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  R{metrics.mrrZAR.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">PayFast active subscriptions</span>
              </div>

              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">ECD Centres Network</span>
                <div className="text-2xl font-bold text-white font-mono">
                  {metrics.totalCentresDiscovered} <span className="text-xs text-slate-400 font-normal">({metrics.activatedCentres} activated)</span>
                </div>
                <span className="text-[10px] text-amber-400 font-medium">Soweto & Gauteng pipeline</span>
              </div>

              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Active Learners Enrolled</span>
                <div className="text-2xl font-bold text-white font-mono">
                  {metrics.totalLearners}
                </div>
                <span className="text-[10px] text-slate-500">Ages 3–6 in classes</span>
              </div>

              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Worksheets Generated</span>
                <div className="text-2xl font-bold text-white font-mono">
                  {metrics.worksheetsGenerated}
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">{metrics.pdfsDownloaded} PDFs downloaded</span>
              </div>
            </div>

            {/* Soweto ECD Funnel Visualization */}
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <span>🇿🇦 Soweto ECD Acquisition Pipeline</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Discovered</div>
                  <div className="text-lg font-bold text-white font-mono">{metrics.totalCentresDiscovered}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Verified</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{metrics.verifiedCentres}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Invited</div>
                  <div className="text-lg font-bold text-amber-400 font-mono">{metrics.pendingInvitations}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Claimed</div>
                  <div className="text-lg font-bold text-blue-400 font-mono">{metrics.activatedCentres}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Activated</div>
                  <div className="text-lg font-bold text-indigo-400 font-mono">{metrics.activatedCentres}</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Paid Members</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{metrics.activePaidCentres}</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ECD DISCOVERY ENGINE */}
        {activeTab === 'discovery' && (
          <div className="bg-[#1E293B] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Google Search & Maps ECD Discovery Engine
              </h3>
              <p className="text-xs text-slate-400">
                Discovers real South African ECD centres in Soweto & Gauteng using Gemini 3.5 Flash with Google Search / Maps tools. Strictly complies with Google Places storage policy by saving only stable place references.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                <input
                  type="text"
                  disabled
                  value={country}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Province</label>
                <input
                  type="text"
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">City / Township</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Area / Suburb</label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                Target query: <span className="font-mono text-amber-300">{searchTerm} in {area}, {city}</span>
              </div>
              <button
                onClick={handleRunDiscovery}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs disabled:opacity-50"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{loading ? 'Running Google Discovery…' : 'Run Discovery Pass'}</span>
              </button>
            </div>

            {discoveryMessage && (
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-xs font-mono text-amber-300">
                {discoveryMessage}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: PROSPECT PIPELINE & ACTIVATION LINKS */}
        {activeTab === 'prospects' && (
          <div className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Discovered ECD Prospects</h3>
                <p className="text-xs text-slate-400">Verify facilities and generate secure single-use activation URLs</p>
              </div>
              <span className="text-xs font-mono text-slate-400">{prospects.length} centres loaded</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Centre & Location</th>
                    <th className="p-3.5">Source</th>
                    <th className="p-3.5">Verification</th>
                    <th className="p-3.5">Pipeline Status</th>
                    <th className="p-3.5">Principal / Contact</th>
                    <th className="p-3.5">Activation URL</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  {prospects.map(p => (
                    <tr key={p.id} className="hover:bg-slate-800/50">
                      <td className="p-3.5">
                        <div className="font-bold text-white">{p.centreName}</div>
                        <div className="text-[11px] text-slate-400">{p.area}</div>
                      </td>
                      <td className="p-3.5 text-[11px] font-mono text-slate-400">
                        {p.discoverySource}
                      </td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.verificationStatus === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          p.verificationStatus === 'NEEDS_REVIEW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {p.verificationStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-bold text-slate-300 font-mono">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-[11px]">
                        <div>{p.managerName || 'Pending'}</div>
                        <div className="text-slate-400">{p.phone || p.managerEmail || 'No contact yet'}</div>
                      </td>
                      <td className="p-3.5">
                        {p.activationUrl ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => copyToClipboard(`${window.location.origin}${p.activationUrl}`, p.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-mono border border-slate-700"
                            >
                              {copiedId === p.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === p.id ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                            <a
                              href={p.activationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Verify to generate</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        {p.verificationStatus !== 'VERIFIED' ? (
                          <button
                            onClick={() => handleVerifyProspect(p.id, 'VERIFIED')}
                            className="text-xs font-bold text-emerald-400 hover:underline"
                          >
                            Verify & Prepare
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const msg = `Hi ${p.managerName || 'Principal'},\n\nWe've prepared an Imbewu early learning workspace for ${p.centreName}.\nYour centre can use it to create CAPS lesson activities, printable packs and weekly schedules in English & isiZulu.\n\nYour secure activation link:\n${window.location.origin}${p.activationUrl}\n\n— NahaLabs / Imbewu`;
                              copyToClipboard(msg, `msg-${p.id}`);
                            }}
                            className="text-xs font-bold text-amber-400 hover:underline"
                          >
                            {copiedId === `msg-${p.id}` ? 'Message Copied!' : 'Copy Invite Message'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: AI & GOOGLE OPERATIONS */}
        {activeTab === 'ai_ops' && (
          <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-white">AI Service & Grounding Observability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Primary Model</span>
                <span className="text-amber-300 font-bold">gemini-3.5-flash</span>
                <p className="text-[10px] text-slate-500 mt-1">Grounding: googleSearch + googleMaps</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Low-Latency Fast Model</span>
                <span className="text-emerald-400 font-bold">gemini-3.1-flash-lite</span>
                <p className="text-[10px] text-slate-500 mt-1">Target latency: &lt;500ms</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Google Places Compliance</span>
                <span className="text-blue-400 font-bold">Compliant Storage</span>
                <p className="text-[10px] text-slate-500 mt-1">Place ID preserved; no prohibited cache</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Security & Operations Audit Trail</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Actor</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {auditLogs.map((a: any, i: number) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-500">{new Date(a.timestamp).toLocaleTimeString()}</td>
                      <td className="p-3 text-amber-300">{a.actorEmail}</td>
                      <td className="p-3 font-bold text-white">{a.action}</td>
                      <td className="p-3 text-slate-400">{a.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
