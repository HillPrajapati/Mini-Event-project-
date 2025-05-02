const Event = require("../models/Event");

async function insertEvents() {
    const count = await Event.countDocuments();
    if (count === 0) {
        await Event.insertMany([
            { _id: "66335c7e827d62189c1e352b", name: "React Workshop", availableSeats: 10 },
            { _id: "66335c8f827d62189c1e352c", name: "Node Bootcamp", availableSeats: 5 },
            { _id: "66335c9a827d62189c1e352d", name: "Vue.js Fundamentals", availableSeats: 15 },
            { _id: "66335ca4827d62189c1e352e", name: "Python for Beginners", availableSeats: 12 },
            { _id: "66335cad827d62189c1e352f", name: "Docker Deep Dive", availableSeats: 8 },
            { _id: "66335cb8827d62189c1e3530", name: "Intro to TypeScript", availableSeats: 20 },
            { _id: "66335cc2827d62189c1e3531", name: "GraphQL API Workshop", availableSeats: 7 },
            { _id: "66335ccf827d62189c1e3532", name: "MongoDB Essentials", availableSeats: 10 },
            { _id: "66335cda827d62189c1e3533", name: "DevOps CI/CD Basics", availableSeats: 9 },
            { _id: "66335ce5827d62189c1e3534", name: "Next.js for Production", availableSeats: 6 }
        ]);
        console.log(" Events collection seeded.");
    }
}

module.exports = {
    insertEvents
}