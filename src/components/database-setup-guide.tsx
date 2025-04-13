
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DatabaseSetupGuide = () => {
  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Database Setup Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Follow these steps to set up the MySQL database for the Online Music Shop:</p>
        
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Install MySQL</strong> if you haven't already.
          </li>
          
          <li>
            <strong>Create a database</strong> named "music_shop":
            <pre className="bg-gray-100 p-2 rounded mt-1">
              CREATE DATABASE music_shop;
            </pre>
          </li>
          
          <li>
            <strong>Update server connection details</strong> in src/server/index.js with your MySQL credentials:
            <pre className="bg-gray-100 p-2 rounded mt-1">
{`const db = mysql.createConnection({
  host: 'localhost',
  user: 'YOUR_MYSQL_USERNAME',
  password: 'YOUR_MYSQL_PASSWORD',
  database: 'music_shop'
});`}
            </pre>
          </li>
          
          <li>
            <strong>Start the Node.js server</strong> from the root directory:
            <pre className="bg-gray-100 p-2 rounded mt-1">
              node src/server/index.js
            </pre>
          </li>
          
          <li>
            <strong>The application will automatically create the necessary tables</strong> when the server starts.
          </li>
        </ol>
        
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <p className="font-medium">Note:</p>
          <p>Make sure both the React application and the Node.js server are running simultaneously to use the application.</p>
        </div>
      </CardContent>
    </Card>
  );
};
