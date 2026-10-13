// src/routes/recipes.js
const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// POST /api/recipes -- Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, description, ingredients, instructions, cookTime, servings, category, imageUrl, userId } = req.body;

    if (!title || !ingredients || !instructions || !cookTime || !userId) {
      return res.status(400).json({
        error: 'title, ingredients, instructions, cookTime, and userId are required.',
      });
    }

    // Verify the user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found. Cannot create recipe without a valid user.' });
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        instructions,
        cookTime: parseInt(cookTime),
        servings: servings ? parseInt(servings) : 4,
        category,
        imageUrl,
        userId: parseInt(userId),
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe.' });
  }
});

// GET /api/recipes -- List all recipes with filtering, search, and pagination
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build the where clause
    const where = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // Get recipes and total count in parallel
    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.recipe.count({ where }),
    ]);

    res.json({
      recipes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
});

// GET /api/recipes/:id -- Get a single recipe with its user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, bio: true },
        },
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe.' });
  }
});

// PUT /api/recipes/:id -- Update a recipe
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, cookTime, servings, category, imageUrl } = req.body;

    // Check if recipe exists
    const existing = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    const updated = await prisma.recipe.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(ingredients && { ingredients }),
        ...(instructions && { instructions }),
        ...(cookTime && { cookTime: parseInt(cookTime) }),
        ...(servings && { servings: parseInt(servings) }),
        ...(category !== undefined && { category }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe.' });
  }
});

// DELETE /api/recipes/:id -- Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Recipe not found.' });
    }

    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Recipe deleted successfully.' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe.' });
  }
});

module.exports = router;