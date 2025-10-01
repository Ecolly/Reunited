import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeDisplayProps {
  itemId: string;
  title: string;
}

export const QRCodeDisplay = ({ itemId, title }: QRCodeDisplayProps) => {
  const qrUrl = `${window.location.origin}/item/${itemId}`;

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${itemId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex flex-col items-center space-y-4">
        <h3 className="font-semibold text-lg text-card-foreground text-center">
          QR Code for {title}
        </h3>
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG id="qr-code" value={qrUrl} size={200} level="H" />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Scan to view item details
        </p>
        <Button onClick={downloadQR} variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </div>
    </Card>
  );
};