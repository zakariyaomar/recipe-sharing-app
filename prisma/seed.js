// prisma/seed.js
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const wanjiku = await prisma.user.create({
    data: {
      name: 'Wanjiku Kamau',
      email: 'wanjiku@example.com',
      bio: 'Home cook from Nairobi. I grew up watching my grandmother prepare traditional dishes.',
    },
  });

  const ochieng = await prisma.user.create({
    data: {
      name: 'Ochieng Otieno',
      email: 'ochieng@example.com',
      bio: 'Chef from Kisumu. Specializing in Nyanza cuisine and Lake Victoria fish.',
    },
  });

  const amina = await prisma.user.create({
    data: {
      name: 'Amina Wafula',
      email: 'amina@example.com',
      bio: 'Food enthusiast from Mombasa. Passionate about coastal Swahili cuisine.',
    },
  });

  console.log('Created 3 users.');

  // Create recipes
  await prisma.recipe.createMany({
    data: [
      {
        title: 'Ugali',
        description: 'The staple food of Kenya. Every meal is incomplete without well-made ugali.',
        ingredients: ['2 cups maize flour (sifted)', '3 cups water', 'Pinch of salt'],
        instructions: 'Bring water to a rolling boil. Add salt. Gradually add maize flour while stirring with a mwiko. Stir vigorously to prevent lumps. Continue until thick and pulling from the pot sides. Cook on low heat for 2-3 minutes. Shape into a dome on a plate.',
        cookTime: 20,
        servings: 4,
        category: 'Main Dish',
        userId: wanjiku.id,
      },
      {
        title: 'Nyama Choma',
        description: 'Kenyan grilled goat meat. The king of weekend social eating.',
        ingredients: ['1 kg goat ribs', '2 lemons juiced', 'Salt to taste', 'Black pepper', 'Kachumbari for serving'],
        instructions: 'Cut meat into large pieces with bone. Season with salt, pepper, and lemon. Marinate 30 minutes. Grill over white-grey charcoal, turning every 5-7 minutes. Cook 30-45 minutes until charred outside and tender inside. Serve with ugali and kachumbari.',
        cookTime: 60,
        servings: 6,
        category: 'Main Dish',
        userId: ochieng.id,
      },
      {
        title: 'Chapati',
        description: 'Kenyan-style flaky flatbread. Perfect with stew or chai.',
        ingredients: ['3 cups all-purpose flour', '1 cup warm water', '3 tbsp oil', '1 tsp salt', '1 tsp sugar'],
        instructions: 'Mix flour, salt, sugar. Add warm water gradually, knead 10 minutes until smooth. Add oil, knead 2 more minutes. Rest 30 minutes. Divide into balls, roll flat, brush oil, fold into quarters, roll flat again. Cook on hot oiled pan 2-3 minutes per side until golden.',
        cookTime: 45,
        servings: 8,
        category: 'Bread',
        userId: wanjiku.id,
      },
      {
        title: 'Sukuma Wiki',
        description: 'Sauteed collard greens. "Push the week" -- affordable and nutritious.',
        ingredients: ['1 bunch collard greens', '2 tomatoes diced', '1 onion sliced', '2 tbsp oil', 'Salt to taste'],
        instructions: 'Wash and chop greens into thin strips. Heat oil, saute onions until soft. Add tomatoes, cook until saucy. Add greens, stir, cover, cook 5-7 minutes. Season with salt. Serve with ugali.',
        cookTime: 15,
        servings: 4,
        category: 'Side Dish',
        userId: wanjiku.id,
      },
      {
        title: 'Pilau',
        description: 'Kenyan spiced rice with cumin, cardamom, and cinnamon. A celebration dish.',
        ingredients: ['2 cups basmati rice', '500g beef cubed', '2 onions sliced', '3 tomatoes blended', '2 tbsp pilau masala', '1 tsp cumin seeds', '4 cups beef stock', '3 tbsp oil'],
        instructions: 'Wash and soak rice 30 minutes. Fry cumin seeds in hot oil until they pop. Add onions, fry until deep brown (15-20 minutes). Brown meat. Add tomatoes and masala, cook 5 minutes. Add stock, bring to boil. Add drained rice, stir once, cover tightly, cook on lowest heat 20 minutes. Do not open lid. Fluff with fork.',
        cookTime: 60,
        servings: 6,
        category: 'Main Dish',
        userId: ochieng.id,
      },
      {
        title: 'Mandazi',
        description: 'East African doughnuts. Lightly sweet with coconut milk and cardamom.',
        ingredients: ['3 cups flour', '1/2 cup sugar', '1/2 cup coconut milk', '1 egg', '1 tsp cardamom', '2 tsp baking powder', 'Oil for frying'],
        instructions: 'Mix dry ingredients. Add egg and coconut milk, knead into soft dough. Rest 1 hour. Roll out to 1cm thick, cut into triangles. Deep fry at 170C until golden on both sides. Drain on paper towels.',
        cookTime: 40,
        servings: 12,
        category: 'Snack',
        userId: amina.id,
      },
      {
        title: 'Githeri',
        description: 'Boiled maize and beans. A hearty, protein-rich traditional dish from Central Kenya.',
        ingredients: ['2 cups dried maize', '1 cup dried beans', '2 potatoes diced', '2 tomatoes', '1 onion', 'Salt to taste', 'Oil'],
        instructions: 'Soak maize and beans overnight. Boil together until both are tender (about 1-2 hours, or use a pressure cooker for 30 minutes). In a separate pan, fry onions, add tomatoes, cook until soft. Add potatoes and cook until tender. Add the boiled maize and beans, stir well, season with salt. Simmer 10 minutes.',
        cookTime: 120,
        servings: 6,
        category: 'Main Dish',
        userId: wanjiku.id,
      },
      {
        title: 'Mukimo',
        description: 'Mashed potatoes mixed with maize, beans, and greens. A Kikuyu staple.',
        ingredients: ['4 large potatoes', '2 cups boiled maize kernels', '1 cup boiled beans', '1 bunch pumpkin leaves or spinach', 'Salt to taste'],
        instructions: 'Boil potatoes until soft. Boil pumpkin leaves separately until tender. Mash potatoes in the pot. Add the boiled maize, beans, and chopped greens. Mash everything together until well combined but still slightly chunky. Season with salt. Serve as a side dish with meat stew or nyama choma.',
        cookTime: 45,
        servings: 6,
        category: 'Main Dish',
        userId: wanjiku.id,
      },
      {
        title: 'Kachumbari',
        description: 'Fresh tomato and onion salsa. No nyama choma is complete without it.',
        ingredients: ['4 ripe tomatoes diced', '1 red onion finely chopped', '1 green chili minced', 'Juice of 1 lemon', 'Fresh dhania chopped', 'Salt to taste'],
        instructions: 'Dice tomatoes into small cubes. Finely chop onion and soak in cold water 5 minutes for mildness. Mince chili. Combine everything, add lemon juice, dhania, and salt. Toss gently. Let sit 10 minutes before serving.',
        cookTime: 10,
        servings: 6,
        category: 'Side Dish',
        userId: amina.id,
      },
      {
        title: 'Tilapia Fry',
        description: 'Deep fried Lake Victoria tilapia. Crispy outside, tender inside.',
        ingredients: ['2 whole tilapia cleaned', '1 lemon juiced', '1 tsp salt', '1/2 tsp black pepper', '1/2 tsp turmeric', 'Oil for frying', 'Fresh dhania'],
        instructions: 'Score fish diagonally on both sides. Rub with lemon juice, salt, pepper, and turmeric. Rest 15 minutes. Heat oil in deep pan. Fry fish 5-7 minutes per side until golden and crispy. Drain on paper towels. Garnish with fresh dhania. Serve with ugali and kachumbari.',
        cookTime: 30,
        servings: 4,
        category: 'Main Dish',
        userId: ochieng.id,
      },
    ],
  });

  const recipeCount = await prisma.recipe.count();
  console.log(`Created ${recipeCount} recipes.`);
  console.log('Seeding complete!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });