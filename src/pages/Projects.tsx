import { useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const Projects = () => {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useProjects();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Onze Projecten</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek onze meest recente projecten en laat u inspireren voor uw volgende evenement
          </p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.pages.map((page) =>
                page.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.main_image}
                    date={new Date(project.date).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    category={project.category}
                  />
                ))
              )}
            </div>
            
            <div 
              ref={ref}
              className="mt-12 text-center"
            >
              {isFetchingNextPage ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-40 mx-auto" />
                </div>
              ) : hasNextPage ? (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => fetchNextPage()}
                >
                  Meer Projecten Laden
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;