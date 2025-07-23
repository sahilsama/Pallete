export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: string;
  image: string;
  description?: string;
  medium?: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Gloss",
    artist: "Elena Moreno",
    price: "FLUX",
    image: "/images/flux1.png",
    description:
      "Close-up portrait of a young, light-skinned woman, mid-20s,  wearing white sunglasses with bright yellow lenses and a gold-tone frame.  The woman's expression is slightly serious, yet alluring.  She is holding a  bright yellow leather handbag, with a structured satchel style.  The handbag's leather has a smooth, polished texture.  The woman's makeup is subtle, featuring a natural rosy blush and a light lipstick. Her hair is shoulder-length and styled in a loose ponytail.  The background is a plain, neutral gray, creating a minimalist backdrop to focus attention on the woman and the accessory. The lighting is soft and diffused, casting no harsh shadows, highlighting the woman's facial features and the handbag's color.  The image's composition is centered on the woman's face and shoulders, with the handbag positioned subtly to the left of her body.  The perspective is a direct, eye-level close-up.  Photorealistic, high detail, fashion photography style, studio shot,  beautiful woman, stylish handbag, modern accessories,  product photography.",
    medium: "Closeup on Canvas",
  },
  {
    id: "2",
    title: "Pet walk",
    artist: "Karim benzema",
    price: "flux kontext",
    image: "/images/dragon.jpg",
    description:
      "A serene woman with a calm expression, soft features, and gentle eyes stands on her lush rooftop garden, surrounded by vibrant greenery and colorful blooming flowers, as she tenderly presses her forehead against the neck of a towering black scaled dragon looking in camera, its scales are hard, dark red tongue out with saliva, its long eyelashes blinking in anger, in a heartwarming, intimate moment captured in a relaxed selfie angle, basking in the warm, golden hour light that casts a gentle glow on her smooth, porcelain-like skin, her dark hair softly tousled by the whispering wind, the atmosphere peaceful and idyllic, --ar 1:1 --v 5 --s 800",
    medium: "Sun Kissed selfie",
  },
  {
    id: "3",
    title: "Fractions in Black",
    artist: "Sophia Williams",
    price: "MIDJOURNEY",
    image: "/images/model.jpg",
    description:
      "Woman, light-skinned, 20s,  posing in a black, satin, sleeveless dress,  with long, black, satin gloves, leaning against white, cube-shaped podiums,  a  diamond choker and earrings,  in a studio setting.  Soft, diffused light, creating subtle shadows, neutral background,  with a slight  wind-blown movement to the hair.  Head slightly turned, with a soft, suggestive expression,  and an alluring pose.  Long, flowing hair,  black, in a natural,  slightly tousled style.  Focus on the figure,  with a dramatic composition emphasizing the posture and elegance of the subject.  Detailed,  glamourous, elegant style,  with a monochrome (black and white) aesthetic, portrait photography,  high-key lighting,  soft focus.  Simple geometric background,  dramatic pose against plain backdrop, classic,  cinematic style.  --ar 1:1.33 --q 2 --s 700",
    medium: "Mixed Media",
  },
  {
    id: "4",
    title: "PINK Harmony",
    artist: "David Park",
    price: "LUCID REALISM",
    image: "/images/flower.png",
    description:
      "Three hibiscus flowers are depicted in a painting style. Two are a light peachy-orange, and one is a creamy white, with deep burgundy-red centers. The flowers are positioned in the center and upper portion of the image, with leaves and stems surrounding them. The flowers' petals have a textured, painterly quality.  A light, almost pastel blue sky forms the background, with subtle variations in its hue.  The lighting suggests a sunny day, with highlights and shadows emphasizing the flower details. The leaves are a variety of greens, appearing vibrant and detailed. The style is representational and oil-painting-like, showing brushstrokes and visible texture.  The composition is focused on the blossoms, with the background serving as a backdrop to their beauty.  The overall atmosphere is serene and joyful, evocative of a tropical garden or summer scene.",
    medium: "Oil Painting",
  },
  {
    id: "5",
    title: "Fragmented Memory",
    artist: "Amara Johnson",
    price: "MIDJOURNEY",
    image: "/images/png3.png",
    description:
      "Close-up portrait of a young woman, likely Caucasian, mid-20s, with long, dark hair, resting her chin on her hand.  She is looking off to the side, with a contemplative expression.  Her lips are a vibrant, saturated pink, and her eyes are a light green, subtly highlighted.  She has rosy cheeks and a soft, smooth complexion.  Her attire is a dark, charcoal gray turtleneck sweater, with a soft, knit texture. The composition is slightly off-center, drawing the viewer's eye towards her face.  The background features large, bold, white lettering that says 'BLACK' in a hand-painted style.  Brushes strokes of white and black are visible throughout the background, overlaid on a backdrop that is muted, light gray.  Pink flower details are near the woman and contrast against the black and white backdrop.  The lighting is dramatic, highlighting the contours of her face, with a warm, sunny glow, emphasizing her features and creating a soft, dreamy atmosphere. Detailed skin textures, including pores and subtle shadows, are visible, creating a highly realistic portrayal.  The image style is painterly, with visible brushstrokes that create a sense of depth and movement; it has a realistic painting aesthetic, evoking a sense of calmness. The nails of her hand resting on her face are painted a dark, rich color, providing a striking contrast against the softer tones of her skin.  Ultra detailed, highly realistic, painterly portrait style, 8k resolution.",
    medium: "PORTRAIT",
  },
  {
    id: "6",
    title: "Celestial Ring",
    artist: "Hiroshi Tanaka",
    price: "LEONARDO.AI",
    image: "/images/ring.jpg",
    description:
      "A delicate, transparent, and thin layer of plastic material forms the rounded curves of the uppercase letter 'O' in a clean and minimalist design, suspended in mid-air as if defying gravity, set against a soft, light green background that gradates from a pale mint tone at the top to a slightly deeper sage hue towards the bottom, evoking a sense of serenity and calmness, with the plastic material's subtle sheen and gentle reflections adding a touch of modernity and sophistication to the overall composition.",
    medium: "Ink on Paper",
  },
  {
    id: "7",
    title: "Structural Memory",
    artist: "Alexandra Reed",
    price: "FLUX",
    image: "/images/goldengirl.png",
    description:
      "A young woman, likely of Caucasian descent, with closed eyes, lies reclined against a textured, cracked teal green background. Her face is adorned with intricate gold and amber paintwork, creating a cracked, almost sculpted effect.  The paint appears to be applied in a way that highlights the texture of skin, giving a sense of depth and detail.  A golden, textured, flowing headscarf-like garment wraps around her head and upper body,  showing rich golden and amber hues that complement the face paint. The fabric has a weighty, luxurious drape, with visible patterns and textures, reminiscent of sculpted bronze.  The lighting is dramatic, highlighting the facial details and the golden tones of the garment, creating a strong contrast with the background.  The overall composition is intimate and dramatic, with a focus on the intricate details of the paint and fabric.  The style is reminiscent of highly detailed portraiture, combined with decorative artistic techniques.  The perspective is slightly from below, with emphasis on the detailed face and flowing garment.  The colors are rich and deep, showcasing a contrast of the teal green background with the golden tones on the subject's face and garment.  The atmosphere is serene and introspective, emphasized by the woman's expression.  ultra detailed, photorealistic, dramatic lighting,  high contrast,  art deco,  cinematic, 8k resolution.",
    medium: "Sculpture",
  },
  {
    id: "8",
    title: "Chromatic Rhythm",
    artist: "Julian Vega",
    price: "Runaway",
    image: "/images/god.png",
    description:
      "Stained glass geometric style of a female African angel, Glowing halo, looking upwards and holding a burning fire. The background features angular rays intersecting with warm and cool colors. Strong outlines and flat color areas, similar to a modern digital interpretation of a mosaic or woodcut.",
    medium: "Watercolor",
  },
  {
    id: "9",
    title: "Ephemeral Moment",
    artist: "Sarah Kim",
    price: "FLUX",
    image: "/images/anime.jpg",
    description:
      "Capturing the fleeting beauty of a moment in time, where light and shadow create a sense of transience and wonder.",
    medium: "Photography",
  },
  {
    id: "10",
    title: "Whispers of Flowers",
    artist: "Michael Rodriguez",
    price: "FLUX",
    image: "/images/floral suit.png",
    description:
      "Hexcentric Post-Modern Moody studio abstract product shot of a luxury fashion floral suit coming out of flowers in nature. Weird translucent shapes obstruct the view. The picture looks like it was shot on film and overblown/overexposed. The camera looks slightly down at the scene, placing the suit in the center-right of the frame, mid movement. The suit is surrounded by flowers and butterflies. The photoshoot overall style is floral. Add attitude and edge to its motion. Add chromatic aberrations",
    medium: "Mixed Media",
  },
  {
    id: "11",
    title: "Lucid Future",
    artist: "Emma Thompson",
    price: "FLUX",
    image: "/images/png4.png",
    description:
      "Retro cyberpunk universe in 50s, photojournalism in Manhattan at night. A lots of a retro futuristic-flying-cars levitates over the street. Blonde woman is standing at the street looking at the viewer, she is dressed in purple coat. Misty fog, creating a cold, desolate atmosphere. Cinematic composition, lots of neon lights, #ij4klm5nop:0.8",
    medium: "Gouache",
  },
  {
    id: "12",
    title: "Botanical Samurai",
    artist: "Carlos Mendez",
    price: "FLUX",
    image: "/images/png5.jpg",
    description:
      "Creates a high-contrast black and white pixel art image of a mysterious masked man wearing a intricately designed samurai mask, with a bold, geometric pattern on the forehead and a subtle sheen to the eyes, set against a dark, velvety black background, with the man's facial features obscured by the mask, yet exuding an air of intensity and mystique, with subtle pixelation effects that add a sense of digital retro charm to the overall composition.",
    medium: "High Contrast Pixels",
  },
];
