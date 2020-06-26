class Firebase {
    constructor(firebase) {

        this.isInitialized = false
        this.firebase = firebase

        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyA_uGVMMjxs_XLiZs7TjphyykAqHXeiyeo",
            authDomain: "asaventurasdaescovabilu.firebaseapp.com",
            databaseURL: "https://asaventurasdaescovabilu.firebaseio.com",
            projectId: "asaventurasdaescovabilu",
            storageBucket: "asaventurasdaescovabilu.appspot.com",
            messagingSenderId: "862083899374",
            appId: "1:862083899374:web:4eeb5fd75265559045b8ff"
        };

        if (!firebase.apps.length) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.isInitialized = true
        }

    }

    getDatabase() {
        return new Database(this.firebase.database())
    }
}


// Get a reference to the database service
class Database {
    constructor(database) {
        this.scoreRef = database.ref('scores')
    }

    listenScores(onScoreChange) {
        if (typeof onScoreChange !== "function") {
            throw "parameter must be a function"
        }

        this.scoreRef.on('value', function (snapshot) {
            onScoreChange(snapshot.val())
        })
    }

    writeScore(username, score, level) {

        console.log("salvando")

        this.scoreRef.push().set({
            username: username,
            score,
            level
        })
    }
}
