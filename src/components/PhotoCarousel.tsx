import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PhotoCarousel = () => {
  const photos = [
    {
      id: 1,
      title: "First Days",
      description: "Welcome to the world, little one!",
      image: "/first-days.jpg",
    },
    {
      id: 2,
      title: "First Smile",
      description: "That precious first smile that melted our hearts",
      image: "/first-smile.jpg",
    },
    {
      id: 3,
      title: "Beautiful Smile",
      description: "Endless Giggles and Joy",
      image: "/endless.jpg",
    },
    {
      id: 4,
      title: "First Steps",
      description: "Taking on the world, one wobbly step at a time",
      image: "/first-steps.jpg",
    },
    {
      id: 5,
      title: "Birthday Celebration",
      description: "One year of incredible memories!",
      image: "/preview.jpg",
    },
  ];

  return (
    <section id="memories" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">            
              Our Beautiful Memories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A year full of unforgettable moments and precious memories
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {photos.map((photo) => (
                <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="overflow-hidden shadow-soft hover:shadow-celebration transition-all duration-300 hover:scale-105 border-2">
                      <div className="aspect-square bg-black/10">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 bg-card">
                        <h3 className="font-semibold text-xl mb-2 text-foreground">
                          {photo.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {photo.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-soft" />
            <CarouselNext className="right-2 border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground shadow-soft" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
