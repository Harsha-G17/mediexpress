import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const FeaturedProducts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const products = [
    {
      id: "1",
      name: "Health Essentials",
      description: "Daily vitamins and supplements",
      price: "₹29.99",
      badge: "Popular",
      prescription_required: false,
    },
    {
      id: "2",
      name: "First Aid Kit",
      description: "Complete emergency care kit",
      price: "₹49.99",
      badge: "Best Seller",
      prescription_required: false,
    },
    {
      id: "3",
      name: "Wellness Pack",
      description: "Immunity boosting bundle",
      price: "₹39.99",
      badge: "New",
      prescription_required: true,
    },
  ];

  const checkPrescription = async (productId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to continue",
          variant: "destructive",
        });
        navigate("/auth");
        return false;
      }

      const { data: prescriptions, error } = await supabase
        .from("prescriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("status", "approved")
        .limit(1);

      if (error) {
        throw error;
      }

      if (!prescriptions || prescriptions.length === 0) {
        toast({
          title: "Prescription Required",
          description: "Please upload a valid prescription first",
          variant: "destructive",
        });
        navigate("/prescriptions");
        return false;
      }

      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleAddToCart = async (product: any) => {
    if (product.prescription_required) {
      const hasPrescription = await checkPrescription(product.id);
      if (!hasPrescription) {
        return;
      }
    }

    // Add to cart logic here
    toast({
      title: "Success",
      description: "Product added to cart",
    });
  };

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our most popular medical supplies
          </p>
          <Link to="/products">
            <Button className="mt-4">View All Products</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="fade-in">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{product.badge}</Badge>
                    {product.prescription_required && (
                      <Badge variant="destructive">Prescription Required</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};