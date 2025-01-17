import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, isAdmin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session && isAdmin) {
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from);
    }
  }, [session, isAdmin, navigate, location]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case 'invalid_credentials':
          return 'Invalid email or password. Please check your credentials and try again.';
        case 'email_not_confirmed':
          return 'Please verify your email address before signing in.';
        case 'user_not_found':
          return 'No user found with these credentials.';
        case 'invalid_grant':
          return 'Invalid login credentials.';
        default:
          return error.message;
      }
    }
    return error.message;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(getErrorMessage(error));
        }
      }
      if (event === 'SIGNED_OUT') {
        setErrorMessage(""); // Clear errors on sign out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;