import Router from 'express';

import Card from '../model/CardModel.js';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Can not get info about these cards!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      userId, cardName, image, createdDate, isFavourite, rating,
    } = req.body;
    const card = new Card({
      userId, cardName, image, createdDate, isFavourite, rating,
    });
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Can not post cards!' });
  }
});
export default router;
