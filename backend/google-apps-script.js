/**
 * ADM Kochi — Form Capture Webhook
 * 
 * 1. Create a new Google Sheet
 * 2. Add these headers to Row 1:
 *    Timestamp | Name | Phone | Intent | Message | Source
 * 3. Go to Extensions → Apps Script
 * 4. Delete the default myFunction() and paste ALL of this code
 * 5. Click Save (floppy disk icon), name it "ADM Form Capture"
 * 6. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the Web App URL — that's your FORM_ENDPOINT
 * 8. Paste that URL into assets/adm.js where it says GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p = e.parameter;

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.phone || '',
      p.intent || '',
      p.message || '',
      p.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ADM webhook is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
