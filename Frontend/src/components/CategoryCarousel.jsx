import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchQuery } from "@/redux/jobSlice";

const catagory = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Data Analyst",
  "Product Manager",
  "UX/UI Designer",
  "SRE",
];


const CategoryCarousel = (query) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler =()=>{
      dispatch(setsearchQuery(query));
      navigate("/Browser");
  
    }
  
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {catagory.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3 ">
              <Button onClick={()=>searchJobHandler(cat)} className="bg-gray-100 text-black text-bold rounded-xl">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
