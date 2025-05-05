// import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { InfiniteMovingCards } from "../ui/infinite-moving-cards.jsx"

const testimonials = [
    {
        name: "Jayesh Thakkar",
        role: "Verified Buyer",
        quote: "We've been carrying your toy trucks for several years now, and they're consistently a top seller. The quality is exceptional, and the variety of models keeps customers coming back for more. Your company has been a fantastic partner to work with.",
    },
    {
        name: "Rajashree Pednekar",
        role: "Parent",
        quote: "These toy trucks are the coolest! I love playing with them in the sandbox and pretending I'm a big construction worker. They're really strong and never break.",
    },
    {
        name: "Sarah Chen",
        role: "Toy Collector",
        quote: "As a parent, I'm always looking for toys that spark my child's imagination while also being safe and durable. Your toy trucks have exceeded my expectations on all fronts! My kids spend hours playing with them, and they’ve held up amazingly through countless adventures.",
    },
]

import React from 'react'

function Testimonial() {
    return (
        <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="normal"
        />
    )
}

export default Testimonial;

