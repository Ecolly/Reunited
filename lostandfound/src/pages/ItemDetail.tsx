import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { ArrowLeft, MapPin, Calendar, Mail } from "lucide-react";

// Mock data - in real app, this would come from database
const mockItemDetails: Record<string, any> = {
  "1": {
    id: "1",
    title: "Blue Backpack",
    description: "Jansport backpack with laptop compartment, found in library. Has a small tear on the front pocket and a keychain attached.",
    location: "Main Library, 2nd Floor",
    date: "2025-09-28",
    type: "found",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    contactEmail: "finder@university.edu",
  },
};

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = mockItemDetails[id || "1"] || mockItemDetails["1"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/browse")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="overflow-hidden bg-card border-border">
              {item.imageUrl && (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl font-bold text-card-foreground">
                    {item.title}
                  </h1>
                  <Badge
                    variant={item.type === "found" ? "default" : "secondary"}
                    className={
                      item.type === "found"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {item.type === "found" ? "Found" : "Lost"}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-6">
                  {item.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Location
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Date
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        Contact
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.contactEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-primary">
              Claim This Item
            </Button>
          </div>

          <div>
            <QRCodeDisplay itemId={item.id} title={item.title} />
            <Card className="mt-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-border">
              <h3 className="font-semibold text-lg text-card-foreground mb-3">
                How to use this QR code:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Download and print the QR code</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Attach it to the item or post it nearby</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Anyone can scan to view details instantly</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;