import firebase from 'firebase/app'; // 파이어베이스 기능 불러오기
import 'firebase/firestore'; // 파이어베이스의 파이어스토어 기능 불러오기

const firebaseConfig = {
    apiKey: "AIzaSyDLLPDRsbBPQh9J6du9o8FlDjpqarpSZeY",
    authDomain: "my-todo1-4cd2c.firebaseapp.com",
    projectId: "my-todo1-4cd2c",
    storageBucket: "my-todo1-4cd2c.appspot.com",
    messagingSenderId: "269330306274",
    appId: "1:269330306274:web:2f4e0cb85c5e418555babb"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();