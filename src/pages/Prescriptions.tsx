import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Tesseract from "tesseract.js";

const VerifyPrescription = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract medicine name & price from URL
  const queryParams = new URLSearchParams(location.search);
  const medicineName = queryParams.get("medicine") || "";
  const medicinePrice = queryParams.get("price") || "0";

  const processOCR = async (file: File): Promise<string> => {
    try {
      const { data } = await Tesseract.recognize(file, "eng", {
        logger: (info) => console.log(info), // Log OCR progress
      });
      return data.text;
    } catch (error) {
      throw new Error("Failed to process OCR on the prescription.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error",
        description: "Please upload a prescription file.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setOcrText(null);

    try {
      toast({
        title: "Processing...",
        description: "Analyzing the prescription. Please wait.",
      });

      const extractedText = await processOCR(file);
      const cleanedText = extractedText.toLowerCase().replace(/\s+/g, " ").trim();
      const normalizedMedicineName = medicineName.toLowerCase().trim();

      setOcrText(extractedText);

      if (!cleanedText.includes(normalizedMedicineName)) {
        toast({
          title: "Invalid Prescription",
          description: `The uploaded prescription does not include the required medicine: ${medicineName}.`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Prescription verified successfully. Proceeding to checkout.",
      });

      navigate(`/checkout?product=${encodeURIComponent(medicineName)}&price=${medicinePrice}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Prescription Verification</CardTitle>
          <p className="text-gray-600">Medicine: <strong>{medicineName}</strong></p>
          <p className="text-gray-600">Price: <strong>₹{medicinePrice}</strong></p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="file">Upload your prescription:</Label>
              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
            </div>

            {ocrText && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold">Extracted Text:</h3>
                <p className="text-sm whitespace-pre-wrap">{ocrText}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Prescription"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyPrescription;
