
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCustomers as fetchCustomersApi, createCustomer, updateCustomer, deleteCustomer } from '@/services/apiService';

interface Customer {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

export function CustomerForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Customer>({
    name: '',
    contact: '',
    address: ''
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await fetchCustomersApi();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
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
        await updateCustomer(editId, formData);
      } else {
        await createCustomer(formData);
      }
      
      setFormData({ name: '', contact: '', address: '' });
      setEditId(null);
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      contact: customer.contact,
      address: customer.address
    });
    setEditId(customer.id || null);
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Manage Customers</CardTitle>
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
          <Button type="submit">{editId ? 'Update' : 'Add'} Customer</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Customers List</h3>
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
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-2 px-4">{customer.name}</td>
                    <td className="py-2 px-4">{customer.contact}</td>
                    <td className="py-2 px-4">{customer.address}</td>
                    <td className="py-2 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(customer)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No customers found
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
