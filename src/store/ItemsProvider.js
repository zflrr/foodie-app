import React, { useState, useEffect } from 'react';
import ItemsContext from '../store/ItemsContext';
import axios from 'axios';

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState(ItemsContext._currentValue.items);
    const [error, setError] = useState(null);
    const [switchPage, setSwitchPage] = useState(ItemsContext._currentValue.switchPage); 

    useEffect(() => {
        fetchMeals();
    }, []);

    const togglePage = () => {
        setSwitchPage(prev => !prev);
    };

    const uploadImage = async (imageFile) => {
        if (!imageFile) {
            console.error('No image file selected');
            return null;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('key', '13b4090db7895aa16787324fad1eed5a');

        try {
            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();

            if (response.ok && data && data.data && data.data.url) {
                console.log('Image uploaded successfully:', data.data.url);
                return data.data.url;
            } else {
                console.error('Image upload failed. API response:', data);
                if (data && data.error) {
                    console.error('API error message:', data.error);
                }
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const addItem = async (mealData, imageFile) => {
        try {
            const uploadedImageUrl = await uploadImage(imageFile);
            if (!uploadedImageUrl) {
                throw new Error('Failed to upload image');
            }

            const fullMealData = {
                ...mealData,
                image: uploadedImageUrl
            };

            const response = await axios.post('http://localhost:3006/meals', fullMealData);
            if (response.status === 200 || response.status === 201) {
                setItems(prevItems => [...prevItems, response.data]);
                return response.data;
            } else {
                console.error('Error adding meal:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error:', error.message);
            return null;
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3006/meals/${id}`);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
            setError(null);
        } catch (error) {
            console.error('Error removing meal:', error);
            setError('Failed to remove meal. Please try again.');
        }
    };

    const updateItem = async (id, updatedItem) => {
        try {
            const response = await fetch(`http://localhost:3006/meals/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });
    
            if (response.ok) {
                const updatedItems = items.map((item) => (item.id === id ? updatedItem : item));
                setItems(updatedItems);
            } else {
                throw new Error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await axios.get('http://localhost:3006/meals');
            setItems(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching meals:', error);
            setError('Failed to load meals. Please try again later.');
        }
    };

    const itemsContext = {
        items: items,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        fetchMeals: fetchMeals,
        error: error,
        switchPage: switchPage, 
        setSwitchPage: setSwitchPage 
    };

    return (
        <ItemsContext.Provider value={itemsContext}>
            {children}
        </ItemsContext.Provider>
    );
};