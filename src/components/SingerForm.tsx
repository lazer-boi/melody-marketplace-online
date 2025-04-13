
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Singer {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

export function SingerForm() {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [formData, setFormData] = useState<Singer>({
    name: '',
    contact: '',
    address: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchSingers();
  }, []);

  const fetchSingers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/singers');
      const data = await response.json();
      setSingers(data);
    } catch (error) {
      console.error('Error fetching singers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await fetch(`http://localhost:3001/api/singers/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('http://localhost:3001/api/singers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setFormData({ name: '', contact: '', address: '' });
      setEditId(null);
      fetchSingers();
    } catch (error) {
      console.error('Error saving singer:', error);
    }
  };

  const handleEdit = (singer: Singer) => {
    setFormData({
      name: singer.name,
      contact: singer.contact,
      address: singer.address
    });
    setEditId(singer.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      await fetch(`http://localhost:3001/api/singers/${id}`, {
        method: 'DELETE',
      });
      fetchSingers();
    } catch (error) {
      console.error('Error deleting singer:', error);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Manage Singers</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="contact">Contact Number</label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit">{editId ? 'Update' : 'Add'} Singer</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Singers List</h3>
          <div className="border rounded-md">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Contact</th>
                  <th className="py-2 px-4 text-left">Address</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {singers.map((singer) => (
                  <tr key={singer.id} className="border-b">
                    <td className="py-2 px-4">{singer.name}</td>
                    <td className="py-2 px-4">{singer.contact}</td>
                    <td className="py-2 px-4">{singer.address}</td>
                    <td className="py-2 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(singer)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(singer.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {singers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No singers found
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
