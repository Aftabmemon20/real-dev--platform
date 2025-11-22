import React from "react";
import Header from "./_components/header";
import CourseCard from "./_components/CourseCard";
export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Header />

            {/* Main Content Section */}
            <main className="max-w-6xl mx-auto px-4 py-16">

                {/* Subheading */}
                <h2 className="text-center text-white text-3xl font-semibold mb-12">
                    Choose what you want to become
                </h2>

                {/* Cards Container - We'll fill this next */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cards will go here */}
                    <CourseCard
                        title="become a mern stack developer"
                        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500"
                        link="/course/mern"
                    />


                    <CourseCard
                        title="Become Python Developer"
                        image="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500"
                        link="/course/python"
                    />
                </div>
            </main>
        </div>
    );
}