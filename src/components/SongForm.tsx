
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Singer {
  id: number;
  name: string;
}

interface Composer {
  id: number;
  name: string;
}

interface RecordCompany {
  id: number;
  name: string;
}

interface Song {
  id?: number;
  title: string;
  movie_name: string;
  price: string;
  duration: string;
  category: string;
  available_as: string;
  size: string;
  singer_id: number | '';
  composer_id: number | '';
  record_company_id: number | '';
  singer_name?: string;
  composer_name?: string;
  record_company_name?: string;
}

export function SongForm() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [singers, setSingers] = useState<Singer[]>([]);
  const [composers, setComposers] = useState<Composer[]>([]);
  const [recordCompanies, setRecordCompanies] = useState<RecordCompany[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Song>({
    title: '',
    movie_name: '',
    price: '',
    duration: '',
    category: '',
    available_as: '',
    size: '',
    singer_id: '',
    composer_id: '',
    record_company_id: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchSongs();
    fetchSingers();
    fetchComposers();
    fetchRecordCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchSongs();
    } else {
      fetchSongs();
    }
  }, [searchTerm]);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const searchSongs = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/search/songs?term=${searchTerm}`);
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  const fetchSingers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/singers');
      const data = await response.json();
      setSingers(data);
    } catch (error) {
      console.error('Error fetching singers:', error);
    }
  };

  const fetchComposers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/composers');
      const data = await response.json();
      setComposers(data);
    } catch (error) {
      console.error('Error fetching composers:', error);
    }
  };

  const fetchRecordCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/record-companies');
      const data = await response.json();
      setRecordCompanies(data);
    } catch (error) {
      console.error('Error fetching record companies:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const songData = {
        ...formData,
        price: parseFloat(formData.price),
        size: parseFloat(formData.size),
      };

      if (editId) {
        await fetch(`http://localhost:3001/api/songs/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(songData),
        });
      } else {
        await fetch('http://localhost:3001/api/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(songData),
        });
      }
      
      setFormData({
        title: '',
        movie_name: '',
        price: '',
        duration: '',
        category: '',
        available_as: '',
        size: '',
        singer_id: '',
        composer_id: '',
        record_company_id: ''
      });
      setEditId(null);
      fetchSongs();
    } catch (error) {
      console.error('Error saving song:', error);
    }
  };

  const handleEdit = (song: Song) => {
    setFormData({
      title: song.title,
      movie_name: song.movie_name,
      price: String(song.price),
      duration: song.duration,
      category: song.category,
      available_as: song.available_as,
      size: String(song.size),
      singer_id: song.singer_id,
      composer_id: song.composer_id,
      record_company_id: song.record_company_id
    });
    setEditId(song.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      await fetch(`http://localhost:3001/api/songs/${id}`, {
        method: 'DELETE',
      });
      fetchSongs();
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Manage Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="movie_name">Movie Name</label>
              <Input
                id="movie_name"
                name="movie_name"
                value={formData.movie_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price (₹)</label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="duration">Duration</label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="available_as">Available As</label>
              <Input
                id="available_as"
                name="available_as"
                value={formData.available_as}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="size">Size (MB)</label>
              <Input
                id="size"
                name="size"
                type="number"
                step="0.01"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="singer_id">Singer</label>
              <Select 
                value={formData.singer_id?.toString()} 
                onValueChange={(value) => handleSelectChange('singer_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Singer" />
                </SelectTrigger>
                <SelectContent>
                  {singers.map(singer => (
                    <SelectItem key={singer.id} value={singer.id.toString()}>
                      {singer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="composer_id">Composer</label>
              <Select 
                value={formData.composer_id?.toString()} 
                onValueChange={(value) => handleSelectChange('composer_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Composer" />
                </SelectTrigger>
                <SelectContent>
                  {composers.map(composer => (
                    <SelectItem key={composer.id} value={composer.id.toString()}>
                      {composer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="record_company_id">Record Company</label>
              <Select 
                value={formData.record_company_id?.toString()} 
                onValueChange={(value) => handleSelectChange('record_company_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Record Company" />
                </SelectTrigger>
                <SelectContent>
                  {recordCompanies.map(company => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">{editId ? 'Update' : 'Add'} Song</Button>
        </form>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Songs List</h3>
            <div className="flex items-center">
              <Input
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
          <div className="border rounded-md overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left">Title</th>
                  <th className="py-2 px-3 text-left">Movie</th>
                  <th className="py-2 px-3 text-left">Price (₹)</th>
                  <th className="py-2 px-3 text-left">Duration</th>
                  <th className="py-2 px-3 text-left">Category</th>
                  <th className="py-2 px-3 text-left">Format</th>
                  <th className="py-2 px-3 text-left">Size (MB)</th>
                  <th className="py-2 px-3 text-left">Singer</th>
                  <th className="py-2 px-3 text-left">Composer</th>
                  <th className="py-2 px-3 text-left">Record Co.</th>
                  <th className="py-2 px-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.id} className="border-b">
                    <td className="py-2 px-3">{song.title}</td>
                    <td className="py-2 px-3">{song.movie_name}</td>
                    <td className="py-2 px-3">{song.price}</td>
                    <td className="py-2 px-3">{song.duration}</td>
                    <td className="py-2 px-3">{song.category}</td>
                    <td className="py-2 px-3">{song.available_as}</td>
                    <td className="py-2 px-3">{song.size}</td>
                    <td className="py-2 px-3">{song.singer_name}</td>
                    <td className="py-2 px-3">{song.composer_name}</td>
                    <td className="py-2 px-3">{song.record_company_name}</td>
                    <td className="py-2 px-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(song)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(song.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {songs.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-4 text-center text-gray-500">
                      No songs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
