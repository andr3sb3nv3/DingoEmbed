import React from "react";
import TestimoniosActual from "./TestimoniosActual";

interface TestimoniosProps {
  lang: "es" | "en";
  onViewCasesClick?: () => void;
}

export default function Testimonios({ lang, onViewCasesClick }: TestimoniosProps) {
  return <TestimoniosActual lang={lang} onViewCasesClick={onViewCasesClick} />;
}
