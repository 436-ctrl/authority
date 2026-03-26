import type { MasterId } from "./masters";
import { assetPath } from "../utils/appPaths";

export interface StoreProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const STORE_CATALOGS: Record<MasterId, StoreProduct[]> = {
  alpha: [
    {
      id: 1,
      name: "Used Socks • Pair 01",
      description: "Well-worn pair from a long day. Packed and sent privately.",
      price: 25,
      image: assetPath("/store/alpha/used-socks-01.jpg"),
    },
    {
      id: 2,
      name: "Used Socks • Pair 02",
      description: "Heavy scent profile and raw session energy.",
      price: 30,
      image: assetPath("/store/alpha/used-socks-02.jpg"),
    },
    {
      id: 3,
      name: "Used Socks • Pair 03",
      description: "Intense pair reserved for serious buyers only.",
      price: 35,
      image: assetPath("/store/alpha/used-socks-03.jpg"),
    },
    {
      id: 4,
      name: "Used Shoes • Pair 01",
      description: "Classic pair with visible use and strong character.",
      price: 80,
      image: assetPath("/store/alpha/used-shoes-01.jpg"),
    },
    {
      id: 5,
      name: "Used Shoes • Pair 02",
      description: "Worn for outdoor sessions. Premium condition with real wear.",
      price: 95,
      image: assetPath("/store/alpha/used-shoes-02.jpg"),
    },
    {
      id: 6,
      name: "Used Shoes • Pair 03",
      description: "Rare pair available in limited quantity.",
      price: 110,
      image: assetPath("/store/alpha/used-shoes-03.jpg"),
    },
    {
      id: 7,
      name: "Used Underwear • Piece 01",
      description: "Private collection item, sealed discreetly.",
      price: 40,
      image: assetPath("/store/alpha/used-underwear-01.jpg"),
    },
    {
      id: 8,
      name: "Used Underwear • Piece 02",
      description: "Selected from recent private sessions.",
      price: 45,
      image: assetPath("/store/alpha/used-underwear-02.jpg"),
    },
    {
      id: 9,
      name: "Used Underwear • Piece 03",
      description: "High-demand piece with priority buyers queue.",
      price: 55,
      image: assetPath("/store/alpha/used-underwear-03.jpg"),
    },
  ],
  wolf: [
    {
      id: 101,
      name: "Wolf Socks • Pair 01",
      description: "Starter stock for Wolf's store collection.",
      price: 30,
      image: assetPath("/store/wolf/wolf-socks-01.jpg"),
    },
    {
      id: 102,
      name: "Wolf Socks • Pair 02",
      description: "Marked pair with strong character and scent.",
      price: 36,
      image: assetPath("/store/wolf/wolf-socks-2.png"),
    },
    {
      id: 103,
      name: "Wolf Socks • Pair 03",
      description: "Reserved pair for high-priority buyers.",
      price: 42,
      image: assetPath("/store/wolf/wolf-socks-03.png"),
    },
    {
      id: 104,
      name: "Wolf Shoes • Pair 01",
      description: "Used pair from in-person movement sessions.",
      price: 90,
      image: assetPath("/store/wolf/wolf-shoes-01.png"),
    },
    {
      id: 105,
      name: "Wolf Shoes • Pair 02",
      description: "Street-worn pair with visible detail.",
      price: 110,
      image: assetPath("/store/wolf/wolf-shoes-02.png"),
    },
    {
      id: 106,
      name: "Wolf Shoes • Pair 03",
      description: "Limited drop item from Wolf's private set.",
      price: 130,
      image: assetPath("/store/wolf/wolf-shoes-03.png"),
    },
    {
      id: 107,
      name: "Wolf Underwear • Piece 01",
      description: "Private item packed discreetly on request.",
      price: 55,
      image: assetPath("/store/wolf/wolf-socks-01.jpg"),
    },
    {
      id: 108,
      name: "Wolf Underwear • Piece 02",
      description: "Exclusive piece with strict buyer screening.",
      price: 60,
      image: assetPath("/store/wolf/wolf-socks-2.png"),
    },
    {
      id: 109,
      name: "Wolf Underwear • Piece 03",
      description: "High-demand release for advanced buyers.",
      price: 70,
      image: assetPath("/store/wolf/wolf-socks-03.png"),
    },
  ],
};
