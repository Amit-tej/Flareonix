
import React from 'react';
import { IdeaEvaluation } from '../types';
import { Clock, ChevronRight, BarChart2 } from 'lucide-react';

interface HistoryViewProps {
  evaluations: IdeaEvaluation[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ evaluations }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Research Library</h1>
        <p className="text-gray-400">Review your previously analyzed startup concepts and deep-dive reports.</p>
      </header>

      {evaluations.length === 0 ? (
        <div className="glass-card rounded-2xl p-20 text-center text-gray-600">
          <Clock size={64} className="mx-auto mb-4 opacity-10" />
          <p className="text-xl font-medium">No research history found</p>
          <p className="text-sm">Start your first evaluation to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {evaluations.map((item) => (
            <div 
              key={item.id} 
              className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-blue-400">
                    <BarChart2 size={16} />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{item.ideaTitle}</h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{item.rawInput}</p>
              </div>

              <div className="flex items-center gap-8 text-sm">
                <div className="text-right">
                  <p className="text-gray-500">Success Probability</p>
                  <p className={`font-bold ${item.analysis.successProbability > 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.analysis.successProbability}%
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-gray-500">Analyzed On</p>
                  <p className="font-medium">{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
                <ChevronRight className="text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
