
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchComposers as fetchComposersApi, createComposer, updateComposer, deleteComposer } from '@/services/apiService';

interface Composer {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

export function ComposerForm() {
  const [composers, setComposers] = useState<Composer[]>([]);
  const [formData, setFormData] = useState<Composer>({
    name: '',
    contact: '',
    address: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchComposers();
  }, []);

  const fetchComposers = async () => {
    try {
      const data = await fetchComposersApi();
      setComposers(data);
    } catch (error) {
      console.error('Error fetching composers:', error);
      setComposers([]);
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
        await updateComposer(editId, formData);
      } else {
        await createComposer(formData);
      }
      
      setFormData({ name: '', contact: '', address: '' });
      setEditId(null);
      fetchComposers();
    } catch (error) {
      console.error('Error saving composer:', error);
    }
  };

  const handleEdit = (composer: Composer) => {
    setFormData({
      name: composer.name,
      contact: composer.contact,
      address: composer.address
    });
    setEditId(composer.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      await deleteComposer(id);
      fetchComposers();
    } catch (error) {
      console.error('Error deleting composer:', error);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Manage Composers</CardTitle>
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
          <Button type="submit">{editId ? 'Update' : 'Add'} Composer</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Composers List</h3>
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
                {composers.map((composer) => (
                  <tr key={composer.id} className="border-b">
                    <td className="py-2 px-4">{composer.name}</td>
                    <td className="py-2 px-4">{composer.contact}</td>
                    <td className="py-2 px-4">{composer.address}</td>
                    <td className="py-2 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(composer)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(composer.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {composers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No composers found
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
