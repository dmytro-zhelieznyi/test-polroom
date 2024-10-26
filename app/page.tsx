'use client'

import React, {FormEvent, useState} from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Telegram Bot API URL
        const botToken = '8105572327:AAEKV6rB4TUbrx0RhMyxSPWw4NQPx-d247c'; // Replace with your bot token
        const chatId = '-1002259350341'; // Replace with your channel username (or use numeric chat ID for private channels)
        const message = `
        *New Registration* 📋
        *Name:* ${formData.name}
        *Phone:* ${formData.phone}
        *Email:* ${formData.email}
    `;

        // Telegram API Endpoint
        const telegramAPI = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(telegramAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });

            if (response.ok) {
                console.log('Message sent successfully');
                setFormData({ name: '', phone: '', email: '' }); // Reset form
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <img
                    src="https://miro.medium.com/v2/resize:fit:500/1*lSUb1T4YW1td0UskwsGZ1w.gif"
                    alt="Full Screen GIF"
                    className="mx-auto mb-6 block"
                />
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Learn Polish with Us!
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
