/*
  CONFIGURAÇÃO DO FIREBASE
  ========================

  Este é o único arquivo que você precisa editar para ligar o painel ao vivo.
  Siga o passo a passo do LEIA-ME (seção "Painel de presenças ao vivo").

  Cole aqui os valores que o Firebase te der. Enquanto estiver como está
  (com "COLE_AQUI..."), o site continua funcionando normalmente, só que o
  RSVP fica salvo apenas no aparelho do convidado (como antes).
*/

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBXh7xjCjHdiRweJo_QA2czqG2qQ59Gfis",
  authDomain: "juju-95403.firebaseapp.com",
  projectId: "juju-95403",
  storageBucket: "juju-95403.firebasestorage.app",
  messagingSenderId: "928955863363",
  appId: "1:928955863363:web:de86db44941a214ac05ff6",
  measurementId: "G-9QXJ1GZDB0"
};

// Verifica se a configuração já foi preenchida de verdade.
function firebaseConfigurado() {
  return FIREBASE_CONFIG &&
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.apiKey.indexOf("COLE_AQUI") === -1 &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.projectId.indexOf("COLE_AQUI") === -1;
}

// Inicializa o Firebase (só se estiver configurado) e devolve o Firestore.
// Usa a versão "compat" do Firebase, carregada via CDN nas páginas.
let _db = null;
function getFirestore() {
  if (!firebaseConfigurado()) return null;
  if (_db) return _db;
  if (typeof firebase === "undefined") return null;
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  _db = firebase.firestore();
  return _db;
}
