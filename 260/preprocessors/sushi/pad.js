// http://du8ne471zajid.cloudfront.net/projects/websushi/websushi_spa/menu
var info = [
  {"title": "Sashimi salad",
  "description": "Organic greens topped with fresh sashimi, wasabi soy vinaigrette.",
  "price": 12,
  "imagePath": "sashimi-salad",
  "nutrition": {
    "protein": 2.9156,
    "fat": 2.4396,
    "carbohydrates": 3.8071,
    "energy_kj": 17.5775,
    "energy_kcal": 4.2011,
    "sugar": 0.3738
    },
  "id": 1},

  {"title": "Chirashi sushi",
  "description": "Sushi bar variety with sushi rice.",
  "price": 21,
  "imagePath": "chirashi-sushi",
  "nutrition": {
    "protein": 2.3138,
    "fat": 0.6041,
    "carbohydrates": 7.8006,
    "energy_kj": 7.5314,
    "energy_kcal": 1.8000,
    "sugar": 0.3114
  },
  "id": 2},

  {"title": "Seaweed salad",
  "description": "A nice seaweed salad.",
  "price": 17,
  "imagePath": "seaweed-salad",
  "nutrition": {
    "protein": 0.229,
    "fat": 2.2852,
    "carbohydrates": 4.8824,
    "energy_kj": 5.1003,
    "energy_kcal": 1.2190,
    "sugar": 0.0037
  },
  "id": 3},

  {"title": "Edamame",
  "description": "Boiled soy beans with salt.",
  "price": 4,
  "imagePath": "edamame",
  "nutrition": {
    "protein": 0.7436,
    "fat": 1.9771,
    "carbohydrates": 0.674,
    "energy_kj": 17.294,
    "energy_kcal": 4.1334,
    "sugar": 0.1028
  },
  "id": 4},

  {"title": "Miso soup",
  "description": "Soy bean soup with Wacame seaweed, tofu, and spring onion.",
  "price": 4,
  "imagePath": "miso-soup",
  "nutrition": {
    "protein": 2.7642,
    "fat": 2.1552,
    "carbohydrates": 9.5294,
    "energy_kj": 9.393,
    "energy_kcal": 2.2450,
    "sugar": 0.1399
  },
  "id": 5},

  {"title": "Maguro",
  "description": "Tuna pieces.",
  "price": 12.5,
  "imagePath": "maguro",
  "nutrition": {
    "protein": 2.2293,
    "fat": 0.7329,
    "carbohydrates": 0.0618,
    "energy_kj": 28.2176,
    "energy_kcal": 6.7442,
    "sugar": 0.4018
  },
  "id": 6},

  {"title": "Shake",
  "description": "",
  "price": 10,
  "imagePath": "shake",
  "nutrition": {
    "protein": 1.4804,
    "fat": 1.4739,
    "carbohydrates": 0.2237,
    "energy_kj": 16.9406,
    "energy_kcal": 4.0489,
    "sugar": 0.245
  },
  "id": 7},

  {"title": "Shiromi",
  "description": "White fish pieces.",
  "price": 9.5,
  "imagePath": "shiromi",
  "nutrition": {
    "protein": 0.2814,
    "fat": 1.3963,
    "carbohydrates": 1.5973,
    "energy_kj": 16.4487,
    "energy_kcal": 3.9313,
    "sugar": 0.0509
  },
  "id": 8},

  {"title": "Tekka maki",
  "description": "Tuna roll with wasabi. -6 pieces",
  "price": 6,
  "imagePath": "tekka-maki",
  "nutrition": {
    "protein": 0.9559,
    "fat": 1.6395,
    "carbohydrates": 7.4319,
    "energy_kj": 9.7847,
    "energy_kcal": 2.3386,
    "sugar": 0.4771
  },
  "id": 9},

  {"title": "Hosomaki Mix",
  "description": "18 pieces.",
  "price": 17,
  "imagePath": "hosomaki-mix",
  "nutrition": {
    "protein": 2.683,
    "fat": 2.858,
    "carbohydrates": 1.6309,
    "energy_kj": 23.8901,
    "energy_kcal": 5.7099,
    "sugar": 0.4839
  },
  "id": 10},

  {"title": "Califonia rolls",
  "description": "Crab sticks, avocado and cucumber. -8 pieces",
  "price": 7.75,
  "imagePath": "california-rolls",
  "nutrition": {
    "protein": 0.848,
    "fat": 0.1205,
    "carbohydrates": 3.6646,
    "energy_kj": 18.6541,
    "energy_kcal": 4.4584,
    "sugar": 0.0174
  },
  "id": 11},

  {"title": "Seattle rolls",
  "description": "Smoked salmon.  Cucumber.  Cream cheese.",
  "price": 8,
  "imagePath": "seattle-rolls",
  "nutrition": {
    "protein": 2.2802,
    "fat": 2.309,
    "carbohydrates": 9.5136,
    "energy_kj": 18.6961,
    "energy_kcal": 4.4685,
    "sugar": 0.2533
  },
  "id": 12},

  {"title": "Spicy Tuna rolls",
  "description": "Spicy tuna, spring onion and avocado. -6 pieces",
  "price": 6,
  "imagePath": "spicytuna-rolls",
  "nutrition": {
    "protein": 1.0003,
    "fat": 1.5621,
    "carbohydrates": 2.6322,
    "energy_kj": 25.0911,
    "energy_kcal": 5.9969,
    "sugar": 0.0474
  },
  "id": 13},

  {"title": "Ebi rolls",
  "description": "King prawns, avocado and asparagus. -8 pieces",
  "price": 8,
  "imagePath": "ebi-rolls",
  "nutrition": {
    "protein": 2.826,
    "fat": 2.854,
    "carbohydrates": 2.433,
    "energy_kj": 19.2756,
    "energy_kcal": 4.6070,
    "sugar": 0.439
  },
  "id": 14},

  {"title": "Chicken Teriyaki",
  "description": "Sauted chicken with teriyaki sauce.",
  "price": 12,
  "imagePath": "chicken-teriyaki",
  "nutrition": {
    "protein": 2.2375,
    "fat": 2.6376,
    "carbohydrates": 7.4605,
    "energy_kj": 18.7052,
    "energy_kcal": 4.4707,
    "sugar": 0.4271
  },
  "id": 15},

  {"title": "Salmon Teriyaki",
  "description": "Sauted salmon with teriyaki sauce.",
  "price": 13.5,
  "imagePath": "salmon-teriyaki",
  "nutrition": {
    "protein": 2.5748,
    "fat": 0.0234,
    "carbohydrates": 6.5532,
    "energy_kj": 22.7136,
    "energy_kcal": 5.4287,
    "sugar": 0.1158
  },
  "id": 16},

  {"title": "Gohan",
  "description": "Steamed rice.",
  "price": 3,
  "imagePath": "gohan",
  "nutrition": {
    "protein": 2.4622,
    "fat": 2.672,
    "carbohydrates": 9.7993,
    "energy_kj": 25.1129,
    "energy_kcal": 6.0021,
    "sugar": 0.3426
  },
  "id": 17},

  {"title": "Tori Katsu",
  "description": "Pan-fried chicken breast with yasasi salad.",
  "price": 11,
  "imagePath": "tori-katsu",
  "nutrition": {
    "protein": 1.0267,
    "fat": 2.2143,
    "carbohydrates": 6.1597,
    "energy_kj": 17.8688,
    "energy_kcal": 4.2708,
    "sugar": 0.0161
  },
  "id": 18},

  {"title": "Yaki Udon",
  "description": "Udon noddles with chicken, king prawns and vegetables.",
  "price": 11.5,
  "imagePath": "yaki-udon",
  "nutrition": {
    "protein": 1.7697,
    "fat": 0.2534,
    "carbohydrates": 6.9919,
    "energy_kj": 7.508,
    "energy_kcal": 1.7945,
    "sugar": 0.1798
  },
  "id": 19}
]

console.log(info.map(function(object) {
  object.imagePath = `/images/${object.imagePath}.jpg`;
  object.quantity = 1;
  return object
}));
