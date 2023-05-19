import Router from 'express';

import Card from '../model/CardModel.js';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const cards = await Card.find({ userId });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Can not get info about this card!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      userId, cardName, image, createdDate,
    } = req.body;
    const card = new Card({
      userId, cardName, image, createdDate,
    });
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: 'Can not post a card!' });
  }
});

export default router;
