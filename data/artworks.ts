export interface Artwork {
  id: string
  title: string
  artist: string
  price: string
  image: string
  description?: string
  medium?: string
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Landscape",
    artist: "Elena Moreno",
    price: "$4,800",
    image: "/placeholder.jpg",
    description: "A dreamlike landscape that captures the ethereal beauty of nature through soft, flowing brushstrokes and a harmonious color palette.",
    medium: "Oil on Canvas"
  },
  {
    id: "2",
    title: "Urban Fragments",
    artist: "Marcus Chen",
    price: "$3,200",
    image: "/placeholder.jpg",
    description: "Contemporary urban architecture reimagined through geometric abstraction, exploring the relationship between structure and space.",
    medium: "Acrylic on Canvas"
  },
  {
    id: "3",
    title: "Reflections in Blue",
    artist: "Sophia Williams",
    price: "$5,500",
    image: "/placeholder.jpg",
    description: "A mesmerizing exploration of light and reflection, where vibrant blues dance across the canvas creating depth and movement.",
    medium: "Mixed Media"
  },
  {
    id: "4",
    title: "Geometric Harmony",
    artist: "David Park",
    price: "$950",
    image: "/placeholder.jpg",
    description: "Precise geometric forms in perfect balance, creating a visual symphony of shapes and colors that soothes the eye.",
    medium: "Digital Art"
  },
  {
    id: "5",
    title: "Fragmented Memory",
    artist: "Amara Johnson",
    price: "$3,800",
    image: "/placeholder.jpg",
    description: "A poignant exploration of memory and time, where fragmented images come together to tell a story of human experience.",
    medium: "Collage"
  },
  {
    id: "6",
    title: "Celestial Bodies",
    artist: "Hiroshi Tanaka",
    price: "$2,400",
    image: "/placeholder.jpg",
    description: "Abstract representation of cosmic phenomena, where celestial bodies dance in an infinite space of possibility.",
    medium: "Ink on Paper"
  },
  {
    id: "7",
    title: "Structural Tension",
    artist: "Alexandra Reed",
    price: "$6,200",
    image: "/placeholder.jpg",
    description: "Bold architectural forms create dynamic tension, exploring the balance between strength and fragility in modern design.",
    medium: "Sculpture"
  },
  {
    id: "8",
    title: "Chromatic Rhythm",
    artist: "Julian Vega",
    price: "$3,900",
    image: "/placeholder.jpg",
    description: "A symphony of colors in motion, where each hue plays its part in creating a visual rhythm that pulses with life.",
    medium: "Watercolor"
  },
  {
    id: "9",
    title: "Ephemeral Moment",
    artist: "Sarah Kim",
    price: "$2,800",
    image: "/placeholder.jpg",
    description: "Capturing the fleeting beauty of a moment in time, where light and shadow create a sense of transience and wonder.",
    medium: "Photography"
  },
  {
    id: "10",
    title: "Whispers of Time",
    artist: "Michael Rodriguez",
    price: "$4,200",
    image: "/placeholder.jpg",
    description: "A contemplative piece that explores the passage of time through layered textures and subtle color transitions.",
    medium: "Mixed Media"
  },
  {
    id: "11",
    title: "Botanical Dreams",
    artist: "Emma Thompson",
    price: "$3,600",
    image: "/placeholder.jpg",
    description: "Lush botanical forms emerge from dreamlike landscapes, celebrating the beauty and diversity of the natural world.",
    medium: "Gouache"
  },
  {
    id: "12",
    title: "Ocean's Fury",
    artist: "Carlos Mendez",
    price: "$5,100",
    image: "/placeholder.jpg",
    description: "The raw power and beauty of the ocean captured in dynamic brushstrokes, conveying both tranquility and tempest.",
    medium: "Oil on Canvas"
  }
] 