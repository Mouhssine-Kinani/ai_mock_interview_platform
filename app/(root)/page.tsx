import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
const pages = ()=>{
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback  </h2>
                    <p className="text-lg">
                        Practice on real interview quesitons & get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an interview</Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden" />
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Yout Interviews</h2>
                <div className="interviews-section">
                    {/* <p>You haven &#39;t taken any intreviews yet</p> */}
                    {dummyInterviews.map((interview)=>(
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interviews-section">
                    {/* <p>They are no interviews available</p> */}
                    {dummyInterviews.map((interview)=>(
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>
        </>
    )
}
export default pages;