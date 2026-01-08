
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, IdeaEvaluation, EvaluationResult } from '../types';
import { evaluateStartupIdea } from '../services/gemini';
import { Search, Loader2, Sparkles, AlertCircle, Download, FileText, Share2, Rocket } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface IdeaEvaluatorProps {
  user: UserProfile | null;
  onSave: (evalData: IdeaEvaluation) => void;
}

const IdeaEvaluator: React.FC<IdeaEvaluatorProps> = ({ user, onSave }) => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [streamedText]);

  const handleEvaluate = async () => {
    if (!input.trim() || !user) return;
    
    setIsAnalyzing(true);
    setStreamedText('');
    setResult(null);

    try {
      const { fullText, sources } = await evaluateStartupIdea(input, user, (chunk) => {
        setStreamedText(prev => prev + chunk);
      });

      // Parse text to extract key metrics for the "EvaluationResult" structured state
      // This is a simplified simulation of structured extraction
      const probMatch = fullText.match(/success probability[:\s]*(\d+)/i);
      const prob = probMatch ? parseInt(probMatch[1]) : 50;

      const evalResult: EvaluationResult = {
        summary: fullText.substring(0, 300) + "...",
        problemRelevance: 70, // Mocked for simplicity
        marketDemand: 65,
        successProbability: prob,
        competitors: [],
        risks: ["Market saturation", "High customer acquisition cost"],
        strategies: ["Focus on niche differentiation", "Direct B2B outreach"],
        flareonixRecommendation: "Highly recommended for MVP stage.",
        groundingSources: sources as any || []
      };

      setResult(evalResult);
      
      const newEval: IdeaEvaluation = {
        id: Date.now().toString(),
        userId: user.id,
        timestamp: Date.now(),
        ideaTitle: input.split(' ').slice(0, 5).join(' ') + '...',
        rawInput: input,
        analysis: evalResult
      };

      onSave(newEval);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    const blob = new Blob([streamedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Flareonix_Report_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">Idea Clarity Engine</h1>
        <p className="text-gray-400">
          Paste your startup concept below. Our AI will conduct deep market research, analyze competitors, 
          and evaluate your potential for success with brutal honesty.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className={`gradient-border transition-all duration-300 ${isAnalyzing ? 'opacity-50' : ''}`}>
          <div className="gradient-bg p-4 flex flex-col md:flex-row gap-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., I want to build a decentralized marketplace for sustainable agriculture products targeting urban roof farmers in South East Asia..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-lg resize-none min-h-[120px]"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleEvaluate}
              disabled={isAnalyzing || !input.trim()}
              className="md:w-32 h-12 md:h-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/10 shrink-0"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              {isAnalyzing ? 'Researching...' : 'Analyze'}
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="mt-6 glass-card p-6 rounded-2xl flex items-center gap-4 animate-pulse">
            <div className="p-3 bg-blue-900/30 rounded-full">
              <Search className="text-blue-400 animate-bounce" size={24} />
            </div>
            <div>
              <p className="font-semibold">Deep Researching Market Data...</p>
              <p className="text-sm text-gray-500 italic">"Scouring industry trends and actual competitors..."</p>
            </div>
          </div>
        )}

        {(streamedText || result) && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Rocket className="text-blue-400" size={20} />
                Research Report
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={downloadReport}
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
                  title="Download Report"
                >
                  <Download size={20} />
                </button>
                <button 
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors"
                  title="Share Report"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div 
              ref={scrollRef}
              className="glass-card rounded-2xl p-8 max-h-[600px] overflow-y-auto prose prose-invert prose-blue max-w-none shadow-2xl"
            >
              <ReactMarkdown className="markdown-content">
                {streamedText}
              </ReactMarkdown>
            </div>

            {result && result.groundingSources.length > 0 && (
              <div className="glass-card p-6 rounded-2xl">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Research Sources</p>
                <div className="flex flex-wrap gap-3">
                  {result.groundingSources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.web.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs text-blue-400 hover:border-blue-500/50 transition-all flex items-center gap-2"
                    >
                      <FileText size={12} />
                      {source.web.title || "External Source"}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-2xl flex gap-4">
              <AlertCircle className="text-blue-400 shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-bold mb-1">Flareonix Pro-Tip</p>
                <p>
                  This idea involves complex multi-channel scaling. Our internal <strong>Tech & Marketing Team</strong> is specialized 
                  in taking researched concepts to production-grade deployments. Click the support bubble to talk to a manager.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaEvaluator;
