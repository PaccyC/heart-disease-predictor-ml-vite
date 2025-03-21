
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressRing from '../components/ProgressRing';
import PageTransition from '../components/PageTransition';

interface PredictionResult {
  disease: boolean;
  probability: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Get result from localStorage
    const storedResult = localStorage.getItem('predictionResult');
    
    if (!storedResult) {
      navigate('/predict');
      return;
    }
    
    setResult(JSON.parse(storedResult));
    setLoading(false);
    
    // Trigger animation after a brief delay
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mb-4"></div>
          <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Your Health Prediction Results</h1>
              <p className="text-muted-foreground">
                Based on the provided health parameters
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-8 text-center">
              <div className="mb-8 flex justify-center">
                {animateProgress && result && (
                  <ProgressRing 
                    progress={result.probability} 
                    size={180} 
                    strokeWidth={12} 
                    color={result.disease ? "#ef4444" : "#10b981"}
                  />
                )}
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">
                {result?.disease 
                  ? "Heart Disease Detected" 
                  : "No Heart Disease Detected"}
              </h2>
              
              <p className="text-lg mb-6">
                {result?.disease 
                  ? `Based on the analysis, there is a ${result.probability}% probability that heart disease is present.` 
                  : `Based on the analysis, there is only a ${result.probability}% probability of heart disease.`}
              </p>
              
              <div className={`p-4 rounded-xl mb-6 ${
                result?.disease 
                  ? "bg-red-50 text-red-700 border border-red-200" 
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}>
                <p className="text-sm">
                  {result?.disease 
                    ? "It's recommended to consult a healthcare professional for a complete evaluation." 
                    : "Your heart health indicators appear to be in good standing, but regular check-ups are always recommended."}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <button
                  onClick={() => navigate('/predict')}
                  className="button-primary px-6 py-2.5"
                >
                  New Prediction
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Results;
