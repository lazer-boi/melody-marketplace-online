
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'music_shop'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Check if tables exist or create them
  const createTables = `
    CREATE TABLE IF NOT EXISTS singers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      contact VARCHAR(20),
      address TEXT
    );
    
    CREATE TABLE IF NOT EXISTS composers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      contact VARCHAR(20),
      address TEXT
    );
    
    CREATE TABLE IF NOT EXISTS record_companies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      contact VARCHAR(20),
      address TEXT
    );
    
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      contact VARCHAR(20),
      address TEXT
    );
    
    CREATE TABLE IF NOT EXISTS songs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      movie_name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      duration VARCHAR(10),
      category VARCHAR(50),
      available_as VARCHAR(50),
      size DECIMAL(10,2),
      singer_id INT,
      composer_id INT,
      record_company_id INT,
      FOREIGN KEY (singer_id) REFERENCES singers(id),
      FOREIGN KEY (composer_id) REFERENCES composers(id),
      FOREIGN KEY (record_company_id) REFERENCES record_companies(id)
    );
  `;
  
  db.query(createTables, (err) => {
    if (err) {
      console.error('Error creating tables:', err);
    } else {
      console.log('Tables created or already exist');
    }
  });
});

// API Routes
// Singers
app.get('/api/singers', (req, res) => {
  db.query('SELECT * FROM singers', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/singers', (req, res) => {
  const { name, contact, address } = req.body;
  db.query(
    'INSERT INTO singers (name, contact, address) VALUES (?, ?, ?)',
    [name, contact, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, name, contact, address });
    }
  );
});

app.put('/api/singers/:id', (req, res) => {
  const { name, contact, address } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE singers SET name = ?, contact = ?, address = ? WHERE id = ?',
    [name, contact, address, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, contact, address });
    }
  );
});

app.delete('/api/singers/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM singers WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Singer deleted successfully' });
  });
});

// Composers
app.get('/api/composers', (req, res) => {
  db.query('SELECT * FROM composers', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/composers', (req, res) => {
  const { name, contact, address } = req.body;
  db.query(
    'INSERT INTO composers (name, contact, address) VALUES (?, ?, ?)',
    [name, contact, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, name, contact, address });
    }
  );
});

app.put('/api/composers/:id', (req, res) => {
  const { name, contact, address } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE composers SET name = ?, contact = ?, address = ? WHERE id = ?',
    [name, contact, address, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, contact, address });
    }
  );
});

app.delete('/api/composers/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM composers WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Composer deleted successfully' });
  });
});

// Record Companies
app.get('/api/record-companies', (req, res) => {
  db.query('SELECT * FROM record_companies', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/record-companies', (req, res) => {
  const { name, contact, address } = req.body;
  db.query(
    'INSERT INTO record_companies (name, contact, address) VALUES (?, ?, ?)',
    [name, contact, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, name, contact, address });
    }
  );
});

app.put('/api/record-companies/:id', (req, res) => {
  const { name, contact, address } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE record_companies SET name = ?, contact = ?, address = ? WHERE id = ?',
    [name, contact, address, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, contact, address });
    }
  );
});

app.delete('/api/record-companies/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM record_companies WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Record company deleted successfully' });
  });
});

// Customers
app.get('/api/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/customers', (req, res) => {
  const { name, contact, address } = req.body;
  db.query(
    'INSERT INTO customers (name, contact, address) VALUES (?, ?, ?)',
    [name, contact, address],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, name, contact, address });
    }
  );
});

app.put('/api/customers/:id', (req, res) => {
  const { name, contact, address } = req.body;
  const id = req.params.id;
  db.query(
    'UPDATE customers SET name = ?, contact = ?, address = ? WHERE id = ?',
    [name, contact, address, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, contact, address });
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Customer deleted successfully' });
  });
});

// Songs
app.get('/api/songs', (req, res) => {
  const query = `
    SELECT s.*, 
           singer.name as singer_name,
           composer.name as composer_name,
           rc.name as record_company_name
    FROM songs s
    LEFT JOIN singers singer ON s.singer_id = singer.id
    LEFT JOIN composers composer ON s.composer_id = composer.id
    LEFT JOIN record_companies rc ON s.record_company_id = rc.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/songs', (req, res) => {
  const { 
    title, movie_name, price, duration, category, 
    available_as, size, singer_id, composer_id, record_company_id 
  } = req.body;
  
  db.query(
    `INSERT INTO songs (
      title, movie_name, price, duration, category, 
      available_as, size, singer_id, composer_id, record_company_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, movie_name, price, duration, category, available_as, size, singer_id, composer_id, record_company_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ 
        id: result.insertId, 
        title, movie_name, price, duration, category, 
        available_as, size, singer_id, composer_id, record_company_id 
      });
    }
  );
});

app.put('/api/songs/:id', (req, res) => {
  const { 
    title, movie_name, price, duration, category, 
    available_as, size, singer_id, composer_id, record_company_id 
  } = req.body;
  const id = req.params.id;
  
  db.query(
    `UPDATE songs SET 
      title = ?, movie_name = ?, price = ?, duration = ?, category = ?,
      available_as = ?, size = ?, singer_id = ?, composer_id = ?, record_company_id = ?
     WHERE id = ?`,
    [title, movie_name, price, duration, category, available_as, size, singer_id, composer_id, record_company_id, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id, title, movie_name, price, duration, category, 
        available_as, size, singer_id, composer_id, record_company_id 
      });
    }
  );
});

app.delete('/api/songs/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM songs WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Song deleted successfully' });
  });
});

// Search songs
app.get('/api/search/songs', (req, res) => {
  const { term } = req.query;
  const searchTerm = `%${term}%`;
  
  const query = `
    SELECT s.*, 
           singer.name as singer_name,
           composer.name as composer_name,
           rc.name as record_company_name
    FROM songs s
    LEFT JOIN singers singer ON s.singer_id = singer.id
    LEFT JOIN composers composer ON s.composer_id = composer.id
    LEFT JOIN record_companies rc ON s.record_company_id = rc.id
    WHERE s.title LIKE ? 
       OR s.movie_name LIKE ? 
       OR singer.name LIKE ? 
       OR composer.name LIKE ? 
       OR rc.name LIKE ?
  `;
  
  db.query(query, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
