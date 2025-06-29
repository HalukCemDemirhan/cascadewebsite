import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Investors() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if already authenticated
  useEffect(() => {
    const sessionId = sessionStorage.getItem('investor_session'); // Use sessionStorage instead of localStorage
    if (sessionId) {
      // Verify session with backend
      fetch(`/api/investor/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('investor_session');
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        sessionStorage.removeItem('investor_session');
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest('POST', '/api/investor/login', { password });
      const data = await response.json();
      return data;
    },
    onSuccess: (data: any) => {
      sessionStorage.setItem('investor_session', data.sessionId);
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the investor portal",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Access denied",
        description: "Invalid password",
        variant: "destructive",
        duration: 2000,
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      loginMutation.mutate(password);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black">
        {/* Header at top */}
        <div className="text-center pt-8 mb-8">
          <h2 className="text-xl font-light text-gray-600">Investor Portal</h2>
        </div>

        {/* Centered login widget */}
        <div className="flex items-center justify-center px-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
          <div className="w-full max-w-md">
            {/* Password Form */}
            <Card className="border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-center text-lg font-light">Access Required</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:border-black"
                    disabled={loginMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Verifying...' : 'Access Portal'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Back link */}
            <div className="text-center">
              <button 
                onClick={() => setLocation('/white')}
                className="text-gray-600 hover:text-black underline text-sm"
              >
                ← Back to main site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-light text-gray-600">Investor Updates</h2>
        </div>

        {/* Empty content area */}
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg font-light">Updates will be posted here</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">
            Next investor update scheduled for March 31, 2025
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('investor_session');
              setIsAuthenticated(false);
              toast({
                title: "Logged out",
                description: "You have been successfully logged out",
                duration: 2000,
              });
            }}
            className="text-gray-600 hover:text-black underline text-sm mr-6"
          >
            Logout
          </button>
          <button 
            onClick={() => setLocation('/white')}
            className="text-gray-600 hover:text-black underline text-sm"
          >
            ← Back to main site
          </button>
        </div>
      </div>
    </div>
  );
}