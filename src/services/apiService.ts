
import * as localStorageService from './localStorageService';

// Base URL for API
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to determine if we're using local storage or real API
const shouldUseLocalStorage = () => {
  // Set to false to use the actual MySQL database connection
  return false;
};

// Generic fetch wrapper with error handling
const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  console.log(`Making API request to: ${url}`, options);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    console.log(`API response from ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

// Singer APIs
export const fetchSingers = async () => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.getSingers();
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/singers`);
};

export const createSinger = async (singer: Omit<Singer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.addSinger(singer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/singers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(singer)
  });
};

export const updateSinger = async (id: number, singer: Omit<Singer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.updateSinger(id, singer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/singers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(singer)
  });
};

export const deleteSinger = async (id: number) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.deleteSinger(id);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/singers/${id}`, {
    method: 'DELETE'
  });
};

// Composer APIs
export const fetchComposers = async () => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.getComposers();
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/composers`);
};

export const createComposer = async (composer: Omit<Composer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.addComposer(composer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/composers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(composer)
  });
};

export const updateComposer = async (id: number, composer: Omit<Composer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.updateComposer(id, composer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/composers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(composer)
  });
};

export const deleteComposer = async (id: number) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.deleteComposer(id);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/composers/${id}`, {
    method: 'DELETE'
  });
};

// Record Company APIs
export const fetchRecordCompanies = async () => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.getRecordCompanies();
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/record-companies`);
};

export const createRecordCompany = async (company: Omit<RecordCompany, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.addRecordCompany(company);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/record-companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company)
  });
};

export const updateRecordCompany = async (id: number, company: Omit<RecordCompany, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.updateRecordCompany(id, company);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/record-companies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company)
  });
};

export const deleteRecordCompany = async (id: number) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.deleteRecordCompany(id);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/record-companies/${id}`, {
    method: 'DELETE'
  });
};

// Customer APIs
export const fetchCustomers = async () => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.getCustomers();
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/customers`);
};

export const createCustomer = async (customer: Omit<Customer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.addCustomer(customer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  });
};

export const updateCustomer = async (id: number, customer: Omit<Customer, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.updateCustomer(id, customer);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  });
};

export const deleteCustomer = async (id: number) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.deleteCustomer(id);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE'
  });
};

// Song APIs
export const fetchSongs = async () => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.getSongs();
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/songs`);
};

export const createSong = async (song: Omit<Song, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.addSong(song);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song)
  });
};

export const updateSong = async (id: number, song: Omit<Song, 'id'>) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.updateSong(id, song);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/songs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(song)
  });
};

export const deleteSong = async (id: number) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.deleteSong(id);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/songs/${id}`, {
    method: 'DELETE'
  });
};

export const searchSongs = async (term: string) => {
  if (shouldUseLocalStorage()) {
    return await localStorageService.searchSongs(term);
  }
  return await fetchWithErrorHandling(`${API_BASE_URL}/search/songs?term=${encodeURIComponent(term)}`);
};
