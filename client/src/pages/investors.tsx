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
            <h1 className="text-3xl font-light tracking-wide mb-4">Perception Labs</h1>
            <div className="w-24 h-px bg-black mx-auto mb-8"></div>
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
              onClick={() => setLocation('/')}
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
          <h1 className="text-3xl font-light tracking-wide mb-4">Perception Labs</h1>
          <div className="w-24 h-px bg-black mx-auto mb-8"></div>
          <h2 className="text-xl font-light text-gray-600">Investor Updates</h2>
        </div>

        {/* Progress Updates */}
        <div className="space-y-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-light flex justify-between items-center">
                Q4 2024 Progress Report
                <span className="text-sm text-gray-500">December 2024</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Research Milestones:</strong> Completed initial modeling framework for perception-belief networks. 
                  Successfully validated core algorithms with synthetic datasets showing 94% accuracy in influence propagation prediction.
                </p>
                <p>
                  <strong>Technical Progress:</strong> Deployed scalable infrastructure supporting real-time analysis of up to 
                  100K network nodes. Core platform architecture now supports multiple concurrent research streams.
                </p>
                <p>
                  <strong>Team Growth:</strong> Expanded research team with two senior data scientists and one machine learning 
                  engineer. Current team size: 8 researchers, 3 engineers.
                </p>
                <p>
                  <strong>Next Quarter Focus:</strong> Launch pilot program with three academic institutions. Begin development 
                  of enterprise-grade API for external research collaborations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-light flex justify-between items-center">
                Financial Summary
                <span className="text-sm text-gray-500">As of Dec 31, 2024</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Current Runway:</strong> 18 months</p>
                    <p><strong>Monthly Burn Rate:</strong> $85K</p>
                    <p><strong>Revenue Pipeline:</strong> $2.3M projected</p>
                  </div>
                  <div>
                    <p><strong>R&D Investment:</strong> 68% of budget</p>
                    <p><strong>Personnel:</strong> 24% of budget</p>
                    <p><strong>Infrastructure:</strong> 8% of budget</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-light flex justify-between items-center">
                Market Opportunities
                <span className="text-sm text-gray-500">Strategic Outlook</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Academic Partnerships:</strong> In discussion with 12 universities for research collaborations. 
                  Potential combined market value of $15M over three years.
                </p>
                <p>
                  <strong>Commercial Applications:</strong> Three Fortune 500 companies have expressed interest in our 
                  perception modeling capabilities for consumer behavior analysis.
                </p>
                <p>
                  <strong>Government Sector:</strong> Preliminary discussions with policy research institutions regarding 
                  social influence modeling for public health campaigns.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-light">Risk Assessment & Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Technical Risks:</strong> Scaling challenges addressed through distributed computing architecture. 
                  Backup systems implemented for all critical research data.
                </p>
                <p>
                  <strong>Market Risks:</strong> Diversified application portfolio reduces dependency on single market sector. 
                  Strong academic partnerships provide stability during commercial development.
                </p>
                <p>
                  <strong>Competitive Landscape:</strong> Our unique focus on perception-belief networks provides significant 
                  differentiation from traditional network analysis tools.
                </p>
              </div>
            </CardContent>
          </Card>
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