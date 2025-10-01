import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Package, QrCode, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-6 shadow-lg">
              <QrCode   className="w-10 h-10 text-white " />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Campus Lost & Found
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Reuniting students with their lost items through smart QR code technology. 
              Report, scan, and claim items across campus instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/report-found")}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-lg px-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Package className="w-5 h-5 mr-2" />
                Report Found Item
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/report-lost")}
                className="text-lg px-8 border-2"
              >
                <Search className="w-5 h-5 mr-2" />
                Report Lost Item
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
              <QrCode className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              QR Code System
            </h3>
            <p className="text-muted-foreground">
              Every item gets a unique QR code for instant identification and claiming
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
              <MapPin className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Location Tracking
            </h3>
            <p className="text-muted-foreground">
              Track where items were found or lost across all campus locations
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-card border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-xl mb-4">
              <Search className="w-8 h-8 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">
              Smart Matching
            </h3>
            <p className="text-muted-foreground">
              Automatic matching between lost and found items to speed up reunions
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-gradient-to-br from-blue-500/5 to-cyan-400/5 border-border">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">
            Browse All Items
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Search through all reported lost and found items on campus
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/browse")}
            variant="default"
            className="bg-primary text-lg px-8"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Items
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;