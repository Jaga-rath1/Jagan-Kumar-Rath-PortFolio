import React, { useState } from 'react';
import { Brain, Sparkles, Code2, Database, BarChart3, Cpu, Info } from 'lucide-react';
import { dataScienceLab } from '../data/portfolioData';
import DataScienceLab3D from './DataScienceLab3D';

export default function DataScienceLab() {
  const [selectedTopicId, setSelectedTopicId] = useState('python');

  const selectedTopic =
    dataScienceLab.topics.find((t) => t.id === selectedTopicId) || dataScienceLab.topics[0];

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  // Code / Conceptual snippets for illustrative workspace
  const getTopicSnippet = (id) => {
    switch (id) {
      case 'python':
        return `# Clean scripting & data transformation
def process_data_stream(records):
    # Functional filtering & feature extraction
    return [
        {
            "id": r["id"],
            "norm_val": (r["score"] - mean_val) / std_dev
        }
        for r in records if r.get("valid")
    ]`;
      case 'numpy':
        return `# High-performance matrix & vector operations
import numpy as np

# Multi-dimensional array operations
features = np.array([[1.2, 3.4], [5.6, 7.8], [9.0, 1.2]])
normalized = (features - np.mean(features, axis=0)) / np.std(features, axis=0)
dot_product = np.dot(normalized.T, normalized)`;
      case 'pandas':
        return `# Structured DataFrame exploratory workflows
import pandas as pd

df = pd.read_csv("telemetry_dataset.csv")
cleaned_df = df.dropna(subset=["session_id"]).copy()
grouped_summary = cleaned_df.groupby("category").agg({
    "duration": ["mean", "median", "std"],
    "conversions": "sum"
})`;
      case 'analysis':
        return `# Exploratory Pattern Discovery (Illustrative)
# Identifying correlations across multi-variable clusters
# Distribution metrics: Skewness: 0.14 | Kurtosis: 2.85
# High correlation detected between session depth and API payload`;
      case 'ml':
        return `# Machine Learning Foundations
# Supervised Learning Concepts:
# 1. Training / Validation / Test Splits (80/10/10)
# 2. Linear Regression & Gradient Descent Optimization
# 3. Precision, Recall, and ROC-AUC evaluation curves`;
      default:
        return '';
    }
  };

  return (
    <section id="datascience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[38rem] h-[38rem] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-violet-200">
              DATA SCIENCE LAB · {dataScienceLab.statusLabel.toUpperCase()}
            </span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
            {dataScienceLab.sectionTitle}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal">
            {dataScienceLab.supportingCopy}
          </p>

          {/* Strict Professional Label Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
            <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>
              Area of active foundational learning alongside my established MERN Stack engineering focus.
            </span>
          </div>
        </div>

        {/* 3D Lab Composition + Interactive Analytical Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Data Constellation & Coordinate Manifold */}
          <div className="lg:col-span-6 rounded-2xl glass-panel p-6 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
                3D Vector Space Constellation
              </span>
            </div>

            <DataScienceLab3D />

            <div className="w-full mt-2 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Points: 42 Connected Nodes</span>
              <span className="text-purple-300">Coordinate Grid: Active</span>
            </div>
          </div>

          {/* Right Column: Interactive Study Topics & Code Inspector */}
          <div className="lg:col-span-6 space-y-4">
            {/* Topic Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dataScienceLab.topics.map((t) => {
                const isSelected = selectedTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTopicId(t.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-purple-600/30 text-white border-purple-400/50 shadow-md shadow-purple-950/40'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 border-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={isSelected ? 'text-purple-300' : 'text-slate-400'}>
                        {getTopicIcon(t.icon)}
                      </span>
                      <span className="text-xs font-bold font-heading">{t.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300/80 block truncate">
                      {t.status}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Topic Detail Card */}
            <div className="rounded-2xl glass-card border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {selectedTopic.name}
                  </h3>
                  <p className="text-xs text-purple-300 font-mono mt-0.5">
                    {selectedTopic.tagline}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-purple-500/15 text-purple-200 border border-purple-500/30">
                  {selectedTopic.metric}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {selectedTopic.details}
              </p>

              {/* Code Snippet Viewer */}
              <div className="rounded-xl bg-[#030010] border border-white/10 p-4 font-mono text-xs overflow-x-auto text-purple-200/90">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 pb-1 border-b border-white/[0.05]">
                  <span>ILLUSTRATIVE LEARNING SCRIPT</span>
                  <span>PYTHON 3.x</span>
                </div>
                <pre className="text-[11px] leading-relaxed">
                  <code>{getTopicSnippet(selectedTopic.id)}</code>
                </pre>
              </div>

              {/* Illustrative Data Distribution Chart */}
              <div className="pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                  <span>SAMPLE DATA DISTRIBUTION (ILLUSTRATIVE)</span>
                  <span className="text-purple-400">μ = 0.52, σ = 0.18</span>
                </div>
                <div className="h-10 flex items-end gap-1.5 px-2 py-1 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  {[20, 35, 55, 80, 95, 75, 60, 45, 30, 15].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-t bg-gradient-to-t from-purple-800 to-violet-400 opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${val}%` }}
                      title={`Bucket ${idx + 1}: ${val}%`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
