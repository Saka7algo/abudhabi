# ADM Form Backend — Google Sheets

Zero-cost form capture using Google Sheets + Apps Script.

## 1. Create the Sheet

Open [Google Sheets](https://sheets.new) and create a blank spreadsheet.

In **Row 1**, enter these headers exactly:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Phone | Intent | Message | Source |

Name the sheet something like **"ADM Enquiries"**.

## 2. Add the Apps Script

1. In your Sheet, go to **Extensions → Apps Script**
2. Delete the default `myFunction()` code
3. Copy everything from `google-apps-script.js` in this folder and paste it in
4. Click **Save** (floppy disk icon), name the project: `ADM Form Capture`

## 3. Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon (⚙️) next to "Type" and select **Web app**
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize the script when prompted (click through permissions)
6. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec
   ```

## 4. Wire Up the Frontend

Open `assets/adm.js` and replace:

```javascript
const FORM_ENDPOINT = '';
```

with:

```javascript
const FORM_ENDPOINT = 'YOUR_COPIED_WEB_APP_URL';
```

## 5. Test

Go to `contact.html`, fill the form, and submit. You should see the row appear in your Google Sheet within 2–3 seconds.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Received" shows but no row in Sheet | Check that `FORM_ENDPOINT` is set correctly in `adm.js` |
| CORS error in console | Make sure the Web App is deployed with "Who has access: Anyone" |
| Sheet not updating | Ensure Row 1 headers exist; the script appends to the active sheet |
| Permission denied on deploy | Re-deploy and carefully click through Google authorization screens |

## Security Note

The Web App URL is essentially a public webhook. Anyone with the URL can post data. For a small business contact form this is fine. If you need protection later, add a simple secret token check in `doPost()`.
