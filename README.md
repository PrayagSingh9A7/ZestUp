# 🍽️ ZestUp

### Recipe Discovery Mobile App

ZestUp is a modern **React Native & Expo recipe discovery app** that helps users explore recipes, search for meals, view step-by-step cooking instructions, and save their favorite recipes for quick access.

---

## ✨ Features

* 🍲 Browse recipes through a public recipe API
* 🔍 Search recipes by name, ingredients, or category
* 📝 View ingredients and step-by-step cooking instructions
* ❤️ Save favorite recipes locally
* 💾 Persistent favorites using AsyncStorage
* 🌐 Fetch recipe data dynamically from an external API
* 📱 Responsive mobile-first interface
* 🎨 Clean and minimal food-focused UI

---

## 📱 App Experience

```text
                    ZestUp
                      │
          ┌───────────┴───────────┐
          │                       │
       Discover                 Search
          │                       │
          └───────────┬───────────┘
                      ▼
                 Recipe List
                      │
                      ▼
               Recipe Details
                 │          │
                 ▼          ▼
          Ingredients    Instructions
                             
                      │
                      ▼
                 ❤️ Favorites
                      │
                      ▼
                 AsyncStorage
```

---

## 🛠️ Tech Stack

### Mobile

* React Native
* Expo
* TypeScript / JavaScript
* React Navigation

### Data & Storage

* Public Recipe API
* Axios / Fetch API
* AsyncStorage

### UI

* FlatList
* ScrollView
* React Native components

---

## 🏗️ Project Structure

```text
ZestUp/
│
├── app/
├── components/
├── constants/
├── hooks/
├── utils/
├── assets/
├── scripts/
├── app.json
├── eas.json
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PrayagSingh9A7/ZestUp.git
cd ZestUp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npx expo start
```

Then open the application using an available **Android emulator, iOS simulator, or Expo-compatible mobile device**.

---

## 🔑 What This Project Demonstrates

* React Native mobile application development
* Expo-based development workflow
* External REST API integration
* Asynchronous data fetching
* Local data persistence
* Search and filtering
* Reusable mobile components
* Navigation between application screens
* Mobile-first UI development

---

## 📌 Future Improvements

* Personalized recipe recommendations
* Meal planning
* Shopping list generation
* Nutritional information
* Recipe sharing
* Offline recipe caching

---

## 👨‍💻 Author

**Prayag Singh**

Full Stack Developer

---

### ⭐ Built with React Native & Expo
