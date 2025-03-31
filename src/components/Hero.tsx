import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBrowseClick = () => {
    navigate("/products"); // Redirect to /products when the button is clicked
  };

  const handleConsultationClick = () => {
    navigate("/Bookconsultation"); // Redirect to /book-consultation when the button is clicked
  };

  return (
    <div className="relative bg-red py-20 sm:py-32">
      <div className="container mx-auto bg-red px-4">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <h1 className="text-4x1 font-bold tracking-tight text-Grey-900 sm:text-1x4 mb-6">
            Your Trusted Partner for Online Medical Products
          </h1>
          <p className="text-lg leading-8 text-gray-600 mb-8">
            Access quality healthcare from the comfort of your home. Browse medicines, upload prescriptions, and consult with certified doctors online.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleBrowseClick} // Add click handler to navigate
            >
              Browse Products
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleConsultationClick} // Add click handler to navigate
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
