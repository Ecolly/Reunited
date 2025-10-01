import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemCard } from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowLeft } from "lucide-react";

// Mock data - in real app, this would come from database
const mockItems = [
  {
    id: "1",
    title: "Blue Backpack",
    description: "Jansport backpack with laptop compartment, found in library",
    location: "Main Library, 2nd Floor",
    date: "2025-09-28",
    type: "found" as const,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    id: "2",
    title: "Silver iPhone 13",
    description: "Lost near Student Union building, black case with stickers",
    location: "Student Union, 3rd Floor",
    date: "2025-09-27",
    type: "lost" as const,
  },
  {
    id: "3",
    title: "Black Wallet",
    description: "Leather wallet found in gym locker room",
    location: "Recreation Center",
    date: "2025-09-26",
    type: "found" as const,
  },
  {
    id: "4",
    title: "Laptop Charger",
    description: "MacBook Pro charger, USB-C, lost in science building",
    location: "Science Building, Room 301",
    date: "2025-09-25",
    type: "lost" as const,
  },
];

const Browse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Browse Items
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search items by name, description, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="found">Found</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                {...item}
                onViewDetails={() => navigate(`/item/${item.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="found" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.type === "found")
              .map((item) => (
                <ItemCard
                  key={item.id}
                  {...item}
                  onViewDetails={() => navigate(`/item/${item.id}`)}
                />
              ))}
          </TabsContent>

          <TabsContent value="lost" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems
              .filter((item) => item.type === "lost")
              .map((item) => (
                <ItemCard
                  key={item.id}
                  {...item}
                  onViewDetails={() => navigate(`/item/${item.id}`)}
                />
              ))}
          </TabsContent>
        </Tabs>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;