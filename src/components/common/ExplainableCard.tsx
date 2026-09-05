import React from 'react';
import { PlusCircle, MinusCircle, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface ExplainableCardProps {
  title: string;
  subtitle?: string;
  score?: number | string;
  positivePoints: string[];
  negativePoints: string[];
  type?: 'opportunity' | 'risk' | 'intelligence';
}

export const ExplainableCard: React.FC<ExplainableCardProps> = ({
  title,
  subtitle,
  score,
  positivePoints,
  negativePoints,
  type = 'opportunity'
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            <h4 className="font-semibold text-slate-100 text-sm">{title}</h4>
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {score !== undefined && (
          <div className="text-right">
            <span className="text-lg font-bold font-mono text-indigo-400">{score}</span>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Match Score</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-800/80">
        {/* Positive Factors */}
        <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Supporting Evidence (+)</span>
          </div>
          <ul className="space-y-1">
            {positivePoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                <span className="text-emerald-500 font-mono font-bold">+</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Negative / Gap Factors */}
        <div className="bg-rose-950/30 border border-rose-900/40 rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Identified Gaps / Risks (-)</span>
          </div>
          <ul className="space-y-1">
            {negativePoints.length > 0 ? (
              negativePoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-slate-300">
                  <span className="text-rose-500 font-mono font-bold">-</span>
                  <span>{pt}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic">No significant gaps detected</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
