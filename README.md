# 🍽️ מה לבשל היום?

PWA שעוזרת להחליט מה לבשל — בחר מתכון מרשימה או הגרל אחד אקראי.

## 🚀 Deploy לגיטהאב

### שלב 1 — צור repository חדש
צור ב-GitHub repo בשם **`recipe-roulette`** (חשוב שהשם יהיה זהה).

### שלב 2 — העלה את הקבצים
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/recipe-roulette.git
git push -u origin main
```

### שלב 3 — הפעל GitHub Pages
1. כנס ל-Settings של ה-repo
2. בצד שמאל לחץ **Pages**
3. תחת **Source** בחר **GitHub Actions**
4. שמור

### שלב 4 — המתן לבנייה
ה-Action ירוץ אוטומטית. אחרי ~2 דקות האפליקציה תהיה זמינה בכתובת:
```
https://YOUR_USERNAME.github.io/recipe-roulette/
```

---

## 📝 הוספת מתכונים

ערוך את הקובץ `src/data/recipes.json`:

```json
{
  "id": "21",
  "name": "שם המתכון",
  "category": "פסטה",
  "time": 30,
  "tags": ["מהיר", "צמחוני"],
  "emoji": "🍝"
}
```

**קטגוריות קיימות:** פסטה, אורז, עוף, בשר, דגים, מרק, צמחוני

כדי להוסיף קטגוריה חדשה, הוסף אותה גם למערך `categories` בקובץ.

---

## 🛠 פיתוח מקומי

```bash
npm install
npm run dev
```
