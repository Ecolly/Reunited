import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  type: "lost" | "found";
  imageUrl?: string;
  onViewDetails: () => void;
}

export const ItemCard = ({
  title,
  description,
  location,
  date,
  type,
  imageUrl,
  onViewDetails,
}: ItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
          <Badge
            variant={type === "found" ? "default" : "secondary"}
            className={type === "found" ? "bg-success text-success-foreground" : ""}
          >
            {type === "found" ? "Found" : "Lost"}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {date}
          </div>
        </div>
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full group"
        >
          <QrCode className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          View Details & QR
        </Button>
      </div>
    </Card>
  );
};