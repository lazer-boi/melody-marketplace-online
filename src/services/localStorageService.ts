
// Local storage service to simulate database operations when server is unavailable

// Helper function to get data from localStorage with default value
const getStorageData = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch (err) {
    console.error(`Error parsing localStorage data for ${key}:`, err);
    return defaultValue;
  }
};

// Singer operations
export const getSingers = async () => {
  return getStorageData<Singer[]>('singers', []);
};

export const addSinger = async (singer: Omit<Singer, 'id'>) => {
  const singers = await getSingers();
  const newSinger = {
    ...singer,
    id: singers.length > 0 ? Math.max(...singers.map(s => s.id)) + 1 : 1
  };
  localStorage.setItem('singers', JSON.stringify([...singers, newSinger]));
  return newSinger;
};

export const updateSinger = async (id: number, singer: Omit<Singer, 'id'>) => {
  const singers = await getSingers();
  const updatedSingers = singers.map(s => s.id === id ? { ...singer, id } : s);
  localStorage.setItem('singers', JSON.stringify(updatedSingers));
  return { ...singer, id };
};

export const deleteSinger = async (id: number) => {
  const singers = await getSingers();
  const updatedSingers = singers.filter(s => s.id !== id);
  localStorage.setItem('singers', JSON.stringify(updatedSingers));
  return { message: 'Singer deleted successfully' };
};

// Composer operations
export const getComposers = async () => {
  return getStorageData<Composer[]>('composers', []);
};

export const addComposer = async (composer: Omit<Composer, 'id'>) => {
  const composers = await getComposers();
  const newComposer = {
    ...composer,
    id: composers.length > 0 ? Math.max(...composers.map(c => c.id)) + 1 : 1
  };
  localStorage.setItem('composers', JSON.stringify([...composers, newComposer]));
  return newComposer;
};

export const updateComposer = async (id: number, composer: Omit<Composer, 'id'>) => {
  const composers = await getComposers();
  const updatedComposers = composers.map(c => c.id === id ? { ...composer, id } : c);
  localStorage.setItem('composers', JSON.stringify(updatedComposers));
  return { ...composer, id };
};

export const deleteComposer = async (id: number) => {
  const composers = await getComposers();
  const updatedComposers = composers.filter(c => c.id !== id);
  localStorage.setItem('composers', JSON.stringify(updatedComposers));
  return { message: 'Composer deleted successfully' };
};

// Record Company operations
export const getRecordCompanies = async () => {
  return getStorageData<RecordCompany[]>('recordCompanies', []);
};

export const addRecordCompany = async (company: Omit<RecordCompany, 'id'>) => {
  const companies = await getRecordCompanies();
  const newCompany = {
    ...company,
    id: companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1
  };
  localStorage.setItem('recordCompanies', JSON.stringify([...companies, newCompany]));
  return newCompany;
};

export const updateRecordCompany = async (id: number, company: Omit<RecordCompany, 'id'>) => {
  const companies = await getRecordCompanies();
  const updatedCompanies = companies.map(c => c.id === id ? { ...company, id } : c);
  localStorage.setItem('recordCompanies', JSON.stringify(updatedCompanies));
  return { ...company, id };
};

export const deleteRecordCompany = async (id: number) => {
  const companies = await getRecordCompanies();
  const updatedCompanies = companies.filter(c => c.id !== id);
  localStorage.setItem('recordCompanies', JSON.stringify(updatedCompanies));
  return { message: 'Record company deleted successfully' };
};

// Customer operations
export const getCustomers = async () => {
  return getStorageData<Customer[]>('customers', []);
};

export const addCustomer = async (customer: Omit<Customer, 'id'>) => {
  const customers = await getCustomers();
  const newCustomer = {
    ...customer,
    id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1
  };
  localStorage.setItem('customers', JSON.stringify([...customers, newCustomer]));
  return newCustomer;
};

export const updateCustomer = async (id: number, customer: Omit<Customer, 'id'>) => {
  const customers = await getCustomers();
  const updatedCustomers = customers.map(c => c.id === id ? { ...customer, id } : c);
  localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  return { ...customer, id };
};

export const deleteCustomer = async (id: number) => {
  const customers = await getCustomers();
  const updatedCustomers = customers.filter(c => c.id !== id);
  localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  return { message: 'Customer deleted successfully' };
};

// Song operations
export const getSongs = async () => {
  const songs = getStorageData<Song[]>('songs', []);
  const singers = await getSingers();
  const composers = await getComposers();
  const recordCompanies = await getRecordCompanies();
  
  return songs.map(song => ({
    ...song,
    singer_name: singers.find(s => s.id === song.singer_id)?.name || '',
    composer_name: composers.find(c => c.id === song.composer_id)?.name || '',
    record_company_name: recordCompanies.find(r => r.id === song.record_company_id)?.name || ''
  }));
};

export const addSong = async (song: Omit<Song, 'id'>) => {
  const songs = getStorageData<Song[]>('songs', []);
  const newSong = {
    ...song,
    id: songs.length > 0 ? Math.max(...songs.map(s => s.id || 0)) + 1 : 1
  };
  localStorage.setItem('songs', JSON.stringify([...songs, newSong]));
  return newSong;
};

export const updateSong = async (id: number, song: Omit<Song, 'id'>) => {
  const songs = getStorageData<Song[]>('songs', []);
  const updatedSongs = songs.map(s => s.id === id ? { ...song, id } : s);
  localStorage.setItem('songs', JSON.stringify(updatedSongs));
  return { ...song, id };
};

export const deleteSong = async (id: number) => {
  const songs = getStorageData<Song[]>('songs', []);
  const updatedSongs = songs.filter(s => s.id !== id);
  localStorage.setItem('songs', JSON.stringify(updatedSongs));
  return { message: 'Song deleted successfully' };
};

export const searchSongs = async (term: string) => {
  const songs = await getSongs();
  const lowerTerm = term.toLowerCase();
  
  return songs.filter(song => 
    song.title.toLowerCase().includes(lowerTerm) ||
    song.movie_name.toLowerCase().includes(lowerTerm) ||
    (song.singer_name && song.singer_name.toLowerCase().includes(lowerTerm)) ||
    (song.composer_name && song.composer_name.toLowerCase().includes(lowerTerm)) ||
    (song.record_company_name && song.record_company_name.toLowerCase().includes(lowerTerm))
  );
};
