const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { body, validationResult } = require('express-validator');

// Listar todos os e-books
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM ebooks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar e-books' });
  }
});

// Buscar e-book por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM ebooks WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'E-book não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar e-book' });
  }
});

// Criar novo e-book
router.post('/', [
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('author').notEmpty().withMessage('Autor é obrigatório'),
  body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('description').notEmpty().withMessage('Descrição é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, author, price, description } = req.body;
    const result = await query(
      'INSERT INTO ebooks (title, author, price, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar e-book' });
  }
});

// Atualizar e-book
router.put('/:id', [
  body('title').optional().notEmpty(),
  body('author').optional().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('description').optional().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, author, price, description } = req.body;
    const result = await query(
      'UPDATE ebooks SET title = COALESCE($1, title), author = COALESCE($2, author), price = COALESCE($3, price), description = COALESCE($4, description) WHERE id = $5 RETURNING *',
      [title, author, price, description, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'E-book não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar e-book' });
  }
});

// Deletar e-book
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM ebooks WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'E-book não encontrado' });
    }
    res.json({ message: 'E-book deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar e-book' });
  }
});

module.exports = router; 