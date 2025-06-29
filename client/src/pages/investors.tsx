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
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if already authenticated
  useEffect(() => {
    const sessionId = localStorage.getItem('investor_session');
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
          localStorage.removeItem('investor_session');
        }
      })
      .catch(() => {
        localStorage.removeItem('investor_session');
      });
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest('POST', '/api/investor/login', { password });
      const data = await response.json();
      return data;
    },
    onSuccess: (data: any) => {
      localStorage.setItem('investor_session', data.sessionId);
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the investor portal",
      });
    },
    onError: () => {
      toast({
        title: "Access denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      loginMutation.mutate(password);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-xl font-light text-gray-600">Investor Portal</h2>
          </div>

          {/* Password Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md border-gray-200">
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
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
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
              localStorage.removeItem('investor_session');
              setIsAuthenticated(false);
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