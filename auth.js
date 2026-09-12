/* ============================================================
   EVENT HORIZON — Firebase Auth + Cloud Save
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyAooiBXqDZTNYEGXMWjt68ZrmUoTrFiNYg",
  authDomain: "event-horizon-20780.firebaseapp.com",
  projectId: "event-horizon-20780",
  storageBucket: "event-horizon-20780.firebasestorage.app",
  messagingSenderId: "594313656072",
  appId: "1:594313656072:web:09da1132d9a12e827adebd"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let saveTimer = null;

/* ---- UI HELPERS ---- */
function updateAuthUI() {
  const btnSignIn = document.querySelector("#btn-sign-in");
  const userInfo = document.querySelector("#user-info");
  const userName = document.querySelector("#user-name");
  const userAvatar = document.querySelector("#user-avatar");

  if (currentUser) {
    btnSignIn.classList.add("hidden");
    userInfo.classList.remove("hidden");
    userName.textContent = currentUser.displayName || "Player";
    userAvatar.src = currentUser.photoURL || "";
    userAvatar.alt = currentUser.displayName || "Player";
  } else {
    btnSignIn.classList.remove("hidden");
    userInfo.classList.add("hidden");
  }
}

/* ---- SIGN IN / OUT ---- */
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(err => {
    console.error("Sign-in error:", err);
  });
}

function signOut() {
  auth.signOut().catch(err => {
    console.error("Sign-out error:", err);
  });
}

/* ---- CLOUD SAVE / LOAD ----
   Scenes always restart from their entry node when reselected, so the only
   progress worth persisting is which scenes Ester has unlocked (plus
   settings) — no mid-scene node/position tracking needed. */
function saveProgressNow() {
  if (!currentUser) return;
  db.collection("saves").doc(currentUser.uid).get().then(doc => {
    var existing = doc.exists ? doc.data() : {};
    var characters = existing.characters || {};
    var charData = characters[S.character] || {};

    if (S.character === "ester") {
      charData.unlockedScene = Math.max(charData.unlockedScene || 1, S.unlockedScene);
    }
    characters[S.character] = charData;

    const data = {
      characters: characters,
      lastCharacter: S.character,
      settings: S.settings,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    return db.collection("saves").doc(currentUser.uid).set(data, { merge: true });
  }).catch(err => console.error("Save error:", err));
}

// Debounced save — waits 1 second after the last call before writing
function saveProgress() {
  if (!currentUser) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveProgressNow, 1000);
}

function loadProgress() {
  if (!currentUser) return Promise.resolve(null);
  return db.collection("saves").doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) return doc.data();
      return null;
    })
    .catch(err => { console.error("Load error:", err); return null; });
}

function applyLoadedProgress(data) {
  if (!data) return;
  if (S.screen !== "title") return;
  if (typeof progressRestarted !== "undefined" && progressRestarted) { progressRestarted = false; return; }
  if (data.settings) {
    Object.assign(S.settings, data.settings);
    applySettingsToDOM();
  }
  var characters = data.characters || {};

  // Load Ester's scene progress
  if (characters.ester && characters.ester.unlockedScene) {
    S.unlockedScene = characters.ester.unlockedScene;
  }
}

/* ---- SAVE ON PAGE LEAVE ---- */
window.addEventListener("beforeunload", () => {
  clearTimeout(saveTimer);
  saveProgressNow();
});

/* ---- AUTH STATE LISTENER ---- */
auth.onAuthStateChanged(user => {
  var previousUser = currentUser;
  currentUser = user;
  updateAuthUI();

  // Always reset in-memory progress when auth state changes
  if (typeof resetInMemoryProgress === "function") resetInMemoryProgress();

  // Go back to title screen if user changed
  if (previousUser && typeof showScreen === "function") {
    showScreen("title");
    S.screen = "title";
    S.character = "ester";
    S.introIdx = 0;
    S.typing = false;
    S.starsOffset = 0;
    S.stationX = -50;
    lastTime = performance.now();
    requestAnimationFrame(titleLoop);
  }

  if (user) {
    // Load this user's progress
    if (typeof loadLocalProgress === "function") loadLocalProgress();
    loadProgress().then(data => applyLoadedProgress(data));
  }
});

/* ---- INIT ---- */
function initAuth() {
  document.querySelector("#btn-sign-in").addEventListener("click", signInWithGoogle);
  document.querySelector("#btn-sign-out").addEventListener("click", signOut);
}

document.addEventListener("DOMContentLoaded", initAuth);
