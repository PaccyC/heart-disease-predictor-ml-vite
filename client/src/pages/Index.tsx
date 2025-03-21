
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PageTransition from '../components/PageTransition';

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-4xl mx-auto space-y-12 pt-16">
            <section className="flex flex-col items-center text-center space-y-6 animate-fadeIn">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
                Precision Health Analysis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Advanced Heart Disease Prediction
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Leverage clinical data and machine learning to assess your cardiovascular health risk with our state-of-the-art prediction model.
              </p>
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => navigate('/predict')}
                  className="button-primary px-8 py-3"
                >
                  Get Started
                </button>
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="glass-morphism p-6 rounded-2xl flex flex-col items-center text-center animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary text-xl font-semibold">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

const features = [
  {
    icon: "🔍",
    title: "Comprehensive Analysis",
    description: "Our model considers multiple risk factors to provide a holistic health assessment."
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description: "Advanced algorithms analyze your health parameters to identify potential risks."
  },
  {
    icon: "🛡️",
    title: "Preventive Focus",
    description: "Early detection helps prevent serious health complications through timely intervention."
  }
];

export default Index;
