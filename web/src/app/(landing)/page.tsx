import HeroSection from "@/components/hero/fragments/HeroSection";
import History from "@/components/history/fragments/History";
import MapContainer from "@/components/india/fragments/MapContainer";
// import AreasOfTraining from "@/components/training/fragments/AreasOfTraining";
import React, { memo } from "react";

const page: React.FC = () => {
  return (
    <>
      <HeroSection />
      <History />
      {/* <AreasOfTraining /> */}
      <MapContainer />
      {/* <TrainingPartnersContainer /> */}
    </>
  );
};

export default memo(page);
