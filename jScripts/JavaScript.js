// משתנים אלו מוגדרים כ-CONST כיוון שהם מפנים לאלמנטים קבועים בדף ואין צורך לשנות את ההפניה עצמה.
const form = document.getElementById('picnicForm');  // CONST: הפנייה לטופס הראשי.
const FULL_NAME_INPUT = document.getElementById('fullName'); // CONST: שדה קלט השם.
const ADDRESS_INPUT = document.getElementById('adress'); // CONST: שדה קלט הכתובת.
const LIVE_NAME_SPAN= document.getElementById('liveName'); // CONST: אלמנט להצגת השם החי בסימולציה.
const SUBMIT_BUTTON = document.getElementById('submitBtn');// CONST: כפתור השליחה.
const FEEDBACK_DIV = document.getElementById('feedback'); // CONST: אזור להצגת משוב כללי.

const MODAL = document.getElementById('modal'); // CONST: חלון המודאל המכיל את הסיכום.
const CLOSE_BTN = document.getElementById('closePopUp'); // CONST: כפתור סגירת המודאל.

const NAME_ERROR_DIV= document.getElementById('names-error'); // CONST: אזור להצגת שגיאת שם.
const ADDRESS_ERROR_DIV= document.getElementById('adress-error'); // CONST: אזור להצגת שגיאת כתובת.
const DRINKS_ERROR_DIV = document.getElementById('drinks-error'); // CONST: אזור להצגת שגיאת שתייה.
const FOOD_ERROR_DIV = document.getElementById('food-error'); // CONST: אזור להצגת שגיאת אוכל.
const LIGHT_ERROR_DIV = document.getElementById('light-error'); // CONST: אזור להצגת שגיאת תאורה.

// הפניות לאלמנטים להצגת הסיכום בתוך חלונית הסיכום (CONST)
const USER_NAME_SPAN = document.getElementById('userName');// CONST: ספאן להצגת השם בחלונית הסיכום.
const DRINK_TYPE_SPAN = document.getElementById('drinkType'); // CONST: ספאן להצגת סיכום שתייה.
const FOOD_TYPE_SPAN = document.getElementById('foodType'); // CONST: ספאן להצגת סיכום אוכל.
const LIGHT_TYPE_SPAN = document.getElementById('lightType');// CONST: ספאן להצגת סיכום תאורה.
const DESTINATION_SPAN= document.getElementById('destination');// CONST: ספאן להצגת הכתובת.
const MORE_INFO_SPAN = document.getElementById('moreInfo'); // CONST: ספאן להצגת בקשות מיוחדות.

// קבוצות פקדים (מערכים)
// מערך קבוע (CONST) של אובייקטי HTML (אלמנטים) עבור כל קבוצת בחירה בטופס.
const DRINK_CHECKBOXES = Array.from(document.querySelectorAll('#drinks input[type="checkbox"]')); // CONST: מערך צ'ק בוקסים של שתייה.
const FOOD_CHECKBOXES = Array.from(document.querySelectorAll('#food  input[type="checkbox"]')); // CONST: מערך צ'ק בוקסים של אוכל.
const LIGHT_RADIOS = Array.from(document.querySelectorAll('#light input[type="radio"]')); // CONST: מערך כפתורי רדיו של תאורה.

// מיפויי אייקונים/תמונות (מערכי CONST)
const DRINK_MAPPING_IDS = ['onTable-water','onTable-wine','onTable-juice']; // CONST: מערך מזהי תמונות שתייה על השולחן.
const DRINK_ICON_IDS= ['icon-water','icon-wine','icon-juice']; // CONST: מערך מזהי אייקוני שתייה במלבן.
const FOOD_MAPPING_IDS = ['onTable-cheese','onTable-strawberry','onTable-cake']; // CONST: מערך מזהי תמונות אוכל על השולחן.
const FOOD_ICON_IDS = ['icon-cheese','icon-strawberry','icon-cake']; // CONST: מערך מזהי אייקוני אוכל במלבן.
const LIGHT_MAPPING_IDS = ['onTable-lamp','onTable-fire']; // CONST: מערך מזהי תמונות תאורה על השולחן.
const LIGHT_ICON_IDS = ['icon-lamp','icon-fire']; // CONST: מערך מזהי אייקוני תאורה במלבן.

const ON_TABLE_IMAGES   = Array.from(document.querySelectorAll('[id^="onTable-"]')); // איסוף כל התמונות המשתתפות בסימולציה לכדי מערך אחד, מה שמאפשר שליטה יעילה על הצגתן והסתרתן.
const DIM_CLASS = 'dim', ON_CLASS = 'on'; // CONST: מחלקות CSS לשליטה במצב עמעום/הדלקה.




// פונקציות עזר קצרות
// CONST: פונקציית חץ קצרה לעדכון תוכן טקסטואלי.
//el (קיצור של Element, אלמנט) הוא פרמטר שמקבל ערך כאשר הפונקציה נקראת.
// txt='': הערך הטקסטואלי החדש; ברירת המחדל שלו היא מחרוזת ריקה, מה שמאפשר להשתמש בפונקציה כדי לנקות טקסט שגיאה מבלי להעביר במפורש מחרוזת ריקה
const setText = (el, txt='') => {   
     if (el) el.textContent = txt; // בדיקת תקינות: הפונקציה כוללת תנאי (if (el)) שמטרתו לוודא שהאלמנט אכן קיים לפני שמנסים לשנות את התוכן שלו (el.textContent = txt).
};
const containsDigits = s => /\d/.test(s); //  נקראת בתוך הפונקציה checkFormValidity() כדי לוודא ששדה ה"שם" (fullName) אינו מכיל ספרות, כחלק מדרישות הולידציה של הטופס:
const anyChecked = nodes => nodes.some(n => n.checked); // בדיקת תקינות המוודאה שהצ'ק בוקסים וכפתורי הרדיו מוזנים בצורה תקינה ואם לא- מקפיצים שגיאה.
const showById = (id, show) => { // שליטה בנראות (הצגה או הסתרה) של אלמנט ספציפי ב-HTML, עבור התמונות באזור הסימולציה.
    const el = document.getElementById(id); // איתור אלמנט ה-HTML שזהותו (id) הועברה כפרמטר.
    if (el) el.style.display = show ? 'block' : 'none'; //  אם show הוא false: הנראות משתנה ל-'none' (הסתרה). אם show הוא true: הנראות משתנה ל-'block' (הצגה).
};
const toggleIcon = (id, on) => { // שליטה במצב העמעום או ההדגשה של אייקוני הבחירה המופיעים במלבנים הכחולים בטופס
    const el = document.getElementById(id); // איתור אלמנט ה-HTML שזהותו (id) הועברה כפרמטר.
    if (!el) return; // תנאי IF: אם האלמנט לא קיים, הפונקציה תעצור מיד ותמנע שגיאה.
    el.classList.toggle(ON_CLASS, on);   // פקודה זו מפעילה את המחלקה ON_CLASS (שמייצגת הדגשה) אם הערך של on הוא true
    el.classList.toggle(DIM_CLASS, !on); // פקודה זו מפעילה את המחלקה DIM_CLASS אם הערך של on הוא false (!on הופך את true ל-false ולהיפך)
};

// מטרתה היא לבנות את הסיכום הטקסטואלי של הבחירות שנעשו בטופס (שתייה, אוכל ותאורה) כדי להציגו בהודעת האישור/מודאל
function collectCheckedText(nodes){ // פונקציה לבניית מחרוזת סיכום מתוך מערך פקדים נתון.
    const picked = nodes.filter(n => n.checked) // לולאת FILTER: יוצרת מערך חדש רק מהפקדים המסומנים (checked).
                       .map(n => n.parentNode.textContent.trim()); // לולאת MAP: ממפה כל פקד נבחר לטקסט של ה-LABEL העוטף.
    return picked.length ? picked.join(', ') : 'אין'; // תנאי: אם נבחר משהו, מחזירים מחרוזת מופרדת בפסיקים. אם לא – 'אין' (כמו למשל בבקשות נוספות- כי היא היחידה שלא מחוייבת במילוי).
} 




// ולידציה מרוכזת- מנהלת את הצגת השגיאות ואת מצב כפתור השליחה
function checkFormValidity(){ // הפונקציה הראשית לבדיקת תקינות הטופס.
    let ok = true; // מוגדר כ-let כיוון שערכו משתנה במהלך הפונקציה (הוא עשוי להפוך ל-false אם נמצאה שגיאה כלשהי)

    const name = FULL_NAME_INPUT.value.trim(); // שומר את הערך שהוזן בשדה השם. מוגדר כ-const כיוון שהערך שלו קבוע במהלך בדיקת הולידציה. השימוש ב-trim() מסיר רווחים מיותרים משני קצוות המחרוזת, מה שחיוני לבדיקת תקינות ואורך מינימלי.
    if (name.length < 2){ // תנאי IF: בדיקת אורך מינימלי (2 תווים).
        setText(NAME_ERROR_DIV,'שם חייב להיות מורכב משתי אותיות לפחות.'); ok = false; //אם התנאי בשורה הקודמת מתקיים, קורא לפונקציה setText כדי להציג את הודעת השגיאה באזור השגיאה של השם (NAME_ERROR_DIV), ומעדכן את דגל הולידציה ל-false.
    } else if (containsDigits(name)){ // אם השם עבר את בדיקת האורך, בודק האם השם מכיל ספרות
        setText(NAME_ERROR_DIV,'שם: אסור להכיל ספרות.'); ok = false; //אם התנאי בשורה הקודמת מתקיים, מציג את הודעת השגיאה המתאימה ומעדכן את דגל הולידציה ל-false
    } else setText(NAME_ERROR_DIV,''); // ELSE: אם תקין, מנקה את הודעת השגיאה.

    const addr = ADDRESS_INPUT.value.trim(); // שומר את ערך הכתובת שהוזן (לאחר trim) כמשתנה const לצורך הבדיקה.
    if (addr.length < 2){ // תנאי IF: בודק האם אורך הכתובת שהוזנה קטן מ-2 תווים.
        setText(ADDRESS_ERROR_DIV,'כתובת המשלוח: נדרשים 2 תווים לפחות.'); ok = false; //אם התנאי מתקיים, מציג הודעת שגיאה לכתובת ומעדכן את ok ל-false.
    } else setText(ADDRESS_ERROR_DIV,''); // ELSE: אם תקין, מנקה את הודעת השגיאה.

    const lightOk = anyChecked(LIGHT_RADIOS); // שומר את תוצאת בדיקת החובה של התאורה. משתמש בפונקציה anyChecked (שמשתמשת בלולאת some) כדי לבדוק האם לפחות פקד רדיו אחד נבחר מתוך המערך LIGHT_RADIOS
    setText(LIGHT_ERROR_DIV, lightOk ? '' : 'חובה לבחור סוג תאורה.'); // כדי להחליט איזו מחרוזת להציג: אם lightOk הוא true (תקין), מוצגת מחרוזת ריקה (ניקוי שגיאה); אם false, מוצגת הודעת החובה לתאורה.
    if (!lightOk) ok = false; // תנאי IF: אם לא נבחרה תאורה, דגל הולידציה הכללי משתנה ל-false.

    const drinkOk = anyChecked(DRINK_CHECKBOXES); // בודק האם נבחר לפחות צ'ק בוקס אחד עבור שתייה
    setText(DRINKS_ERROR_DIV, drinkOk ? '' : 'חובה לבחור משקה אחד לפחות.'); //כדי להחליט איזו מחרוזת להציג: אם drinkOk הוא true (תקין), מוצגת מחרוזת ריקה (ניקוי שגיאה); אם false, מוצגת הודעת החובה לשתייה.
    if (!drinkOk) ok = false; //אם בדיקת השתייה נכשלה, מעדכן את דגל הולידציה הכללי ל-false.

    const foodOk = anyChecked(FOOD_CHECKBOXES); // בודק האם נבחר לפחות צ'ק בוקס אחד עבור אוכל
    setText(FOOD_ERROR_DIV, foodOk ? '' : 'חובה לבחור פריט אוכל אחד לפחות.'); //כדי להחליט איזו מחרוזת להציג: אם foodOk הוא true (תקין), מוצגת מחרוזת ריקה (ניקוי שגיאה); אם false, מוצגת הודעת החובה לאוכל
    if (!foodOk) ok = false; //אם בדיקת האוכל נכשלה, מעדכן את דגל הולידציה הכללי ל-false.

    SUBMIT_BUTTON.disabled = !ok; // קביעת מצב כפתור השליחה (הופך לזמין רק אם ok=true).
    FEEDBACK_DIV.innerHTML = ''; // ניקוי אזור משוב כללי.
    return ok; // מחזיר את הערך הסופי של דגל הולידציה. ערך זה משמש את המאזין של אירוע submit כדי להחליט האם להמשיך בשליחה ולפתוח את המודאל
} 





// תמונות/אייקונים סנכרון (מעדכן את הסימולציה) 
// cb (checkBox) - הפנייה לאלמנט הצ'קבוקס שעליו לחץ המשתמש
// imageId: המזהה של תמונת הפריט המתאימה הממוקמת על השולחן בסימולציה
// iconId: המזהה של האייקון בתוך המלבן הכחול
function handleCheckboxInteraction(cb, imageId, iconId){ // סנכון המצב החזותי של הממשק עם הפריט שנלחץ בשאלות הצ'ק בוקס
    const on = !!cb.checked; // CONST: האם הצ'ק בוקס מסומן (True/False).  
    //!! (כפל שלילה): שימוש בכפל שלילה מבטיח שהמשתנה on יהיה מוגדר כערך בוליאני מפורש (true או false), בהתאם למצב הסימון. המשתנה מוגדר כ-const כיוון שערכו קבוע למשך ריצת הפונקציה
    showById(imageId, on); // הצגת/הסתרת התמונה על השולחן בסימולציה.
    toggleIcon(iconId, on); // הדלקת/עמעום האייקון במלבן הכחול.
} 

function handleRadioInteraction(selected){ // הגדרת הפונקציה המטפלת בלחיצה על כפתור רדיו. היא מקבלת פרמטר יחיד, selected, המהווה הפניה ישירה לפקד הרדיו הנבחר על ידי המשתמש
    // כיבוי הכל: לולאת FOR_EACH עבור כל אפשרויות התאורה (לפני הפעלת החדשה).
    LIGHT_ICON_IDS.forEach((id, i) => { //לולאה זו עוברת על כל אחד ממזהי האייקונים של התאורה (LIGHT_ICON_IDS הוא מערך קבוע המכיל את ID של 'icon-lamp', 'icon-fire')
        toggleIcon(id, false); ////עבור כל ID, קורא לפונקציה toggleIcon ומעביר לה false, מה שגורם לעמעום (הוספת המחלקה DIM_CLASS שנותנת שקיפות 0.5) של כל אייקוני התאורה.
        showById(LIGHT_MAPPING_IDS[i], false); }); //עבור כל ID, קורא לפונקציה showById ומעביר לה false, מה שגורם להסתרה (display: none) של כל תמונות התאורה על השולחן.

    // הדלקת הנבחר:
    const idx = LIGHT_RADIOS.indexOf(selected); // משתמש בשיטת indexOf כדי למצוא את המיקום של פקד הרדיו שנלחץ (selected) בתוך המערך הגלובלי של פקדי הרדיו. האינדקס משמש להתאמה בין הפקד הנבחר ל-ID התואם במערך
    if (idx >= 0 && selected.checked){ // מוודא שמצאנו אינדקס חוקי (כלומר, idx הוא 0 או יותר) ושהפקד הנבחר עדיין מסומן (selected.checked הוא true). תנאי זה מבטיח שהפעולות הבאות יתבצעו רק על בחירה תקפה.
        toggleIcon(LIGHT_ICON_IDS[idx], true); // הדגשת אייקון: קורא לפונקציה toggleIcon עבור ה-ID התואם שנלקח ממערך ה-LIGHT_ICON_IDS לפי ה-idx שנמצא, ומעביר true כדי להדליק/להדגיש את האייקון
        showById(LIGHT_MAPPING_IDS[idx], true); // הצגת תמונה בסימולציה: קורא לפונקציה showById עבור ה-ID התואם שנלקח ממערך ה-LIGHT_MAPPING_IDS, ומעביר true כדי להציג את התמונה המתאימה על השולחן בסימולציה
    }
} 





// בניית סיכום וטיפול במודאל (חלונית הסיכום)
function buildSummary(){ // הפונקציה אוספת ומעבדת את כל הנתונים מהטופס ומכינה אותם להצגה בחלון הסיכום (המודאל)
    const userName = FULL_NAME_INPUT.value.trim(); // איסוף שם: אוסף את הערך הנוכחי משדה הקלט של השם. שימוש ב-trim() מבטיח שהשם יישמר ללא רווחים מיותרים. מוגדר כ-const כיוון שהערך קבוע לצורך העיבוד הנוכחי.
    const address = ADDRESS_INPUT.value.trim();   // CONST: אוסף את ערך הכתובת משדה הקלט 
    const notes = (document.getElementById('notes').value || '').trim() || 'אין'; // CONST: איסוף בקשות במידה והתיבה הוזנה (או 'אין' במידה ולא).

    setText(USER_NAME_SPAN, userName); // עדכון השם בתוך חלונית הסיכום.
    setText(DESTINATION_SPAN, address); // עדכון הכתובת בתוך חלונית הסיכום.
    setText(DRINK_TYPE_SPAN, collectCheckedText(DRINK_CHECKBOXES)); // קורא לפונקציה collectCheckedText (שמבצעת filter ו-map ליצירת מחרוזת מופרדת בפסיקים). הפונקציה רצה על מערך הצ'ק בוקסים של השתייה. התוצאה מוצבת בתוך המקום המתאים בחלונית הסיכום
    setText(FOOD_TYPE_SPAN, collectCheckedText(FOOD_CHECKBOXES));  // קורא לפונקציה collectCheckedText (שמבצעת filter ו-map ליצירת מחרוזת מופרדת בפסיקים). הפונקציה רצה על מערך הצ'ק בוקסים של האוכל. התוצאה מוצבת בתוך המקום המתאים בחלונית הסיכום
    setText(LIGHT_TYPE_SPAN, collectCheckedText(LIGHT_RADIOS));   // קורא לפונקציה collectCheckedText (שמבצעת filter ו-map ליצירת מחרוזת מופרדת בפסיקים). הפונקציה רצה על מערך הרדיו של התאורה. התוצאה מוצבת בתוך המקום המתאים בחלונית הסיכום
    setText(MORE_INFO_SPAN, notes); // עדכון בקשות מיוחדות במידה ויש בתוך חלונית הסיכום, אם אין יוזן "אין".
} 


//פונקציה קצרה וייעודית שנוצרה כדי להציג את חלון הסיכום (המודאל) למשתמש, לאחר שהטופס עבר בהצלחה את כל בדיקות הולידציה ונלחץ כפתור השליחה
function openModal(){ // פתיחת חלון הסיכום.
    MODAL.classList.add('is-open'); // לאחר כל הבדיקות ולחיצה על כפתור השליחה, הוספת המחלקה is open לאלמנט מה שגורם לדפדפן לשנות את תצוגת המודאל מ-display: none ל-display: flex, ובכך מציגה את הסיכום במרכז המסך, עם רקע שקוף כהה 
    document.body.style.overflow = 'hidden'; // שורה זו משנה באופן ישיר את סגנון ה-CSS של גוף המסמך (document.body). על ידי הגדרת overflow ל-hidden, הפונקציה מונעת מהמשתמש לגלול את דף הרקע שנמצא מאחורי חלונית הסיכום.
} 

function resetUI(){ // פונקציה שתפקידה לאפס את מצב הממשק למצב ההתחלתי.
    // הסתרת תמונות: משתמש בלולאת forEach על המערך הקבוע ON_TABLE_IMAGES (המכיל את כל האלמנטים ש-ID שלהם מתחיל ב-onTable-). עבור כל תמונה, מוגדר מאפיין style.display ל-none, המסתיר אותה חזותית
    ON_TABLE_IMAGES.forEach(img => img.style.display = 'none'); 

    // לולאת forEach אוספת את כל אייקוני הבחירה בטופס (המזוהים על ידי המחלקה .thumb), ומחזירה אותם למצב ההתחלתי של חצי שקיפות על ידי הוספת מחלקת העמעום (DIM_CLASS) והסרת מחלקת ההדגשה (ON_CLASS)
    Array.from(document.querySelectorAll('.thumb')).forEach(i => { 
        i.classList.add(DIM_CLASS); 
        i.classList.remove(ON_CLASS); 
    }); 

    // ניקוי תצוגה חיה ושגיאות: לולאת FOR_EACH על מערך הודעות השגיאה.
    LIVE_NAME_SPAN.textContent = ''; // ניקוי שם חי: מנקה את התוכן של אלמנט ה-<span> המציג את השם שמוזן בטופס בזמן אמת בסימולציה ליד השולחן
    [NAME_ERROR_DIV, ADDRESS_ERROR_DIV, DRINKS_ERROR_DIV, FOOD_ERROR_DIV, LIGHT_ERROR_DIV].forEach(el => setText(el, '')); // ניקוי שגיאות: יוצר מערך זמני של כל אלמנטי השגיאה, ומשתמש בלולאת forEach כדי לקרוא לפונקציה setText עבור כל אחד מהם עם מחרוזת ריקה (''), ובכך מנקה את כל הודעות השגיאה מהטופס.

    SUBMIT_BUTTON.disabled = true; // השבתת כפתור: משבית את כפתור השליחה (SUBMIT_BUTTON), שכן בתחילת המצב ובכל איפוס, כפתור האישור צריך להופיע כשאינו זמין ללחיצה
} 

function closePopUp(){ // סגירת המודאל ואיפוס כל המערכת.
    MODAL.classList.remove('is-open'); // מסירה את מחלקת ה-CSS is-open מאלמנט המודאל (MODAL). הסרה זו מחזירה את ה-display של המודאל למצב none כפי שמוגדר במחלקה הכללית .modal, ובכך המודאל נסגר ומוסתר מהמסך.
    document.body.style.overflow = ''; // החזרת אפשרות הגלילה.
    form.reset(); // קורא לשיטת ה-reset() המובנית של טופס ה-HTML (form.reset()). שיטה זו מנקה את התוכן של כל שדות הקלט (טקסט, צ'ק בוקסים, רדיו) ומחזירה אותם למצב ברירת המחדל שלהם
    resetUI();    // איפוס הממשק החזותי (תמונות ואייקונים).
} 





// אתחול ומאזינים (Event Delegation – האצלת אירועים)
document.addEventListener('DOMContentLoaded', () => { // מאזין אתחול: המאזין הראשי המופעל על כל המסמך. הוא מוודא שקוד ה-JS יתחיל לרוץ רק לאחר שכל אלמנטי ה-HTML של הדף נטענו לחלוטין (כגון השדות, הכפתורים והתמונות). זה מונע שגיאות כתוצאה מניסיון לגשת לאלמנטים שטרם נוצרו
    
    // מצב התחלתי
    SUBMIT_BUTTON.disabled = true; // משבית את כפתור האישור.
    resetUI(); // קורא לפונקציה resetUI(), אשר מנקה את כל המרכיבים החזותיים של הממשק למצב התחלתי: מסתירה את כל התמונות שעל השולחן, מעמעמת את כל אייקוני הבחירה (שתייה, אוכל, תאורה) ומנקה את כל הודעות השגיאה

    // ולידציה + שם חי (מאזין INPUT יחיד על הטופס)
    form.addEventListener('input', (e) => { // המאזין עוקב אחר אירוע input, שמופעל בזמן אמת בכל פעם שיש שינוי בתוכן של כל אחד משדות הקלט (כמו הקלדה, מחיקה או שינוי ערך).
        if (e.target === FULL_NAME_INPUT) LIVE_NAME_SPAN.textContent = FULL_NAME_INPUT.value; // תנאי if בודק באופן ספציפי האם השינוי התרחש בשדה השם המלא (FULL_NAME_INPUT). אם כן, הוא מעתיק את הטקסט המוקלד ומציג אותו באופן מיידי באלמנט המיועד לשם החי בסימולציה
        checkFormValidity(); // קריאה לפונקציית בדיקת הולידציה לאחר כל שינוי.
    }); 

    // שינוי בצ'ק בוקסים/רדיו (מאזין CHANGE יחיד על הטופס - Event Delegation)
    form.addEventListener('change', (e) => { // הגדרת מאזין יחיד על הטופס כולו. אירוע change מופעל רק כאשר המצב של פקד הבחירה (צ'ק בוקס או רדיו) משתנה. 
        const t = e.target; // המשתנה הקבוע t (קיצור של Target) שומר את ההפניה לאלמנט הזה. שימוש ב-const מתאים מכיוון שהאלמנט הספציפי שגרם לאירוע לא ישתנה במהלך הטיפול באירוע זה

        // שתייה:
        if (t.matches && t.matches('#drinks input[type="checkbox"]')){ // תנאי if בודק האם האלמנט שנלחץ הוא צ'ק בוקס הממוקם בתוך קבוצת השתייה
            const i = DRINK_CHECKBOXES.indexOf(t); // איתור אינדקס: מאתר את המיקום (האינדקס) של הפקד שנלחץ בתוך המערך DRINK_CHECKBOXES. האינדקס הזה חיוני כדי למצוא את התמונה והאייקון המקבילים במערכים המקבילים 
            if (i > -1) handleCheckboxInteraction(t, DRINK_MAPPING_IDS[i], DRINK_ICON_IDS[i]); // סנכרון חזותי: אם נמצא אינדקס תקין (i > -1), נקראת הפונקציה handleCheckboxInteraction(). פונקציה זו מטפלת בשינוי החזותי הנדרש: הצגה או הסתרה של התמונה הרלוונטית על השולחן והדלקה/עמעום של האייקון
        } 
        // אוכל:
        else if (t.matches && t.matches('#food input[type="checkbox"]')){ // תנאי ELSE IF: בדיקה האם האלמנט הוא צ'ק בוקס של אוכל.
            const i = FOOD_CHECKBOXES.indexOf(t); // CONST: איתור האינדקס של הפקד במערך האוכל.
            if (i > -1) handleCheckboxInteraction(t, FOOD_MAPPING_IDS[i], FOOD_ICON_IDS[i]); // מפעיל את לוגיקת הצ'ק בוקסים (הצגה/הסתרת תמונה והדגשת אייקון) עבור פריט האוכל שנבחר
        } 
        // תאורה (רדיו):
        else if (t.matches && t.matches('#light input[type="radio"]')){ // תנאי ELSE IF: בדיקה האם האלמנט הוא כפתור רדיו של תאורה.
            handleRadioInteraction(t); // קורא לפונקציה ייעודית handleRadioInteraction(). פונקציה זו שונה מהצ'ק בוקסים, שכן עליה לוודא שרק אפשרות אחת תהיה פעילה (כלומר, כיבוי של התמונה והאייקון שנבחרו קודם, ואז הדלקה של החדש)
        } 
        checkFormValidity(); // בדיקת ולידציה לאחר כל שינוי ובסוף ריצתו מעדכן את מצב הזמינות של כפתור השליחה.
    }); 

    // שליחה + פתיחת חלונית הסיכום. שלב זה מגיע לאחר שהמשתמש מילא את כל שדות החובה וכפתור השליחה הפך לזמין
    form.addEventListener('submit', (e) => { // הגדרת המאזין הפועל כאשר המשתמש לוחץ על כפתור השליחה ("שלח הזמנה"). זהו המנגנון המפעיל את כל התהליך הסופי של הטיפול בנתונים והצגת הסיכום
        e.preventDefault(); // מונע טעינה מחדש של הדף ומאפשר לנו להגדיר שטעינת הדף מחדש תתרחש רק בעת לחיצה על כפתור הסגירה .
       // סימן הקיראה ליד הפונקציה מעידה על "ההפך" (שלילה). אם חוזר מהפונקציה true - משמע הוא הופך ל false והקוד שבתוך הבלוק (return) לא מבוצע וימשיך לשורות הבאות.
        if (!checkFormValidity()) return; // תנאי IF: אם הטופס אינו תקין, עוצר את השליחה.
        buildSummary(); // קורא לפונקצייה הבונה את תוכן הסיכום.
        openModal(); // קורא לפונקציה המציגה את חלון הסיכום.
    }); 

    // סגירת חלונית הסיכום
    CLOSE_BTN.addEventListener('click', closePopUp); // מוסיף מאזין לאירוע click (לחיצה) על כפתור ה'סגור' הייעודי, הממוקם בתוך חלונית הסיכום. כאשר המשתמש לוחץ על הכפתור, המאזין מפעיל ישירות את הפונקציה closePopUp()
    MODAL.addEventListener('click', (e) => { // מאזין: סגירת המודאל בלחיצה על הרקע הכהה.
        if (e.target === MODAL) closePopUp(); // תנאי IF: מוודא שהלחיצה מתרחשת רק על הרקע האפור ולא התוכן הפנימי של חלונית הסיכום.
    });
});