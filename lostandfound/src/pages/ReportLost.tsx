import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ReportLost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastSeen: "",
    contactEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lost item reported successfully!");
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Report Lost Item
          </h1>
          <p className="text-muted-foreground">
            We'll help you find your missing item
          </p>
        </div>

        <Card className="p-6 bg-card border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Item Name</Label>
              <Input
                id="title"
                placeholder="e.g., Silver iPhone 13"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Last Seen Location</Label>
              <Input
                id="location"
                placeholder="e.g., Student Union, 3rd Floor"
                value={formData.lastSeen}
                onChange={(e) =>
                  setFormData({ ...formData, lastSeen: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="contact">Your Contact Email</Label>
              <Input
                id="contact"
                type="email"
                placeholder="your.email@university.edu"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full bg-secondary">
              Submit Lost Item Report
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportLost;