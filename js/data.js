// ========================================
// PETTO - Sample Data
// Pet listings, categories, and content
// ========================================

const petData = {
    // Featured pets on homepage
    featured: [
        {
            id: 1,
            name: "Golden Buddy",
            type: "dog",
            breed: "Golden Retriever",
            age: "2 years",
            gender: "Male",
            price: 25000,
            location: "Mumbai, Maharashtra",
            image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=300&fit=crop",
            seller: "Pet Shop",
            vaccination: true,
            description: "Friendly and energetic Golden Retriever puppy looking for a loving home.",
            favorite: false
        },
        {
            id: 2,
            name: "Princess Whiskers",
            type: "cat",
            breed: "Persian Cat",
            age: "1 year",
            gender: "Female",
            price: 15000,
            location: "Delhi, Delhi",
            image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
            seller: "Direct Owner",
            vaccination: true,
            description: "Beautiful Persian cat with soft white fur and blue eyes.",
            favorite: false
        },
        {
            id: 3,
            name: "Charlie",
            type: "bird",
            breed: "Macaw Parrot",
            age: "6 months",
            gender: "Male",
            price: 30000,
            location: "Bangalore, Karnataka",
            image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop",
            seller: "Pet Shop",
            vaccination: true,
            description: "Colorful and talkative Macaw parrot, loves to interact.",
            favorite: false
        },
        {
            id: 4,
            name: "Max",
            type: "dog",
            breed: "Labrador",
            age: "3 years",
            gender: "Male",
            price: 20000,
            location: "Pune, Maharashtra",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
            seller: "Direct Owner",
            vaccination: true,
            description: "Well-trained Labrador, great with kids and families.",
            favorite: false
        },
        {
            id: 5,
            name: "Bella",
            type: "cat",
            breed: "Siamese Cat",
            age: "8 months",
            gender: "Female",
            price: 12000,
            location: "Chennai, Tamil Nadu",
            image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
            seller: "Pet Shop",
            vaccination: true,
            description: "Elegant Siamese cat with striking blue eyes.",
            favorite: false
        },
        {
            id: 6,
            name: "Nemo Jr.",
            type: "fish",
            breed: "Clownfish",
            age: "3 months",
            gender: "Unknown",
            price: 500,
            location: "Hyderabad, Telangana",
            image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=300&fit=crop",
            seller: "Pet Shop",
            vaccination: false,
            description: "Beautiful orange and white clownfish for aquarium.",
            favorite: false
        }
    ],

    // Adoption pets (free)
    adoption: [
        {
            id: 101,
            name: "Rocky",
            type: "dog",
            breed: "Indian Pariah",
            age: "1.5 years",
            gender: "Male",
            price: 0,
            location: "Mumbai, Maharashtra",
            image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=300&fit=crop",
            seller: "NGO",
            vaccination: true,
            description: "Rescued street dog, very loyal and friendly. Looking for forever home.",
            favorite: false,
            adoption: true,
            adoptionBadge: "Good Heart Adoption"
        },
        {
            id: 102,
            name: "Luna",
            type: "cat",
            breed: "Domestic Cat",
            age: "6 months",
            gender: "Female",
            price: 0,
            location: "Bangalore, Karnataka",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
            seller: "Direct Owner",
            vaccination: true,
            description: "Sweet kitten rescued from streets, loves to cuddle.",
            favorite: false,
            adoption: true,
            adoptionBadge: "Good Heart Adoption"
        },
        {
            id: 103,
            name: "Bruno",
            type: "dog",
            breed: "Mixed Breed",
            age: "2 years",
            gender: "Male",
            price: 0,
            location: "Delhi, Delhi",
            image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=300&fit=crop",
            seller: "NGO",
            vaccination: true,
            description: "Playful and energetic mixed breed dog, great with children.",
            favorite: false,
            adoption: true,
            adoptionBadge: "Good Heart Adoption"
        }
    ],

    // Categories
    categories: [
        {
            id: "dogs",
            name: "Dogs",
            icon: "🐶",
            count: 500,
            breeds: ["Labrador", "Golden Retriever", "German Shepherd", "Beagle", "Pug", "Bulldog", "Husky", "Pomeranian"]
        },
        {
            id: "cats",
            name: "Cats",
            icon: "🐱",
            count: 320,
            breeds: ["Persian", "Siamese", "Maine Coon", "British Shorthair", "Bengal", "Ragdoll", "Sphynx"]
        },
        {
            id: "birds",
            name: "Birds",
            icon: "🦜",
            count: 150,
            breeds: ["Macaw", "Cockatiel", "Budgie", "African Grey", "Lovebirds", "Canary", "Finch"]
        },
        {
            id: "fish",
            name: "Fish",
            icon: "🐠",
            count: 200,
            breeds: ["Goldfish", "Betta", "Guppy", "Angelfish", "Tetra", "Oscar", "Koi", "Clownfish"]
        },
        {
            id: "others",
            name: "Other Pets",
            icon: "🐾",
            count: 80,
            types: ["Hamster", "Rabbit", "Guinea Pig", "Turtle", "Ferret"]
        },
        {
            id: "accessories",
            name: "Accessories",
            icon: "🧸",
            count: 1000,
            items: ["Food", "Toys", "Cages", "Leashes", "Beds", "Grooming"]
        }
    ]
};

// Testimonials
const testimonials = [
    {
        name: "Priya Sharma",
        location: "Mumbai",
        text: "Found the perfect puppy for my family! The process was so easy and safe. Highly recommend Petto!",
        rating: 5,
        image: "👩"
    },
    {
        name: "Rahul Verma",
        location: "Bangalore",
        text: "Adopted a beautiful cat through Petto. The adoption process was smooth and the team was very helpful.",
        rating: 5,
        image: "👨"
    },
    {
        name: "Sneha Patel",
        location: "Delhi",
        text: "Best platform for pet lovers! Found my dream Golden Retriever here. Thank you Petto!",
        rating: 5,
        image: "👩"
    }
];

// Safety tips
const safetyTips = [
    "Always meet the seller in a public place",
    "Verify vaccination and health records",
    "Ask for proper documentation",
    "Never make full payment in advance",
    "Check the pet's health condition before buying",
    "Ask about the pet's diet and habits",
    "Ensure the seller is genuine and trustworthy"
];

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        petData,
        testimonials,
        safetyTips
    };
}
