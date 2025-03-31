import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              MediExpress
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-grey-900">
                Home
              </Link>
              <Link to="/About" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
              <Link to="/Contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
             
              {user && (
                <Link
                  to="/per"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Prescriptions
                </Link>
                
              )}
              <Link to="/Dashboard"  className="text-gray-600 hover:text-gray-900">
                  DashBoard
                </Link>
                
               
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};