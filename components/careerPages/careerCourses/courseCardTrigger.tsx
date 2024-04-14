"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { CourseCard } from "@/components/careerPages/careerCourses/courseCard";
import { CourseCardForm } from "@/components/careerPages/careerCourses/coursesForms/courseCardForm";
import { useState } from "react";

interface Props {
  course: CourseData;
  careerId: number;
}

const CourseCardTrigger = ({ course, careerId }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <CourseCard course={course} />
        </DialogTrigger>
        <CourseCardForm
          handleOpen={handleOpen}
          course={course}
          careerId={careerId}
        />
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <CourseCard course={course} />
      </DrawerTrigger>
      <CourseCardForm
        handleOpen={handleOpen}
        course={course}
        careerId={careerId}
      />
    </Drawer>
  );
};

export { CourseCardTrigger };
