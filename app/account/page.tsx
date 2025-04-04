import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut } from "lucide-react";

export default async function AccountPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || 'Profile'} 
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Separator />
              <nav className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {}}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
                  onClick={() => window.location.href = '/auth/logout'}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="mt-1">{user.email}</p>
                {user.email_verified && (
                  <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Account ID</label>
                <p className="mt-1 text-sm text-muted-foreground">{user.sub}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">F1 Fantasy Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Team Name</label>
                <p className="mt-1 text-muted-foreground">Set up your team name in the Team section</p>
              </div>
              <Button variant="outline">
                Go to Team Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 