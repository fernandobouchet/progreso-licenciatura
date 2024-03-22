'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPeriodOrder } from '@/lib/functions';
import { CourseCardTrigger } from '@/components/careerPages/careerCourses/courseCardTrigger';

interface Props {
  career: CareerData;
}

const PeriodsTab = ({ career }: Props) => {
  return (
    <Tabs defaultValue={'1'} className="w-full">
      <TabsList className="flex w-full p-0 h-14 border-none rounded-full shadow-sm bg-card">
        {career?.periods?.map((period) => (
          <TabsTrigger
            value={period.order.toString()}
            className="rounded-full h-full text-base w-full data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:hover:bg-accent/90 hover:bg-muted hover:text-foreground"
            key={period.id}
          >
            {formatPeriodOrder(period.order)}
          </TabsTrigger>
        ))}
      </TabsList>
      {career?.periods?.map((period) => (
        <TabsContent key={period.id} value={period.order.toString()}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {period.courses.map((course) => (
              <CourseCardTrigger
                key={course.id}
                course={course}
                careerId={career!.id}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export { PeriodsTab };
