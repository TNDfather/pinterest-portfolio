import Papa from 'papaparse';

// TODO: Replace with the user's Google Sheet CSV URL
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRqO4zYvISfAOws2mbnEvd2OvkLqFVI8lcjKy4aDzz3QbOKYHDmtUuDjrNPb3H9IpG7rkg1WoqYyLHv/pub?gid=0&single=true&output=csv';

export const fetchSheetData = (url = SHEET_URL) => {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            },
        });
    });
};

const getDirectImage = (url) => {
    if (!url) return null;
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
        // Extract ID
        const idMatch = url.match(/\/d\/(.*?)\//);
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
        }
    }
    return url;
};

// TODO: Replace with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEHIRiD9OL1aYlPP2TzT7nASVosUGfbcPbJsmUJC4wPq9L2hJt39aeVCEi4rchotq1/exec';

export const submitSheetData = async (data) => {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            // mode: 'no-cors', // Use this if CORS issues persist, but you won't get a response
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // 'text/plain' avoids CORS preflight in some cases
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting to sheet:', error);
        throw error;
    }
};

export const normalizeData = (data) => {
    return data.map((item, index) => ({
        id: index,
        title: item.Title || item.title || 'Untitled',
        description: item.Description || item.description || '',
        image: getDirectImage(item.Image || item.image) || `https://picsum.photos/seed/${index}/400/600`,
        thumbnail: getDirectImage(item.Thumbnail || item.thumbnail || item.Thumnail || item.thumnail) || getDirectImage(item.Image || item.image) || `https://picsum.photos/seed/${index}/400/600`,
        author: item.Author || item.author || 'Unknown',
        part: item.Part || item.part || '',
    })).filter(item => item.title !== 'Untitled' || item.image);
};
