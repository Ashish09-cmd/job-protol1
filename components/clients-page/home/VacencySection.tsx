import JobCard from "@/components/ui/JobCard";

export default function VacencySection(){
      return (
        <section>
          <div className="max-w-7xl py-8 lg:py-12 mx-auto">
            <div className="grid grid-cols-4 gap-4">
              <JobCard />
            </div>
          </div>
        </section>
      );
}