
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecordCompany {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

export function RecordCompanyForm() {
  const [recordCompanies, setRecordCompanies] = useState<RecordCompany[]>([]);
  const [formData, setFormData] = useState<RecordCompany>({
    name: '',
    contact: '',
    address: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchRecordCompanies();
  }, []);

  const fetchRecordCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/record-companies');
      const data = await response.json();
      setRecordCompanies(data);
    } catch (error) {
      console.error('Error fetching record companies:', error);
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
        await fetch(`http://localhost:3001/api/record-companies/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('http://localhost:3001/api/record-companies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setFormData({ name: '', contact: '', address: '' });
      setEditId(null);
      fetchRecordCompanies();
    } catch (error) {
      console.error('Error saving record company:', error);
    }
  };

  const handleEdit = (company: RecordCompany) => {
    setFormData({
      name: company.name,
      contact: company.contact,
      address: company.address
    });
    setEditId(company.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      await fetch(`http://localhost:3001/api/record-companies/${id}`, {
        method: 'DELETE',
      });
      fetchRecordCompanies();
    } catch (error) {
      console.error('Error deleting record company:', error);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Manage Record Companies</CardTitle>
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
          <Button type="submit">{editId ? 'Update' : 'Add'} Record Company</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Record Companies List</h3>
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
                {recordCompanies.map((company) => (
                  <tr key={company.id} className="border-b">
                    <td className="py-2 px-4">{company.name}</td>
                    <td className="py-2 px-4">{company.contact}</td>
                    <td className="py-2 px-4">{company.address}</td>
                    <td className="py-2 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(company)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(company.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {recordCompanies.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No record companies found
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
