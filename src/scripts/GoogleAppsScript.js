// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code into Code.gs
// 4. Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheet ID
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Description: "API"
// 8. Execute as: "Me"
// 9. Who has access: "Anyone" (Important for frontend access)
// 10. Copy the "Web app URL" and paste it into src/services/SheetService.js as SCRIPT_URL

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // e.g., 1cMSNpe03mqVrhG3Urn7wqMfLgMWIY9A5
const SHEET_NAME = 'Sheet1'; // Make sure this matches your sheet name

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

        // Parse the incoming JSON data
        const data = JSON.parse(e.postData.contents);

        const newRow = headers.map(header => {
            // Map header names to data keys (case-insensitive)
            const key = Object.keys(data).find(k => k.toLowerCase() === header.toLowerCase());
            return key ? data[key] : '';
        });

        sheet.appendRow(newRow);

        return ContentService
            .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ result: 'error', error: e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function doOptions(e) {
    // Handle CORS preflight
    return ContentService.createTextOutput('')
        .setMimeType(ContentService.MimeType.TEXT)
        .append('Access-Control-Allow-Origin: *')
        .append('Access-Control-Allow-Methods: POST, GET, OPTIONS')
        .append('Access-Control-Allow-Headers: Content-Type');
}
