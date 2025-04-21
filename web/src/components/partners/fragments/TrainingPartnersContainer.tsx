import MLayout from "@/ui/MLayout/MLayout";
import { Box } from "@mantine/core";
import React, { memo } from "react";
import TrainingCarousel from "./TrainingCarousel";

const data = [
  {
    name: "Ravi Kumar",
    designation: "Training Coordinator",
    description:
      "Oversees and manages training programs to ensure quality delivery and curriculum alignment.",
    image: "",
  },
  {
    name: "Anita Sharma",
    designation: "Automation Expert",
    description:
      "Specializes in factory automation and supports students in practical learning with PLCs and HMIs.",
    image: "",
  },
  {
    name: "Rahul Verma",
    designation: "Technical Mentor",
    description:
      "Guides students through hands-on projects and ensures real-world industrial relevance in training.",
    image: "",
  },
  {
    name: "Sneha Joshi",
    designation: "Program Manager",
    description:
      "Coordinates with partner institutions and monitors the implementation of the ATC initiative.",
    image: "",
  },
  {
    name: "Vikram Patel",
    designation: "Industrial Robotics Specialist",
    description:
      "Delivers robotics training and mentors students in building automation solutions.",
    image: "",
  },
  {
    name: "Meera Desai",
    designation: "Senior Instructor",
    description:
      "Conducts technical sessions on servo systems and motion control applications.",
    image: "",
  },
  {
    name: "Saurav Nair",
    designation: "Curriculum Designer",
    description:
      "Designs training modules tailored to industry needs and academic alignment.",
    image: "",
  },
  {
    name: "Priya Kapoor",
    designation: "Faculty Coordinator",
    description:
      "Liaison between industry professionals and academic faculty for collaborative learning.",
    image: "",
  },
  {
    name: "Rohit Mehta",
    designation: "Lab Supervisor",
    description:
      "Ensures the automation labs are fully operational and updated with the latest tech.",
    image: "",
  },
  {
    name: "Neha Bansal",
    designation: "Assessment Lead",
    description:
      "Develops evaluation metrics to measure student performance and training effectiveness.",
    image: "",
  },
  {
    name: "Amit Tiwari",
    designation: "Support Engineer",
    description:
      "Provides technical assistance and troubleshooting for all automation training hardware.",
    image: "",
  },
  {
    name: "Divya Malhotra",
    designation: "Industry Relations Officer",
    description:
      "Builds partnerships with industrial collaborators to keep the training program up-to-date.",
    image: "",
  },
];

const TrainingPartnersContainer: React.FC = () => {
  return (
    <Box mt={"-100px"}>
      <TrainingCarousel
        align="start"
        data={data}
        movingDirection="left"
        scrollTime={2000}
      />
    </Box>
  );
};

export default memo(TrainingPartnersContainer);
