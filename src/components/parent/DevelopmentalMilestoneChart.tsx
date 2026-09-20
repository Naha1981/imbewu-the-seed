import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { TrendingUp, Award, CheckCircle2, Info, Eye, Layers, Filter } from 'lucide-react';
import type { ChildProfile, LanguageCode, DevelopmentalDomain, DomainMilestoneHistoryPoint, MilestoneCheckpoint } from '../../types';
import { DEFAULT_DEVELOPMENTAL_DATA, DEVELOPMENTAL_CHECKPOINTS } from '../../data/learningPromptsAndStories';

interface DevelopmentalMilestoneChartProps {
  child: ChildProfile;
  language: LanguageCode;
}

export const DevelopmentalMilestoneChart: React.FC<DevelopmentalMilestoneChartProps> = ({
  child,
  language
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 600, height: 320 });
  const [selectedDomain, setSelectedDomain] = useState<'all' | DevelopmentalDomain>('all');
  const [activeTooltip, setActiveTooltip] = useState<{
    point: DomainMilestoneHistoryPoint;
    x: number;
    y: number;
  } | null>(null);

  // Checkpoints state (allows parent to view and toggle observations)
  const [checkpoints, setCheckpoints] = useState<MilestoneCheckpoint[]>(() => {
    try {
      const saved = localStorage.getItem(`imbewu_checkpoints_${child.id}`);
      return saved ? JSON.parse(saved) : DEVELOPMENTAL_CHECKPOINTS;
    } catch {
      return DEVELOPMENTAL_CHECKPOINTS;
    }
  });

  const toggleCheckpoint = (id: string) => {
    const updated = checkpoints.map(c => {
      if (c.id === id) {
        return {
          ...c,
          achieved: !c.achieved,
          achievedDate: !c.achieved ? 'Observed Today' : undefined
        };
      }
      return c;
    });
    setCheckpoints(updated);
    try {
      localStorage.setItem(`imbewu_checkpoints_${child.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // ResizeObserver for responsive D3 canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width > 0) {
          setDimensions({
            width: Math.max(320, width),
            height: Math.min(360, Math.max(260, width * 0.45))
          });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render D3 chart
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const data = DEFAULT_DEVELOPMENTAL_DATA;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 25, right: 30, bottom: 40, left: 45 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale
    const xScale = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.monthLabel))
      .range([0, width])
      .padding(0.2);

    // Y Scale
    const yScale = d3
      .scaleLinear()
      .domain([40, 100])
      .range([height, 0]);

    // Defs for gradients
    const defs = svg.append('defs');

    // Language gradient
    const gradLang = defs.append('linearGradient').attr('id', 'grad-language').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
    gradLang.append('stop').attr('offset', '0%').attr('stop-color', '#2A9D8F').attr('stop-opacity', 0.25);
    gradLang.append('stop').attr('offset', '100%').attr('stop-color', '#2A9D8F').attr('stop-opacity', 0.0);

    // Motor gradient
    const gradMotor = defs.append('linearGradient').attr('id', 'grad-motor').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
    gradMotor.append('stop').attr('offset', '0%').attr('stop-color', '#E07A5F').attr('stop-opacity', 0.25);
    gradMotor.append('stop').attr('offset', '100%').attr('stop-color', '#E07A5F').attr('stop-opacity', 0.0);

    // Numeracy gradient
    const gradNum = defs.append('linearGradient').attr('id', 'grad-numeracy').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
    gradNum.append('stop').attr('offset', '0%').attr('stop-color', '#3B82F6').attr('stop-opacity', 0.25);
    gradNum.append('stop').attr('offset', '100%').attr('stop-color', '#3B82F6').attr('stop-opacity', 0.0);

    // Horizontal Grid Lines
    const yTicks = [50, 60, 70, 80, 90, 100];
    g.selectAll('.grid-line')
      .data(yTicks)
      .enter()
      .append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', '#EADFCF')
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-width', 1);

    // X Axis
    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .call((axis) => axis.select('.domain').attr('stroke', '#EADFCF'))
      .selectAll('text')
      .attr('fill', '#6B7280')
      .attr('font-size', '11px')
      .attr('font-weight', '600');

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`).tickSize(0).tickPadding(8);
    g.append('g')
      .call(yAxis)
      .call((axis) => axis.select('.domain').remove())
      .selectAll('text')
      .attr('fill', '#9CA3AF')
      .attr('font-size', '10px');

    // Benchmark Expected Curve (dashed baseline)
    const benchmarkLine = d3
      .line<DomainMilestoneHistoryPoint>()
      .x((d) => xScale(d.monthLabel) || 0)
      .y((d) => yScale(d.benchmarkScore))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#9CA3AF')
      .attr('stroke-dasharray', '4,4')
      .attr('stroke-width', 1.5)
      .attr('d', benchmarkLine);

    // Line & Area helper
    const drawDomain = (
      key: 'languageScore' | 'motorScore' | 'numeracyScore',
      color: string,
      gradientId: string
    ) => {
      const line = d3
        .line<DomainMilestoneHistoryPoint>()
        .x((d) => xScale(d.monthLabel) || 0)
        .y((d) => yScale(d[key]))
        .curve(d3.curveMonotoneX);

      const area = d3
        .area<DomainMilestoneHistoryPoint>()
        .x((d) => xScale(d.monthLabel) || 0)
        .y0(height)
        .y1((d) => yScale(d[key]))
        .curve(d3.curveMonotoneX);

      // Area fill
      g.append('path')
        .datum(data)
        .attr('fill', `url(#${gradientId})`)
        .attr('d', area);

      // Stroke line
      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('d', line);

      // Dots
      g.selectAll(`.dot-${key}`)
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot-${key}`)
        .attr('cx', (d) => xScale(d.monthLabel) || 0)
        .attr('cy', (d) => yScale(d[key]))
        .attr('r', 5)
        .attr('fill', '#ffffff')
        .attr('stroke', color)
        .attr('stroke-width', 2.5)
        .style('cursor', 'pointer')
        .on('mouseenter', (event, d) => {
          const [mx, my] = d3.pointer(event, svgRef.current);
          setActiveTooltip({ point: d, x: mx, y: my });
        })
        .on('mouseleave', () => {
          setActiveTooltip(null);
        });
    };

    if (selectedDomain === 'all' || selectedDomain === 'language') {
      drawDomain('languageScore', '#2A9D8F', 'grad-language');
    }
    if (selectedDomain === 'all' || selectedDomain === 'motor') {
      drawDomain('motorScore', '#E07A5F', 'grad-motor');
    }
    if (selectedDomain === 'all' || selectedDomain === 'numeracy') {
      drawDomain('numeracyScore', '#3B82F6', 'grad-numeracy');
    }
  }, [dimensions, selectedDomain]);

  const filteredCheckpoints = useMemo(() => {
    if (selectedDomain === 'all') return checkpoints;
    return checkpoints.filter(c => c.domain === selectedDomain);
  }, [checkpoints, selectedDomain]);

  const achievedCount = checkpoints.filter(c => c.achieved).length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xs space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EADFCF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#2A9D8F] bg-[#2A9D8F]/10 px-3 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>D3 Developmental Trajectory</span>
            </span>
            <span className="text-xs font-semibold text-[#6B7280]">
              Age: {child.age} yrs (49 months)
            </span>
          </div>

          <h3 className="font-editorial text-2xl font-bold text-[#14213D] mt-1.5">
            {child.nickname}'s Growth & Milestone Progress
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Tracking gentle developmental milestones against the South African National ECD Framework.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-2xl border border-[#EADFCF] self-start sm:self-auto">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedDomain === 'all' ? 'bg-[#14213D] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#14213D]'
            }`}
          >
            All Domains
          </button>
          <button
            onClick={() => setSelectedDomain('language')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              selectedDomain === 'language' ? 'bg-[#2A9D8F] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#2A9D8F]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F]"></span>
            <span>Language</span>
          </button>
          <button
            onClick={() => setSelectedDomain('motor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              selectedDomain === 'motor' ? 'bg-[#E07A5F] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#E07A5F]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E07A5F]"></span>
            <span>Motor Skills</span>
          </button>
          <button
            onClick={() => setSelectedDomain('numeracy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              selectedDomain === 'numeracy' ? 'bg-[#3B82F6] text-white shadow-xs' : 'text-[#6B7280] hover:text-[#3B82F6]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
            <span>Numeracy</span>
          </button>
        </div>
      </div>

      {/* D3 Chart Container */}
      <div ref={containerRef} className="relative w-full overflow-hidden bg-[#FAF7F2]/50 rounded-2xl p-2 border border-[#EADFCF]/60">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto overflow-visible"
        />

        {/* Hover Tooltip overlay */}
        {activeTooltip && (
          <div
            className="absolute z-20 pointer-events-none bg-[#14213D] text-white rounded-2xl p-3 shadow-xl text-xs border border-white/10 -translate-x-1/2 -translate-y-full mb-2 w-56"
            style={{
              left: Math.min(dimensions.width - 120, Math.max(120, activeTooltip.x)),
              top: Math.max(10, activeTooltip.y - 12)
            }}
          >
            <p className="font-bold text-[#F4A261] border-b border-white/20 pb-1 mb-1.5 flex justify-between items-center">
              <span>{activeTooltip.point.monthLabel}</span>
              <span className="text-[10px] text-white/70">Expected: {activeTooltip.point.benchmarkScore}%</span>
            </p>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-[#2A9D8F]">
                <span>Language & Literacy:</span>
                <span className="font-bold">{activeTooltip.point.languageScore}%</span>
              </div>
              <div className="flex justify-between text-[#E07A5F]">
                <span>Motor Skills:</span>
                <span className="font-bold">{activeTooltip.point.motorScore}%</span>
              </div>
              <div className="flex justify-between text-[#60A5FA]">
                <span>Early Numeracy:</span>
                <span className="font-bold">{activeTooltip.point.numeracyScore}%</span>
              </div>
            </div>
            {activeTooltip.point.unlockedMilestones.length > 0 && (
              <div className="mt-2 pt-1.5 border-t border-white/20 text-[10px] text-white/80">
                <span className="font-bold text-amber-300">Milestones Unlocked:</span>
                <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-white/90">
                  {activeTooltip.point.unlockedMilestones.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Legend & Trajectory Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B7280] pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#2A9D8F]"></span>
            <strong className="text-[#14213D]">Language:</strong> 91% (Advanced)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E07A5F]"></span>
            <strong className="text-[#14213D]">Motor Skills:</strong> 88% (On Track)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
            <strong className="text-[#14213D]">Numeracy:</strong> 84% (Strong Growth)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-gray-400 inline-block"></span>
            <span>ECD Baseline Benchmark</span>
          </span>
        </div>

        <div className="text-right">
          <span className="font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-1 rounded-full text-[11px]">
            ✨ +18% developmental gain over 6 months
          </span>
        </div>
      </div>

      {/* Developmental Milestones Checkpoints Grid */}
      <div className="pt-4 border-t border-[#EADFCF]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-editorial text-lg font-bold text-[#14213D]">
              Observed Milestones ({achievedCount} of {checkpoints.length} Achieved)
            </h4>
            <p className="text-xs text-[#6B7280]">
              Click any milestone to record an observation during daily home play.
            </p>
          </div>
          <span className="text-xs font-bold text-[#14213D] bg-[#FAF7F2] border border-[#EADFCF] px-3 py-1 rounded-full">
            {Math.round((achievedCount / checkpoints.length) * 100)}% Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCheckpoints.map((cp) => (
            <button
              key={cp.id}
              onClick={() => toggleCheckpoint(cp.id)}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                cp.achieved
                  ? 'bg-[#FAF7F2] border-[#2A9D8F]/40 hover:border-[#2A9D8F]'
                  : 'bg-white border-[#EADFCF] hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      cp.domain === 'language'
                        ? 'bg-[#2A9D8F]/15 text-[#2A9D8F]'
                        : cp.domain === 'motor'
                        ? 'bg-[#E07A5F]/15 text-[#E07A5F]'
                        : 'bg-[#3B82F6]/15 text-[#3B82F6]'
                    }`}
                  >
                    {cp.domain}
                  </span>

                  <span className="text-xs">
                    {cp.achieved ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border-2 border-gray-300 block" />
                    )}
                  </span>
                </div>

                <h5 className="font-editorial text-sm font-bold text-[#14213D]">
                  {language === 'zu' ? cp.titleZu : cp.title}
                </h5>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Expected at: ~{Math.round(cp.ageMonthExpected / 12 * 10) / 10} yrs ({cp.ageMonthExpected} mos)
                </p>

                {cp.notes && (
                  <p className="text-xs text-[#4B5563] mt-2 italic bg-white/70 p-2 rounded-xl border border-[#EADFCF]/60">
                    "{cp.notes}"
                  </p>
                )}
              </div>

              {cp.achievedDate && (
                <div className="mt-3 pt-2 border-t border-[#EADFCF]/60 flex items-center justify-between text-[10px] text-[#2A9D8F] font-bold">
                  <span>Status: Achieved</span>
                  <span>{cp.achievedDate}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
