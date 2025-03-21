
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Header from '../components/Header';
import FormField from '../components/FormField';
import PageTransition from '../components/PageTransition';

interface FormData {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

const PredictForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: 45,
    sex: 1,
    cp: 0,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 0,
    slope: 1,
    ca: 0,
    thal: 2
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log("Prediction result:", result);
      
      // Store result in localStorage for the results page
      localStorage.setItem('predictionResult', JSON.stringify(result));
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error("Error during prediction:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Health Prediction Form</h1>
              <p className="text-muted-foreground">
                Enter your health parameters below for a heart disease risk assessment
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Age" htmlFor="age">
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="input-field w-full"
                      min="18"
                      max="100"
                      required
                    />
                  </FormField>
                  
                  <FormField label="Sex" htmlFor="sex">
                    <select
                      id="sex"
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Chest Pain Type" htmlFor="cp">
                    <select
                      id="cp"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>Typical Angina</option>
                      <option value={1}>Atypical Angina</option>
                      <option value={2}>Non-anginal Pain</option>
                      <option value={3}>Asymptomatic</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Resting Blood Pressure (mm Hg)" htmlFor="trestbps">
                    <input
                      type="number"
                      id="trestbps"
                      name="trestbps"
                      value={formData.trestbps}
                      onChange={handleChange}
                      className="input-field w-full"
                      min="80"
                      max="200"
                      required
                    />
                  </FormField>
                  
                  <FormField label="Cholesterol (mg/dl)" htmlFor="chol">
                    <input
                      type="number"
                      id="chol"
                      name="chol"
                      value={formData.chol}
                      onChange={handleChange}
                      className="input-field w-full"
                      min="100"
                      max="600"
                      required
                    />
                  </FormField>
                  
                  <FormField label="Fasting Blood Sugar > 120 mg/dl" htmlFor="fbs">
                    <select
                      id="fbs"
                      name="fbs"
                      value={formData.fbs}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Resting ECG Results" htmlFor="restecg">
                    <select
                      id="restecg"
                      name="restecg"
                      value={formData.restecg}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>Normal</option>
                      <option value={1}>ST-T Wave Abnormality</option>
                      <option value={2}>Left Ventricular Hypertrophy</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Max Heart Rate" htmlFor="thalach">
                    <input
                      type="number"
                      id="thalach"
                      name="thalach"
                      value={formData.thalach}
                      onChange={handleChange}
                      className="input-field w-full"
                      min="60"
                      max="220"
                      required
                    />
                  </FormField>
                  
                  <FormField label="Exercise Induced Angina" htmlFor="exang">
                    <select
                      id="exang"
                      name="exang"
                      value={formData.exang}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </FormField>
                  
                  <FormField label="ST Depression by Exercise" htmlFor="oldpeak">
                    <input
                      type="number"
                      id="oldpeak"
                      name="oldpeak"
                      value={formData.oldpeak}
                      onChange={handleChange}
                      step="0.1"
                      className="input-field w-full"
                      min="0"
                      max="10"
                      required
                    />
                  </FormField>
                  
                  <FormField label="Slope of Peak Exercise ST" htmlFor="slope">
                    <select
                      id="slope"
                      name="slope"
                      value={formData.slope}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>Upsloping</option>
                      <option value={1}>Flat</option>
                      <option value={2}>Downsloping</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Number of Major Vessels" htmlFor="ca">
                    <select
                      id="ca"
                      name="ca"
                      value={formData.ca}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </FormField>
                  
                  <FormField label="Thalassemia" htmlFor="thal">
                    <select
                      id="thal"
                      name="thal"
                      value={formData.thal}
                      onChange={handleChange}
                      className="input-field w-full"
                      required
                    >
                      <option value={0}>Normal</option>
                      <option value={1}>Fixed Defect</option>
                      <option value={2}>Reversible Defect</option>
                    </select>
                  </FormField>
                </div>
                
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary px-8 py-3 w-full md:w-auto"
                  >
                    {isSubmitting ? "Processing..." : "Get Prediction"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default PredictForm;
