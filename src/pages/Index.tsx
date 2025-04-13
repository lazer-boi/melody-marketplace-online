
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SingerForm } from '@/components/SingerForm';
import { ComposerForm } from '@/components/ComposerForm';
import { RecordCompanyForm } from '@/components/RecordCompanyForm';
import { CustomerForm } from '@/components/CustomerForm';
import { SongForm } from '@/components/SongForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState("songs");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Online Music Shop Database</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="singers">Singers</TabsTrigger>
          <TabsTrigger value="composers">Composers</TabsTrigger>
          <TabsTrigger value="recordCompanies">Record Companies</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="songs">
          <SongForm />
        </TabsContent>
        
        <TabsContent value="singers">
          <SingerForm />
        </TabsContent>
        
        <TabsContent value="composers">
          <ComposerForm />
        </TabsContent>
        
        <TabsContent value="recordCompanies">
          <RecordCompanyForm />
        </TabsContent>
        
        <TabsContent value="customers">
          <CustomerForm />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Online Music Shop Database System</p>
        <p>Connect to MySQL database to see and modify data</p>
      </div>
    </div>
  );
};

export default Index;
