import { Card } from "@/components/ui/card";

export const Portfolio = () => {
  const designs = [
    {
      id: 1,
      title: "Modern E-commerce Website",
      category: "Web Design",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Brand Identity Package",
      category: "Branding",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "UI/UX Design",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Social Media Campaign",
      category: "Digital Marketing",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 5,
      title: "Corporate Website",
      category: "Web Development",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      id: 6,
      title: "Product Photography",
      category: "Photography",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Design <span className="bg-gradient-accent bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our latest projects and see what our students have created
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <Card 
              key={design.id} 
              className="group overflow-hidden cursor-pointer hover:shadow-hover transition-all duration-300"
            >
              <div className={`h-64 bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                    <h3 className="text-xl font-bold mb-2">{design.title}</h3>
                    <p className="text-sm">{design.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
